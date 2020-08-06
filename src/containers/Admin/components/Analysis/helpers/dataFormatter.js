export class JsonHelper {
  setValueAT = (json, to, value) => {
    let currentFind = to.pop();
    let obj = json[currentFind] === undefined ? null : json[currentFind];

    if (!obj && to.length > 0) {
      json[currentFind] = {};
    }

    if (to.length === 0) {
      json[currentFind] = value;
      return;
    }

    return this.setValueAT(json[currentFind], to, value);
  };

  getValueAT = (json, to) => {
    let currentFind = to.pop();
    let value = json[currentFind] === undefined ? null : json[currentFind];

    if (to.length === 0 || !value) {
      return value;
    }

    return this.getValueAT(value, to);
  };
}
