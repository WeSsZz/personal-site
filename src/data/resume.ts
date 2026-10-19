// 后端实习在此处维护；经历页与项目详情共用这一份内容。
export const backendInternship = {
  company: '中电鸿信信息科技有限公司',
  role: '后端开发实习生',
  period: '2026.03 - 2026.06',
  projectName: '高质量数据集平台',
  description: '参与高质量数据集平台的采集任务管理、调度与审批链路开发，将任务配置、执行状态和跨服务回调串成可追溯的业务流程。',
  tech: ['SeaTunnel', 'Quartz', 'JSON 配置', '分布式锁'],
  highlights: [
    ['文件传输', '基于 MinIO Multipart Upload 实现分片上传、断点续传及基于 ETag 的分片合并，持久化上传会话和分片状态，支持查询进度后补传缺失分片。'],
    ['任务管理', '负责采集任务配置与生命周期管理，完成创建、批量启停、检索及执行记录查询等 14 个接口；以 JSON存储链路、调度及纳管配置，支持增量合并、历史快照与变更追溯。'],
    ['审批集成', '实现服务登记与案例的事务性保存，通过 Feign 对接工作流，以业务主键关联流程实例并回填审批结果；结合状态约束和租户校验限制非法修改。'],
    ['源码学习', '阅读团队 SeaTunnel 执行器工厂、模板方法及作业模板生成与异步轮询链路；梳理 Quartz 策略调度、任务注册/注销，以及增量游标、回溯窗口和失败回滚机制。']
  ] as [string, string][],
  outcome: '完成MinIO分片上传、断点续传，完成14 个任务管理接口，并参与采集执行、调度追溯和审批一致性链路。此处仅展示简历中的职责摘要，公司代码与内部数据不公开。',
  flow: ['任务配置', '审批回调', '调度执行', '状态追溯'],
};

export const resume = {
  name: '周骏炜',
  title: 'LLM Agent 算法 / 工程',
  introduction: [
    '我目前在香港中文大学攻读人工智能（科学应用）硕士，本科就读于南京邮电大学数据科学与大数据技术专业。',
    '最近主要在做两个 Agent 项目：一套用于企业运维调查的执行框架，以及购物 Agent 的 SFT / GRPO 后训练实验。我关注模型如何使用工具、管理上下文，以及如何从执行轨迹中得到可靠的训练信号。',
  ],
  tagline:
    '香港中文大学人工智能硕士在读，寻求 LLM Agent 算法 / 工程实习。聚焦 Agent Harness、Context Engineering 与 Agentic RL 后训练，当前实践包括企业调查 Runtime 和购物 Agent 的训练、轨迹适配与执行协议对齐。',
  email: '13506237957@163.com',
  phone: '13506237957',
  github: 'https://github.com/WeSsZz',
  linkedin: '',
  location: '深圳 / 香港',

  about:
    '我是周骏炜，香港中文大学人工智能（科学应用）硕士在读，本科毕业于南京邮电大学数据科学与大数据技术专业（GPA 3.75/5.0）。希望从事 LLM Agent 算法 / 工程工作，重点研究 Agent 的执行控制、上下文组织与后训练反馈。企业项目中，我实现自适应 Harness、记忆与可恢复 Runtime；购物项目中，我在 SFT / GRPO 复现基础上推进 Pi + slime 接入、生成概率审计和执行协议对齐。',

  education: [
    {
      school: '香港中文大学',
      degree: '人工智能（科学应用）硕士',
      period: '2026.09 - 2028.03',
      description: '专注人工智能科学应用方向，深入研究大模型应用与 Agent 系统。',
    },
    {
      school: '南京邮电大学',
      degree: '数据科学与大数据技术 本科 · GPA 3.75/5.0',
      period: '2022.09 - 2026.06',
      description: '主修数据科学、大数据技术与计算机基础课程。',
    },
  ],

  experience: [backendInternship],

  skills: {
    harness: ['Adaptive Harness', 'Agent Loop', 'Tool Contract', 'Checkpoint / Resume', 'Trace / Eval'],
    context: ['Context Engineering', 'Working / Episodic Memory', 'Observation Projection', 'Context Budget', 'RAG'],
    postTraining: ['LoRA SFT', 'GRPO', 'Pi + slime', 'veRL', 'vLLM / SGLang', 'Token / Logprob Audit'],
    foundation: ['Python', 'PyTorch', 'SQLite', 'Docker', 'Linux', 'Git'],
    languages: ['Java', 'Python', 'SQL'],
    backend: ['Spring Boot', 'MySQL', 'Redis', 'Kafka', 'MyBatis-Plus'],
    ai: ['LoRA SFT', 'GRPO DPO', 'vLLM', 'Harness', 'Working / Episodic Memory', 'Context Engineering', 'LangChain/LangGraph', 'RAG', 'Agent Loop'],
    tools: ['Git', 'Docker', 'Linux', 'Codex/ClaudeCode/DSH'],
  },
  // 没有论文时保留空列表 []，不要删除字段或改成 {}。
  publications: [] as { title: string; venue: string; isbn: string }[],
  awards: [
    {
      title: '全国大学生数学建模竞赛 国家级二等奖',
      date: '2024.11',
    },
  ],
};
