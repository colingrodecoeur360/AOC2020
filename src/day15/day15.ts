import { loadInput, toInt } from "../utils";
import _ from "lodash";

export function day15() {
    const input = loadInput("day15");
    const numbers = parseInput(input);

    return {
        part1: () => part1(numbers),
        part2: () => part2(numbers)
    };
}

export function parseInput(input: string) {
    return input.trim().split(",").map(toInt);
}

export function part1(numbers: number[]) {
    return compute(numbers, 2020);
}

export function part2(numbers: number[]) {
    return compute(numbers, 30000000);
}

function compute(numbers: number[], position: number) {
    const v: (number | undefined)[] = _.range(position).map(() => undefined);
    const w: (number | undefined)[] = _.range(position).map(() => undefined);
    numbers.forEach((number, index) => v[number] = index);
    let current = _.last(numbers)!;

    let n = numbers.length;
    while (n < position) {
        if (_.isUndefined(w[current])) {
            current = 0;
        } else {
            current = n - 1 - w[current]!;
        }
        w[current] = v[current];
        v[current] = n;
        n++;
    }
    return current;
}
