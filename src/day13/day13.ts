import { getBezoutCoeffs, loadInput, splitLines, toInt } from "../utils";
import _ from "lodash";

export function day13() {
    const input = loadInput("day13");
    const { arrival, buses } = parseInput(input);

    return {
        part1: () => part1(arrival, buses),
        part2: () => part2(buses)
    };
}

export function parseInput(input: string) {
    const [line1, line2] = splitLines(input);
    const buses = line2.split(",");
    return {
        arrival: toInt(line1),
        buses
    };
}

export function part1(arrival: number, buses: string[]) {
    const earliestDepartures = buses.filter(busId => busId != "x").map((busId) => {
        const frequency = toInt(busId);
        return { busId, nextDeparture: frequency - arrival % frequency };
    });
    const earliestBus = _.minBy(earliestDepartures, "nextDeparture")!;
    return toInt(earliestBus.busId) * earliestBus.nextDeparture;
}

export function part2(buses: string[]) {
    // Application of the Chinese remainder theorem

    const constraints: Constraint[] = [];
    buses.forEach((busId, index) => {
        if (busId === "x") { return; }
        const frequency = toInt(busId);
        const offset = frequency - index % frequency;
        constraints.push({ frequency, offset });
    });
    const product = constraints.reduce((acc, constraint) => acc * constraint.frequency, 1);

    let result = 0n;
    constraints.forEach((constraint) => {
        const [, v] = getBezoutCoeffs(constraint.frequency, product / constraint.frequency);
        result += BigInt(constraint.offset) * BigInt(v * (product / constraint.frequency));
    });
    return toInt((result % BigInt(product)).toString());
}

interface Constraint {
    frequency: number;
    offset: number;
}
