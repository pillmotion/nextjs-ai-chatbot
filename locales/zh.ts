export default {
  auth: {
    signIn: {
      title: '登录',
      description: '使用邮箱和密码登录',
      button: '登录',
      noAccount: '还没有账号？',
      signUpLink: '注册',
      signUpText: '一个免费账号。',
      errors: {
        invalidCredentials: '账号或密码错误！',
        invalidData: '表单验证失败！',
      },
    },
    signUp: {
      title: '注册',
      description: '创建一个新账号',
      button: '注册',
      haveAccount: '已有账号？',
      signInLink: '登录',
      signInText: '现有账号。',
      errors: {
        userExists: '账号已存在！',
        createFailed: '创建账号失败！',
        invalidData: '表单验证失败！',
      },
      success: '账号创建成功！',
    },
    form: {
      email: {
        label: '邮箱地址',
        placeholder: 'user@acme.com',
      },
      password: {
        label: '密码',
      },
    },
  },
  common: {
    signOut: '退出登录',
    theme: '切换{mode}模式',
    dark: '深色',
    light: '浅色',
    sidebarTitle: '聊天机器人',
    sidebarToggle: '切换侧边栏',
  },
  visibility: {
    private: '私密',
    public: '公开',
    privateDescription: '只有您可以访问此聊天',
    publicDescription: '任何有链接的人都可以访问此聊天',
  },
  suggestedActions: {
    nextjs: {
      title: '使用 Next.js',
      label: '有哪些优势？',
      action: '使用 Next.js 有哪些优势？',
    },
    dijkstra: {
      title: '编写代码',
      label: '演示 Dijkstra 算法',
      action: '请编写代码演示 Dijkstra 算法',
    },
    essay: {
      title: '帮我写一篇关于',
      label: '硅谷的文章',
      action: '帮我写一篇关于硅谷的文章',
    },
    weather: {
      title: '旧金山的天气',
      label: '怎么样？',
      action: '旧金山现在的天气怎么样？',
    },
  },
  chat: {
    newChat: '新建聊天',
    deleteChat: '删除聊天',
    share: '分享',
    model: '模型',
    send: '发送',
    stop: '停止',
    input: {
      placeholder: '发送消息...',
      uploadError: '文件上传失败，请重试！',
      waitModelResponse: '请等待模型完成响应！',
    },
    visibility: {
      private: '私密',
      public: '公开',
    },
    history: {
      login: '登录以保存并重访之前的聊天！',
      empty: '开始聊天后，您的对话将显示在这里！',
      today: '今天',
      yesterday: '昨天',
      last7days: '最近7天',
      last30days: '最近30天',
      older: '更早',
    },
    delete: {
      title: '您确定要删除吗？',
      description:
        '此操作无法撤销。这将永久删除您的聊天记录并从我们的服务器中移除。',
      cancel: '取消',
      continue: '继续',
    },
  },
} as const;
