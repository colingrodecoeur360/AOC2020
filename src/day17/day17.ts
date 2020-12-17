import { loadInput, splitLines } from "../utils";
import { part1 } from "./part1";
import { part2 } from "./part2";

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
