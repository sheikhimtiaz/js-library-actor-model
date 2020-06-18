import Actor from "actor-model";
import EventEmitter from "events";

const mailbox = new EventEmitter();

// Binding listeners to custom events
mailbox.on("channel-name", message => {
  console.log(message);
});

// Firing custom events: the second argument
// is sent to the callback function
mailbox.emit("channel-name", "hello!");

// Define a behavior to handle messages
const counter = {
  // Define the initial state of the actor
  init() {
    return { count: 0 };
  },

  // Define methods to be invoked in response
  // to messages

  incrementBy(state, { number }) {
    let count = state.count + number;
    return { count };
  },

  logTotal(state) {
    console.log(state.count);
  }
};

// Initialize an actor with the `counter` behavior
const address = Actor.start(counter);

// Log the initial state
Actor.send(address, ["logTotal"]); // => { count: 0 }

// Increment the counter by 2
Actor.send(address, ["incrementBy", { number: 2 }]);

// Log the current state
Actor.send(address, ["logTotal"]); // => { count: 2 }
