class Socket {
  static sendToUser(userId, type, data) {
    socketIO.sockets.emit(userId, {
      type,
      data,
    });
  }
}

export default Socket;
