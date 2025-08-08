import { io, Socket } from "socket.io-client";

const getUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://tabletop-of-many-things-server.up.railway.app';
  } else {
    return 'http://localhost:8000';
  }
};

export const socket: Socket = io(getUrl(), {
  transports: ['websocket'],
});

export const emitServerEvent = <T>(event: string, params: T[]) => {
  socket.emit(event, ...params);
};

export const onServerEvent = (event: string, fn: any) => {  
  socket.on(event, fn);
};

export const offServerEvent = (event: string, fn: any) => {
  socket.off(event, fn);
};
