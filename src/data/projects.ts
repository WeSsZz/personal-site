export const projects = [
  {
    "slug": "enterprise-agent",
    "number": "01",
    "category": "Agent 系统",
    "name": "Enterprise Agent",
    "subtitle": "可恢复的企业知识与运维 Agent",
    "description": "把知识检索、工具权限、执行状态和故障恢复放在同一个 Runtime 中，让一次任务有证据、有边界，也能从中断处继续。",
    "tech": [
      "Python",
      "SQLite",
      "RAG",
      "Agent Runtime"
    ],
    "link": "https://github.com/WeSsZz/AI-Engineer-Roadmap-2026/tree/main/projects/enterprise-agent",
    "label": "系统工程",
    "status": "持续开发",
    "challenge": "多步 Agent 任务不仅需要给出回答，还需要保存执行状态、处理工具故障，并避免重复执行写操作。",
    "decisions": [
      [
        "持久化执行",
        "用 Task Snapshot、Event Log 与 checkpoint 记录任务生命周期，并支持进程重启后的恢复。"
      ],
      [
        "受控工具调用",
        "通过 Tool Gateway 验证参数、租户范围和权限，对写操作绑定幂等键。"
      ],
      [
        "检索与评测",
        "将检索证据、Working Memory 和 Trace 接入统一评测，比较工作流与 Agent 的实际行为。"
      ]
    ],
    "outcome": "已建立可运行的确定性基线、故障注入与评测入口。检索、恢复和安全行为有独立测试，运行方法与结果保存在项目文档中。",
    "flow": [
      "Task",
      "Tool Gateway",
      "Evidence",
      "Checkpoint"
    ]
  },
  {
    "slug": "coding-agent-rl-lab",
    "number": "02",
    "category": "模型与评测",
    "name": "Coding Agent RL Lab",
    "subtitle": "代码修复 Agent 的执行与学习实验",
    "description": "围绕真实仓库任务构建隔离执行、工具交互、可执行 Verifier 与训练链路，用真实测试区分工具调用成功和任务修复成功。",
    "tech": [
      "Python",
      "Docker",
      "PyTorch",
      "LoRA",
      "SWE-Gym"
    ],
    "link": "https://github.com/WeSsZz/coding-agent-rl-lab",
    "label": "实验与验证",
    "status": "实验阶段",
    "challenge": "模型生成了补丁，并不代表问题得到修复。训练奖励、交互轨迹和独立测试结果必须能够准确关联。",
    "decisions": [
      [
        "隔离任务环境",
        "在固定仓库快照和容器环境中运行任务，区分基础设施失败与模型行为失败。"
      ],
      [
        "可执行判定",
        "以测试和独立 Verifier 判断结果，将有效编辑、回归失败与任务成功分别记录。"
      ],
      [
        "可追溯训练",
        "记录策略版本、工具反馈和评测条件，保持训练数据与评测任务的边界。"
      ]
    ],
    "outcome": "已完成工具交互、训练基础设施和受控诊断实验；目前尚未证明在线策略更新能提高完整任务修复率。实验结论以仓库中的评测记录为准。",
    "flow": [
      "Issue",
      "Rollout",
      "Verifier",
      "Reward"
    ]
  },
  {
    "slug": "lora-finetune-agent",
    "number": "03",
    "category": "模型与评测",
    "name": "LoRA Fine-tune Agent",
    "subtitle": "将微调流程组织成可管理任务",
    "description": "将数据验证、配置生成、训练、监控、评估和导出组织成 Agent 工作流，通过 API 与命令行管理微调任务。",
    "tech": [
      "FastAPI",
      "PEFT",
      "TRL",
      "Qwen",
      "LoRA"
    ],
    "link": "https://github.com/WeSsZz/lora-finetune-agent",
    "label": "训练工具",
    "status": "项目原型",
    "challenge": "模型微调涉及数据、配置、运行状态与输出管理，分散的脚本难以对任务进度和失败原因形成完整视图。",
    "decisions": [
      [
        "统一任务入口",
        "用 REST API 和 CLI 创建、启动并查询训练任务。"
      ],
      [
        "配置与数据检查",
        "提供 Qwen 配置模板和数据验证工具，将准备步骤与训练执行分开。"
      ],
      [
        "监控与导出",
        "组织训练状态、loss 与模型导出接口，方便检查一次微调任务的过程。"
      ]
    ],
    "outcome": "提供任务、数据集和模型测试接口，以及本地启动说明。模型效果和资源需求需在具体数据与硬件上验证。",
    "flow": [
      "Dataset",
      "Config",
      "Training",
      "Export"
    ]
  },
  {
    "slug": "personal-site",
    "number": "04",
    "category": "Web 与后端",
    "name": "Personal Site",
    "subtitle": "内容优先的个人作品集",
    "description": "用 Astro 将个人资料、公开项目与文章组织成静态网站，关注清晰表达、移动端体验和可持续维护。",
    "tech": [
      "Astro",
      "TypeScript",
      "CSS",
      "GitHub Pages"
    ],
    "link": "https://github.com/WeSsZz/personal-site",
    "label": "Web 开发",
    "status": "持续维护",
    "challenge": "让访问者快速了解研究和工程方向，也能进一步查看项目实现、技术取舍与经历。",
    "decisions": [
      [
        "集中维护内容",
        "用结构化数据维护个人资料与项目，用 Markdown 管理文章。"
      ],
      [
        "轻量交互",
        "页面输出静态 HTML，仅为导航、主题与内容筛选加载必要脚本。"
      ],
      [
        "自动部署",
        "通过 GitHub Actions 构建并发布到 GitHub Pages，统一处理子目录路径。"
      ]
    ],
    "outcome": "提供项目详情、文章搜索、深浅主题、移动导航和打印版经历页面。",
    "flow": [
      "Content",
      "Astro",
      "Static HTML",
      "Pages"
    ]
  }
];
export type Project = typeof projects[number];
