import { socket } from '../components/App/App';

export const emitServerEvent = (event: string, params: any[]) => {
  socket.emit(event, ...params);
};

export const onServerEvent = (event: string, fn: any) => {
  socket.on(event, fn);
};
