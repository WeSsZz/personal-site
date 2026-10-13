import { backendInternship } from './resume';

export interface Project {
  slug: string;
  number: string;
  category: string;
  name: string;
  subtitle: string;
  description: string;
  tech: string[];
  link?: string;
  sourceLabel?: string;
  label: string;
  status: string;
  challenge: string;
  decisions: [string, string][];
  outcome: string;
  flow: string[];
  comparison?: {
    caption: string;
    rows: { name: string; success: string }[];
    note: string;
  };
}

export const projects: Project[] = [
  {
    "slug": "shopping-sft-grpo",
    "number": "01",
    "category": "模型后训练",
    "name": "Shopping SFT + GRPO",
    "subtitle": "购物 Agent 的后训练与可执行评测",
    "description": "基于 ShopSimulator 与 Qwen3.5-2B，复现从多步工具调用轨迹、三阶段 LoRA SFT 到在线 GRPO 的训练链路，并用严格购买成功与失败轨迹检验策略表现。",
    "tech": [
      "Qwen3.5-2B",
      "LoRA SFT",
      "veRL GRPO",
      "ShopSimulator",
      "vLLM"
    ],
    "link": "https://github.com/YYHDBL/shopping-grpo-longhorizon",
    "sourceLabel": "上游源码",
    "label": "开源复现",
    "status": "训练与开发集评测已完成",
    "challenge": "购物 Agent 要完成搜索、详情核验、规格选择和购买。合法的工具调用只是起点，最终购买还必须满足用户约束；训练收益也需要与运行时修复带来的变化分开判断。",
    "decisions": [
      [
        "三阶段 SFT",
        "复用上游 Pure V4 演示池，采用 completion-only loss 训练 LoRA，让模型学习动作协议与完整购物流程，分阶段训练并合并权重。"
      ],
      [
        "在线 GRPO",
        "从 SFT 模型接续 veRL GRPO，每题采样 4 条轨迹，以环境终局奖励计算组内优势，累计完成 500 次参数更新并验收检查点。"
      ],
      [
        "对照与轨迹诊断",
        "在相同运行时比较 Base、SFT 与 GRPO；对 28 道 SFT 失败题采样 112 条轨迹，并进行两组各 30 次更新的失败反馈开关消融。"
      ]
    ],
    "outcome": "SFT 在当前开发集上建立了可执行的购物策略。GRPO-500 与 SFT 的总体严格成功率相同；112 条失败题重采样轨迹中，8 道题存在成功候选，提示候选覆盖与单次策略表现仍有差距。",
    "flow": [
      "教师轨迹",
      "LoRA SFT",
      "在线 GRPO",
      "执行评测"
    ],
    "comparison": {
      "caption": "原始运行时 · 同一 50 题开发集",
      "rows": [
        {
          "name": "Qwen3.5-2B Base",
          "success": "0 / 50 · 0%"
        },
        {
          "name": "三阶段 LoRA SFT",
          "success": "22 / 50 · 44%"
        },
        {
          "name": "GRPO · step 500",
          "success": "22 / 50 · 44%"
        }
      ],
      "note": "严格成功要求有效的 gold_purchase 终局。这是单次开发集观察，该集合也用于训练验证；独立 Final-200 与多种子验证尚未完成。上游仓库的 200 题成绩不属于本次复现实验。"
    }
  },
  {
    "slug": "enterprise-agent",
    "number": "02",
    "category": "Agent 系统",
    "name": "Enterprise Agent",
    "subtitle": "企业知识与运维调查 Runtime",
    "description": "面向订单分析与运维调查，把只读 Agent Loop、证据检索、工具权限和持久化执行接入同一个 Runtime，让任务可以追溯、恢复，并在写操作前完成审批。",
    "tech": [
      "Python",
      "SQLite",
      "Agent Loop",
      "RAG",
      "Tool Gateway"
    ],
    "link": "https://github.com/WeSsZz/AI-Engineer-Roadmap-2026/tree/main/projects/enterprise-agent",
    "sourceLabel": "GitHub 源码",
    "label": "Agent 工程",
    "status": "持续开发与评测",
    "challenge": "一次调查需要关联指标、日志与 Runbook，还要处理空检索、工具故障和进程中断。执行状态、证据来源、租户权限和审批必须由系统保证。",
    "decisions": [
      [
        "证据驱动调查",
        "在固定工作流外接入最多 6 轮的只读调查循环，允许模型选择指标、日志和知识工具；通过上下文预算、查询进展与重复调用检测控制执行。"
      ],
      [
        "恢复与受控写入",
        "用状态机、SQLite 快照与事件日志保存 checkpoint，以乐观锁防止覆盖。Tool Gateway 校验参数与租户范围，统一重试和熔断；写操作绑定 action_id 审批与持久化幂等键。"
      ],
      [
        "检索、记忆与评测",
        "比较 BM25、BGE-M3 与 RRF 检索，保留证据引用；仅将验证完成的事故记忆与终态快照原子提交。接入 RCAEval 真实遥测，分开记录诊断、恢复和安全行为。"
      ]
    ],
    "outcome": "已实现订单分析与运维调查两条演示链路，并建立故障注入、进程恢复及模型评测入口。最新证据提取版本通过 300 项离线回归，36 条真实遥测的 180 次上下文打包符合预算；该轮未调用模型，尚无新版本诊断准确率成绩。",
    "flow": [
      "告警 / 任务",
      "证据调查",
      "验证 / 审批",
      "持久化 / 恢复"
    ]
  },
  {
    slug: 'dataset-platform',
    number: '03',
    category: '后端工程',
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
