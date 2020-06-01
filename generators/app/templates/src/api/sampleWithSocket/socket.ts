import { SocketIO } from '../../components/utils';

class IO extends SocketIO {
    async save(doc) {
      this.socket.emit('sample:save', doc);
    }

    async remove(doc) {
      this.socket.emit('sample:remove', doc);
    }
}

export let io: IO;

export function setup(socket: SocketIO.Socket) {
   io = new IO(socket);
}