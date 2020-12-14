import { loadInput, splitParagraphs } from "../utils";
import _ from "lodash";

export function day06() {
    const input = loadInput("day06");
    const questionnaires = parseInput(input);

    return {
        part1: () => part1(questionnaires),
        part2: () => part2(questionnaires)
    };
}

export function parseInput(input: string) {
    return splitParagraphs(input).map((answers) => {
        return answers.split("\n");
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
