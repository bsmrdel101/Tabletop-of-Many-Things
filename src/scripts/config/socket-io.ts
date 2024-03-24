import { io, Socket } from "socket.io-client";

const getUrl = () => {
  if (window.location.host === 'localhost:3000') {
    return 'http://localhost:3000';
  } else if (window.location.host === 'tabletop-of-many-things.up.railway.app') {
    return 'https://tabletop-of-many-things.up.railway.app';
  } else {
    return 'https://www.tabletop-of-many-things.com';
  }
};
export const socket: Socket = io(getUrl(), {
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
