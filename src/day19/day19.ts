import { loadInput, splitLines, splitParagraphs } from "../utils";
import _ from "lodash";

export function day19() {
    const input = loadInput("day19");
    const { rulesByIndex, messages } = parseInput(input);

    return {
        part1: () => part1(rulesByIndex, messages),
        part2: () => part2(rulesByIndex, messages)
    };
}

interface ConstantRule {
    index: string;
    type: "constant";
    value: string;
}
interface NestedRule {
    index: string;
    type: "nested";
    subRules: string[][];
}
type Rule = ConstantRule | NestedRule;

export function parseInput(input: string) {
    const [rawRules, rawMessages] = splitParagraphs(input);
    const rulesByIndex: Record<string, Rule> = {};
    splitLines(rawRules).forEach((rawRule) => {
        const [index, ruleDTO] = rawRule.split(": ");
        if (ruleDTO.includes('"')) {
            rulesByIndex[index] = {
                index,
                type: "constant",
                value: ruleDTO[1]
            };
        } else {
            rulesByIndex[index] = {
                index,
                type: "nested",
                subRules: ruleDTO.split(" | ").map(subRule => subRule.split(" "))
            };
        }
    });
    return {
        rulesByIndex,
        messages: splitLines(rawMessages)
    };
}

export function part1(rulesByIndex: Record<string, Rule>, messages: string[]) {
    const regex = new RegExp(`^${buildRegex(rulesByIndex[0])}$`, "g");
    return messages.filter(message => message.match(regex)).length;

    function buildRegex(rule: Rule): string {
        if (rule.type === "constant") { return rule.value; }
        if (rule.type === "nested") { return `(${rule.subRules.map(buildSubRegex).join("|")})`; }
        throw new Error("Invalid rule");

        function buildSubRegex(subRule: string[]) {
            return subRule.map(ruleIndex => buildRegex(rulesByIndex[ruleIndex])).join("");
        }
    }
}

export function part2(rulesByIndex: Record<string, Rule>, messages: string[]) {
    const regex = new RegExp(`^${buildRegex(rulesByIndex[0])}$`, "g");
    return messages.filter(message => message.match(regex)).length;

    function buildRegex(rule: Rule): string {
        if (rule.type === "constant") { return rule.value; }
        if (rule.type === "nested") {
            if (rule.index === "8") {
                return `(${buildRegex(rulesByIndex[42])}+)`;
            } else if (rule.index === "11") {
                const regex42 = `(${buildRegex(rulesByIndex[42])})`;
                const regex31 = `(${buildRegex(rulesByIndex[31])})`;

                let subRegex = `${_.repeat(regex42, 1)}${_.repeat(regex31, 1)}`;
                subRegex += `|${_.repeat(regex42, 2)}${_.repeat(regex31, 2)}`;
                subRegex += `|${_.repeat(regex42, 3)}${_.repeat(regex31, 3)}`;
                subRegex += `|${_.repeat(regex42, 4)}${_.repeat(regex31, 4)}`;
                return `(${subRegex})`;
            } else {
                return `(${rule.subRules.map(buildSubRegex).join("|")})`;
            }
        }
        throw new Error("Invalid rule");

        function buildSubRegex(subRule: string[]) {
            return subRule.map(ruleIndex => buildRegex(rulesByIndex[ruleIndex])).join("");
        }
    }
}
