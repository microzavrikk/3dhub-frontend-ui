const getProtocol = (port: string): string => {
  switch (port) {
    case '80':
      return 'http:';
    case '443':
      return 'https:';
    default:
      return window.location.protocol;
  }
};

declare const window: any;

export const BaseHOSTHttp = (() => {
  const isDev = import.meta.env.MODE === 'development';
  if (isDev) {
    const url = import.meta.env.VITE_API_URL;
    if (typeof url !== 'string') {
      throw new Error('Invalid api url');
    }

    return url;
  }

  const win: any = window;

  const port = win.BACKEND_PORT ?? window.location.port;
  const hostname = win.BACKEND_HOST ?? window.location.hostname;
  const protocol = getProtocol(String(port));

  return port === '0' ? `${protocol}//${hostname}` : `${protocol}//${hostname}:${port}`;
})();

export const BaseHOSTWs = (() => BaseHOSTHttp.replace('http', 'ws'))();