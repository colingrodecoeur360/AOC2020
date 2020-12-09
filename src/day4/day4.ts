import { loadInput, isBetween, isNDigitNumber, splitParagraphs } from "../utils";

export function day4() {
    const input = loadInput("day4");
    const passports = parseInput(input);

    return {
        part1: () => part1(passports),
        part2: () => part2(passports)
    };
}

const PASSPORT_KEYS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

export function parseInput(input: string): Passport[] {
    const passportDtos = splitParagraphs(input).map((passport) => {
        return passport.replace(/\n/g, " ").split(" ");
    });
    return passportDtos.map(buildPassport);

    function buildPassport(passportDto: string[]) {
        const result: Passport = {};
        passportDto.forEach(line => {
            const [key, value] = line.split(":");
            if (PASSPORT_KEYS.includes(key)) {
                result[key] = value;
            }
        });
        return result;
    }
}

export function part1(passports: Passport[]) {
    return passports.filter(hasAllMandatoryFields).length;
}

export function part2(passports: Passport[]) {
    return passports.filter(isValid).length;

    function isValid(passport: Passport) {
        if (! hasAllMandatoryFields(passport)) { return false; }

        const validators = buildValidators();
        for (const requiredKey of PASSPORT_KEYS) {
            if (! validators[requiredKey](passport[requiredKey])) { return false; }
        }
        return true;
    }
}

export function hasAllMandatoryFields(passport: Passport) {
    const passportKeys = Object.keys(passport);
    return PASSPORT_KEYS.every(key => passportKeys.includes(key));
}

export function buildValidators(): Record<string, Validator> {
    return {
        byr(value: string) {
            if (! isNDigitNumber(value, 4)) { return false; }
            return isBetween(value, 1920, 2002);
        },
        iyr(value: string) {
            if (! isNDigitNumber(value, 4)) { return false; }
            return isBetween(value, 2010, 2020);
        },
        eyr(value: string) {
            if (! isNDigitNumber(value, 4)) { return false; }
            return isBetween(value, 2020, 2030);
        },
        hgt(value: string) {
            const match = value.match(/^([0-9]{2,5})(cm|in)$/);
            if (! match) { return false; }
            const [, height, unit] = match;
            return (unit === "in" && isBetween(height, 59, 76))
                || (unit === "cm" && isBetween(height, 150, 193));
        },
        hcl(value: string) {
            return !! value.match(/^#[0-9a-f]{6}$/);
        },
        ecl(value: string) {
            return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
        },
        pid(value: string) {
            return isNDigitNumber(value, 9);
        }
    };
}

type Passport = Record<string, string>;
type Validator = (s: string) => boolean;
