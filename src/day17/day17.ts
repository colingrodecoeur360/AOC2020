import { loadInput, splitLines } from "../utils";
import _ from "lodash";

export function day17() {
    const input = loadInput("day17");
    const grid = parseInput(input);

    return {
        part1: () => part1(grid),
        part2: () => part2(grid)
    };
}

export function parseInput(input: string) {
    return splitLines(input).map(x => x.split(""));
}

type Grid = string[][];
type Initializer = (grid: Grid) => Set<string>;
type NeighborGetter = (key: string) => string[];

export function part1(grid: Grid) {
    const automaton = buildCellularAutomaton({
        initializer: buildInitializer(),
        neighborGetter: buildNeighborGetter()
    });
    automaton.initialize(grid);
    automaton.runNTimes(6);
    return automaton.countActiveCells();

    function buildInitializer() {
        return (_grid: Grid) => {
            const activeCells = new Set<string>();
            for (let i = 0; i < _grid.length; i++) {
                for (let j = 0; j < _grid.length; j++) {
                    const key = JSON.stringify([i, j, 0]);
                    if (_grid[i][j] === "#") {
                        activeCells.add(key);
                    }
                }
            }
            return activeCells;
        };
    }
    function buildNeighborGetter() {
        return (key: string) => {
            const [i, j, k] = JSON.parse(key);
            const neighbors = [];
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    for (let z = -1; z <= 1; z++) {
                        if (x === 0 && y === 0 && z === 0) { continue; }
                        neighbors.push(JSON.stringify([i + x, j + y, k + z]));
                    }
                }
            }
            return neighbors;
        };
    }
}

export function part2(grid: Grid) {
    const automaton = buildCellularAutomaton({
        initializer: buildInitializer(),
        neighborGetter: buildNeighborGetter()
    });
    automaton.initialize(grid);
    automaton.runNTimes(6);
    return automaton.countActiveCells();

    function buildInitializer() {
        return (_grid: Grid) => {
            const activeCells = new Set<string>();
            for (let i = 0; i < _grid.length; i++) {
                for (let j = 0; j < _grid.length; j++) {
                    const key = JSON.stringify([i, j, 0, 0]);
                    if (_grid[i][j] === "#") {
                        activeCells.add(key);
                    }
                }
            }
            return activeCells;
        };
    }
    function buildNeighborGetter() {
        return (key: string) => {
            const [i, j, k, l] = JSON.parse(key);
            const neighbors = [];
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    for (let z = -1; z <= 1; z++) {
                        for (let w = -1; w <= 1; w++) {
                            if (x === 0 && y === 0 && z === 0 && w === 0) { continue; }
                            neighbors.push(JSON.stringify([i + x, j + y, k + z, l + w]));
                        }
                    }
                }
            }
            return neighbors;
        };
    }
}

function buildCellularAutomaton(
    { initializer, neighborGetter }:
    { initializer: Initializer, neighborGetter: NeighborGetter }
) {
    let activeCells = new Set<string>();

    return {
        initialize(grid: Grid) {
            activeCells = initializer(grid);
        },
        run() {
            const newActiveCells = new Set<string>();
            const cellsToUpdate = new Set<string>();
            activeCells.forEach((key) => {
                cellsToUpdate.add(key);
                neighborGetter(key).forEach(neighbor => cellsToUpdate.add(neighbor));
            });
            cellsToUpdate.forEach((key) => {
                const isActive = activeCells.has(key);
                const nbActiveNeighbors = neighborGetter(key).filter(neighbor => activeCells.has(neighbor)).length;
                if (isActive || nbActiveNeighbors === 3) { newActiveCells.add(key); }
                if (isActive && ! [2, 3].includes(nbActiveNeighbors)) { newActiveCells.delete(key); }
            });
            activeCells = newActiveCells;
        },
        runNTimes(n: number) {
            _.range(n).forEach(() => this.run());
        },
        countActiveCells() {
            return activeCells.size;
        }
    };
}
