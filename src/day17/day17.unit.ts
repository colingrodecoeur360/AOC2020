import { expect } from "@test/unit";
import { loadInput } from "../utils";
import { parseInput, part1, part2 } from "./day17";

describe("day17", () => {
    describe("part1", () => {
        it("example 1", () => {
            const testInput = loadInput("day17", { filename: "testInput1" });
            const grid = parseInput(testInput);

            expect(part1(grid)).to.equal(112);
        });
    });
    describe("part2", () => {
        it("example 1", () => {
            const testInput = loadInput("day17", { filename: "testInput1" });
            const grid = parseInput(testInput);

            expect(part2(grid)).to.equal(848);
        });
    });
});
