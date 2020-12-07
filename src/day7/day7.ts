import { loadInput, toInt } from "../utils";
import _ from "lodash";

const COLOR_SHINY_GOLD = "shiny gold";

export function day7() {
    const input = loadInput("day7");
    const contentByColor = parseInput(input);

    return {
        part1: () => part1(contentByColor),
        part2: () => part2(contentByColor)
    };
}

type Content = null | { value: number, color: string }[];
type ContentByColor = Record<string, Content>;

export function parseInput(input: string) {
    const lines = input.trim().split("\n");
    const contentByColor: ContentByColor = {};
    lines.forEach((line) => {
        const { color, content } = parseLine(line);
        contentByColor[color] = content;
    });
    return contentByColor;

    function parseLine(line: string) {
        const [start, end] = line.split(" contain ");
        const color = start.split(" bags")[0];
        if (end.includes("no other bags")) {
            return { color, content: null };
        }
        const content: Content = [];
        const options = end.split(", ");
        options.forEach((option) => {
            const [value, color1, color2, ] = option.split(" ");
            content.push({
                color: [color1, color2].join(" "),
                value: toInt(value)
            });
        });
        return { color, content };
    }
}

export function part1(contentByColor: ContentByColor) {
    const parentColorsMap = buildParentColorsMap();
    const ancestorColorSet = new Set<string>();
    addParentColorsToSet(COLOR_SHINY_GOLD, ancestorColorSet);
    return ancestorColorSet.size;

    function buildParentColorsMap() {
        const map: Record<string, string[]> = {};
        Object.entries(contentByColor).forEach(([parentColor, content]) => {
            if (content === null) { return; }
            content.forEach(({ color }) => {
                map[color] = [...(map[color] || []), parentColor];
            });
        });
        return map;
    }
    function addParentColorsToSet(color: string, set: Set<string>) {
        if (! parentColorsMap[color]) { return; }
        parentColorsMap[color].forEach((parentColor) => {
            ancestorColorSet.add(parentColor);
            addParentColorsToSet(parentColor, set);
        });
    }
}

export function part2(contentByColor: ContentByColor) {
    return computeNumberOfContainedBags(COLOR_SHINY_GOLD);

    function computeNumberOfContainedBags(parentColor: string): number {
        if (contentByColor[parentColor] === null) { return 0; }
        return _.sum(contentByColor[parentColor]!.map(({ color, value }) => {
            return value * (1 + computeNumberOfContainedBags(color));
        }));
    }
}
