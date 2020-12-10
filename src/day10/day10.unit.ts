import { expect } from "@test/unit";
import { parseInput, part1, part2 } from "./day10";
import { loadInput } from "../utils";

describe("day10", () => {
    describe("part1", () => {
        it("example 1", () => {
            const testInput = loadInput("day10", { filename: "testInput1" });
            const numbers = parseInput(testInput);

            expect(part1(numbers)).to.equal(35);
        });
        it("example 1", () => {
            const testInput = loadInput("day10", { filename: "testInput2" });
            const numbers = parseInput(testInput);

            expect(part1(numbers)).to.equal(220);
        });
    });
    describe("part2", () => {
        it("example 1", () => {
            const testInput = loadInput("day10", { filename: "testInput1" });
            const numbers = parseInput(testInput);

            expect(part2(numbers)).to.equal(8);
        });
        it("example 1", () => {
            const testInput = loadInput("day10", { filename: "testInput2" });
            const numbers = parseInput(testInput);

            expect(part2(numbers)).to.equal(19208);
        });
    });
});
