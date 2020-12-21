import { expect } from "@test/unit";
import { parseInput, part1, part2 } from "./day21";
import { loadInput } from "../utils";

describe("day21", () => {
    describe("part1", () => {
        it("example 1", () => {
            const testInput = loadInput("day21", { filename: "testInput1" });
            const foods = parseInput(testInput);

            expect(part1(foods)).to.equal(5);
        });
    });
    describe("part2", () => {
        it("example 1", () => {
            const testInput = loadInput("day21", { filename: "testInput1" });
            const foods = parseInput(testInput);

            expect(part2(foods)).to.equal("mxmxvkd,sqjhc,fvjkl");
        });
    });
});
