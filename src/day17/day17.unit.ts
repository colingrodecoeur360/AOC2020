import { expect } from "@test/unit";
import { loadInput } from "../utils";
import { parseInput } from "./day17";
import { part1 } from "./part1";
import { part2 } from "./part2";

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
