import { displaySolutions } from "./utils";
import { day1 } from "./day1";
import { day2 } from "./day2";
import { day3 } from "./day3";
import { day4 } from "./day4";
import { day5 } from "./day5";
import { day6 } from "./day6";
import { day7 } from "./day7";
import { day8 } from "./day8";

displaySolutions({
    1: day1(),
    2: day2(),
    3: day3(),
    4: day4(),
    5: day5(),
    6: day6(),
    7: day7(),
    8: day8()
}, { latest: true });
