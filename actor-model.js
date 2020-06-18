import EventEmitter from "events";

const mailbox = new EventEmitter();

const Actor = {
  start(behavior) {
    const address = Symbol();
    let state = typeof behavior.init === "function" ? behavior.init() : {};

    mailbox.on(address, function([method, message]) {
      state = behavior[method](state, message) || state;
    });

    return address;
  },

  send(target, message) {
    mailbox.emit(target, message);
  }
};

export default Actor;