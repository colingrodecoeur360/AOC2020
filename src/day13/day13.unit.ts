import { expect } from "@test/unit";
import { part1, part2 } from "./day13";

describe("day13", () => {
    it("part1", () => {
        expect(part1(939, "7,13,x,x,59,x,31,19".split(","))).to.equal(295);
    });
    it("part2", () => {
        expect(part2("7,13,x,x,59,x,31,19".split(","))).to.equal(1068781);
        expect(part2("67,7,59,61".split(","))).to.equal(754018);
        expect(part2("67,x,7,59,61".split(","))).to.equal(779210);
        expect(part2("67,7,x,59,61".split(","))).to.equal(1261476);
        expect(part2("1789,37,47,1889".split(","))).to.equal(1202161486);
    });
});
