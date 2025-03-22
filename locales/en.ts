export default {
  overview: {
    title: 'AI Chatbot Assistant',
    description:
      'Experience seamless conversations with our AI assistant. Powered by advanced language models, it understands context, provides helpful responses, and makes your digital interactions more intuitive.',
  },
  messageReasoning: {
    title: 'Reasoning',
    reasoned: 'Reasoned for a few seconds',
  },
  messageActions: {
    copy: 'Copy',
    upvoteResponse: 'Upvote Response',
    downvoteResponse: 'Downvote Response',
    noTextToCopy: "There's no text to copy!",
    copiedToClipboard: 'Copied to clipboard!',
    upvoting: 'Upvoting Response...',
    upvoted: 'Upvoted Response!',
    upvoteError: 'Failed to upvote response.',
    downvoting: 'Downvoting Response...',
    downvoted: 'Downvoted Response!',
    downvoteError: 'Failed to downvote response.',
  },
  auth: {
    signIn: {
      title: 'Sign In',
      description: 'Use your email and password to sign in',
      button: 'Sign in',
      noAccount: "Don't have an account?",
      signUpLink: 'Sign up',
      signUpText: 'for free.',
      errors: {
        invalidCredentials: 'Invalid credentials!',
        invalidData: 'Failed validating your submission!',
      },
    },
    signUp: {
      title: 'Sign Up',
      description: 'Create an account with your email and password',
      button: 'Sign up',
      haveAccount: 'Already have an account?',
      signInLink: 'Sign in',
      signInText: 'instead.',
      errors: {
        userExists: 'Account already exists!',
        createFailed: 'Failed to create account!',
        invalidData: 'Failed validating your submission!',
      },
      success: 'Account created successfully!',
    },
    form: {
      email: {
        label: 'Email Address',
        placeholder: 'user@acme.com',
      },
      password: {
        label: 'Password',
      },
    },
  },
  common: {
    signOut: 'Sign out',
    theme: 'Toggle {mode} mode',
    dark: 'dark',
    light: 'light',
    sidebarTitle: 'Chatbot',
    sidebarToggle: 'Toggle Sidebar',
  },
  visibility: {
    private: 'Private',
    public: 'Public',
    privateDescription: 'Only you can access this chat',
    publicDescription: 'Anyone with the link can access this chat',
  },
  suggestedActions: {
    nextjs: {
      title: 'What are the advantages',
      label: 'of using Next.js?',
      action: 'What are the advantages of using Next.js?',
    },
    dijkstra: {
      title: 'Write code to',
      label: "demonstrate dijkstra's algorithm",
      action: "Write code to demonstrate dijkstra's algorithm",
    },
    essay: {
      title: 'Help me write an essay',
      label: 'about silicon valley',
      action: 'Help me write an essay about silicon valley',
    },
    weather: {
      title: 'What is the weather',
      label: 'in San Francisco?',
      action: 'What is the weather in San Francisco?',
    },
  },
  chat: {
    newChat: 'New Chat',
    deleteChat: 'Delete Chat',
    share: 'Share',
    model: 'Model',
    send: 'Send',
    stop: 'Stop',
    input: {
      placeholder: 'Send a message...',
      uploadError: 'Failed to upload file, please try again!',
      waitModelResponse: 'Please wait for the model to finish its response!',
    },
    visibility: {
      private: 'Private',
      public: 'Public',
    },
    history: {
      login: 'Login to save and revisit previous chats!',
      empty: 'Your conversations will appear here once you start chatting!',
      today: 'Today',
      yesterday: 'Yesterday',
      last7days: 'Last 7 days',
      last30days: 'Last 30 days',
      older: 'Older',
      more: 'More',
      share: 'Share',
      private: 'Private',
      public: 'Public',
      delete: 'Delete',
    },
    delete: {
      title: 'Are you absolutely sure?',
      description:
        'This action cannot be undone. This will permanently delete your chat and remove it from our servers.',
      cancel: 'Cancel',
      continue: 'Continue',
      loading: 'Deleting chat...',
      success: 'Chat deleted successfully',
      error: 'Failed to delete chat',
    },
  },
  messages: {
    edit_message: 'Edit message',
    thinking: 'Hmm...',
  },
  document: {
    actions: {
      create: {
        present: 'Creating',
        past: 'Created',
      },
      update: {
        present: 'Updating',
        past: 'Updated',
      },
      requestSuggestions: {
        present: 'Adding suggestions',
        past: 'Added suggestions to',
      },
    },
    errors: {
      viewingShared:
        'Viewing files in shared chats is currently not supported.',
    },
  },
  map: {
    loading: 'Loading map...',
    errors: {
      loadFailed: 'Map loading failed',
      scriptFailed: 'Failed to load map script',
      timeout: 'Waiting for map API timed out',
      containerNotFound: 'Map container not found',
    },
  },
} as const;
