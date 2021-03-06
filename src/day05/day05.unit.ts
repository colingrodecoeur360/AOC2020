import { expect } from "@test/unit";
import { getSeatId } from "./day05";

describe("day05", () => {
    it("should convert a boarding pass to a seat ID", () => {
        expect(getSeatId("BFFFBBFRRR")).to.equal(567);
        expect(getSeatId("FFFBBBFRRR")).to.equal(119);
        expect(getSeatId("BBFFBBFRLL")).to.equal(820);
    });
});
