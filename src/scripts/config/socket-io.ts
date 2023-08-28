import { io, Socket } from "socket.io-client";

const url = window.location.host === 'www.tabletop-of-many-things.com' ? 'http://www.tabletop-of-many-things.com' : 'http://localhost:8000';
export const socket: Socket = io(url, {
  transports: ["websocket"],
});

export const emitServerEvent = (event: string, params: any[]) => {
  socket.emit(event, ...params);
};

export const onServerEvent = (event: string, fn: any) => {  
  socket.on(event, fn);
};

export const offServerEvent = (event: string) => {
  socket.off(event);
};
