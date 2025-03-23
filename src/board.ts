import type { Direction } from "./types";

class Cell {
  value: number | null;
  constructor(value = null) {
    this.value = value;
  }
}

export type Coordinates = {
  row: number;
  col: number;
  value: number;
};

export class BoardTransition {
  from: Coordinates;
  to: Coordinates;

  constructor(from: Coordinates, to: Coordinates) {
    this.from = from;
    this.to = to;
  }
}

export class Board {
  rows: number;
  cols: number;
  value: Cell[][];

  constructor(rows = 4, cols = 4) {
    this.rows = rows;
    this.cols = cols;
    this.value = new Array(this.rows);
  }

  init() {
    for (let i = 0; i < this.rows; i++) {
      const newRow = new Array(this.cols);
      this.value[i] = newRow;

      for (let j = 0; j < this.cols; j++) {
        newRow[j] = new Cell();
      }
    }
    this.randomlyAddValuesToCells(2);
  }

  getRandomPosition(range: number) {
    return Math.floor(Math.random() * range);
  }

  randomlyAddValuesToCells(count: number) {
    const possibleValues = [2, 2, 4];

    let cellsAdded = 0;

    while (cellsAdded < count) {
      const randomRow = this.getRandomPosition(this.rows);
      const randomCol = this.getRandomPosition(this.cols);
      const randomCell = this.value[randomRow][randomCol];

      if (randomCell.value !== null) {
        continue;
      }

      const randomValue = 2;
      possibleValues[Math.floor(Math.random() * possibleValues.length)];
      randomCell.value = randomValue;

      cellsAdded += 1;
    }
  }

  move(direction: Direction) {
    const transition: any = [
      { values: [] },
      { values: [] },
      { values: [] },
      { values: [] },
    ];

    switch (direction) {
      case "up":
        // TODO: Implelemt this
        break;
      case "right":
        // TODO: Implelemt this
        break;
      case "bottom":
        // TODO: Implelemt this
        break;
      case "left":
        for (let i = 0; i < this.rows; i++) {
          const unresolved_cells: (Cell & { index: number })[] = [];
          const resolved_cells: (Cell & { index: number })[] = [];
          const row = this.value[i];

          for (let j = 0; j < this.cols; j++) {
            const currentCell = this.value[i][j];

            if (currentCell.value === null) {
              continue;
            }

            if (
              unresolved_cells.length &&
              unresolved_cells[unresolved_cells.length - 1].value ===
                currentCell.value
            ) {
              const newlyResolvedValue = unresolved_cells.pop() as Cell & {
                index: number;
              };
              (newlyResolvedValue.value as number) *= 2;
              resolved_cells.push(newlyResolvedValue);
            } else {
              unresolved_cells.push({ value: currentCell.value, index: j });
            }
          }

          while (unresolved_cells.length) {
            const current = unresolved_cells.shift();
            current && resolved_cells.push(current);
          }

          for (let k = 0; k < this.cols; k++) {
            if (!resolved_cells[k]) {
              row[k].value = null;
              continue;
            }
            row[k].value = resolved_cells[k].value;
            transition[i].values.push({
              from: resolved_cells[k]?.index,
              to: k,
            });
          }
        }

        break;
      default:
        throw new Error("Provided direction is not supported");
    }
  }
}
