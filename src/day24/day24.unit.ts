import { expect } from "@test/unit";
import { parseInput, part1, part2 } from "./day24";
import { loadInput } from "../utils";

describe("day24", () => {
    it("part 1", () => {
        const testInput = loadInput("day24", { filename: "testInput1" });
        const instructions = parseInput(testInput);

        expect(part1(instructions)).to.equal(10);
    });
    it("part 2", () => {
        const testInput = loadInput("day24", { filename: "testInput1" });
        const instructions = parseInput(testInput);

        expect(part2(instructions)).to.equal(2208);
    });
});
