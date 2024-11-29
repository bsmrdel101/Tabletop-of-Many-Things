import { io, Socket } from "socket.io-client";

const getUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://tabletop-of-many-things-server.up.railway.app';
  } else {
    return 'http://localhost:8000';
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
