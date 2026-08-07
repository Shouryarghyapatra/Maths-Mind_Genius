// ============================================================
// MATHMIND AI
// FACTORS AND MULTIPLES QUESTION ENGINE
//
// 25 Direct Question Patterns
// 25 Word-Problem Patterns
// ============================================================


// ============================================================
// HELPER FUNCTIONS
// ============================================================

function fmRandom(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


function fmChoose(values) {
    return values[
        fmRandom(
            0,
            values.length - 1
        )
    ];
}


function fmGCD(a, b) {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));

    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}


function fmLCM(a, b) {
    return Math.abs(a * b) / fmGCD(a, b);
}


function fmFactors(number) {
    const factors = [];

    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            factors.push(i);
        }
    }

    return factors;
}


function fmPrimeFactors(number) {
    const factors = [];
    let value = number;
    let divisor = 2;

    while (value > 1) {
        while (value % divisor === 0) {
            factors.push(divisor);
            value = value / divisor;
        }

        divisor++;
    }

    return factors;
}


function fmIsPrime(number) {
    if (number < 2) {
        return false;
    }

    for (
        let i = 2;
        i <= Math.sqrt(number);
        i++
    ) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}


function fmUnique(values) {
    return [...new Set(values)];
}


function fmFormatList(values) {
    return values.join(", ");
}


function fmDifficultyMax(difficulty) {
    if (difficulty === "easy") {
        return 30;
    }

    if (difficulty === "medium") {
        return 100;
    }

    return 300;
}


function fmCreateNumberWithFactors(
    difficulty
) {
    const max =
        fmDifficultyMax(difficulty);

    return fmRandom(
        6,
        max
    );
}


// ============================================================
// 25 DIRECT QUESTION PATTERNS
// ============================================================

const factorsMultiplesDirectPatterns = [

    // 1. Find all factors

    function (difficulty) {

        const number =
            fmChoose(
                difficulty === "easy"
                    ? [12, 16, 18, 20, 24, 28, 30]
                    : difficulty === "medium"
                        ? [36, 40, 42, 48, 54, 60, 72, 84]
                        : [90, 96, 108, 120, 144, 180, 210]
            );

        const answer =
            fmFormatList(
                fmFactors(number)
            );

        return {
            question:
                `Write all the positive factors of ${number}. ` +
                `Separate them using commas.`,

            answer,

            acceptedAnswers: [
                answer,
                fmFactors(number).join(" ")
            ],

            type: "direct",
            pattern: 1
        };
    },


    // 2. Number of factors

    function (difficulty) {

        const number =
            fmChoose(
                difficulty === "easy"
                    ? [12, 16, 18, 20, 24]
                    : difficulty === "medium"
                        ? [36, 40, 48, 60, 72]
                        : [96, 120, 144, 180, 210]
            );

        return {
            question:
                `How many positive factors does ${number} have?`,

            answer:
                fmFactors(number).length,

            type: "direct",
            pattern: 2
        };
    },


    // 3. Is it a factor?

    function (difficulty) {

        const number =
            fmCreateNumberWithFactors(
                difficulty
            );

        let possibleFactor =
            fmRandom(
                2,
                Math.max(
                    3,
                    Math.floor(number / 2)
                )
            );

        const answer =
            number % possibleFactor === 0
                ? "Yes"
                : "No";

        return {
            question:
                `Is ${possibleFactor} a factor of ${number}? ` +
                `Answer Yes or No.`,

            answer,

            acceptedAnswers: [
                answer,
                answer.toLowerCase()
            ],

            type: "direct",
            pattern: 3
        };
    },


    // 4. Find the smallest factor greater than 1

    function (difficulty) {

        let number;

        do {
            number =
                fmCreateNumberWithFactors(
                    difficulty
                );
        } while (
            fmIsPrime(number)
        );

        const factors =
            fmFactors(number);

        return {
            question:
                `Find the smallest factor of ${number} ` +
                `that is greater than 1.`,

            answer:
                factors[1],

            type: "direct",
            pattern: 4
        };
    },


    // 5. Find the greatest factor less than the number

    function (difficulty) {

        const number =
            fmCreateNumberWithFactors(
                difficulty
            );

        return {
            question:
                `Find the greatest factor of ${number} ` +
                `that is smaller than ${number}.`,

            answer:
                number === 1
                    ? 1
                    : number / fmFactors(number)[1],

            type: "direct",
            pattern: 5
        };
    },


    // 6. First five multiples

    function (difficulty) {

        const number =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 10
                    : difficulty === "medium"
                        ? 20
                        : 50
            );

        const multiples = [];

        for (let i = 1; i <= 5; i++) {
            multiples.push(
                number * i
            );
        }

        return {
            question:
                `Write the first five positive multiples of ${number}. ` +
                `Separate them using commas.`,

            answer:
                fmFormatList(multiples),

            acceptedAnswers: [
                fmFormatList(multiples),
                multiples.join(" ")
            ],

            type: "direct",
            pattern: 6
        };
    },


    // 7. Find the next multiple

    function (difficulty) {

        const number =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 12
                    : 40
            );

        const multiplier =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 10
                    : 30
            );

        const current =
            number * multiplier;

        return {
            question:
                `What is the next multiple of ${number} ` +
                `after ${current}?`,

            answer:
                current + number,

            type: "direct",
            pattern: 7
        };
    },


    // 8. Is it a multiple?

    function (difficulty) {

        const base =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 10
                    : 30
            );

        const multiplier =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 10
                    : 30
            );

        let number;

        if (Math.random() < 0.5) {
            number =
                base * multiplier;
        } else {
            number =
                (base * multiplier) + 1;
        }

        const answer =
            number % base === 0
                ? "Yes"
                : "No";

        return {
            question:
                `Is ${number} a multiple of ${base}? ` +
                `Answer Yes or No.`,

            answer,

            acceptedAnswers: [
                answer,
                answer.toLowerCase()
            ],

            type: "direct",
            pattern: 8
        };
    },


    // 9. Common factors

    function (difficulty) {

        const common =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 5
                    : 15
            );

        const first =
            common *
            fmRandom(2, 8);

        const second =
            common *
            fmRandom(2, 8);

        const commonFactors =
            fmFactors(
                fmGCD(first, second)
            );

        return {
            question:
                `Write all the common factors of ${first} and ${second}. ` +
                `Separate them using commas.`,

            answer:
                fmFormatList(commonFactors),

            acceptedAnswers: [
                fmFormatList(commonFactors),
                commonFactors.join(" ")
            ],

            type: "direct",
            pattern: 9
        };
    },


    // 10. HCF / GCF

    function (difficulty) {

        const common =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 10
                    : 30
            );

        const first =
            common *
            fmRandom(2, 10);

        const second =
            common *
            fmRandom(2, 10);

        return {
            question:
                `Find the HCF (or GCF) of ${first} and ${second}.`,

            answer:
                fmGCD(first, second),

            type: "direct",
            pattern: 10
        };
    },


    // 11. LCM

    function (difficulty) {

        const first =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 12
                    : 30
            );

        const second =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 12
                    : 30
            );

        return {
            question:
                `Find the LCM of ${first} and ${second}.`,

            answer:
                fmLCM(first, second),

            type: "direct",
            pattern: 11
        };
    },


    // 12. Prime or composite

    function (difficulty) {

        const number =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 50
                    : difficulty === "medium"
                        ? 150
                        : 300
            );

        const answer =
            fmIsPrime(number)
                ? "Prime"
                : "Composite";

        return {
            question:
                `Is ${number} a prime number or a composite number?`,

            answer,

            acceptedAnswers: [
                answer,
                answer.toLowerCase()
            ],

            type: "direct",
            pattern: 12
        };
    },


    // 13. Find the next prime

    function (difficulty) {

        const start =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 30
                    : 150
            );

        let answer =
            start + 1;

        while (
            !fmIsPrime(answer)
        ) {
            answer++;
        }

        return {
            question:
                `Find the smallest prime number greater than ${start}.`,

            answer,

            type: "direct",
            pattern: 13
        };
    },


    // 14. Prime factorization

    function (difficulty) {

        const number =
            fmChoose(
                difficulty === "easy"
                    ? [12, 18, 20, 24, 30, 36]
                    : difficulty === "medium"
                        ? [48, 60, 72, 84, 90, 120]
                        : [144, 180, 210, 240, 270, 300]
            );

        const factors =
            fmPrimeFactors(number);

        return {
            question:
                `Write the prime factorization of ${number}. ` +
                `Use × between the factors.`,

            answer:
                factors.join(" × "),

            acceptedAnswers: [
                factors.join(" × "),
                factors.join("x"),
                factors.join("*"),
                factors.join(" ")
            ],

            type: "direct",
            pattern: 14
        };
    },


    // 15. Divisibility by 2

    function () {

        const number =
            fmRandom(
                10,
                999
            );

        const answer =
            number % 2 === 0
                ? "Yes"
                : "No";

        return {
            question:
                `Is ${number} divisible by 2? ` +
                `Answer Yes or No.`,

            answer,

            acceptedAnswers: [
                answer,
                answer.toLowerCase()
            ],

            type: "direct",
            pattern: 15
        };
    },


    // 16. Divisibility by 3

    function () {

        const number =
            fmRandom(
                10,
                999
            );

        const answer =
            number % 3 === 0
                ? "Yes"
                : "No";

        return {
            question:
                `Is ${number} divisible by 3? ` +
                `Answer Yes or No.`,

            answer,

            acceptedAnswers: [
                answer,
                answer.toLowerCase()
            ],

            type: "direct",
            pattern: 16
        };
    },


    // 17. Divisibility by 5

    function () {

        const number =
            fmRandom(
                10,
                999
            );

        const answer =
            number % 5 === 0
                ? "Yes"
                : "No";

        return {
            question:
                `Is ${number} divisible by 5? ` +
                `Answer Yes or No.`,

            answer,

            acceptedAnswers: [
                answer,
                answer.toLowerCase()
            ],

            type: "direct",
            pattern: 17
        };
    },


    // 18. Divisibility by 10

    function () {

        const number =
            fmRandom(
                10,
                999
            );

        const answer =
            number % 10 === 0
                ? "Yes"
                : "No";

        return {
            question:
                `Is ${number} divisible by 10? ` +
                `Answer Yes or No.`,

            answer,

            acceptedAnswers: [
                answer,
                answer.toLowerCase()
            ],

            type: "direct",
            pattern: 18
        };
    },


    // 19. Smallest common multiple

    function (difficulty) {

        const first =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 10
                    : 25
            );

        const second =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 10
                    : 25
            );

        return {
            question:
                `What is the smallest positive number that is ` +
                `a multiple of both ${first} and ${second}?`,

            answer:
                fmLCM(first, second),

            type: "direct",
            pattern: 19
        };
    },


    // 20. Greatest common factor

    function (difficulty) {

        const common =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 8
                    : 25
            );

        const first =
            common *
            fmRandom(2, 10);

        const second =
            common *
            fmRandom(2, 10);

        return {
            question:
                `What is the greatest positive number that divides ` +
                `both ${first} and ${second} exactly?`,

            answer:
                fmGCD(first, second),

            type: "direct",
            pattern: 20
        };
    },


    // 21. Missing factor

    function (difficulty) {

        const first =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 12
                    : 50
            );

        const second =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 12
                    : 50
            );

        const product =
            first * second;

        return {
            question:
                `${first} × x = ${product}. Find x.`,

            answer:
                second,

            type: "direct",
            pattern: 21
        };
    },


    // 22. Largest multiple below a number

    function (difficulty) {

        const base =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 12
                    : 40
            );

        const limit =
            fmRandom(
                base + 1,
                difficulty === "easy"
                    ? 100
                    : 500
            );

        const answer =
            Math.floor(
                (limit - 1) / base
            ) * base;

        return {
            question:
                `Find the greatest multiple of ${base} ` +
                `that is less than ${limit}.`,

            answer,

            type: "direct",
            pattern: 22
        };
    },


    // 23. Smallest multiple above a number

    function (difficulty) {

        const base =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 12
                    : 40
            );

        const limit =
            fmRandom(
                base + 1,
                difficulty === "easy"
                    ? 100
                    : 500
            );

        const answer =
            Math.ceil(
                (limit + 1) / base
            ) * base;

        return {
            question:
                `Find the smallest multiple of ${base} ` +
                `that is greater than ${limit}.`,

            answer,

            type: "direct",
            pattern: 23
        };
    },


    // 24. HCF of three numbers

    function (difficulty) {

        const common =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 5
                    : 20
            );

        const first =
            common *
            fmRandom(2, 7);

        const second =
            common *
            fmRandom(2, 7);

        const third =
            common *
            fmRandom(2, 7);

        const answer =
            fmGCD(
                fmGCD(first, second),
                third
            );

        return {
            question:
                `Find the HCF of ${first}, ${second}, and ${third}.`,

            answer,

            type: "direct",
            pattern: 24
        };
    },


    // 25. LCM of three numbers

    function (difficulty) {

        const first =
            fmRandom(2, 10);

        const second =
            fmRandom(2, 10);

        const third =
            fmRandom(2, 10);

        const answer =
            fmLCM(
                fmLCM(first, second),
                third
            );

        return {
            question:
                `Find the LCM of ${first}, ${second}, and ${third}.`,

            answer,

            type: "direct",
            pattern: 25
        };
    }

];


// ============================================================
// 25 WORD-PROBLEM PATTERNS
// ============================================================

const factorsMultiplesWordPatterns = [

    // 1. Equal groups

    function (difficulty) {

        const groupSize =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 10
                    : 30
            );

        const groups =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 10
                    : 30
            );

        const total =
            groupSize * groups;

        return {
            question:
                `A teacher has ${total} pencils and wants to ` +
                `put the same number of pencils into ${groups} boxes. ` +
                `How many pencils will be in each box?`,

            answer:
                groupSize,

            type: "word",
            pattern: 1
        };
    },


    // 2. Packing items

    function (difficulty) {

        const itemsPerBox =
            fmRandom(2, 20);

        const boxes =
            fmRandom(2, 30);

        const total =
            itemsPerBox * boxes;

        return {
            question:
                `${total} cookies are packed equally into boxes. ` +
                `If each box holds ${itemsPerBox} cookies, ` +
                `how many boxes are needed?`,

            answer:
                boxes,

            type: "word",
            pattern: 2
        };
    },


    // 3. Bell ringing

    function (difficulty) {

        const first =
            fmRandom(2, 15);

        const second =
            fmRandom(2, 15);

        return {
            question:
                `One bell rings every ${first} minutes and another ` +
                `bell rings every ${second} minutes. If they ring ` +
                `together now, after how many minutes will they ` +
                `ring together again?`,

            answer:
                fmLCM(first, second),

            type: "word",
            pattern: 3
        };
    },


    // 4. Bus schedules

    function (difficulty) {

        const first =
            fmRandom(5, 20);

        const second =
            fmRandom(5, 20);

        return {
            question:
                `Bus A arrives every ${first} minutes and Bus B ` +
                `arrives every ${second} minutes. If both arrive now, ` +
                `after how many minutes will they arrive together again?`,

            answer:
                fmLCM(first, second),

            type: "word",
            pattern: 4
        };
    },


    // 5. Cutting ribbons

    function (difficulty) {

        const first =
            fmRandom(10, 100);

        const second =
            fmRandom(10, 100);

        const answer =
            fmGCD(first, second);

        return {
            question:
                `Two ribbons are ${first} cm and ${second} cm long. ` +
                `They must be cut into the longest possible equal pieces ` +
                `with no ribbon left over. How long is each piece?`,

            answer,

            type: "word",
            pattern: 5
        };
    },


    // 6. Arranging chairs

    function (difficulty) {

        const rows =
            fmRandom(2, 20);

        const chairsPerRow =
            fmRandom(2, 20);

        const total =
            rows * chairsPerRow;

        return {
            question:
                `${total} chairs are arranged in ${rows} equal rows. ` +
                `How many chairs are in each row?`,

            answer:
                chairsPerRow,

            type: "word",
            pattern: 6
        };
    },


    // 7. Making equal teams

    function (difficulty) {

        const teamSize =
            fmRandom(2, 15);

        const teams =
            fmRandom(2, 15);

        const total =
            teamSize * teams;

        return {
            question:
                `${total} students are divided into equal teams of ` +
                `${teamSize}. How many teams are formed?`,

            answer:
                teams,

            type: "word",
            pattern: 7
        };
    },


    // 8. Sharing fruits

    function (difficulty) {

        const people =
            fmRandom(2, 20);

        const fruitsEach =
            fmRandom(2, 20);

        const total =
            people * fruitsEach;

        return {
            question:
                `${total} oranges are shared equally among ${people} children. ` +
                `How many oranges does each child receive?`,

            answer:
                fruitsEach,

            type: "word",
            pattern: 8
        };
    },


    // 9. Tile arrangement

    function (difficulty) {

        const rows =
            fmRandom(2, 20);

        const columns =
            fmRandom(2, 20);

        const total =
            rows * columns;

        return {
            question:
                `A floor has ${total} square tiles arranged in ` +
                `${rows} equal rows. How many tiles are in each row?`,

            answer:
                columns,

            type: "word",
            pattern: 9
        };
    },


    // 10. Common gift bags

    function (difficulty) {

        const first =
            fmRandom(20, 100);

        const second =
            fmRandom(20, 100);

        const answer =
            fmGCD(first, second);

        return {
            question:
                `A shop has ${first} candies and ${second} chocolates. ` +
                `It wants to make the greatest possible number of identical ` +
                `gift bags with nothing left over. How many gift bags can be made?`,

            answer,

            type: "word",
            pattern: 10
        };
    },


    // 11. Lights flashing

    function (difficulty) {

        const first =
            fmRandom(2, 20);

        const second =
            fmRandom(2, 20);

        return {
            question:
                `A red light flashes every ${first} seconds and a blue ` +
                `light flashes every ${second} seconds. After how many ` +
                `seconds will both lights flash together again?`,

            answer:
                fmLCM(first, second),

            type: "word",
            pattern: 11
        };
    },


    // 12. Equal garden sections

    function (difficulty) {

        const length =
            fmRandom(20, 150);

        const width =
            fmRandom(20, 150);

        return {
            question:
                `A rectangular garden is ${length} m long and ${width} m wide. ` +
                `It is divided into the largest possible square sections. ` +
                `What is the side length of each square section?`,

            answer:
                fmGCD(length, width),

            type: "word",
            pattern: 12
        };
    },


    // 13. Exercise schedule

    function (difficulty) {

        const first =
            fmRandom(2, 14);

        const second =
            fmRandom(2, 14);

        return {
            question:
                `A student practices math every ${first} days and ` +
                `science every ${second} days. If both are practiced today, ` +
                `after how many days will both be practiced on the same day again?`,

            answer:
                fmLCM(first, second),

            type: "word",
            pattern: 13
        };
    },


    // 14. Packaging bottles

    function (difficulty) {

        const bottlesPerBox =
            fmRandom(2, 24);

        const boxes =
            fmRandom(2, 30);

        const total =
            bottlesPerBox * boxes;

        return {
            question:
                `A factory has ${total} bottles. They are packed ` +
                `equally into boxes containing ${bottlesPerBox} bottles each. ` +
                `How many boxes are needed?`,

            answer:
                boxes,

            type: "word",
            pattern: 14
        };
    },


    // 15. Sports groups

    function (difficulty) {

        const playersPerTeam =
            fmRandom(2, 15);

        const teams =
            fmRandom(2, 20);

        const total =
            playersPerTeam * teams;

        return {
            question:
                `${total} players are divided equally into teams. ` +
                `If each team has ${playersPerTeam} players, ` +
                `how many teams are there?`,

            answer:
                teams,

            type: "word",
            pattern: 15
        };
    },


    // 16. Two medicine schedules

    function (difficulty) {

        const first =
            fmRandom(2, 12);

        const second =
            fmRandom(2, 12);

        return {
            question:
                `One reminder appears every ${first} hours and another ` +
                `appears every ${second} hours. If both appear now, ` +
                `after how many hours will they appear together again?`,

            answer:
                fmLCM(first, second),

            type: "word",
            pattern: 16
        };
    },


    // 17. Cutting wood

    function (difficulty) {

        const first =
            fmRandom(20, 200);

        const second =
            fmRandom(20, 200);

        return {
            question:
                `Two wooden boards are ${first} cm and ${second} cm long. ` +
                `They are cut into equal pieces of the greatest possible length. ` +
                `What is the length of each piece?`,

            answer:
                fmGCD(first, second),

            type: "word",
            pattern: 17
        };
    },


    // 18. Challenge: three bells

    function (difficulty) {

        const first =
            fmRandom(2, 10);

        const second =
            fmRandom(2, 10);

        const third =
            fmRandom(2, 10);

        const answer =
            fmLCM(
                fmLCM(first, second),
                third
            );

        return {
            question:
                `Three bells ring every ${first}, ${second}, and ${third} minutes. ` +
                `If they ring together now, after how many minutes will all ` +
                `three ring together again?`,

            answer,

            type: "word",
            pattern: 18
        };
    },


    // 19. Challenge: three ropes

    function (difficulty) {

        const first =
            fmRandom(20, 120);

        const second =
            fmRandom(20, 120);

        const third =
            fmRandom(20, 120);

        const answer =
            fmGCD(
                fmGCD(first, second),
                third
            );

        return {
            question:
                `Three ropes are ${first} m, ${second} m, and ${third} m long. ` +
                `They are cut into the longest possible equal lengths with no waste. ` +
                `How long is each piece?`,

            answer,

            type: "word",
            pattern: 19
        };
    },


    // 20. Rows and columns

    function (difficulty) {

        const rows =
            fmRandom(2, 30);

        const columns =
            fmRandom(2, 30);

        const total =
            rows * columns;

        return {
            question:
                `A school arranges ${total} desks in equal rows. ` +
                `If there are ${columns} desks in each row, ` +
                `how many rows are there?`,

            answer:
                rows,

            type: "word",
            pattern: 20
        };
    },


    // 21. Factory production

    function (difficulty) {

        const itemsPerHour =
            fmRandom(5, 100);

        const hours =
            fmRandom(2, 20);

        const total =
            itemsPerHour * hours;

        return {
            question:
                `A factory produces ${itemsPerHour} toys each hour. ` +
                `How many toys does it produce in ${hours} hours?`,

            answer:
                total,

            type: "word",
            pattern: 21
        };
    },


    // 22. Seating challenge

    function (difficulty) {

        const students =
            fmChoose(
                difficulty === "easy"
                    ? [24, 30, 36, 40, 48]
                    : [60, 72, 84, 90, 120]
            );

        const groupSize =
            fmChoose(
                fmFactors(students)
                    .filter(
                        value =>
                            value > 1 &&
                            value < students
                    )
            );

        return {
            question:
                `${students} students must be arranged into equal groups ` +
                `of ${groupSize}. How many groups will there be?`,

            answer:
                students / groupSize,

            type: "word",
            pattern: 22
        };
    },


    // 23. Number pattern

    function (difficulty) {

        const base =
            fmRandom(
                2,
                difficulty === "easy"
                    ? 10
                    : 30
            );

        const position =
            fmRandom(
                5,
                30
            );

        return {
            question:
                `A number pattern starts with ${base} and increases by ${base} ` +
                `each time: ${base}, ${base * 2}, ${base * 3}, ... ` +
                `What is the ${position}th number?`,

            answer:
                base * position,

            type: "word",
            pattern: 23
        };
    },


    // 24. Greatest number of identical packs

    function (difficulty) {

        const first =
            fmRandom(20, 150);

        const second =
            fmRandom(20, 150);

        return {
            question:
                `A store has ${first} red pencils and ${second} blue pencils. ` +
                `It wants to create the greatest possible number of identical packs, ` +
                `using all the pencils. How many packs can it make?`,

            answer:
                fmGCD(first, second),

            type: "word",
            pattern: 24
        };
    },


    // 25. Advanced challenge

    function (difficulty) {

        const first =
            fmRandom(2, 12);

        const second =
            fmRandom(2, 12);

        const lcm =
            fmLCM(first, second);

        const multiplier =
            fmRandom(2, 10);

        const total =
            lcm * multiplier;

        return {
            question:
                `A number is a multiple of both ${first} and ${second}. ` +
                `It is also less than ${total + lcm}. ` +
                `What is the greatest possible multiple of both?`,

            answer:
                total,

            type: "word",
            pattern: 25
        };
    }

];


// ============================================================
// MAIN QUESTION GENERATOR
// ============================================================

function generateFactorsMultiplesQuestion(
    difficulty,
    questionCategory,
    usedPatterns = []
) {

    let patterns;

    if (
        questionCategory === "word"
    ) {
        patterns =
            factorsMultiplesWordPatterns;
    } else {
        patterns =
            factorsMultiplesDirectPatterns;
    }


    const availableIndexes = [];


    for (
        let index = 0;
        index < patterns.length;
        index++
    ) {

        if (
            !usedPatterns.includes(index)
        ) {
            availableIndexes.push(index);
        }
    }


    let selectedIndex;


    if (
        availableIndexes.length > 0
    ) {

        selectedIndex =
            availableIndexes[
                fmRandom(
                    0,
                    availableIndexes.length - 1
                )
            ];

    } else {

        selectedIndex =
            fmRandom(
                0,
                patterns.length - 1
            );
    }


    const question =
        patterns[selectedIndex](
            difficulty
        );


    question.patternIndex =
        selectedIndex;


    question.topic =
        "factors-multiples";


    return question;
}