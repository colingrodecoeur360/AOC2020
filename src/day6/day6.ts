import { loadInput } from "../utils";
import _ from "lodash";

export function day6() {
    const input = loadInput("day6");
    const questionnaires = parseInput(input);

    return {
        part1: () => part1(questionnaires),
        part2: () => part2(questionnaires)
    };
}

export function parseInput(input: string) {
    return input.trim().split("\n\n").map((answers) => {
        return answers.replace(/\n/g, " ").split(" ");
    });
}

export function part1(questionnaires: Questionnaire[]) {
    return _.sum(questionnaires.map(questionnaire => {
        const answerCountByQuestion = computeAnswerCountByQuestion(questionnaire);
        return Object.keys(answerCountByQuestion).length;
    }));
}

export function part2(questionnaires: Questionnaire[]) {
    return _.sum(questionnaires.map(questionnaire => {
        const answerCountByQuestion = computeAnswerCountByQuestion(questionnaire);
        const nbResponders = questionnaire.length;
        return Object.values(answerCountByQuestion).filter(nbAnswers => nbAnswers === nbResponders).length;
    }));
}

export function computeAnswerCountByQuestion(questionnaire: Questionnaire) {
    return _.countBy(questionnaire.join(""));
}

type Response = string;
type Questionnaire = Response[];
