export const resume = {
  name: '你的名字',
  title: '后端 / 算法 / 全栈方向实习生',
  tagline: '热爱用代码解决真实问题，关注性能、可维护性与用户体验。',
  email: 'your.email@example.com',
  github: 'https://github.com/yourname',
  linkedin: '',
  location: '中国 · 城市',

  about:
    '这里是你的个人简介。可以写你的专业、兴趣、擅长方向、求职意向等。建议控制在 3-5 行，突出和应聘岗位相关的亮点。',

  education: [
    {
      school: 'XX 大学',
      degree: '计算机科学与技术 / 软件工程 本科',
      period: '2022.09 - 2026.06',
      description: '主修课程：数据结构、操作系统、计算机网络、数据库原理等。绩点 / 排名（可选）。',
    },
  ],

  experience: [
    {
      company: 'XX 公司',
      role: '后端开发实习生',
      period: '2025.06 - 至今',
      description:
        '参与 XX 系统的设计与开发，负责 RESTful API 设计、数据库优化、单元测试等；通过引入缓存将核心接口响应时间降低 40%。',
    },
    {
      company: '校内实验室 / 课题组',
      role: '研究助理',
      period: '2024.03 - 2025.05',
      description: '参与 XX 算法研究，使用 Python 进行数据清洗与模型训练，相关成果发表于 XX 会议/期刊（可选）。',
    },
  ],

  projects: [
    {
      name: '分布式任务调度平台',
      description:
        '基于 Spring Boot + Redis 实现的轻量级任务调度系统，支持任务分片、失败重试、可视化监控面板。',
      tech: ['Java', 'Spring Boot', 'Redis', 'MySQL', 'Vue'],
      link: 'https://github.com/yourname/project-a',
      demo: '',
    },
    {
      name: '个人博客与作品集网站',
      description:
        '使用 Astro + Tailwind CSS 构建的静态网站，支持 Markdown 博客、深色模式、响应式布局，用于实习与求职展示。',
      tech: ['Astro', 'Tailwind CSS', 'TypeScript'],
      link: 'https://github.com/yourname/personal-site',
      demo: 'https://your-domain.com',
    },
    {
      name: '算法可视化工具',
      description:
        '用 React + TypeScript 开发的排序与图算法可视化页面，帮助低年级同学理解算法执行过程。',
      tech: ['React', 'TypeScript', 'Vite'],
      link: 'https://github.com/yourname/algo-visualizer',
      demo: '',
    },
  ],

  skills: {
    languages: ['Java', 'Python', 'TypeScript', 'SQL'],
    backend: ['Spring Boot', 'MyBatis', 'Redis', 'RabbitMQ'],
    frontend: ['React', 'Vue', 'Tailwind CSS'],
    tools: ['Git', 'Docker', 'Linux', 'CI/CD'],
  },
};
