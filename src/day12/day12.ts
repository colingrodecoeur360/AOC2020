import { assertIsNever, loadInput, Move, splitLines, toInt, Vector } from "../utils";
import { ForwardInstruction, Instruction, RotationInstruction, TranslationInstruction } from "./Instruction";

export function day12() {
    const input = loadInput("day12");
    const instructions = parseInstructions(input);

    return {
        part1: () => part1(instructions),
        part2: () => part2(instructions)
    };
}

export function parseInstructions(input: string) {
    const lines = splitLines(input);
    return lines.map((line) => {
        const letter = line[0];
        const number = toInt(line.split("").slice(1).join(""));
        if (["L", "R"].includes(letter)) {
            return {
                type: "rotation",
                direction: letter,
                angle: number
            } as RotationInstruction;
        }
        if (["N", "E", "S", "W"].includes(letter)) {
            return {
                type: "translation",
                direction: letter,
                steps: number
            } as TranslationInstruction;
        }
        if (letter === "F") {
            return {
                type: "forward",
                steps: number
            } as ForwardInstruction;
        }
        throw new Error("Invalid instruction");
    });
}

export function part1(instructions: Instruction[]) {
    const ship = buildShip1();
    ship.execute(instructions);
    return ship.getDistance();
}

export function part2(instructions: Instruction[]) {
    const ship = buildShip2();
    ship.execute(instructions);
    return ship.getDistance();
}

export function buildShip1() {
    let position: Vector = { x: 0, y: 0 };
    let orientation: Vector = { x: 1, y: 0 };

    return {
        execute(instructions: Instruction[]) {
            for (const instruction of instructions) {
                visit(instruction, buildInstructionVisitor());
            }
        },
        getDistance() {
            return Math.abs(position.x) + Math.abs(position.y);
        }
    };

    function buildInstructionVisitor(): InstructionVisitor<void> {
        return {
            rotation(instruction: RotationInstruction) {
                for (let i = 0; i < instruction.angle / 90; i++) {
                    orientation = Vector.rotate(orientation, instruction.direction);
                }
            },
            translation(instruction: TranslationInstruction) {
                position = Vector.translate(position, buildMove(instruction));
            },
            forward(instruction: ForwardInstruction) {
                position = Vector.translate(position, {
                    x: instruction.steps * orientation.x,
                    y: instruction.steps * orientation.y,
                });
            }
        };
    }
}

export function buildShip2() {
    let position: Vector = { x: 0, y: 0 };
    let waypoint: Vector = { x: 10, y: 1 };

    return {
        execute(instructions: Instruction[]) {
            for (const instruction of instructions) {
                visit(instruction, buildInstructionVisitor());
            }
        },
        getDistance() {
            return Math.abs(position.x) + Math.abs(position.y);
        }
    };

    function buildInstructionVisitor(): InstructionVisitor<void> {
        return {
            rotation(instruction: RotationInstruction) {
                for (let i = 0; i < instruction.angle / 90; i++) {
                    waypoint = Vector.rotate(waypoint, instruction.direction);
                }
            },
            translation(instruction: TranslationInstruction) {
                waypoint = Vector.translate(waypoint, buildMove(instruction));

            },
            forward(instruction: ForwardInstruction) {
                position = Vector.translate(position, {
                    x: instruction.steps * waypoint.x,
                    y: instruction.steps * waypoint.y,
                });
            }
        };
    }
}

function visit<T>(instruction: Instruction, visitor: InstructionVisitor<T>) {
    if (Instruction.isRotation(instruction)) { return visitor.rotation(instruction); }
    if (Instruction.isTranslation(instruction)) { return visitor.translation(instruction); }
    if (Instruction.isForward(instruction)) { return visitor.forward(instruction); }
    assertIsNever(instruction);
}

interface InstructionVisitor<T> {
    rotation(instruction: Instruction): T;
    translation(instruction: Instruction): T;
    forward(instruction: Instruction): T;
}

function buildMove(instruction: TranslationInstruction): Move {
    if (instruction.direction === "N") { return { y: instruction.steps }; }
    if (instruction.direction === "E") { return { x: instruction.steps }; }
    if (instruction.direction === "S") { return { y: -instruction.steps }; }
    if (instruction.direction === "W") { return { x: -instruction.steps }; }
    throw new Error("Invalid direction");
}
