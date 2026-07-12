import "dotenv/config";
import { Centrifuge } from "centrifuge";

const url = process.env.CENTRIFUGO_URL!;
const token = process.env.CENTRIFUGO_TOKEN!;
const channel = process.env.CENTRIFUGO_CHANNEL!;

console.log("URL:", url);
console.log("CHANNEL:", channel);
console.log("TOKEN:", token.slice(0, 20));

const centrifuge = new Centrifuge(url, {
  token,
});

centrifuge.on("connecting", (ctx) => {
  console.log("connecting", ctx);
});

centrifuge.on("connected", (ctx) => {
  console.log("connected", ctx);
});

centrifuge.on("disconnected", (ctx) => {
  console.log("disconnected", ctx);
});

centrifuge.on("error", (ctx) => {
  console.log("error", ctx);
});

const sub = centrifuge.newSubscription(channel);

sub.on("subscribing", (ctx) => {
  console.log("subscribing", ctx);
});

sub.on("subscribed", (ctx) => {
  console.log("SUBSCRIBED", ctx);

  centrifuge.publish(channel, {
    text: "hello"
  })
  .then(() => console.log("publish OK"))
  .catch(err => console.log("publish error", err));
});

sub.on("error", (ctx) => {
  console.log("sub error", ctx);
});

sub.subscribe();

centrifuge.connect();

setTimeout(() => {
  console.log("exit");
  sub.unsubscribe();
  centrifuge.disconnect();
  process.exit(0);
}, 10000);