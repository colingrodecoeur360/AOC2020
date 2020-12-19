import { expect } from "@test/unit";
import { parseInput, part1, part2 } from "./day19";
import { loadInput } from "../utils";

describe("day19", () => {
    describe("part1", () => {
        it("example 1", () => {
            const testInput = loadInput("day19", { filename: "testInput1" });
            const { rules, messages } = parseInput(testInput);

            expect(part1(rules, messages)).to.equal(2);
        });
        it("example 2", () => {
            const testInput = loadInput("day19", { filename: "testInput2" });
            const { rules, messages } = parseInput(testInput);

            expect(part1(rules, messages)).to.equal(2);
        });
        it("example 3", () => {
            const testInput = loadInput("day19", { filename: "testInput3" });
            const { rules, messages } = parseInput(testInput);

            expect(part1(rules, messages)).to.equal(3);
        });
    });
    describe("part2", () => {
        it("example 3", () => {
            const testInput = loadInput("day19", { filename: "testInput3" });
            const { rules, messages } = parseInput(testInput);

            expect(part2(rules, messages)).to.equal(12);
        });
    });
});
