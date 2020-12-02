interface Solution {
    part1?: Function;
    part2?: Function;
}

export function displaySolutions(solutions: Record<string, Solution>) {
    Object.entries(solutions).forEach(([day, solution]) => {
        console.log(`Day ${day}:`);
        if (solution.part1) {
            console.log(`Part 1: ${solution.part1()}`);
        }
        if (solution.part2) {
            console.log(`Part 2: ${solution.part2()}`);
        }
        console.log("\n");
    });
}
