import { loadInput, splitIntegerLines } from "../utils";
import _ from "lodash";

const TARGET_SUM = 2020;

export function day01() {
    const input = loadInput("day01");
    const numbers = splitIntegerLines(input);

    return {
        part1: () => part1(numbers, TARGET_SUM),
        part2: () => part2(numbers, TARGET_SUM)
    };
}

export function part1(numbers: number[], target: number) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            const subset = [numbers[i], numbers[j]];
            if (hasSum(subset, target)) {
                return product(subset);
            }
        }
    }
    return null;
}

export function part2(numbers: number[], target: number) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            for (let k = j + 1; k < numbers.length; k++) {
                const subset = [numbers[i], numbers[j], numbers[k]];
                if (hasSum(subset, target)) {
                    return product(subset);
                }
            }
        }
    }
    return null;
}

function hasSum(numbers: number[], target: number) {
    return _.sum(numbers) === target;
}

function product(numbers: number[]) {
    let result = 1;
    numbers.forEach(number => result *= number);
    return result;
}
