import { loadInput, splitParagraphs, toInt } from "../utils";
import _ from "lodash";

export function day16() {
    const input = loadInput("day16");
    const notes = parseInput(input);

    return {
        part1: () => part1(notes),
        part2: () => part2(notes)
    };
}

interface Constraint {
    min: number;
    max: number;
}
interface Rule {
    name: string;
    constraints: Constraint[];
}
type Ticket = number[];

interface Notes {
    rules: Rule[];
    ticket: Ticket;
    nearbyTickets: Ticket[];
}

export function parseInput(input: string): Notes {
    const [rules, ticket, nearbyTickets] = splitParagraphs(input);
    return {
        rules: rules
            .split("\n")
            .map(parseRule),
        ticket: parseTicket(ticket.split("\n")[1]),
        nearbyTickets: nearbyTickets
            .split("\n")
            .slice(1)
            .map(parseTicket)
    };

    function parseRule(rule: string) {
        const name = rule.split(": ")[0];
        const constraints = rule
            .split(": ")[1]
            .split(" or ")
            .map((constraint) => {
                const [min, max] = constraint.split("-").map(toInt);
                return { min, max };
            });
        return { name, constraints };
    }
    function parseTicket(t: string) {
        return t.split(",").map(toInt);
    }
}

export function part1(notes: Notes) {
    const { invalidValues } = computeTicketsValidity(notes);
    return _.sum(invalidValues);
}

export function part2(notes: Notes) {
    let result = 1;
    Object.entries(getPositionByRuleName(notes)).forEach(([ruleName, position]) => {
        if (ruleName.startsWith("departure")) {
            result *= notes.ticket[position];
        }
    });
    return result;
}

function computeTicketsValidity(notes: Notes) {
    const invalidValues: number[] = [];
    const validTickets: Ticket[] = [];
    notes.nearbyTickets.forEach((ticket) => {
        const invalidValue = ticket.find(value => ! isSomeRuleSatisfied(notes.rules, value));
        if (_.isUndefined(invalidValue)) {
            validTickets.push(ticket);
        } else {
            invalidValues.push(invalidValue);
        }
    });
    return { validTickets, invalidValues };
}

export function getPositionByRuleName(notes: Notes) {
    const { validTickets } = computeTicketsValidity(notes);
    const possiblePositionsByRule = computePossiblePositionsByRule(notes.rules, validTickets);

    const positionByRuleName: Record<string, number> = {};
    for (let i = 0; i < notes.rules.length; i++) {
        const [name, [position]] = Object.entries(possiblePositionsByRule).find(([, positions]) => positions.size === 1)!;
        positionByRuleName[name] = position;
        Object.values(possiblePositionsByRule).forEach(positions => positions.delete(position));
    }
    return positionByRuleName;
}

function computePossiblePositionsByRule(rules: Rule[], tickets: Ticket[]) {
    const satisfiedRulesByTicket = tickets.map((ticket) => {
        return ticket.map((value) => {
            return rules.filter(rule => isRuleSatisfied(rule, value)).map(rule => rule.name);
        });
    });
    const possiblePositionsByRule: Record<string, Set<number>> = {};
    rules.forEach((rule) => {
        const positions: Set<number> = new Set();
        for (let i = 0; i < rules.length; i++) {
            if (satisfiedRulesByTicket.every((ticket) => ticket[i].includes(rule.name))) {
                positions.add(i);
            }
        }
        possiblePositionsByRule[rule.name] = positions;
    });
    return possiblePositionsByRule;
}

function isSomeRuleSatisfied(rules: Rule[], value: number) {
    return rules.some(rule => isRuleSatisfied(rule, value));
}
function isRuleSatisfied(rule: Rule, value: number) {
    return rule.constraints.some(constraint => isConstraintSatisfied(constraint, value));
}
function isConstraintSatisfied(constraint: Constraint, value: number) {
    return constraint.min <= value && value <= constraint.max;
}
