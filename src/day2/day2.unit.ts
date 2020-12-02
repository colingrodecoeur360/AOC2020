import { expect } from "@test/unit";
import { buildValidators } from "./day2";

describe("day2", () => {
    const validators = buildValidators();

    describe("part1", () => {
        it("should return false if the letter's number of occurrences is inferior to the lower bound", () => {
            const row = "1-3 b: cdefg";

            const result = validators.part1(row);

            expect(result).to.be.false;
        });
        it("should return true if the letter's number of occurrences is equal to the lower bound", () => {
            const row = "1-3 b: bcdefg";

            const result = validators.part1(row);

            expect(result).to.be.true;
        });
        it("should return true if the letter's number of occurrences is strictly within the bounds", () => {
            const row = "1-3 a: aabcde";

            const result = validators.part1(row);

            expect(result).to.be.true;
        });
        it("should return true if the letter's number of occurrences is equal to the upper bound", () => {
            const row = "2-4 c: cccc";

            const result = validators.part1(row);

            expect(result).to.be.true;
        });
        it("should return false if the letter's number of occurrences is superior to the lower bound", () => {
            const row = "2-4 c: ccccc";

            const result = validators.part1(row);

            expect(result).to.be.false;
        });
    });
    describe("part2", () => {
        it("should return true if the letter is present exactly once in the right positions", () => {
            const row = "1-3 a: abcde";

            const result = validators.part2(row);

            expect(result).to.be.true;
        });
        it("should return false if the letter is not present in the right positions", () => {
            const row = "1-3 b: cdefg";

            const result = validators.part2(row);

            expect(result).to.be.false;
        });
        it("should return false if the letter is present twice in the right positions", () => {
            const row = "2-4 c: cccc";

            const result = validators.part2(row);

            expect(result).to.be.false;
        });
    });
});
