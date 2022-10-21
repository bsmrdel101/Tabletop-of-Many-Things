import { io, Socket } from "socket.io-client";
export const socket: Socket = io();

export const emitServerEvent = (event: string, params: any[]) => {
    socket.emit(event, ...params);
};

export const onServerEvent = (event: string, fn: any) => {
    socket.on(event, fn);
};
