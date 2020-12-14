import { expect } from "@test/unit";
import { parseInput, part1, part2 } from "./day14";
import { loadInput } from "../utils";

describe("day14", () => {
    describe("part1", () => {
        it("example 1", () => {
            const testInput = loadInput("day14", { filename: "testInput1" });
            const instructions = parseInput(testInput);

            expect(part1(instructions)).to.equal(165);
        });
    });
    describe("part2", () => {
        it("example 1", () => {
            const testInput = loadInput("day14", { filename: "testInput2" });
            const instructions = parseInput(testInput);

            expect(part2(instructions)).to.equal(208);
        });
    });
});
