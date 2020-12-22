import { expect } from "@test/unit";
import { parseInput, part1, part2 } from "./day22";
import { loadInput } from "../utils";

describe("day22", () => {
    describe("part1", () => {
        it("example 1", () => {
            const testInput = loadInput("day22", { filename: "testInput1" });
            const game = parseInput(testInput);

            expect(part1(game)).to.equal(306);
        });
    });
    describe("part2", () => {
        it("example 1", () => {
            const testInput = loadInput("day22", { filename: "testInput1" });
            const game = parseInput(testInput);

            expect(part2(game)).to.equal(291);
        });
        it("example 2", () => {
            const testInput = loadInput("day22", { filename: "testInput2" });
            const game = parseInput(testInput);

            expect(part2(game)).to.equal(105);
        });
    });
});
