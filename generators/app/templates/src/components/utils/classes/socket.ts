export abstract class SocketIO {
    private __socket: SocketIO.Socket;

    constructor(__socket: SocketIO.Socket) {
        this.__socket = __socket;
    }

    get socket() {
        return this.__socket;
    }

    abstract async save(doc);
    abstract async remove(doc);
}