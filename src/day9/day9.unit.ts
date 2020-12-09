import { expect } from "@test/unit";
import { part1, part2 } from "./day9";

describe("day9", () => {
    const PREAMBLE_LENGTH = 5;
    const numbers = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576];

    describe("part1", () => {
        it("should return null", () => {
            expect(part1(numbers, PREAMBLE_LENGTH)).to.equal(127);
        });
    });
    describe("part2", () => {
        it("should return null", () => {
            expect(part2(numbers, PREAMBLE_LENGTH)).to.equal(62);
        });
    });
});
