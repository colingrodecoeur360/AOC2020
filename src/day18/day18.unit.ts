import { expect } from "@test/unit";
import { part1, part2 } from "./day18";

describe("day18", () => {
    it("part 1", () => {
        expect(part1(["1 + 2 * 3 + 4 * 5 + 6"])).to.equal(71);
        expect(part1(["1 + (2 * 3) + (4 * (5 + 6))"])).to.equal(51);
        expect(part1(["2 * 3 + (4 * 5)"])).to.equal(26);
        expect(part1(["5 + (8 * 3 + 9 + 3 * 4 * 3)"])).to.equal(437);
        expect(part1(["5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"])).to.equal(12240);
        expect(part1(["((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"])).to.equal(13632);
    });
    it("part 2", () => {
        expect(part2(["1 + 2 * 3 + 4 * 5 + 6"])).to.equal(231);
        expect(part2(["1 + (2 * 3) + (4 * (5 + 6))"])).to.equal(51);
        expect(part2(["2 * 3 + (4 * 5)"])).to.equal(46);
        expect(part2(["5 + (8 * 3 + 9 + 3 * 4 * 3)"])).to.equal(1445);
        expect(part2(["5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"])).to.equal(669060);
        expect(part2(["((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"])).to.equal(23340);
    });
});
