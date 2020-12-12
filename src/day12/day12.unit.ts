import { expect } from "@test/unit";
import { parseInstructions, part1, part2 } from "./day12";
import { loadInput } from "../utils";

describe("day12", () => {
    describe("part1", () => {
        it("example 1", () => {
            const testInput = loadInput("day12", { filename: "testInput1" });
            const instructions = parseInstructions(testInput);

            const result = part1(instructions);

            expect(result).to.equal(25);
        });
    });
    describe("part2", () => {
        it("example 1", () => {
            const testInput = loadInput("day12", { filename: "testInput1" });
            const instructions = parseInstructions(testInput);

            const result = part2(instructions);

            expect(result).to.equal(286);
        });
    });
});
