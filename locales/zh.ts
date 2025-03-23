export default {
  overview: {
    title: 'AI 聊天机器人助手',
    description:
      '体验与我们的 AI 助手的无缝对话。由先进的语言模型提供支持，它能理解上下文，提供有用的回答，使您的数字交互更加直观。',
  },
  messageReasoning: {
    title: '推理过程',
    reasoned: '思考了几秒钟',
  },
  messageActions: {
    copy: '复制',
    upvoteResponse: '赞同回答',
    downvoteResponse: '不赞同回答',
    noTextToCopy: '没有可复制的文本！',
    copiedToClipboard: '已复制到剪贴板！',
    upvoting: '正在赞同回答...',
    upvoted: '已赞同回答！',
    upvoteError: '赞同回答失败。',
    downvoting: '正在不赞同回答...',
    downvoted: '已不赞同回答！',
    downvoteError: '不赞同回答失败。',
  },
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
      title: '莲都区的天气',
      label: '怎么样？',
      action: '莲都区现在的天气怎么样？',
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
      more: '更多',
      share: '分享',
      private: '私密',
      public: '公开',
      delete: '删除',
    },
    delete: {
      title: '您确定要删除吗？',
      description:
        '此操作无法撤销。这将永久删除您的聊天记录并从我们的服务器中移除。',
      cancel: '取消',
      continue: '继续',
      loading: '正在删除聊天...',
      success: '聊天已删除成功',
      error: '删除聊天失败',
    },
  },
  messages: {
    edit_message: '编辑消息',
    thinking: '思考中...',
  },
  document: {
    actions: {
      create: {
        present: '正在创建',
        past: '已创建',
      },
      update: {
        present: '正在更新',
        past: '已更新',
      },
      requestSuggestions: {
        present: '正在添加建议',
        past: '已添加建议到',
      },
    },
    errors: {
      viewingShared: '目前不支持在共享聊天中查看文件。',
    },
  },
  map: {
    loading: '加载地图中...',
    errors: {
      loadFailed: '地图加载失败',
      scriptFailed: '地图脚本加载失败',
      timeout: '等待地图API超时',
      containerNotFound: '地图容器不存在',
    },
  },
  versionFooter: {
    viewingPrevious: '您正在查看之前的版本',
    restoreToEdit: '恢复此版本以进行编辑',
    restore: '恢复此版本',
    backToLatest: '返回最新版本',
  },
  artifact: {
    errors: {
      definitionNotFound: '未找到构件定义！',
    },
    status: {
      savingChanges: '正在保存更改...',
      updated: '更新于 {timestamp}',
    },
  },
} as const;
