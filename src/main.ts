import "./style.css";
import { Board } from "./board";
import type { Direction } from "./types";

const board = new Board();
board.init();

const transitions = board.move("left");

console.log("board is", board);
console.log("transitions are", transitions);

let canvas: HTMLCanvasElement | null = null;

function initCanvas(): CanvasRenderingContext2D {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;

  if (!canvas) {
    throw new Error("No cavas found in the page");
  }

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not initialize rendering context");
  }

  context.fillStyle = "rgb(187, 173, 160)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  return context;
}

const BLOCK_WIDTH = 80;
const BLOCK_HEIGHT = 80;
const SPEED = 20;

function drawBlocks(ctx: CanvasRenderingContext2D) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < 4; i++) {
    x = 0;
    y = 5 * i + BLOCK_WIDTH * i + 5;

    for (let j = 0; j < 4; j++) {
      x += 5;
      ctx.fillStyle = "rgba(238, 228, 218, 0.35)";
      if (board.value[i][j].value) {
        ctx.fillStyle = "red";
      }
      ctx.fillRect(x, y, BLOCK_WIDTH, BLOCK_HEIGHT);
      x += BLOCK_WIDTH;
    }
    console.log("y is", y);
  }
}

const myChanges = [
  {
    moves: [{ start: 0, end: 3 }],
  },
  null,
  null,
  null,
];

function redrawBoard(ctx: CanvasRenderingContext2D) {
  if (!canvas) {
    throw new Error("Could not locate canvas");
  }
  //ctx.fillStyle = "rgb(187, 173, 160)";
  //// Draw vertical lines
  //ctx.fillRect(90, 0, 5, canvas.height);
  //ctx.fillRect(175, 0, 5, canvas.height);
  //ctx.fillRect(260, 0, 5, canvas.height);
  //// Draw horizontal lines
  //ctx.fillRect(0, 90, 5, canvas.width);
  //ctx.fillRect(0, 175, 5, canvas.width);
  //ctx.fillRect(0, 260, 5, canvas.width);
  ctx.fillStyle = "rgb(187, 173, 160)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveCell(
  ctx: CanvasRenderingContext2D,
  start: number,
  end: number,
  index: number
) {
  let xStart = start;
  let xEnd = end;

  if (xStart < xEnd) {
    redrawBoard(ctx);
    ctx.clearRect(xStart + 5, 5, BLOCK_WIDTH, BLOCK_HEIGHT);
    xStart += SPEED;

    ctx.fillStyle = "rgba(238, 228, 218, 0.35)";
    ctx.fillRect(10, (index + 1) * 5, xStart + BLOCK_WIDTH, BLOCK_HEIGHT);

    ctx.fillStyle = "red";
    ctx.fillRect(xStart + 5, (index + 1) * 5, BLOCK_WIDTH, BLOCK_HEIGHT);
    requestAnimationFrame(() => moveCell(ctx, xStart, xEnd, index));
  }
}

function move(
  ctx: CanvasRenderingContext2D,
  direction: Direction,
  changes: any
) {
  switch (direction) {
    case "up":
      break;
    case "right":
      changes.forEach((change: any, index: number) => {
        if (!change) return;

        change.moves.forEach(({ start, end }: any) => {
          let xStart = start * BLOCK_WIDTH + start * 5;
          let xEnd = end * BLOCK_WIDTH + end * 5 + 5;
          console.log("xStart:", xStart);
          console.log("xEnd:", xEnd);

          moveCell(ctx, xStart, xEnd, index);
        });
      });

      break;
    case "bottom":
      break;
    case "left":
      break;
    default:
      throw new Error("No such direction");
  }
}

function init() {
  const ctx = initCanvas();
  drawBlocks(ctx);

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      move(ctx, "right", myChanges);
    }
  });
}

window.addEventListener("load", init);
