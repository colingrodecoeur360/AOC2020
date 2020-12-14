import { loadInput, splitIntegerLines } from "../utils";
import _ from "lodash";

const PREAMBLE_LENGTH = 25;

export function day09() {
    const input = loadInput("day09");
    const numbers = splitIntegerLines(input);

    return {
        part1: () => part1(numbers, PREAMBLE_LENGTH),
        part2: () => part2(numbers, PREAMBLE_LENGTH)
    };
}

type SumsByPair = Record<number, Record<number, number>>;

export function part1(numbers: number[], preambleLength: number) {
    const queue = _.range(preambleLength);
    const sumsByPair = initializeSums();
    let currentIndex = preambleLength;
    let found = false;

    while(! found) {
        if (! isSumOfTwoNumbers(numbers[currentIndex], sumsByPair)) {
            found = true;
            break;
        }
        delete sumsByPair[currentIndex - preambleLength];
        queue.shift();
        queue.forEach((index) => {
            sumsByPair[index][currentIndex] = numbers[index] + numbers[currentIndex];
        });
        queue.push(currentIndex);
        sumsByPair[currentIndex] = {};
        currentIndex++;
    }
    return numbers[currentIndex];

    function initializeSums() {
        const initialSums: SumsByPair = {};
        for (let index1 = 0; index1 < preambleLength; index1++) {
            initialSums[index1] = {};
            for (let index2 = index1 + 1; index2 < preambleLength; index2++) {
                initialSums[index1][index2] = numbers[index1] + numbers[index2];
            }
        }
        return initialSums;
    }
}

function isSumOfTwoNumbers(number: number, sumsByPair: SumsByPair) {
    return Object.values(sumsByPair).map(x => Object.values(x)).flat().includes(number);
}

export function part2(numbers: number[], preambleLength: number) {
    const targetSum = part1(numbers, preambleLength);
    let maxIndex = 0;
    let minIndex = 0;
    let sum = numbers[maxIndex];
    while (sum !== targetSum) {
        if (sum > targetSum) {
            minIndex++;
            maxIndex = minIndex;
            sum = numbers[maxIndex];
        } else {
            maxIndex++;
            sum += numbers[maxIndex];
        }
    }
    const min = _.min(numbers.slice(minIndex, maxIndex + 1))!;
    const max = _.max(numbers.slice(minIndex, maxIndex + 1))!;
    return min + max;
}
