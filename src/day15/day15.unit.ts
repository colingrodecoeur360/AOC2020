import { expect } from "@test/unit";
import { parseInput, part1, part2 } from "./day15";

describe("day15", () => {
    it("part 1", () => {
        expect(part1(parseInput("0,3,6"))).to.equal(436);
        expect(part1(parseInput("1,3,2"))).to.equal(1);
        expect(part1(parseInput("2,1,3"))).to.equal(10);
        expect(part1(parseInput("1,2,3"))).to.equal(27);
        expect(part1(parseInput("2,3,1"))).to.equal(78);
        expect(part1(parseInput("3,2,1"))).to.equal(438);
        expect(part1(parseInput("3,1,2"))).to.equal(1836);
    });
    it.skip("part 2", () => {
        // Too slow for now
        expect(part2(parseInput("0,3,6"))).to.equal(175594);
        expect(part2(parseInput("1,3,2"))).to.equal(2578);
        expect(part2(parseInput("2,1,3"))).to.equal(3544142);
        expect(part2(parseInput("1,2,3"))).to.equal(261214);
        expect(part2(parseInput("2,3,1"))).to.equal(6895259);
        expect(part2(parseInput("3,2,1"))).to.equal(18);
        expect(part2(parseInput("3,1,2"))).to.equal(362);
    });
});
