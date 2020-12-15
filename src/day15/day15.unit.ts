import { expect } from "@test/unit";
import { parseInput, part1, part2 } from "./day15";

describe("day15", () => {
    describe("part 1", () => {
        const testCases = {
            "0,3,6": 436,
            "1,3,2": 1,
            "2,1,3": 10,
            "1,2,3": 27,
            "2,3,1": 78,
            "3,2,1": 438,
            "3,1,2": 1836
        };
        Object.entries(testCases).forEach(([input, expectedValue]) => {
            it(`should work with the input ${input}`, () => {
                expect(part1(parseInput(input))).to.equal(expectedValue);
            });
        });
    });
    describe("part 2", () => {
        const testCases = {
            "0,3,6": 175594,
            "1,3,2": 2578,
            "2,1,3": 3544142,
            "1,2,3": 261214,
            "2,3,1": 6895259,
            "3,2,1": 18,
            "3,1,2": 362
        };
        Object.entries(testCases).forEach(([input, expectedValue]) => {
            it(`should work with the input ${input}`, () => {
                expect(part2(parseInput(input))).to.equal(expectedValue);
            }).timeout(5000);
        });
    });
});
