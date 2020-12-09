import { loadInput, splitLines } from "../utils";
import { buildProgram } from "./Program";

export function day8() {
    const input = loadInput("day8");
    const rawInstructions = splitLines(input);

    return {
        part1: () => part1(rawInstructions),
        part2: () => part2(rawInstructions)
    };
}

export function parseInput(input: string) {
    return splitLines(input);
}

export function part1(rawInstructions: string[]) {
    const program = buildProgram(rawInstructions);
    program.run();
    return program.getAccumulator();
}

export function part2(rawInstructions: string[]) {
    for (let index = 0; index < rawInstructions.length; index++) {
        const program = buildProgram(rawInstructions);
        if (rawInstructions[index].startsWith("acc")) { continue; }
        program.replaceInstruction(index);
        program.run();
        if (program.hasReachedEnd()) {
            return program.getAccumulator();
        }
    }
    return null;
}
