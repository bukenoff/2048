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
  from: number;
  to: number;

  constructor(from: number, to: number) {
    this.from = from;
    this.to = to;
  }
}

export class TransitionSet {
  type: "vertical" | "horizontal";
  value: (BoardTransition | null)[][];

  constructor(type: "vertical" | "horizontal", size: number) {
    this.type = type;
    this.value = new Array(size);

    for (let r = 0; r < size; r++) {
      this.value[r] = [];
    }
  }

  insert(value_index: number, index_start: number, index_end: number) {
    const new_transition = new BoardTransition(index_start, index_end);
    this.value[value_index].push(new_transition);
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

      const randomValue =
        possibleValues[Math.floor(Math.random() * possibleValues.length)];
      randomCell.value = randomValue;

      cellsAdded += 1;
    }
  }

  moveVerically(transition_set: TransitionSet, direction: Direction): void {
    for (let c = 0; c < this.cols; c++) {
      const unresolved_cells: Cell[] = [];
      const resolved_cells: Cell[] = [];

      for (let r = 0; r < this.rows; r++) {
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
            transition_set.insert(c, c, resolved_cells.length);
            resolved_cells.push(resolved_cell);
          }
        } else {
          unresolved_cells.push(current_cell);
        }
      }

      while (unresolved_cells.length) {
        const current = unresolved_cells.shift();
        transition_set.insert(c, c, resolved_cells.length);
        current && resolved_cells.push(current);
      }

      for (let k = 0; k < this.cols; k++) {
        const insertion_index = direction === "down" ? this.cols - k - 1 : k;

        if (resolved_cells[k]) {
          this.value[insertion_index][c].value = resolved_cells[k].value;
        } else {
          this.value[insertion_index][c].value = null;
        }
      }
    }
  }

  moveHorizontally(transition_set: TransitionSet, direction: Direction): void {
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
            transition_set.insert(r, c, resolved_cells.length);
            resolved_cells.push(resolved_cell);
          }
        } else {
          unresolved_cells.push(current_cell);
        }
      }

      while (unresolved_cells.length) {
        const current = unresolved_cells.shift();
        current && resolved_cells.push(current);
      }

      for (let k = 0; k < this.cols; k++) {
        const insertion_index = direction === "right" ? this.cols - k - 1 : k;

        if (resolved_cells[k]) {
          current_row[insertion_index].value = resolved_cells[k].value;
        } else {
          current_row[insertion_index].value = null;
        }
      }
    }
  }

  move(direction: Direction, shouldAddRandomCell = true): TransitionSet {
    let transition_set: TransitionSet | null = null;

    switch (direction) {
      case "up":
        transition_set = new TransitionSet("vertical", this.cols);

        this.moveVerically(transition_set, "up");
        if (shouldAddRandomCell) {
          this.randomlyAddValuesToCells(1);
        }

        return transition_set;
      case "right":
        transition_set = new TransitionSet("horizontal", this.cols);

        this.moveHorizontally(transition_set, "right");
        if (shouldAddRandomCell) {
          this.randomlyAddValuesToCells(1);
        }

        return transition_set;
      case "down":
        transition_set = new TransitionSet("vertical", this.cols);

        this.moveVerically(transition_set, "down");
        if (shouldAddRandomCell) {
          this.randomlyAddValuesToCells(1);
        }

        return transition_set;
      case "left":
        transition_set = new TransitionSet("horizontal", this.cols);

        this.moveHorizontally(transition_set, "left");
        if (shouldAddRandomCell) {
          this.randomlyAddValuesToCells(1);
        }

        return transition_set;
      default:
        throw new Error("Provided direction is not supported");
    }
  }

  print() {
    const result = this.value.reduce((acc, row) => {
      return acc + row.map(({ value }) => value ?? 0).join(" ") + "\n";
    }, ``);

    console.log(result);
  }
}
