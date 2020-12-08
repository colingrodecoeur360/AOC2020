import { expect } from "@test/unit";
import { buildProgram } from "./Program";

describe("Program", () => {
    describe("initialization", () => {
        it("should return 0 as the initial value of the accumulator", () => {
            const program = buildProgram([
                "acc +1",
                "nop +1"
            ]);

            expect(program.getAccumulator()).to.equal(0);
        });
        it("should return 0 as the initial value of the index", () => {
            const program = buildProgram([
                "acc +1",
                "nop +1"
            ]);

            expect(program.getIndex()).to.equal(0);
        });
    });
    describe("acc instruction", () => {
        it("should increment the index by 1", () => {
            const program = buildProgram([
                "acc +1",
                "nop +1"
            ]);

            program.execute();

            expect(program.getIndex()).to.equal(1);
        });
        it("should increment the accumulator with the right value", () => {
            const program = buildProgram([
                "acc +2",
                "nop +1"
            ]);

            program.execute();

            expect(program.getAccumulator()).to.equal(2);
        });
    });
    describe("jmp instruction", () => {
        it("should increment the index by the provided value", () => {
            const program = buildProgram([
                "jmp +2",
                "nop +1",
                "nop +1"
            ]);

            program.execute();

            expect(program.getIndex()).to.equal(2);
        });
        it("should leave the accumulator unchanged", () => {
            const program = buildProgram([
                "jmp +2",
                "acc +1",
                "acc +1"
            ]);

            program.execute();

            expect(program.getAccumulator()).to.equal(0);
        });
    });
    describe("nop instruction", () => {
        it("should increment the index by 1", () => {
            const program = buildProgram([
                "nop +1",
                "acc +1"
            ]);

            program.execute();

            expect(program.getIndex()).to.equal(1);
        });
        it("should leave the accumulator unchanged", () => {
            const program = buildProgram([
                "nop +1",
                "acc +1"
            ]);

            program.execute();

            expect(program.getAccumulator()).to.equal(0);
        });
    });
    describe("run", () => {
        it("should stop execution when falling in a loop", () => {
            const program = buildProgram([
                "nop +0",
                "acc +1",
                "jmp +4",
                "acc +3",
                "jmp -3",
                "acc -99",
                "acc +1",
                "jmp -4",
                "acc +6"
            ]);

            program.run();

            expect(program.hasLooped()).to.be.true;
            expect(program.hasReachedEnd()).to.be.false;
        });
        it("should stop execution when reaching the end of the instructions", () => {
            const program = buildProgram([
                "nop +0",
                "acc +1",
                "jmp +4",
                "acc +3",
                "jmp -3",
                "acc -99",
                "acc +1",
                "nop -4",
                "acc +6"
            ]);

            program.run();

            expect(program.hasLooped()).to.be.false;
            expect(program.hasReachedEnd()).to.be.true;
        });
    });
    describe("replaceInstruction", () => {
        it("should replace a jmp instruction with a nop one", () => {
            const program = buildProgram([
                "nop +1",
                "jmp +2"
            ]);

            program.replaceInstruction(1);

            expect(program.getInstructions()).to.deep.equal([
                { type: "nop", value: 1 },
                { type: "nop", value: 2 },
            ]);
        });
        it("should replace a nop instruction with a jmp one", () => {
            const program = buildProgram([
                "nop +1",
                "nop +2"
            ]);

            program.replaceInstruction(1);

            expect(program.getInstructions()).to.deep.equal([
                { type: "nop", value: 1 },
                { type: "jmp", value: 2 },
            ]);
        });
        it("should throw when trying to replace an acc instruction", () => {
            const program = buildProgram([
                "nop +1",
                "acc +2"
            ]);

            const functionCall = () => program.replaceInstruction(1);

            expect(functionCall).to.throw("Replacement of acc instructions is not supported");
        });
    });
});
