import { loadInput, splitIntegerLines } from "../utils";
import _ from "lodash";

export function day10() {
    const input = loadInput("day10");
    const numbers = parseInput(input);

    return {
        part1: () => part1(numbers),
        part2: () => part2(numbers)
    };
}

export function parseInput(input: string) {
    return splitIntegerLines(input).sort((a, b) => a - b);
}

export function part1(numbers: number[]) {
    let nbOneJoltAdapters = 1;
    let nbThreeJoltAdapters = 1;
    for (let i = 0; i < numbers.length - 1; i++) {
        const diff = numbers[i + 1] - numbers[i];
        if (diff === 1) { nbOneJoltAdapters++; }
        if (diff === 3) { nbThreeJoltAdapters++; }
    }
    return nbOneJoltAdapters * nbThreeJoltAdapters;
}
export function part2(numbers: number[]) {
    const memo: Record<string, number> = {};
    return countArrangements(numbers, 0);

    function countArrangements(remainingNumbers: number[], start: number) {
        const key = JSON.stringify([...remainingNumbers, start]);
        if (! _.isUndefined(memo[key])) { return memo[key]; }

        const nbArrangements = computeNbArrangements();
        memo[key] = nbArrangements;
        return nbArrangements;

        function computeNbArrangements() {
            if (remainingNumbers.length === 0) {
                return start === _.last(numbers) ? 1 : 0;
            }
            let result = 0;
            for (let offset = 1; offset <= 3; offset++) {
                if (remainingNumbers.includes(start + offset)) {
                    result += countArrangements(
                        remainingNumbers.filter(n => n > start + offset),
                        start + offset);
                }
            }
            return result;
        }
    }
}
