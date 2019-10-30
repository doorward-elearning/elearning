class Tools {
  static appendPath(path = '', another = '') {
    const first = path.endsWith('/') ? path : `${path}/`;
    const second = another.startsWith('/') ? another.substr(1) : another;

    return first + second;
  }
}

export default Tools;
