export interface CaseStudy {
  role: string;
  summary: string;
  contributions: string[];
  result: string;
  thumbnail: string[];
  scope: { area: string; baseline: string; change: string }[];
  architecture: {
    caption: string;
    lanes: {
      name: string;
      sequence: boolean;
      nodes: { title: string; detail: string; ownership: 'upstream' | 'work' }[];
      note: string;
    }[];
  };
  timeline: {
    title: string;
    source: string;
    events: { title: string; summary: string; detail: string }[];
  };
  report: { path: string; label: string };
  article: { slug: string; label: string };
}

export const caseStudies: Record<string, CaseStudy> = {
  'shopping-sft-grpo': {
    role: '上游复现 / 独立接入实验',
    summary: '把购物 Agent 的执行轨迹接入训练：从 SFT / GRPO 基线，推进 Pi + slime 工具桥、样本有效性检查和生成概率审计。',
    contributions: ['连接 Pi 执行循环与 slime 轨迹接口，核对生成 token、logprob 和 mask。', '分别检查执行协议、失败训练信号与已有权重的购物表现。'],
    result: 'Pi + slime 已核验 1 次真实 GRPO 参数更新、checkpoint 保存与 SGLang 权重同步。',
    thumbnail: ['Pi Agent', '轨迹适配', 'GRPO 更新', '权重同步'],
    scope: [
      { area: '环境与基线', baseline: 'ShopSimulator、工具 schema、Reward v3、Pure V4 演示池及原 SFT / GRPO 配方。', change: '复现三阶段 LoRA SFT 与 500 次 veRL 更新，保存开发集结果；这一部分归属上游复现。' },
      { area: '执行器接入', baseline: 'Pi Agent runtime 与 slime 官方 OpenAIAdapter / TrajectoryManager。', change: '实现购物工具桥、环境租约、自定义 generate hook、整组有效性过滤，以及两套循环的协议对齐检查。' },
      { area: '上下文与信号', baseline: '原观察投影、动作守卫及环境终局奖励。', change: '检查精确动作标签与规格观察，开展失败反馈消融、规格记忆配对，以及采样 / 训练 logprob 审计。' },
    ],
    architecture: {
      caption: '基于项目模块关系绘制：官方组件与本项目连接、校验部分分别标注。',
      lanes: [
        { name: '执行与环境交互', sequence: true, nodes: [
          { title: 'Pi Agent', detail: '模型请求 / 执行循环', ownership: 'upstream' },
          { title: '购物工具桥', detail: '环境租约 / 统一 Guard', ownership: 'work' },
          { title: 'ShopSimulator', detail: 'Observation / Reward v3', ownership: 'upstream' },
        ], note: '工具观察返回 Pi；工具 schema、环境奖励和严格成功定义保持冻结。' },
        { name: '轨迹到参数更新', sequence: true, nodes: [
          { title: 'TrajectoryManager', detail: '生成 token / logprob / mask', ownership: 'upstream' },
          { title: '样本过滤与审计', detail: '有效组 / 数值与协议检查', ownership: 'work' },
          { title: 'slime GRPO', detail: 'optimizer step / checkpoint', ownership: 'upstream' },
          { title: 'SGLang', detail: '更新权重 / 后续采样', ownership: 'upstream' },
        ], note: '自定义 hook 连接执行轨迹与训练接口；checkpoint 与权重同步分别验收。' },
      ],
    },
    timeline: {
      title: '一次真实 GPU 接入的验收过程',
      source: '来自已保存的 gpu-train-v10 执行与审计汇总。这是执行事件摘要，属于工具协议再次对齐之前的接入版本。',
      events: [
        { title: '沿用 SFT 起点', summary: '固定已有 stage C SFT 权重与购物协议', detail: '本次验证在独立 Pi + slime 目录进行。原 veRL 主线的 500 次更新另行记录，不与这次接入合计。' },
        { title: '采样并检查终局', summary: '12 条尝试 → 8 条有效终局', detail: '无效轨迹继续保留为失败记录，不填成正常奖励。含无效样本的组不能进入本次更新。' },
        { title: '选择可学习的组', summary: '4 条有效、有奖励差异的替代购买轨迹', detail: 'task 83 的四条 partial_alternative_purchase 轨迹进入更新。这四条不计为严格 gold_purchase 成功。' },
        { title: '核对训练数据', summary: '2,392 个生成 token 参与概率审计', detail: '工具观察与模板位置不作为模型直接预测目标。实际训练 / 采样 logprob 平均绝对差为 0.01056，最大为 0.45494；数值容差仍需进一步验收。' },
        { title: '核验参数更新', summary: '1 次 optimizer step，前后权重哈希变化', detail: '优化器返回成功，参数变化核验通过，梯度范数为 7.6898。采到轨迹和执行了参数更新分别记录。' },
        { title: '保存并同步', summary: 'checkpoint 保存，更新权重同步至 SGLang', detail: '这条链路证明执行、训练与服务端权重同步接通。购物成功率和 RL 收益使用独立的实验与评测口径。' },
      ],
    },
    report: { path: 'evidence/shopping-integration-audit.json', label: '公开接入审计摘要' },
    article: { slug: 'pi-slime-trajectory-alignment', label: '从 Agent 轨迹到可训练样本' },
  },
  'enterprise-agent': {
    role: 'Runtime 实现 / 对照实验',
    summary: '实现可恢复的企业调查 Harness：让模型依据证据调用工具，让运行时管理进展、上下文预算和暂停恢复。',
    contributions: ['实现风险路由、内容进展检测、Working / Episodic Memory 和上下文投影。', '将预算、内容指纹、审批及幂等语义接入持久化任务状态。'],
    result: '4 种编排模式共享任务生命周期；调查可暂停恢复，预算与去重状态延续。',
    thumbnail: ['Harness 路由', '上下文组织', '受控工具', '持久化状态'],
    scope: [
      { area: '基础与数据', baseline: '模型 API、SQLite、公开知识语料与 RCAEval 遥测。', change: '实现统一任务、工具、证据与评测合同，建立订单分析和运维调查两条演示链路。' },
      { area: 'Harness / Context', baseline: '模型提供结构化工具决策，检索提供知识片段。', change: '实现风险路由、停滞检测、上下文投影及受限历史摘要；模型可见上下文与完整验证证据分别管理。' },
      { area: 'Runtime / 验证', baseline: 'SQLite 提供事务存储，外部模型与工具可能失败。', change: '实现 checkpoint / resume、版本检查、审批绑定、持久化幂等、故障注入与多维 grader。' },
    ],
    architecture: {
      caption: '只读调查路径与持久化状态层；固定 / 自适应模式共用同一 Runtime。',
      lanes: [
        { name: '只读调查循环', sequence: true, nodes: [
          { title: 'ContextEngine', detail: '事实 / 记忆 / 提示预算', ownership: 'work' },
          { title: 'Investigator', detail: '模型选择工具或停止', ownership: 'work' },
          { title: 'Tool Gateway', detail: '参数 / 范围 / 错误策略', ownership: 'work' },
          { title: 'Metrics · Logs · Knowledge', detail: '观察与证据返回循环', ownership: 'work' },
        ], note: 'Harness 选择编排模式；每轮反馈更新 Working Memory，最终结果进入 Verifier。' },
        { name: '状态与恢复合同', sequence: false, nodes: [
          { title: 'Task Snapshot', detail: '状态 / 预算 / checkpoint', ownership: 'work' },
          { title: 'ProgressTracker', detail: '内容指纹 / 停滞与纠偏', ownership: 'work' },
          { title: 'Event Log / Span', detail: '调用、故障与恢复审计', ownership: 'work' },
          { title: 'Episodic Memory', detail: '验证后与终态原子提交', ownership: 'work' },
        ], note: 'SQLite 保存执行状态；恢复沿用已有证据、预算、权限与进展记录。' },
      ],
    },
    timeline: {
      title: '停滞后怎样暂停与恢复',
      source: '根据已实现的 ProgressTracker 默认规则构造的机制示例，用于解释执行合同；不作为真实事故轨迹或诊断成绩。',
      events: [
        { title: '收到新证据', summary: '内容指纹首次出现，停滞计数归零', detail: '检测器读取经过 Gateway 校验的完整结果，按指标值、日志条目或知识内容判定进展。' },
        { title: '观察没有新增内容', summary: '连续无进展计数达到 1', detail: '更换查询词、排序或随机 evidence ID，不能使同一内容变成新证据。请求与结果指纹分别保存。' },
        { title: '再次收到同一内容', summary: '连续无进展计数达到 2', detail: '重复调用与周期为 2 / 3 的交替调用都能被记录；真正的新内容会重置计数。' },
        { title: '提供有限纠偏机会', summary: '第 3 次无进展，发出 loop_control 提示', detail: '默认允许再执行 1 次逻辑工具调用。模型仍可合法 finish 或 clarify；阈值可配置。' },
        { title: '保存暂停状态', summary: '纠偏后仍无进展 → paused / no_progress', detail: '保存内容指纹、调用预算与最近 checkpoint。暂停状态不会生成确定性根因、写入长期记忆或创建工单。' },
        { title: '显式恢复', summary: '补充信息或 retry 后继续，保留累计状态', detail: '普通 resume 返回保存状态；补充信息或显式重试提供有限纠偏机会。预算按绝对总上限检查，权限和旧内容去重记录继续生效。' },
      ],
    },
    report: { path: 'evidence/enterprise-loop-contract.json', label: '公开执行合同摘要' },
    article: { slug: 'agent-loop-progress-and-resume', label: 'Agent Loop 如何识别停滞并恢复' },
  },
};
