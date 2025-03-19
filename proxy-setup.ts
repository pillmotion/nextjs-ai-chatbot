import { ProxyAgent, Dispatcher } from "undici";
const { fetch: originalFetch } = global;

const proxyAgent = new ProxyAgent("http://127.0.0.1:7890/");

// 定义不需要代理的域名
const NO_PROXY_DOMAINS = [
  "localhost:3000/api/"
];

// 定义需要代理的域名
const PROXY_DOMAINS = [
  "openai.com",
  "api.x.ai",
];

global.fetch = (
  url: string | URL | Request,
  opts: RequestInit & { dispatcher?: Dispatcher } = {}
) => {
  const urlStr = url.toString();

  // 排除不需要代理的域名
  if (NO_PROXY_DOMAINS.some(domain => urlStr.includes(domain))) {
    console.log(`🚫 Direct: ${urlStr}`);
    return originalFetch(url, opts);
  }

  // 检查是否需要代理
  if (PROXY_DOMAINS.some(domain => urlStr.includes(domain))) {
    console.log(`🔀 Proxied: ${urlStr}`);
    opts.dispatcher = proxyAgent;
  } else {
    console.log(`⚡ Direct: ${urlStr}`);
  }

  try {
    return originalFetch(url, opts);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};