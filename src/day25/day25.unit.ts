import { expect } from "@test/unit";
import { parseInput, part1 } from "./day25";
import { loadInput } from "../utils";

describe("day25", () => {
    describe("part1", () => {
        it("example 1", () => {
            const testInput = loadInput("day25", { filename: "testInput1" });
            const [cardPublicKey, doorPublicKey] = parseInput(testInput);

            expect(part1(cardPublicKey, doorPublicKey)).to.equal(14897079);
        });
    });
});
