import { expect } from "@test/unit";
import { buildGrid, buildGridExplorer, GridExplorer, Slope } from "./day3";
import { loadInput } from "../utils";

describe("day3", () => {
    const input = loadInput("day3", { filename: "testInput" });
    const grid = buildGrid(input);
    let gridExplorer: GridExplorer;
    let slope: Slope;

    describe("part1", () => {
        beforeEach(() => {
            slope = { right: 3, down : 1 };
            gridExplorer = buildGridExplorer(grid, slope);
        });

        it("should move following the slope", () => {
            gridExplorer.move();

            expect(gridExplorer.getPosition()).to.deep.equal({ i: 1, j: 3 });
        });
        it("should come back to the start of the row when reaching its end", () => {
            gridExplorer.move();
            gridExplorer.move();
            gridExplorer.move();
            gridExplorer.move();

            expect(gridExplorer.getPosition()).to.deep.equal({ i: 4, j: 1 });
        });
        it("should explore the grid until it reaches its bottom", () => {
            gridExplorer.explore();

            expect(gridExplorer.getPosition().i).to.be.below(grid.nbRows);
            expect(gridExplorer.getPosition().i).to.be.above(grid.nbRows - slope.down - 1);
        });
        it("should throw when trying to move down after the grid has been explored", () => {
            gridExplorer.explore();
            const moveCall = () => gridExplorer.move();

            expect(moveCall).to.throw("Row index out of bounds");
        });
        it("should give the number of trees met during the exploration", () => {
            gridExplorer.explore();

            expect(gridExplorer.getNbTrees()).to.equal(7);
        });
    });

    describe("part2", () => {
        it("should give the right number of trees for slope #1", () => {
            slope = { right: 1, down: 1 };
            gridExplorer = buildGridExplorer(grid, slope);

            gridExplorer.explore();

            expect(gridExplorer.getNbTrees()).to.equal(2);
        });
        it("should give the right number of trees for slope #2", () => {
            slope = { right: 3, down: 1 };
            gridExplorer = buildGridExplorer(grid, slope);

            gridExplorer.explore();

            expect(gridExplorer.getNbTrees()).to.equal(7);
        });
        it("should give the right number of trees for slope #3", () => {
            slope = { right: 5, down: 1 };
            gridExplorer = buildGridExplorer(grid, slope);

            gridExplorer.explore();

            expect(gridExplorer.getNbTrees()).to.equal(3);
        });
        it("should give the right number of trees for slope #4", () => {
            slope = { right: 7, down: 1 };
            gridExplorer = buildGridExplorer(grid, slope);

            gridExplorer.explore();

            expect(gridExplorer.getNbTrees()).to.equal(4);
        });
        it("should give the right number of trees for slope #5", () => {
            slope = { right: 1, down: 2 };
            gridExplorer = buildGridExplorer(grid, slope);

            gridExplorer.explore();

            expect(gridExplorer.getNbTrees()).to.equal(2);
        });
    });
});
