---
title: "Agent Loop 如何识别停滞，并带着状态恢复"
description: "Enterprise Agent 的内容进展检测、有限纠偏、上下文预算与 checkpoint / resume 合同。"
pubDate: 2026-10-14
tags: ["Agent Runtime", "Harness", "Context Engineering"]
---

模型连续调用了三次工具，调查是否真的前进了？请求成功、查询词变化或收到一个新的 evidence ID，都不等于得到新证据。在 Enterprise Agent 中，我把“模型决定下一步”与“Runtime 判断能否继续”分别实现。

这篇文章解释当前只读调查循环的执行合同。下文的时间线是机制示例，不是一段真实事故记录，也不表示根因诊断准确率。

## 1. 进展要看结果内容

ProgressTracker 读取 Gateway 校验后的完整结果，而不是只看已经裁剪给模型的摘要。这样，新增日志即使没有出现在摘要中，也能成为真实进展。

| 工具 | 内容指纹关注什么 | 哪些变化不算进展 |
| --- | --- | --- |
| Metrics | 实际指标结果 | service / window 的重复回显 |
| Logs | level、code、count、message | 请求游标、条目顺序与随机 ID |
| Knowledge | 文档、版本、片段与文本 | 查询词与检索排名分数 |

请求指纹与内容指纹分别保存。前者能提示重复请求或周期为 2 / 3 的交替调用；后者回答“拿到的内容以前见过吗”。新内容重置停滞计数，换查询词得到旧内容则继续计数。

这套规则当前针对三类工具。对“等待部署状态变化”这样的异步轮询，需要另外定义合理的等待、间隔和退出条件，不能直接套用调查工具的停滞规则。

## 2. 停滞后给一次有限纠偏

默认连续 3 次没有新增内容时，Runtime 向模型提供 loop_control 提示，再允许 1 次逻辑工具调用。模型可以换调查方向，也可以合法 finish 或 clarify。若纠偏后仍然没有进展，任务进入 `paused / no_progress`。

流程可以概括为以下伪代码；实际实现还检查工具错误与各项预算：

```python
if result_contains_new_content:
    reset_stall_state()
elif recovery_allowance_exhausted:
    checkpoint_and_pause(reason="no_progress")
elif consecutive_no_progress >= policy.no_progress_limit:
    add_loop_control_hint()
    grant_bounded_recovery()
```

停滞不是一个确定性根因结论。暂停时不会把未验证结果提交到长期记忆，也不会创建工单或执行写操作。只读调查的退出与后续动作授权是不同的合同。

## 3. 上下文投影保留决策与验证所需的信息

ContextEngine 负责模型可见的系统与用户文本，完整证据另由 Runtime 保存。当前默认上下文上限是 12,000 **字符**；估计 token 的方法是启发式，不能与累计使用量的 12,000 **token** 上限混用。

历史 Episodic Memory 最多取两条，每条摘要限制为 400 字符，并按非可信历史处理。超出上下文预算时，先移除历史，再裁剪较旧观察；最新真实输入与必要证据引用必须保留。必要内容仍然放不下，就在模型调用前暂停为 `context_limit`。

这项取舍使模型看到的是预算内的投影，同时让 Verifier 仍能访问完整验证证据。压缩上下文不能顺带改变工具权限或把历史推测变成当前事实。

## 4. Resume 延续合同，不重新开始计数

checkpoint 保存已见内容指纹、停滞状态、累计工具调用与任务预算。对于停滞暂停，普通 resume 返回保存状态；补充信息或显式 retry 才提供有限纠偏机会。提高预算时填写的是新的绝对总上限，而不是再加一份新配额。

默认只读预算为 6 次模型决策、12 次逻辑工具调用、12,000 个 reported usage token 和 300 秒墙钟时间。持久化的时间起点包含暂停期间，因此长时间暂停后的任务仍可能先触及时间上限。返回响应后才能检查累计 token，也意味着一次响应可能先越过预算；模型提供方的请求上限与 deadline 仍需配合。

已有测试检查了查询词和排序变化、摘要之外的新日志、checkpoint 后的指纹与纠偏状态，以及非法配置。这些验证支持执行合同，不替代多模型、多场景的诊断评测。

进一步查看 [项目架构与暂停恢复示例](/personal-site/projects/enterprise-agent/) 和 [公开执行合同摘要](/personal-site/evidence/enterprise-loop-contract.json)。
