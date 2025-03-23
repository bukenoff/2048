import { Board, Coordinates } from "../board";

export function getMockedBoard(predefined_cells: Coordinates[]) {
  const board: Board["value"] = [
    [{ value: null }, { value: null }, { value: null }, { value: null }],
    [{ value: null }, { value: null }, { value: null }, { value: null }],
    [{ value: null }, { value: null }, { value: null }, { value: null }],
    [{ value: null }, { value: null }, { value: null }, { value: null }],
  ];

  predefined_cells.forEach(({ row, col, value }) => {
    board[row][col].value = value;
  });

  return board;
}

describe("Board constructor", () => {
  it("Should be defined", () => {
    expect(Board).toBeDefined();
  });

  it("Should initialize board with two randomly assinged cells", () => {
    const board = new Board();
    board.init();

    const non_empty_cells = board.value.reduce((count, row) => {
      row.forEach((cell) => {
        if (!cell.value) return count;
        count += 1;
      });
      return count;
    }, 0);

    expect(non_empty_cells).toBe(2);
  });

  it("Should collapse two cells at indexes 0-1 with the same value if I move left", () => {
    const board = new Board();
    board.value = getMockedBoard([
      { row: 0, col: 0, value: 2 },
      { row: 0, col: 1, value: 2 },
    ]);

    board.move("left");

    expect(board.value[0][0].value).toBe(4);
  });

  it("Should collapse two cells at indexes 0-2 with the same value if I move left", () => {
    const board = new Board();
    board.value = getMockedBoard([
      { row: 0, col: 0, value: 2 },
      { row: 0, col: 2, value: 2 },
    ]);

    board.move("left");

    expect(board.value[0][0].value).toBe(4);
  });

  it("Should collapse two cells at indexes 0-3 with the same value if I move left", () => {
    const board = new Board();
    board.value = getMockedBoard([
      { row: 0, col: 0, value: 2 },
      { row: 0, col: 3, value: 2 },
    ]);

    board.move("left");

    expect(board.value[0][0].value).toBe(4);
  });

  it("Should collapse two cells at indexes 1-2 with the same value if I move left", () => {
    const board = new Board();
    board.value = getMockedBoard([
      { row: 0, col: 1, value: 2 },
      { row: 0, col: 2, value: 2 },
    ]);

    board.move("left");

    expect(board.value[0][0].value).toBe(4);
  });

  it("Should collapse two cells at indexes 1-3 with the same value if I move left", () => {
    const board = new Board();
    board.value = getMockedBoard([
      { row: 0, col: 1, value: 2 },
      { row: 0, col: 3, value: 2 },
    ]);

    board.move("left");

    expect(board.value[0][0].value).toBe(4);
  });

  it("Should collapse two cells at indexes 2-3 with the same value if I move left", () => {
    const board = new Board();
    board.value = getMockedBoard([
      { row: 0, col: 2, value: 2 },
      { row: 0, col: 3, value: 2 },
    ]);

    board.move("left");

    expect(board.value[0][0].value).toBe(4);
  });
});
