import { Instruction } from "./Instruction";
import { assertIsNever } from "../utils";
import _ from "lodash";

export interface Program {
    execute(): void;
    run(): void;
    replaceInstruction(index: number): void;
    getAccumulator(): number;
    getIndex(): number;
    getInstructions(): Instruction[];
    hasLooped(): boolean;
    hasReachedEnd(): boolean;
}

export function buildProgram(rawInstructions: string[]): Program {
    const instructions = parseInstructions(rawInstructions);
    let accumulator = 0;
    let index = 0;
    const visitedIndexes = new Set();
    let hasLooped = false;

    return {
        execute() {
            visit(instructions[index], buildExecutionVisitor());
            if (visitedIndexes.has(index)) { hasLooped = true; }
            visitedIndexes.add(index);
        },
        run() {
            while (! this.hasLooped() && ! this.hasReachedEnd()) {
                this.execute();
            }
        },
        replaceInstruction(indexToReplace) {
            visit(instructions[indexToReplace], buildReplacementVisitor());
        },
        getAccumulator() {
            return accumulator;
        },
        getIndex() {
            return index;
        },
        getInstructions() {
            return _.cloneDeep(instructions);
        },
        hasLooped() {
            return hasLooped;
        },
        hasReachedEnd() {
            return index >= instructions.length;
        }
    };
    function buildExecutionVisitor(): InstructionVisitor<void> {
        return {
            acc(instruction) {
                accumulator += instruction.value;
                index++;
            },
            jmp(instruction) {
                index += instruction.value;
            },
            nop() {
                index++;
            }
        };
    }
    function buildReplacementVisitor(): InstructionVisitor<void> {
        return {
            acc() {
                throw new Error("Replacement of acc instructions is not supported");
            },
            jmp(instruction) {
                instruction.type = "nop";
            },
            nop(instruction) {
                instruction.type = "jmp";
            }
        };
    }
}

function parseInstructions(rawInstructions: string[]) {
    return rawInstructions.map(parseInstruction);
}

function parseInstruction(rawInstruction: string) {
    const [type, value] = rawInstruction.split(" ");
    return { type, value: parseInt(value) } as Instruction;
}

function visit<T>(instruction: Instruction, visitor: InstructionVisitor<T>) {
    if (Instruction.isAccInstruction(instruction)) { return visitor.acc(instruction); }
    if (Instruction.isJmpInstruction(instruction)) { return visitor.jmp(instruction); }
    if (Instruction.isNopInstruction(instruction)) { return visitor.nop(instruction); }
    assertIsNever(instruction);
}

interface InstructionVisitor<T> {
    acc(instruction: Instruction): T;
    jmp(instruction: Instruction): T;
    nop(instruction: Instruction): T;
}
