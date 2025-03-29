import { Board, TransitionSet } from "./board";
import { BLOCK_HEIGHT, BLOCK_WIDTH, SPEED } from "./const";
import { Direction } from "./types";

export class Renderer {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  board: Board;

  constructor(board: Board) {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");
    this.board = board;
  }

  init(): void {
    if (!this.canvas) {
      throw new Error("No canvas found on the page");
    }

    this.canvas.width = 345;
    this.canvas.height = 345;

    if (!this.context) {
      throw new Error("Could not initialize rendering context");
    }

    this.context.fillStyle = "rgb(187, 173, 160)";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.attachEventListener();
  }

  drawInitialBoard(ctx: CanvasRenderingContext2D) {
    let x = 0;
    let y = 0;

    for (let i = 0; i < 4; i++) {
      x = 0;
      y = 5 * i + BLOCK_WIDTH * i + 5;

      for (let j = 0; j < 4; j++) {
        const value = this.board.value[i][j].value
          ? this.board.value[i][j].value?.toString()
          : "";

        x += 5;

        if (value) {
          ctx.fillStyle = "black";
          ctx.font = "24px serif";
          ctx.fillText(value, x + 35, y + 50);
        }

        ctx.fillStyle = "rgba(238, 228, 218, 0.35)";
        ctx.fillRect(x, y, BLOCK_WIDTH, BLOCK_HEIGHT);
        x += BLOCK_WIDTH;
      }
    }
  }

  startTransition(
    ctx: CanvasRenderingContext2D,
    start: number,
    end: number,
    index: number
  ) {
    let xStart = start;
    let xEnd = end;

    if (xStart < xEnd) {
      //redrawBoard(ctx);
      ctx.clearRect(xStart + 5, 5, BLOCK_WIDTH, BLOCK_HEIGHT);
      xStart += SPEED;

      ctx.fillStyle = "rgba(238, 228, 218, 0.35)";
      ctx.fillRect(10, (index + 1) * 5, xStart + BLOCK_WIDTH, BLOCK_HEIGHT);

      ctx.fillStyle = "red";
      ctx.fillRect(xStart + 5, (index + 1) * 5, BLOCK_WIDTH, BLOCK_HEIGHT);

      requestAnimationFrame(() =>
        this.startTransition(ctx, xStart, xEnd, index)
      );
    }
  }

  redrawBoard(
    ctx: CanvasRenderingContext2D,
    direction: Direction,
    transition_set: TransitionSet
  ): void {
    transition_set.value.forEach((row, row_index) => {
      if (direction === "right") {
        row.forEach((transition) => {
          if (!transition) return;

          const { from, to } = transition;

          let xStart = from * BLOCK_WIDTH + from * 5;
          let xEnd = to * BLOCK_WIDTH + to * 5 + 5;

          this.startTransition(ctx, xStart, xEnd, row_index);
        });
      }
    });
  }

  attachEventListener(): void {
    if (!this.context) {
      throw new Error("No context");
    }

    window.addEventListener("keydown", (event) => {
      console.log("event is: ", event);

      switch (event.key) {
        case "ArrowRight":
        case "l":
          this.redrawBoard(this.context!, "right", this.board.move("right"));
          break;
        case "ArrowLeft":
        case "h":
          //move(ctx, "right", board.move("left"));
          break;
        case "ArrowUp":
        case "k":
          //move(ctx, "right", board.move("up"));
          break;
        case "ArrowDown":
        case "j":
          //move(ctx, "right", board.move("down"));
          break;

        default:
          console.log(`No event attached to ${event.key}`);
      }
    });
  }
}
