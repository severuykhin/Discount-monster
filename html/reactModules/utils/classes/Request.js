class Request {
  constructor() {
    this.instance = null;
  }

  send(type, url, data = null) {
    this.instance = new XMLHttpRequest();
    return this._make(type, url, data);

  }

  _make(type, url, data) {
    return new Promise((resolve, reject) => {
      this.instance.open(type, url);

      this.instance.onload = function () {
        if (this.status === 200) {
          resolve(this.responseText);
        } else {
          reject(this.responseText);
        }
      }

      this.instance.onerror = function () {
        reject();
      }

      this.instance.send(data);
    });
  }
}

export default Request;
