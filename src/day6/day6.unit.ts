import { expect } from "@test/unit";
import { loadInput } from "../utils";
import { computeAnswerCountByQuestion, parseInput, part1, part2 } from "./day6";

describe("day6", () => {
    const testInput = loadInput("day6", { filename: "testInput" });
    const questionnaires = parseInput(testInput);

    describe("computeAnswerCountByQuestion", () => {
        it("should return the number of positive answers by question", () => {
            expect(questionnaires.map(computeAnswerCountByQuestion)).to.deep.equal([
                { a: 1, b: 1, c: 1 },
                { a: 1, b: 1, c: 1 },
                { a: 2, b: 1, c: 1 },
                { a: 4 },
                { b: 1 }
            ]);
        });
    });
    describe("part1", () => {
        it("should return the number of questions to which anyone responded yes", () => {
            expect(part1(questionnaires)).to.equal(11);
        });
    });
    describe("part2", () => {
        it("should return the number of questions to which everyone responded yes", () => {
            expect(part2(questionnaires)).to.equal(6);
        });
    });
});
