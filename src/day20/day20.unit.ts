import { expect } from "@test/unit";
import { flip, rotate, generateAllPossibleTiles } from "./day20";

describe("day20", () => {
    let cells: string[][];
    beforeEach(async () => {
        cells = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];
    });

    describe("flip", () => {
        it("should work", () => {
            expect(flip(cells)).to.deep.equal([["3", "2", "1"], ["6", "5", "4"], ["9", "8", "7"]]);
        });
        it("should be the identity when composed twice", () => {
            expect(flip(flip(cells))).to.deep.equal(cells);
        });
    });
    describe("rotate", () => {
        it("should work", () => {
            expect(rotate(cells)).to.deep.equal([["7", "4", "1"], ["8", "5", "2"], ["9", "6", "3"]]);
        });
        it("should be the identity when composed 4 times", () => {
            expect(rotate(rotate(rotate(rotate(cells))))).to.deep.equal(cells);
        });
    });
    describe("generateAllPossibleTiles", () => {
        it("should work", () => {
            const tilesById = {
                "123": {
                    tileId: "123",
                    cells: [["1", "2"], ["3", "4"]]
                }
            };
            expect(generateAllPossibleTiles(tilesById)).to.have.deep.members([
                { tileId: "123", cells: [["1", "2"], ["3", "4"]] },
                { tileId: "123", cells: [["3", "1"], ["4", "2"]] },
                { tileId: "123", cells: [["4", "3"], ["2", "1"]] },
                { tileId: "123", cells: [["2", "4"], ["1", "3"]] },
                { tileId: "123", cells: [["2", "1"], ["4", "3"]] },
                { tileId: "123", cells: [["4", "2"], ["3", "1"]] },
                { tileId: "123", cells: [["3", "4"], ["1", "2"]] },
                { tileId: "123", cells: [["1", "3"], ["2", "4"]] }
            ]);
        });
    });
});
