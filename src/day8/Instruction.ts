interface AccInstruction {
    type: "acc";
    value: number;
}
interface JmpInstruction {
    type: "jmp";
    value: number;
}
interface NopInstruction {
    type: "nop";
    value: number;
}

export type Instruction = AccInstruction | JmpInstruction | NopInstruction;

export const Instruction = {
    isAccInstruction(instruction: Instruction): instruction is AccInstruction {
        return instruction.type === "acc";
    },
    isJmpInstruction(instruction: Instruction): instruction is JmpInstruction {
        return instruction.type === "jmp";
    },
    isNopInstruction(instruction: Instruction): instruction is NopInstruction {
        return instruction.type === "nop";
    }
};
