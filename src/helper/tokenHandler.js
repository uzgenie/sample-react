export class TokenHandler {
  constructor(name = "token", storageHandler = null) {
    this.name = name;
    this.storageHandler =
      storageHandler === null ? window.localStorage : storageHandler;
  }
  set = value => {
    try {
      this.storageHandler.setItem(this.name, value);
    } catch (error) {
      console.log(error);
    }
  };
  get = () => {
    try {
 
      return window.localStorage.getItem(this.name);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  remove = () => {
    try {
      this.storageHandler.removeItem(this.name);
    } catch (error) {
      console.log(error);
    }
  };
}
