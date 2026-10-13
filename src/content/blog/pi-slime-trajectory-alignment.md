---
title: "从 Agent 轨迹到可训练样本：Pi + slime 的 token、logprob 与 mask 对齐"
description: "购物 Agent 接入后训练时，怎样区分生成与工具内容，校验采样概率，并逐项验收参数更新和权重同步。"
pubDate: 2026-10-14
tags: ["Agentic RL", "Pi + slime", "Trajectory Audit"]
---

一个购物 Agent 能完成工具调用，还不足以说明它的轨迹可以用于 GRPO。模型生成的动作、工具返回的观察，以及聊天模板一起组成下一轮输入；训练侧必须知道其中哪些 token 是策略实际生成的，它们来自哪个版本的权重。

我在上游购物 SFT / GRPO 复现之外，单独推进了 Pi 执行循环与 slime 训练接口的连接。Pi、slime 的官方 Adapter 和 TrajectoryManager 是沿用组件；我的工作集中在购物工具桥、自定义 generate hook、组有效性过滤和接口审计。

## 1. 不从最终文本重新构造生成轨迹

执行器保存的对话适合阅读，但训练还需要逐 token 的采样记录。把最终文本重新 tokenize，可能改变边界或特殊 token，也无法恢复当时模型给每个 token 的采样概率。

这条接入保留采样侧的 token ID 与 logprob，再结合官方轨迹接口构造训练输入。工具返回仍是后续动作的条件信息，但不会被当成模型自己生成的训练目标。

| 轨迹位置 | 参与下一轮上下文 | 作为策略生成目标 |
| --- | --- | --- |
| 模型生成的动作 token | 是 | 是，保留对应 logprob |
| 工具观察 | 是 | 否，对应位置 mask 掉 |
| 模板与协议插入内容 | 是 | 否，按照实际轨迹边界处理 |

一次已保存的 GPU 推理检查包含 506 个生成 token，以及 6,903 个被 mask 的工具与模板 token。关键是逐位置对应；只检查两个数组“长度相等”，仍可能掩盖错位。

## 2. 有效性检查放在奖励归一化之前

购物任务可以有严格购买、替代购买和无效结束等状态。无效轨迹不是奖励为零的有效失败：模型请求失败、协议违约或无法核验终局，都需要单独记录。

GRPO 的组内相对信号依赖同一任务的多个 rollout。如果把坏轨迹补成正常奖励，组均值与优势也会被污染。本次验收先过滤含无效成员的组，再寻找有效且有奖励差异的组。以下是流程示意，不是库 API：

```python
for group in rollout_groups:
    if not all(sample.valid_terminal for sample in group):
        record_invalid_group(group)
        continue
    if not has_reward_variation(group):
        continue
    audit_generated_positions(group)
    submit_to_grpo(group)
```

真实接入记录中，12 条采样尝试有 8 条有效终局，最终接受的是 task 83 的四条替代购买轨迹。它们有奖励差异，但严格购买成功数为零。因此这组数据能证明更新路径接通，不能拿来表示购物成功率提升。

## 3. 在实际训练 forward 上审计概率

先核对 token、mask、样本顺序和权重版本，再比较生成位置的采样 logprob 与更新前训练 forward 的 logprob。GPU 内核、精度与执行方式可能带来数值差异，平均值之外也要看尾部误差。

本次共比较 2,392 个生成 token，平均绝对差为 0.01056，最大差为 0.45494。这个记录尚未完成正式数值容差验收；它说明审计已接入，同时指出后续还要检查少数高误差位置。不能只因整体均值较小，就认定所有训练信号已对齐。

## 4. 把“接通”拆成独立验收项

我分别保存采样终局、训练输入审计、optimizer step、参数前后变化、checkpoint 和推理服务权重同步的结果。本次核验了 1 次真实 GRPO 更新，参数变化检查通过，梯度范数为 7.6898，checkpoint 保存并同步至 SGLang。

这与原 veRL 主线的 500 次更新是两组记录。随后又做了动作守卫、观察投影、上下文预算及单轮工具调用的协议对齐；新版协议还需要重新跑配对 GPU 评测，不能直接复用旧版接入结果来宣称效果。

当前更有价值的结论是：**轨迹、训练与权重同步已经形成可检查的链路，RL 效果仍需独立证明。**

进一步查看 [项目架构与实验结果](/personal-site/projects/shopping-sft-grpo/) 和 [公开接入审计摘要](/personal-site/evidence/shopping-integration-audit.json)。摘要仅保留汇总字段，不含原始对话或任务载荷。
