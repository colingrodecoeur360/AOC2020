import { expect } from "@test/unit";
import { parseInput, part1, part2 } from "./day23";

describe("day23", () => {
    const cups = parseInput("389125467");

    it("part1", () => {
        expect(part1(cups)).to.equal(67384529);
    });
    it("part2", () => {
        expect(part2(cups)).to.equal(149245887792);
    }).timeout(10000);
});
