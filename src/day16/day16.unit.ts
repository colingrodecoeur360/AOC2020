import { expect } from "@test/unit";
import { parseInput, part1, getPositionByRuleName } from "./day16";
import { loadInput } from "../utils";

describe("day16", () => {
    describe("part1", () => {
        it("example 1", () => {
            const testInput = loadInput("day16", { filename: "testInput1" });
            const notes = parseInput(testInput);

            expect(part1(notes)).to.equal(71);
        });
    });
    describe("part2", () => {
        it("example 1", () => {
            const testInput = loadInput("day16", { filename: "testInput2" });
            const notes = parseInput(testInput);

            expect(getPositionByRuleName(notes)).to.deep.equal({ row: 0, class: 1, seat: 2 });
        });
    });
});
