import { expect } from "@test/unit";
import { parseInput, buildSeatMap } from "./day11";
import { loadInput } from "../utils";

describe("day11", () => {
    describe("part1", () => {
        it("should compute the seat map using the first rule", () => {
            const testInput = loadInput("day11", { filename: "testInput1" });
            const lines = parseInput(testInput);
            const rule = {
                immediateNeighbors: true,
                reproduction: 0,
                extinction: 4
            };
            const seatMap = buildSeatMap(lines, rule);

            seatMap.stabilize();

            expect(seatMap.getNbOccupiedSeats()).to.equal(37);
        });
    });
    describe("part2", () => {
        it("should compute the seat map using the second rule", () => {
            const testInput = loadInput("day11", { filename: "testInput1" });
            const lines = parseInput(testInput);
            const rule = {
                immediateNeighbors: false,
                reproduction: 0,
                extinction: 5
            };
            const seatMap = buildSeatMap(lines, rule);

            seatMap.stabilize();

            expect(seatMap.getNbOccupiedSeats()).to.equal(26);
        });
    });
});
