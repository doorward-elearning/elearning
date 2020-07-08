class Socket {
  static send(users, type, data) {
    if (users) {
      if (users === '*') {
        return Socket.all(type, data);
      }
      if (users.length) {
        return users.map(({ id }) => {
          Socket.room(id, type, data);
          return id;
        });
      }
    }
  }

  static all(type, data) {
    socketIO.sockets.emit(type, data);
  }

  static room(roomId, type, data) {
    socketIO.to(roomId).emit(type, data);
  }
}

export default Socket;
