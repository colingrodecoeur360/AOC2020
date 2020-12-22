import { loadInput, splitLines, splitParagraphs, toInt } from "../utils";
import _ from "lodash";

export function day22() {
    const input = loadInput("day22");
    const game = parseInput(input);

    return {
        part1: () => part1(game),
        part2: () => part2(game)
    };
}

interface Game {
    p1: number[];
    p2: number[];
}
interface Result {
    winner: "p1" | "p2";
    hand: number[];
}
const Hand = {
    isEmpty(hand: number[]) {
        return hand.length === 0;
    },
    hasEnoughCards(hand: number[], card: number) {
        return hand.length >= card;
    },
    getFirstNCards(hand: number[], n: number) {
        return hand.slice(0, n);
    },
    computeScore(hand: number[]) {
        return _.sum(hand.reverse().map((card, index) => card * (index + 1)));
    }
};

export function parseInput(input: string) {
    const [p1, p2] = splitParagraphs(input);
    return {
        p1: splitLines(p1).slice(1).map(toInt),
        p2: splitLines(p2).slice(1).map(toInt)
    };
}

export function part1(_game: Game) {
    const game = _.cloneDeep(_game);
    while (! Hand.isEmpty(game.p1) && ! Hand.isEmpty(game.p2)) {
        const c1 = game.p1.shift()!;
        const c2 = game.p2.shift()!;
        if (c1 > c2) {
            game.p1.push(c1, c2);
        } else {
            game.p2.push(c2, c1);
        }
    }
    const winningHand = game.p1.length ? game.p1 : game.p2;
    return Hand.computeScore(winningHand);
}

export function part2(_game: Game) {
    const { hand } = play(_game)!;
    return Hand.computeScore(hand);

    function play(game: Game): Result {
        const states = new Set<string>();

        while (! Hand.isEmpty(game.p1) && ! Hand.isEmpty(game.p2)) {
            if (states.has(JSON.stringify(game))) {
                return { winner: "p1", hand: game.p1 };
            }
            states.add(JSON.stringify(game));

            const c1 = game.p1.shift()!;
            const c2 = game.p2.shift()!;

            const winner = computeWinner(game, c1, c2);
            if (winner === "p1") {
                game.p1.push(c1, c2);
            } else {
                game.p2.push(c2, c1);
            }
        }
        if (game.p1.length) {
            return { winner: "p1", hand: game.p1 };
        } else {
            return { winner: "p2", hand: game.p2 };
        }
    }

    function computeWinner(game: Game, c1: number, c2: number) {
        if (Hand.hasEnoughCards(game.p1, c1) && Hand.hasEnoughCards(game.p2, c2)) {
            return play({
                p1: Hand.getFirstNCards(game.p1, c1),
                p2: Hand.getFirstNCards(game.p2, c2)
            }).winner;
        } else {
            return c1 > c2 ? "p1" : "p2";
        }
    }
}
