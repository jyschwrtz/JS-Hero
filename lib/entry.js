import setup from './world';

document.addEventListener("DOMContentLoaded", () => {
  setup();
  
});


// document.addEventListener("DOMContentLoaded", () => {
//
//   const canvasEl = document.getElementById("canvas");
//   console.log(canvasEl);
//   canvasEl.width = "100%";
//   canvasEl.height = "100%";
//
//   const ctx = canvasEl.getContext("2d");
//   ctx.clearRect(0, 0, 500, 500);
//   ctx.fillStyle = 'blue';
//   ctx.fillRect(10, 10, 400, 400);
//   console.log(document);
//   const rootEl = document.getElementById("root");
//   const newH1 = document.createElement("h1");
//   console.log(newH1);
//   const text = document.createTextNode("Hi");
//   newH1.appendChild(text);
//   rootEl.appendChild(newH1);
// });
