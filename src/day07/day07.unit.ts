import { expect } from "@test/unit";
import { parseInput, part1, part2 } from "./day07";
import { loadInput } from "../utils";

describe("day07", () => {

    describe("part1", () => {
        it("should return the number of possible outer bags", () => {
            const testInput = loadInput("day07", { filename: "testInput1" });
            const rules = parseInput(testInput);

            expect(part1(rules)).to.equal(4);
        });
    });
    describe("part2", () => {
        it("should return the total number of contained bags (example 1)", () => {
            const testInput = loadInput("day07", { filename: "testInput1" });
            const rules = parseInput(testInput);

            expect(part2(rules)).to.equal(32);
        });
        it("should return the total number of contained bags (example 2)", () => {
            const testInput = loadInput("day07", { filename: "testInput2" });
            const rules = parseInput(testInput);

            expect(part2(rules)).to.equal(126);
        });
    });
});
