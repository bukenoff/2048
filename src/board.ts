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
        for (let r = 0; r < this.rows; r++) {
          const unresolved_cells: Cell[] = [];
          const resolved_cells: Cell[] = [];
          const current_row = this.value[r];

          for (let c = 0; c < this.cols; c++) {
            const current_cell = this.value[r][c];

            if (current_cell.value === null) {
              continue;
            }

            if (
              unresolved_cells.length &&
              unresolved_cells[unresolved_cells.length - 1].value ===
                current_cell.value
            ) {
              const resolved_cell = unresolved_cells.pop();
              if (resolved_cell && resolved_cell.value) {
                resolved_cell.value *= 2;
                resolved_cells.push(resolved_cell);
              }
            } else {
              unresolved_cells.push({ value: current_cell.value });
            }
          }

          while (unresolved_cells.length) {
            const current = unresolved_cells.shift();
            current && resolved_cells.push(current);
          }

          for (let k = 0; k < this.cols; k++) {
            if (!resolved_cells[k]) {
              current_row[k].value = null;
            } else {
              current_row[k].value = resolved_cells[k].value;
            }
          }
        }

        break;
      default:
        throw new Error("Provided direction is not supported");
    }
  }
}
