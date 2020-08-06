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

export const insertParam = (main, value) => {
  window.location.hash = "analysis/"+main+"/"+value;
};

export const currentlyActiveTabFromURL = () => {
    let hash  =  window.location.hash;
    hash  = hash.replace("#/analysis/","");
    hash  = hash.replace("#/analysis","");
    if(hash === "")
    return [];

    hash = hash.split("/");
    
    return hash
};
