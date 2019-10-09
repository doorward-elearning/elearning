
class Tools {

  static randomString(length = 6): string{
    return `${Math.random()}`.substr(2, length);
  }
}

export default Tools;
