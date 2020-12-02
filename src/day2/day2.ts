import { loadInput, toInt } from "../utils";

export function day2() {
    const input = loadInput("day2");
    const rows = parseInput(input);

    const validators = buildValidators();
    return {
        part1: () => countValidPasswords(rows, validators.part1),
        part2: () => countValidPasswords(rows, validators.part2)
    };
}

function parseInput(input: string) {
    return input.trim().split("\n");
}

export function buildValidators() {
    return {
        part1: function (row: string) {
            const { min, max, letter, password } = parseRow(row);
            const occurrences = password.split(letter).length - 1;
            return min <= occurrences && occurrences <= max;
        },
        part2: function (row: string) {
            const { min, max, letter, password } = parseRow(row);
            const keyLetters = [password[min - 1], password[max - 1]];
            return keyLetters.includes(letter) && keyLetters[0] !== keyLetters[1];
        }
    };
}

function parseRow(row: string): PasswordCheck {
    const [start, middle, password] = row.split(" ");
    const [min, max] = start.split("-").map(toInt);
    const letter = middle.split(":")[0];
    return { min, max, letter, password };
}

interface PasswordCheck {
    min: number;
    max: number;
    letter: string;
    password: string;
}

function countValidPasswords(rows: string[], validator: (s: string) => boolean) {
    return rows.filter(validator).length;
}
