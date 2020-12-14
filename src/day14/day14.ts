import { loadInput, splitLines, toInt } from "../utils";
import _ from "lodash";

export function day14() {
    const input = loadInput("day14");
    const instructions = parseInput(input);

    return {
        part1: () => part1(instructions),
        part2: () => part2(instructions)
    };
}

export function parseInput(input: string) {
    return splitLines(input).map(parseInstruction);

    function parseInstruction(line: string): Instruction {
        if (line.startsWith("mask")) { return parseMaskInstruction(line); }
        if (line.startsWith("mem")) { return parseWritingInstruction(line); }
        throw new Error("Invalid instruction");
    }
    function parseMaskInstruction(line: string): MaskInstruction {
        return {
            type: "mask",
            mask: line.slice(7)
        };
    }
    function parseWritingInstruction(line: string): WritingInstruction {
        const res = line.match(/mem\[([\d]*)] = ([\d]*)/);
        if (res === null) { throw new Error("Invalid instruction");}
        const address = toInt(res[1]);
        const value = toInt(res[2]);
        return {
            type: "writing",
            address,
            value
        };
    }
}

export function part1(instructions: Instruction[]) {
    const program = buildProgram1();
    program.run(instructions);
    return program.getState();
}

export function part2(instructions: Instruction[]) {
    const program = buildProgram2();
    program.run(instructions);
    return program.getState();
}

function buildProgram1() {
    let mask = "";
    const state: Record<number, number> = {};

    return {
        execute(instruction: Instruction) {
            if (instruction.type === "mask") {
                mask = instruction.mask;
            }
            if (instruction.type === "writing") {
                state[instruction.address] = applyMask(instruction);
            }
        },
        run(instructions: Instruction[]) {
            instructions.forEach(this.execute);
        },
        getState() {
            return _.sum(Object.values(state));
        }
    };

    function applyMask(instruction: WritingInstruction) {
        const s = Array.from(toBinary(instruction.value).padStart(36, "0"));
        Array.from(mask).forEach((char, index) => {
            if (char === "X") { return; }
            s[index] = char;
        });
        return parseInt(s.join(""), 2);
    }
}

function buildProgram2() {
    let mask = "";
    const state: Record<number, number> = {};

    return {
        execute(instruction: Instruction) {
            if (instruction.type === "mask") {
                mask = instruction.mask;
            }
            if (instruction.type === "writing") {
                const addresses = applyMask(instruction);
                addresses.forEach((address) => {
                    state[address] = instruction.value;
                });
            }
        },
        run(instructions: Instruction[]) {
            instructions.forEach(this.execute);
        },
        getState() {
            return _.sum(Object.values(state));
        }
    };

    function applyMask(instruction: WritingInstruction): number[] {
        const addressTemplate = Array.from(toBinary(instruction.address).padStart(36, "0"));
        const xPositions: number[] = [];
        Array.from(mask).forEach((char, index) => {
            if (char === "0") { return; }
            if (char === "1") { addressTemplate[index] = "1"; }
            if (char === "X") { xPositions.push(index); }
        });
        const nbFloatingBits = xPositions.length;
        const combinations = _.range(2 ** nbFloatingBits).map(x => toBinary(x).padStart(nbFloatingBits, "0").split(""));
        return combinations.map((combination) => {
            const address = addressTemplate;
            combination.forEach((bit, index) => address[xPositions[index]] = bit);
            return parseInt(address.join(""), 2);
        });
    }
}

interface MaskInstruction {
    type: "mask";
    mask: string;
}

interface WritingInstruction {
    type: "writing";
    address: number;
    value: number;
}

type Instruction = MaskInstruction | WritingInstruction;

function toBinary(value: number) {
    return value.toString(2);
}
