import { loadInput, toInt } from "../utils";
import _ from "lodash";

export function day23() {
    const input = loadInput("day23");
    const cups = parseInput(input);

    return {
        part1: () => part1(cups),
        part2: () => part2(cups)
    };
}

export function parseInput(input: string) {
    return input.trim().split("").map(toInt);
}

interface Cup {
    value: number;
    next?: Cup;
}

export function part1(cups: number[]) {
    const game = buildCrabGame(cups, 9);
    game.runNTurns(100);
    return game.getPart1Result();
}

export function part2(cups: number[]) {
    const game = buildCrabGame(cups, 1000000);
    game.runNTurns(10000000);
    return game.getPart2Result();
}


function buildCrabGame(cups: number[], nbCups: number) {
    const state: Record<number, Cup> = initializeState();
    let currentCup: Cup = state[cups[0]];

    return {
        run() {
            const nextCup1 = currentCup.next!;
            const nextCup2 = nextCup1.next!;
            const nextCup3 = nextCup2.next!;
            const next3CupsValues = [nextCup1, nextCup2, nextCup3].map(cup => cup.value);
            let destinationValue = currentCup.value - 1 || nbCups;
            while (next3CupsValues.includes(destinationValue)) {
                destinationValue = (destinationValue - 1) || nbCups;
            }
            const destinationCup = state[destinationValue];
            [currentCup.next, destinationCup.next, nextCup3.next] = [nextCup3.next!, nextCup1, destinationCup.next!];
            currentCup = currentCup.next!;
        },
        runNTurns(nbTurns: number) {
            _.range(nbTurns).forEach(() => this.run());
        },
        getPart1Result() {
            let result = "";
            let cup = state[1];
            _.range(nbCups - 1).forEach(() => {
                cup = cup.next!;
                result += cup.value;
            });
            return toInt(result);
        },
        getPart2Result() {
            return state[1]!.next!.value * state[1]!.next!.next!.value;
        }
    };

    function initializeState() {
        const allCups = _.range(1, nbCups + 1);
        cups.forEach((cup, index) => allCups[index] = cup);
        const map: Record<number, Cup> = {};
        allCups.forEach(value => map[value] = { value });
        allCups.forEach((value, index) => {
            const nextCup = allCups[(index + 1) % nbCups];
            map[value].next = map[nextCup];
        });
        return map;
    }
}
