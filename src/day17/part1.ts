export function part1(grid: string[][]) {
    let state: Record<string, string> = initializeState(grid);

    for (let iterations = 0; iterations < 6; iterations++) {
        const newState: Record<string, string> = {};
        const cellsToUpdate = new Set<string>();
        Object.keys(state).forEach((key) => {
            cellsToUpdate.add(key);
            getNeighbors(key).forEach(neighbor => cellsToUpdate.add(neighbor));
        });
        cellsToUpdate.forEach((key) => {
            const value = state[key] || ".";
            const nbActiveNeighbors = getNeighbors(key).filter(neighbor => state[neighbor] === "#").length;

            if (value === "#") {
                newState[key] = "#";
            }
            if (value === "." && nbActiveNeighbors === 3) {
                newState[key] = "#";
            }
            if (value === "#" && ! [2, 3].includes(nbActiveNeighbors)) {
                newState[key] = ".";
            }
        });
        state = newState;
    }
    return Object.values(state).filter(value => value === "#").length;
}

function initializeState(grid: string[][]) {
    const values: Record<string, string> = {};
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            const key = JSON.stringify([i, j, 0]);
            values[key] = grid[i][j];
        }
    }
    return values;
}

function getNeighbors(key: string) {
    const [i, j, k] = JSON.parse(key);
    const neighbors = [];
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                if (x == 0 && y == 0 && z == 0) { continue; }
                neighbors.push(JSON.stringify([i + x, j + y, k + z]));
            }
        }
    }
    return neighbors;
}
