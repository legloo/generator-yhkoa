import { SocketIO } from '../../components/utils';

class IO extends SocketIO {
    async save(doc) {
      this.socket.emit('<%= apiName %>:save', doc);
    }

    async remove(doc) {
      this.socket.emit('<%= apiName %>:remove', doc);
    }
}

export let io: IO;

export function setup(socket: SocketIO.Socket) {
   io = new IO(socket);
}