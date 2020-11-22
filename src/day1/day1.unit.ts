import { expect } from "@test/unit";
import { part1, part2 } from "./day1";

describe("day1", () => {
    describe("part1", () => {
        it("should return null when the array has less than 2 elements", () => {
            expect(part1([], 6)).to.be.null;
            expect(part1([6], 6)).to.be.null;
        });
        it("should return null when no pair of numbers have the target sum", () => {
            expect(part1([2, 3], 6)).to.be.null;
        });
        it("should return the product of 2 numbers that have the target sum", () => {
            expect(part1([2, 3], 5)).to.equal(2 * 3);
            expect(part1([3, 3], 6)).to.equal(3 * 3);
            expect(part1([2, 3, 4], 6)).to.equal(2 * 4);
            expect(part1([1, 2, 3], 5)).to.equal(2 * 3);
            expect(part1([5, 0], 5)).to.equal(0);
        });
    });
    describe("part2", () => {
        it("should return null when the array has less than 3 elements", () => {
            expect(part2([], 6)).to.be.null;
            expect(part2([6], 6)).to.be.null;
            expect(part2([2, 4], 6)).to.be.null;
        });
        it("should return null when no triplet of numbers have the target sum", () => {
            expect(part2([1, 2, 3], 7)).to.be.null;
        });
        it("should return the product of 3 numbers that have the target sum", () => {
            expect(part2([2, 3, 4], 9)).to.equal(2 * 3 * 4);
            expect(part2([1, 2, 3, 4], 9)).to.equal(2 * 3 * 4);
            expect(part2([5, 0, 0], 5)).to.equal(0);
        });
    });
});
