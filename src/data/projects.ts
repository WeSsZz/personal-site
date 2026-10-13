import { backendInternship } from './resume';

export interface Project {
  slug: string;
  number: string;
  featured: boolean;
  category: string;
  name: string;
  subtitle: string;
  description: string;
  highlights?: string[];
  tech: string[];
  link?: string;
  sourceLabel?: string;
  label: string;
  status: string;
  challenge: string;
  decisionsHeading?: string;
  decisions: [string, string][];
  outcome: string;
  flow: string[];
  evidence?: { value: string; label: string; note: string }[];
  comparisons?: {
    title: string;
    caption: string;
    columns: [string, string];
    rows: { name: string; success: string }[];
    note: string;
  }[];
}

export const projects: Project[] = [
  {
    "slug": "shopping-sft-grpo",
    "number": "01",
    "featured": true,
    "category": "Agentic RL",
    "name": "Shopping SFT + GRPO",
    "subtitle": "后训练实验 · Pi + slime Harness 接入",
    "description": "以上游购物 Agent 为基线，完成 SFT / GRPO 复现，进一步实现训练信号诊断、Pi 与 slime 的轨迹适配、执行协议对齐，以及生成 token / logprob 的训练审计。",
    "highlights": [
      "Pi → slime → GRPO → SGLang 权重同步",
      "上下文压缩与 action-only loss mask",
      "运行时、训练信号与策略收益分别对照"
    ],
    "tech": [
      "Agent Harness",
      "Context Engineering",
      "Pi + slime",
      "LoRA SFT / GRPO",
      "SGLang"
    ],
    "link": "https://github.com/YYHDBL/shopping-grpo-longhorizon",
    "sourceLabel": "上游基线",
    "label": "后训练与 Harness",
    "status": "训练、接入与对照实验",
    "challenge": "同一权重换一个执行循环，工具校验、观察投影、上下文压缩与停止预算都可能改变结果。要让 Agent 轨迹能用于训练，还必须区分可验证的终局奖励、基础设施失败和实际生成 token。",
    "decisionsHeading": "在上游基线上的实现与实验",
    "decisions": [
      [
        "Pi + slime 轨迹适配",
        "将 Pi Agent runtime、购物工具桥与 slime 官方 OpenAIAdapter / TrajectoryManager 接通。每条 rollout 使用独立环境租约，整组过滤无效样本，并检查组内奖励方差；已完成真实 GRPO 更新、checkpoint 保存与 SGLang 权重同步。"
      ],
      [
        "Context Engineering",
        "原运行时改动保留精确动作标签，补全公开未选规格轴与完整规格投影；Pi 接入复用冻结投影器，保留当前搜索 ASIN 和按钮文本。压缩保留固定 system/user 与最近完整 assistant/tool 回合，配对评测输入预算 23,552 token，预留生成与安全余量。"
      ],
      [
        "Token / logprob 与 loss mask",
        "从真实采样轨迹导出生成 token 和对应 logprob，工具观察及模板 token 不参与直接预测损失；分别检查模拟服务的精确一致性与真实 GPU 数值偏差，压缩后仍保留采样生成记录。"
      ],
      [
        "执行协议对齐",
        "冻结工具 schema、Reward v3 与严格成功口径，将参数检查交回同一 Python Guard；对齐首轮输入、工具执行预算和连续拒绝停止条件，并逐题核验首轮 prompt token 哈希。新的原循环 / Pi GPU 配对结果尚待执行。"
      ],
      [
        "失败反馈与组过滤",
        "在独立实验中为满足生命周期条件的模型提前退出和 Guard 耗尽提供 -0.85 的 adapter 训练信号，单独标注版本和来源，保留原环境 Reward。以两组各 30 次更新检查反馈是否改善策略。"
      ],
      [
        "候选覆盖与规格记忆",
        "对 28 道失败题重采样 112 条轨迹，识别 8 道有成功候选的任务。另实现 spec_memory_v1，最多整理 3 个公开候选，历史记忆不扩大当前动作权限；历史 24 题配对两组均为 11/24，尚未观察到成功率收益。"
      ]
    ],
    "outcome": "veRL 主线完成三阶段 LoRA SFT 与 500 次 GRPO 更新；独立 Pi + slime 链路完成 1 次真实参数更新。后续工作集中在运行时配对、训练信号和上下文机制的可归因对照，接入成功与策略收益分别验收。",
    "flow": [
      "Context / Guard",
      "Pi Rollout",
      "slime GRPO",
      "权重同步 / 评测"
    ],
    "evidence": [
      {
        "value": "500",
        "label": "veRL 主线参数更新",
        "note": "按连续 optimizer_step 记录核验，跳过更新另计。"
      },
      {
        "value": "1",
        "label": "Pi + slime 真实 GRPO 更新",
        "note": "使用 4 条有效且奖励不同的替代购买轨迹；权重哈希变化，checkpoint 与同步已验收。"
      },
      {
        "value": "2,392",
        "label": "生成 token 的概率审计",
        "note": "真实训练 / 采样 logprob 平均绝对差 0.01056；尚需验证正式数值容差。"
      }
    ],
    "comparisons": [
      {
        "title": "权重与运行时分别对照",
        "caption": "同一 50 题开发集 · 单次严格购买成功",
        "columns": [
          "模型 / 运行时",
          "严格成功"
        ],
        "rows": [
          {
            "name": "原运行时 · Base",
            "success": "0 / 50 · 0%"
          },
          {
            "name": "原运行时 · SFT",
            "success": "22 / 50 · 44%"
          },
          {
            "name": "原运行时 · GRPO-500",
            "success": "22 / 50 · 44%"
          },
          {
            "name": "修复运行时 · 同一 SFT",
            "success": "26 / 50 · 52%"
          },
          {
            "name": "修复运行时 · 同一 GRPO-500",
            "success": "24 / 50 · 48%"
          }
        ],
        "note": "运行时修复使用已有权重；SFT 26/50 包含多项改动，与较早的 22/50 不是同轮单开关对照，新增成功中两题仍需标签复核。严格成功沿用 reward_valid=true 的 gold_purchase。开发集也用于训练验证，独立 Final-200 与多种子验证尚未完成。"
      },
      {
        "title": "失败反馈消融",
        "caption": "从同一 SFT 起点训练 · 每组 30 次更新 · 同一 50 题开发集",
        "columns": [
          "Adapter 失败反馈",
          "严格成功"
        ],
        "rows": [
          {
            "name": "关闭",
            "success": "23 / 50 · 46%"
          },
          {
            "name": "开启",
            "success": "22 / 50 · 44%"
          }
        ],
        "note": "本次对照未观察到成功率提升。两组保留相同任务池，单独改变失败训练反馈；这些结果不属于新的 Pi 执行协议配对，也不构成最终测试结论。"
      }
    ]
  },
  {
    "slug": "enterprise-agent",
    "number": "02",
    "featured": true,
    "category": "Agent Engineering",
    "name": "Enterprise Agent",
    "subtitle": "Adaptive Harness · Context Engineering · Durable Runtime",
    "description": "围绕企业运维调查构建自适应 Agent Harness：把风险路由、循环进展检测、证据上下文、Working / Episodic Memory 与持久化 Runtime 连接起来，并用版本化回放检验系统行为。",
    "highlights": [
      "风险路由、Shadow 模式与停滞纠偏",
      "证据优先的上下文预算与抽取式记忆",
      "Checkpoint / Resume、审批绑定与幂等"
    ],
    "tech": [
      "Adaptive Harness",
      "Context Engineering",
      "Durable Runtime",
      "Working / Episodic Memory",
      "RCAEval"
    ],
    "link": "https://github.com/WeSsZz/AI-Engineer-Roadmap-2026/tree/main/projects/enterprise-agent",
    "sourceLabel": "GitHub 源码",
    "label": "Agent Harness",
    "status": "Runtime 与真实遥测评测持续迭代",
    "challenge": "调查 Agent 要依据新证据调整工具调用，识别没有进展的循环，并在中断后继续执行。上下文中哪些事实可信、历史记忆能做什么、哪些状态必须恢复，都需要独立的系统合同。",
    "decisionsHeading": "Harness / Context / Runtime 的具体实现",
    "decisions": [
      [
        "Adaptive Harness 与路由",
        "实现 fixed_multi、adaptive_shadow、adaptive、read_only_loop 四种持久化编排模式；按风险信号在单 Agent triage 与多 Specialist 验证之间路由，信号不足时进入完整验证链，路由决策写入 checkpoint 与 Trace。"
      ],
      [
        "Agent Loop 的进展控制",
        "对指标、日志与知识结果做内容指纹，区分新证据与查询参数变化，识别连续重复及周期为 2/3 的交替调用。停滞后给模型有限纠偏机会；调用、token 与时间预算跨暂停和恢复累计。"
      ],
      [
        "Context Engineering",
        "将实时事实、工具结果与 evidence refs 组织成 Working Memory。默认最终提示预算为 12,000 字符；超限时先移除历史摘要，再压缩被替代的旧观察。最新工具结果和证据保留，必需上下文仍超限则暂停，完整原始记录供验证与回放。"
      ],
      [
        "Episodic Memory 的合同",
        "按租户、服务和时间冻结历史候选，最多给调查模型两条不可信摘要；历史内容不能成为本次证据或审批。仅将完成且验证通过的事故写入长期记忆，与终态快照原子提交。"
      ],
      [
        "抽取式记忆整理",
        "可选模型只从已验证事实中选择编号和排序，程序组合原文、检查来源并限制长度；输出越界或调用失败退回原诊断摘要。已接通调查、整理、保存与下一次使用，记忆效果仍需独立对照。"
      ],
      [
        "Durable Runtime 与评测",
        "用 SQLite Task Snapshot、Event Log、父子 Span 和乐观锁恢复任务，审批绑定 action_id，写入使用持久化幂等键。通过故障注入、版本化 grader 与 RCAEval 回放分开检验证据、恢复、安全和诊断。"
      ]
    ],
    "outcome": "已实现受控调查、上下文与记忆链路，以及可暂停恢复的 Runtime。RCAEval 回放覆盖 54 次故障实验、18 个事故配置组；开发和验证已开展真实模型版本对照，最终测试保留。新增上下文机制的诊断收益尚未稳定，因此继续通过配对实验检查信息保留、调用行为与失败分布。",
    "flow": [
      "Context / Memory",
      "Harness / Loop",
      "Tool / Verifier",
      "Checkpoint / Trace"
    ],
    "evidence": [
      {
        "value": "4",
        "label": "持久化编排模式",
        "note": "固定、影子路由、自适应与只读调查使用同一任务生命周期。"
      },
      {
        "value": "54",
        "label": "RCAEval 故障实验",
        "note": "开发、验证与最终测试分别规划；最终测试未参与当前对照。"
      },
      {
        "value": "SQLite",
        "label": "可恢复状态与审计",
        "note": "保存任务、事件和 Span；恢复延续预算、内容指纹与权限范围。"
      }
    ]
  },
  {
    slug: 'dataset-platform',
    number: '03',
    featured: false,
    category: '工程实践',
    name: backendInternship.projectName,
    subtitle: `${backendInternship.company} · ${backendInternship.role}`,
    description: backendInternship.description,
    tech: backendInternship.tech,
    label: '实习实践',
    status: `实习实践 · ${backendInternship.period}`,
    challenge: '采集任务从配置、审批到调度执行，跨越多个状态和服务。重复提交、配置更新与执行失败都需要有一致的处理方式和可追溯记录。',
    decisions: backendInternship.highlights,
    outcome: backendInternship.outcome,
    flow: backendInternship.flow,
  },
];

export const featuredProjects = projects.filter(project => project.featured);
