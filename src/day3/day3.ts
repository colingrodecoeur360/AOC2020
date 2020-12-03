import { loadInput } from "../utils";

export function day3() {
    const input = loadInput("day3");
    const grid = buildGrid(input);

    return {
        part1: () => part1(grid),
        part2: () => part2(grid)
    };
}

export function buildGrid(input: string): Grid {
    const lines: string[] = input.trim().split("\n");
    const rows: Row[] = lines.map((line) => {
        return {
            cells: Array.from(line).map(value => ({ value } as Cell))
        };
    });

    return {
        rows,
        nbRows: rows.length,
        nbColumns: rows[0].cells.length,
    };
}

function part1(grid: Grid) {
    const gridExplorer = buildGridExplorer(grid, { right: 3, down: 1 });
    gridExplorer.explore();
    return gridExplorer.getNbTrees();
}

function part2(grid: Grid) {
    const slopes = [
        { right: 1, down: 1 },
        { right: 3, down: 1 },
        { right: 5, down: 1 },
        { right: 7, down: 1 },
        { right: 1, down: 2 }
    ];
    let product = 1;
    slopes.forEach(slope => {
        const gridExplorer = buildGridExplorer(grid, slope);
        gridExplorer.explore();
        product *= gridExplorer.getNbTrees();
    });
    return product;
}

export function buildGridExplorer(grid: Grid, slope: Slope): GridExplorer {
    const position: Position = { i: 0, j: 0 };
    let nbTrees = isTree() ? 1: 0;

    return {
        move() {
            position.i = position.i + slope.down;
            position.j = (position.j + slope.right) % grid.nbColumns;
            assertIsValid();
        },
        explore() {
            while (canMoveDown()) {
                this.move();
                if (isTree()) { nbTrees++; }
            }
        },
        getNbTrees() {
            return nbTrees;
        },
        getPosition() {
            return position;
        }
    };

    function canMoveDown() {
        return position.i + slope.down < grid.nbRows;
    }
    function isTree() {
        const row = grid.rows[position.i];
        return row.cells[position.j].value === "#";
    }
    function assertIsValid() {
        if (position.i >= grid.nbRows) {
            throw new Error("Row index out of bounds");
        }
        if (position.j >= grid.nbColumns) {
            throw new Error("Column index out of bounds");
        }
    }
}

interface Grid {
    rows: Row[]
    nbRows: number;
    nbColumns: number;
}
interface Row {
    cells: Cell[];
}
interface Cell {
    value: "." | "#";
}
export interface Slope {
    right: number;
    down: number;
}
interface Position {
    i: number;
    j: number;
}
export interface GridExplorer {
    move(): void;
    explore(): void;
    getNbTrees(): number;
    getPosition(): Position;
}
