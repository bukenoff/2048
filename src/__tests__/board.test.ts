import { Board, BoardTransition, Coordinates, TransitionSet } from "../board";

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

  it("Should collapse two cells at indexes 0-1 with the same value if I move right", () => {
    const board = new Board();
    board.value = getMockedBoard([
      { row: 0, col: 0, value: 2 },
      { row: 0, col: 1, value: 2 },
    ]);

    board.move("right");

    expect(board.value[0][3].value).toBe(4);
  });

  it("Should collapse two cells at indexes 0-2 with the same value if I move right", () => {
    const board = new Board();
    board.value = getMockedBoard([
      { row: 0, col: 0, value: 2 },
      { row: 0, col: 2, value: 2 },
    ]);

    board.move("right");

    expect(board.value[0][3].value).toBe(4);
  });

  it("Should collapse two cells at indexes 0-3 with the same value if I move right", () => {
    const board = new Board();
    board.value = getMockedBoard([
      { row: 0, col: 0, value: 2 },
      { row: 0, col: 3, value: 2 },
    ]);

    board.move("right");

    expect(board.value[0][3].value).toBe(4);
  });
});

describe("TransitionSet constructor", () => {
  it("Should be defined", () => {
    expect(TransitionSet).toBeDefined();
  });

  it("Should initalize with correct value", () => {
    const transition_set = new TransitionSet("horizontal", 4);
    expect(transition_set.value.length).toBe(4);
  });

  it("Should contain initial value with x empty arrays", () => {
    const transition_set = new TransitionSet("horizontal", 4);

    expect(
      transition_set.value.every((item) => Array.isArray(item) && !item.length)
    ).toBe(true);
  });

  it("Should insert values", () => {
    const transition_set = new TransitionSet("horizontal", 4);

    transition_set.insert(0, new BoardTransition(0, 1));

    expect(transition_set.value[0][0]).toEqual({ from: 0, to: 1 });
  });
});
