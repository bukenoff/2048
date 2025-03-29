import "./style.css";
import { Board } from "./board";
import { Renderer } from "./renderer";

window.addEventListener("load", () => {
  const board = new Board();
  board.init();

  const renderer = new Renderer(board);
  renderer.init();
});
