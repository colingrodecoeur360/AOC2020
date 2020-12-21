import { loadInput, splitLines } from "../utils";
import _ from "lodash";

export function day21() {
    const input = loadInput("day21");
    const foods = parseInput(input);

    return {
        part1: () => part1(foods),
        part2: () => part2(foods)
    };
}

interface Food {
    ingredients: string[];
    allergens: string[];
}

const Foods = {
    filterFoods(foods: Food[], ingredientSet: Set<string>) {
        return foods.map((food) => {
            return {
                allergens: food.allergens,
                ingredients: food.ingredients.filter(ingredient => ingredientSet.has(ingredient))
            };
        });
    },
    getAllergenicIngredientSet(foods: Food[]) {
        const possibleIngredientsByAllergen = Foods.getCandidateIngredientSetByAllergen(foods);
        const allergenicIngredientSet = new Set<string>();
        Object.values(possibleIngredientsByAllergen).forEach((ingredients) => {
            ingredients.forEach(ingredient => allergenicIngredientSet.add(ingredient));
        });
        return allergenicIngredientSet;
    },
    getCandidateIngredientSetByAllergen(foods: Food[]): Record<string, Set<string>> {
        const possibleIngredientsByAllergen: Record<string, string[][]> = {};
        foods.forEach((food) => {
            food.allergens.forEach((allergen) => {
                if (! possibleIngredientsByAllergen[allergen]) {
                    possibleIngredientsByAllergen[allergen] = [];
                }
                possibleIngredientsByAllergen[allergen].push(food.ingredients);
            });
        });
        return Object.fromEntries(Object.entries(possibleIngredientsByAllergen).map(([allergen, ingredientLists]) => {
            return [allergen, new Set(_.intersection(...ingredientLists))];
        }));
    },
    getCountByIngredient(foods: Food[], excludedIngredientSet: Set<string>) {
        const countByIngredient: Record<string, number> = {};
        foods.forEach((food) => {
            food.ingredients.forEach((ingredient) => {
                if (excludedIngredientSet.has(ingredient)) { return; }
                countByIngredient[ingredient] = (countByIngredient[ingredient] || 0) + 1;
            });
        });
        return countByIngredient;
    }
};

export function parseInput(input: string) {
    const foods = splitLines(input);
    return foods.map(parseFood);

    function parseFood(food: string): Food {
        const [ingredients, allergens] = food.replace(")", "").split(" (contains ");
        return {
            ingredients: ingredients.split(" "),
            allergens: allergens.split(", ")
        };
    }
}

export function part1(foods: Food[]) {
    const allergenicIngredientSet = Foods.getAllergenicIngredientSet(foods);
    const countByIngredient = Foods.getCountByIngredient(foods, allergenicIngredientSet);
    return _.sum(Object.values(countByIngredient));
}

export function part2(foods: Food[]) {
    const allergenicIngredientSet = Foods.getAllergenicIngredientSet(foods);
    const allergenicFoods = Foods.filterFoods(foods, allergenicIngredientSet);
    const candidateIngredientSetByAllergen = Foods.getCandidateIngredientSetByAllergen(allergenicFoods);

    const allergenByIngredient: Record<string, string> = {};
    while (! hasMatchedAllAllergens(candidateIngredientSetByAllergen)) {
        const allergen = findAllergenWithUniqueCandidateIngredient(candidateIngredientSetByAllergen);
        const ingredient = [...candidateIngredientSetByAllergen[allergen]][0];
        allergenByIngredient[ingredient] = allergen;
        Object.values(candidateIngredientSetByAllergen).forEach(ingredientSet => ingredientSet.delete(ingredient));
    }
    const sortedIngredients = _.sortBy(Object.entries(allergenByIngredient), ([, allergen]) => allergen);
    return sortedIngredients.map(x => x[0]).join(",");

    function hasMatchedAllAllergens(ingredientSetByAllergen: Record<string, Set<string>>) {
        return Object.values(ingredientSetByAllergen).every(ingredientSet => _.isEmpty(ingredientSet));
    }
    function findAllergenWithUniqueCandidateIngredient(ingredientSetByAllergen: Record<string, Set<string>>) {
        return Object.keys(ingredientSetByAllergen).find((a) => ingredientSetByAllergen[a].size === 1) as string;
    }
}
