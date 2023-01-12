import { game } from "./game.js";

document.getElementById("play-button").addEventListener("click", () => {
  document.querySelector("body").innerHTML = "";

  game();
});
