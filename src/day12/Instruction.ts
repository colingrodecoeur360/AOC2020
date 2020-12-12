export interface RotationInstruction {
    type: "rotation",
    direction: "L" | "R";
    angle: number;
}
export interface TranslationInstruction {
    type: "translation",
    direction: "N" | "E" | "S" | "W";
    steps: number;
}
export interface ForwardInstruction {
    type: "forward",
    steps: number;
}
export type Instruction = RotationInstruction | TranslationInstruction | ForwardInstruction;

export const Instruction = {
    isRotation(instruction: Instruction): instruction is RotationInstruction {
        return instruction.type === "rotation";
    },
    isTranslation(instruction: Instruction): instruction is TranslationInstruction {
        return instruction.type === "translation";
    },
    isForward(instruction: Instruction): instruction is ForwardInstruction {
        return instruction.type === "forward";
    }
};
