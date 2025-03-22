class Cell {
  value: number | null;
  constructor(value = null) {
    this.value = value;
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

  move(direction: "up" | "right" | "bottom" | "left") {
    const transition: any = [
      { values: [] },
      { values: [] },
      { values: [] },
      { values: [] },
    ];

    switch (direction) {
      case "up":
        break;
      case "right":
        break;
      case "bottom":
        break;
      case "left":
        for (let i = 0; i < this.rows; i++) {
          const unresolved: (Cell & { index: number })[] = [];
          const resolved: (Cell & { index: number })[] = [];
          const row = this.value[i];

          for (let j = 0; j < this.cols; j++) {
            const currentCell = this.value[i][j];
            if (currentCell.value === null) {
              continue;
            }
            if (
              unresolved.length &&
              unresolved[unresolved.length - 1].value === currentCell.value
            ) {
              const newlyResolvedValue = unresolved.pop() as Cell & {
                index: number;
              };
              (newlyResolvedValue.value as number) *= 2;
              resolved.push(newlyResolvedValue);
            } else {
              unresolved.push({ value: currentCell.value, index: j });
            }
          }

          while (unresolved.length) {
            const current = unresolved.shift();
            current && resolved.push(current);
          }

          console.log("stack is", unresolved);
          console.log("queue is", resolved);
          for (let k = 0; k < this.cols; k++) {
            if (!resolved[k]) {
              row[k].value = null;
              continue;
            }
            row[k].value = resolved[k].value;
            transition[i].values.push({ from: resolved[k]?.index, to: k });
          }
          console.log("transition is", transition);
        }

        break;
      default:
        console.log("Unknown direction");
        throw new Error("Provided direction is not supported");
    }
  }
}
