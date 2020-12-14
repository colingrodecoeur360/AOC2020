import { expect } from "@test/unit";
import { buildValidators, hasAllMandatoryFields } from "./day04";

describe("day04", () => {
    describe("hasAllMandatoryFields", () => {
        it("should return true if the passport has all mandatory keys", () => {
            const passport = {
                byr: "byr",
                iyr: "iyr",
                eyr: "eyr",
                hgt: "hgt",
                hcl: "hcl",
                ecl: "ecl",
                pid: "pid"
            };

            const result = hasAllMandatoryFields(passport);

            expect(result).to.be.true;
        });
        it("should return false if the passport is missing a mandatory key", () => {
            const passport = {};

            const result = hasAllMandatoryFields(passport);

            expect(result).to.be.false;
        });
        it("should return true even if the passport has extra keys", () => {
            const passport = {
                byr: "byr",
                iyr: "iyr",
                eyr: "eyr",
                hgt: "hgt",
                hcl: "hcl",
                ecl: "ecl",
                pid: "pid",
                cid: "cid"
            };

            const result = hasAllMandatoryFields(passport);

            expect(result).to.be.true;
        });
    });
    describe("buildValidators", () => {
        const validators = buildValidators();

        it("byr - should be a 4-digit number between 1920 and 2002", () => {
            expect(validators.byr("1919")).to.be.false;
            expect(validators.byr("1920")).to.be.true;
            expect(validators.byr("1950")).to.be.true;
            expect(validators.byr("2002")).to.be.true;
            expect(validators.byr("2003")).to.be.false;
        });
        it("iyr - should be a 4-digit number between 2010 and 2020", () => {
            expect(validators.iyr("2009")).to.be.false;
            expect(validators.iyr("2010")).to.be.true;
            expect(validators.iyr("2015")).to.be.true;
            expect(validators.iyr("2020")).to.be.true;
            expect(validators.iyr("2021")).to.be.false;
        });
        it("eyr - should be a 4-digit number between 2020 and 2030", () => {
            expect(validators.eyr("2019")).to.be.false;
            expect(validators.eyr("2020")).to.be.true;
            expect(validators.eyr("2025")).to.be.true;
            expect(validators.eyr("2030")).to.be.true;
            expect(validators.eyr("2031")).to.be.false;
        });
        it("hgt - should a height in cm or in, within the right bounds", () => {
            expect(validators.hgt("178")).to.be.false;
            expect(validators.hgt("cm")).to.be.false;
            expect(validators.hgt("in")).to.be.false;

            expect(validators.hgt("149cm")).to.be.false;
            expect(validators.hgt("150cm")).to.be.true;
            expect(validators.hgt("193cm")).to.be.true;
            expect(validators.hgt("194cm")).to.be.false;

            expect(validators.hgt("58in")).to.be.false;
            expect(validators.hgt("59in")).to.be.true;
            expect(validators.hgt("76in")).to.be.true;
            expect(validators.hgt("77in")).to.be.false;
        });
        it("hcl - should be a 6-digit color code", () => {
            expect(validators.hcl("#123456")).to.be.true;
            expect(validators.hcl("#abcdef")).to.be.true;
            expect(validators.hcl("#123abc")).to.be.true;

            expect(validators.hcl("123456")).to.be.false;
            expect(validators.hcl("abcdef")).to.be.false;
            expect(validators.hcl("#ghijkl")).to.be.false;
            expect(validators.hcl("#123456789")).to.be.false;
        });
        it("ecl - should be a valid eye color string", () => {
            expect(validators.ecl("amb")).to.be.true;
            expect(validators.ecl("blu")).to.be.true;
            expect(validators.ecl("brn")).to.be.true;
            expect(validators.ecl("gry")).to.be.true;
            expect(validators.ecl("grn")).to.be.true;
            expect(validators.ecl("hzl")).to.be.true;
            expect(validators.ecl("oth")).to.be.true;

            expect(validators.ecl("invalid")).to.be.false;
            expect(validators.ecl("aaa")).to.be.false;
        });
        it("pid - should be a 9-digit number", () => {
            expect(validators.pid("123456789")).to.be.true;
            expect(validators.pid("012345678")).to.be.true;

            expect(validators.pid("123")).to.be.false;
            expect(validators.pid("abcdefghi")).to.be.false;
            expect(validators.pid("123456789123456789")).to.be.false;
        });
    });
});

