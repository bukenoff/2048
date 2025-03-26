import { Board, BoardTransition, Coordinates, TransitionSet } from "../board";

export function getMockedBoard(predefined_cells: number[][]) {
  const board: Board["value"] = [
    [{ value: null }, { value: null }, { value: null }, { value: null }],
    [{ value: null }, { value: null }, { value: null }, { value: null }],
    [{ value: null }, { value: null }, { value: null }, { value: null }],
    [{ value: null }, { value: null }, { value: null }, { value: null }],
  ];

  predefined_cells.forEach((row, row_index) => {
    row.forEach((col, col_index) => {
      if (!col) return;
      board[row_index][col_index].value = col;
    });
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
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    board.move("left", false);

    expect(board.value[0][0].value).toBe(4);
  });

  it("Should collapse two cells at indexes 0-2 with the same value if I move left", () => {
    const board = new Board();
    board.value = getMockedBoard([
      [2, 0, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    board.move("left");

    expect(board.value[0][0].value).toBe(4);
  });

  it("Should collapse two cells at indexes 0-3 with the same value if I move left", () => {
    const board = new Board();
    board.value = getMockedBoard([
      [2, 0, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    board.move("left");

    expect(board.value[0][0].value).toBe(4);
  });

  it("Should collapse two cells at indexes 1-2 with the same value if I move left", () => {
    const board = new Board();
    board.value = getMockedBoard([
      [0, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    board.move("left");

    expect(board.value[0][0].value).toBe(4);
  });

  it("Should collapse two cells at indexes 1-3 with the same value if I move left", () => {
    const board = new Board();
    board.value = getMockedBoard([
      [0, 2, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    board.move("left");

    expect(board.value[0][0].value).toBe(4);
  });

  it("Should collapse two cells at indexes 2-3 with the same value if I move left", () => {
    const board = new Board();
    board.value = getMockedBoard([
      [0, 0, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    board.move("left");

    expect(board.value[0][0].value).toBe(4);
  });

  it("Should collapse two cells at indexes 0-1 with the same value if I move right", () => {
    const board = new Board();
    board.value = getMockedBoard([
      [0, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    board.move("right");

    expect(board.value[0][3].value).toBe(4);
  });

  it("Should collapse two cells at indexes 0-2 with the same value if I move right", () => {
    const board = new Board();
    board.value = getMockedBoard([
      [2, 0, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    board.move("right");

    expect(board.value[0][3].value).toBe(4);
  });

  it("Should collapse two cells at indexes 0-3 with the same value if I move right", () => {
    const board = new Board();
    board.value = getMockedBoard([
      [2, 0, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    board.move("right");

    expect(board.value[0][3].value).toBe(4);
  });

  it("Should collapse two cells at indexes 0-1 with the same value if I move down", () => {
    const board = new Board();
    board.value = getMockedBoard([
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    board.move("down");

    expect(board.value[3][0].value).toBe(4);
  });

  it("Should collapse two cells at indexes 0-1 with the same value if I move up", () => {
    const board = new Board();
    board.value = getMockedBoard([
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    console.log("*** before ***");
    board.print();
    board.move("up");
    console.log("*** after ***");
    board.print();

    expect(board.value[0][0].value).toBe(4);
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
