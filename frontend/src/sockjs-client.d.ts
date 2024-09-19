declare module 'sockjs-client' {
    interface SockJS {
      new (url: string, _reserved?: any, options?: any): WebSocket;
    }
  
    const SockJS: SockJS;
    export default SockJS;
  }
  