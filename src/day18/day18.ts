import { loadInput, multiply, splitLines, toInt } from "../utils";
import _ from "lodash";

export function day18() {
    const input = loadInput("day18");
    const lines = parseInput(input);

    return {
        part1: () => part1(lines),
        part2: () => part2(lines)
    };
}

export function parseInput(input: string) {
    return splitLines(input);
}

export function part1(expressions: string[]) {
    const { evaluate } = buildExpressionEvaluator(buildBaseEvaluator());
    return _.sum(expressions.map(evaluate));

    function buildBaseEvaluator() {
        return {
            evaluate(expression: string) {
                const tokens = expression.split(" ");
                const values = tokens.filter(token => !["+", "*"].includes(token)).map(toInt);
                const operators = tokens.filter(token => ["+", "*"].includes(token));

                let result = values[0];
                for (let i = 0; i < operators.length; i++) {
                    if (operators[i] === "+") {
                        result += values[i + 1];
                    } else {
                        result *= values[i + 1];
                    }
                }
                return result;
            }
        };
    }
}

export function part2(expressions: string[]) {
    const { evaluate } = buildExpressionEvaluator(buildBaseEvaluator());
    return _.sum(expressions.map(evaluate));

    function buildBaseEvaluator() {
        return {
            evaluate(expression: string) {
                const tokens = expression.split(" ");

                while(tokens.includes("+")) {
                    const position = tokens.indexOf("+");
                    const sum = toInt(tokens[position - 1]) + toInt(tokens[position + 1]);
                    tokens[position] = sum.toString();
                    tokens.splice(position + 1, 1);
                    tokens.splice(position - 1, 1);
                }

                return multiply(tokens.filter(token => token !== "*").map(toInt));
            }
        };
    }
}

interface Evaluator {
    evaluate(expression: string): number;
}

function buildExpressionEvaluator(baseEvaluator: Evaluator) {
    return { evaluate };

    function evaluate(expression: string): number {
        const parenthesesGroups = expression.match(/\(([^()]+)\)/g);
        if (! parenthesesGroups) {
            return baseEvaluator.evaluate(expression);
        }
        let newExpression = expression;
        for (const group of parenthesesGroups) {
            const value = evaluate(group.slice(1, group.length - 1))!;
            newExpression = newExpression.replace(group, value.toString());
        }
        return evaluate(newExpression);
    }
}
