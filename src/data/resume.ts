export const resume = {
  name: '周骏炜',
  title: '后端开发 / Agent 开发',
  tagline:
    '香港中文大学人工智能硕士在读，南京邮电大学本科。专注高并发后端系统与 AI Agent 应用开发，熟悉 Java 生态、Redis、Kafka、SpringAI 与 RAG 技术栈。',
  email: '13506237957@163.com',
  phone: '13506237957',
  github: '',
  linkedin: '',
  location: '南京 / 香港',

  about:
    '我是周骏炜，香港中文大学人工智能（科学应用）硕士在读，本科毕业于南京邮电大学数据科学与大数据技术专业（GPA 3.75/5.0）。我主攻后端开发与 AI Agent 应用，有电商秒杀、AI 客服、金融量化模型等完整项目经验，也发表过 EI 会议论文并获数学建模国赛二等奖。我希望在实习中继续打磨工程能力，把 AI 技术与真实业务场景结合起来。',

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

  experience: [
    {
      company: '江苏常熟农村商业银行',
      role: '金融科技实习生',
      period: '2025.07 - 2025.08',
      description:
        '基于 Mamba 构建债券收益率预测模型。对 2015–2025 年 10 年期国债数据构建 90 天滑动窗口特征序列；设计“特征提取层 + 双任务输出头（回归 + 分类）”架构，引入 PReLU 激活函数。优化数据预处理流程使 I/O 速度提升约 40%；结合 Optuna 贝叶斯超参数搜索与早停机制，训练效率提升约 50%；滚动回测最终预测准确率达 68%，较基线提升 13 个百分点。',
    },
  ],

  projects: [
    {
      name: '生活志评',
      description:
        '基于 SpringBoot 的前后端分离本地生活服务平台，涵盖短信登录、商家信息查询、秒杀优惠券等模块。重点实现秒杀库存扣减、多级缓存架构与缓存一致性方案。',
      tech: ['Spring Boot', 'MySQL', 'Redis', 'Kafka', 'Lua', 'Caffeine', 'MyBatis-Plus'],
      link: '',
      demo: '',
    },
    {
      name: '智能 AI 客服',
      description:
        '面向团队真实痛点的智能 AI 客服系统，整合知识库问答、实时对话、AI Ops 三大核心能力，实现问题自动应答与故障智能排查，降低人力成本。',
      tech: ['Spring Boot', 'SpringAI-Alibaba', 'RAG', 'ReAct', 'Plan-Executor', 'Multi-Agent', 'MCP'],
      link: '',
      demo: '',
    },
    {
      name: '基于 Mamba 的债券收益率预测模型',
      description:
        '金融实习期间完成的量化预测项目。使用 10 年期国债历史数据构建长序列预测模型，通过 Optuna 超参搜索与滚动回测，将预测准确率提升至 68%。',
      tech: ['Python', 'PyTorch', 'Mamba', 'Optuna'],
      link: '',
      demo: '',
    },
  ],

  skills: {
    languages: ['Java', 'Python', 'SQL'],
    backend: ['Spring Boot', 'MySQL', 'Redis', 'Kafka', 'MyBatis-Plus'],
    ai: ['SpringAI-Alibaba', 'RAG', 'MCP', 'Multi-Agent', 'Prompt Engineering'],
    tools: ['Git', 'Docker', 'Linux', 'Cursor / Codex'],
  },

  publications: [
    {
      title:
        'A Sampling Detection Framework Incorporating Monte Carlo Simulation and Simulated Annealing Algorithms',
      venue: '2025 3rd International Conference on Mechatronics, IoT and Industrial Informatics (ICMIII 2025)',
      isbn: '979-8-3315-9463-3',
    },
  ],

  awards: [
    {
      title: '全国大学生数学建模竞赛 国家级二等奖',
      date: '2024.11',
    },
  ],
};
