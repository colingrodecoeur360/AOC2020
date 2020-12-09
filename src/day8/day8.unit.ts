import { expect } from "@test/unit";
import { part1, part2 } from "./day8";
import { loadInput, splitLines } from "../utils";


describe("day8", () => {
    const testInput = loadInput("day8", { filename: "testInput" });
    const rawInstructions = splitLines(testInput);

    describe("part1", () => {
        it("should return the value of the accumulator when reaching an already visited instruction", () => {
            expect(part1(rawInstructions)).to.equal(5);
        });
    });
    describe("part2", () => {
        it("should return the value of the accumulator for the program that terminates", () => {
            expect(part2(rawInstructions)).to.equal(8);
        });
    });
});
