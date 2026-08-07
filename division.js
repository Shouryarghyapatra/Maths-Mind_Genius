// ============================================================
// MATHMIND AI
// DIVISION QUESTION ENGINE
//
// 25 Direct Question Patterns
// 25 Word-Problem Patterns
//
// Supports:
// Easy, Medium, Hard
// Descriptive mode
// MCQ mode through the main script
// ============================================================


// ============================================================
// HELPER FUNCTIONS
// ============================================================

function divisionRandom(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


function divisionFormat(number) {
    return Number(number).toLocaleString("en-US");
}


function divisionRound(number, decimalPlaces = 2) {
    return Number(
        number.toFixed(decimalPlaces)
    );
}


function divisionGetNumbers(difficulty) {

    let divisor;
    let quotient;

    if (difficulty === "easy") {

        divisor =
            divisionRandom(2, 12);

        quotient =
            divisionRandom(2, 12);

    } else if (difficulty === "medium") {

        divisor =
            divisionRandom(5, 50);

        quotient =
            divisionRandom(10, 100);

    } else {

        divisor =
            divisionRandom(20, 200);

        quotient =
            divisionRandom(50, 500);
    }

    return {
        divisor: divisor,
        quotient: quotient,
        dividend:
            divisor * quotient
    };
}


// ============================================================
// 25 DIRECT DIVISION PATTERNS
// ============================================================

const divisionDirectPatterns = [

    // --------------------------------------------------------
    // 1. Basic exact division
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            divisionGetNumbers(difficulty);

        return {
            question:
                `${divisionFormat(numbers.dividend)} ÷ ` +
                `${divisionFormat(numbers.divisor)} = ?`,

            answer:
                numbers.quotient,

            type: "direct",
            pattern: 1
        };
    },


    // --------------------------------------------------------
    // 2. Missing dividend
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            divisionGetNumbers(difficulty);

        return {
            question:
                `___ ÷ ${numbers.divisor} = ` +
                `${numbers.quotient}`,

            answer:
                numbers.dividend,

            type: "direct",
            pattern: 2
        };
    },


    // --------------------------------------------------------
    // 3. Missing divisor
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            divisionGetNumbers(difficulty);

        return {
            question:
                `${divisionFormat(numbers.dividend)} ÷ ___ = ` +
                `${numbers.quotient}`,

            answer:
                numbers.divisor,

            type: "direct",
            pattern: 3
        };
    },


    // --------------------------------------------------------
    // 4. Missing quotient
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            divisionGetNumbers(difficulty);

        return {
            question:
                `${divisionFormat(numbers.dividend)} ÷ ` +
                `${numbers.divisor} = ___`,

            answer:
                numbers.quotient,

            type: "direct",
            pattern: 4
        };
    },


    // --------------------------------------------------------
    // 5. Division by 10
    // --------------------------------------------------------

    function (difficulty) {

        let quotient;

        if (difficulty === "easy") {

            quotient =
                divisionRandom(2, 100);

        } else if (difficulty === "medium") {

            quotient =
                divisionRandom(100, 1000);

        } else {

            quotient =
                divisionRandom(1000, 10000);
        }

        const dividend =
            quotient * 10;

        return {
            question:
                `${divisionFormat(dividend)} ÷ 10 = ?`,

            answer:
                quotient,

            type: "direct",
            pattern: 5
        };
    },


    // --------------------------------------------------------
    // 6. Division by 100
    // --------------------------------------------------------

    function (difficulty) {

        let quotient;

        if (difficulty === "easy") {

            quotient =
                divisionRandom(1, 50);

        } else if (difficulty === "medium") {

            quotient =
                divisionRandom(50, 1000);

        } else {

            quotient =
                divisionRandom(1000, 10000);
        }

        const dividend =
            quotient * 100;

        return {
            question:
                `${divisionFormat(dividend)} ÷ 100 = ?`,

            answer:
                quotient,

            type: "direct",
            pattern: 6
        };
    },


    // --------------------------------------------------------
    // 7. Division by 1000
    // --------------------------------------------------------

    function (difficulty) {

        let quotient;

        if (difficulty === "easy") {

            quotient =
                divisionRandom(1, 20);

        } else if (difficulty === "medium") {

            quotient =
                divisionRandom(20, 500);

        } else {

            quotient =
                divisionRandom(500, 10000);
        }

        const dividend =
            quotient * 1000;

        return {
            question:
                `${divisionFormat(dividend)} ÷ 1,000 = ?`,

            answer:
                quotient,

            type: "direct",
            pattern: 7
        };
    },


    // --------------------------------------------------------
    // 8. Division by a multiple of 10
    // --------------------------------------------------------

    function (difficulty) {

        let divisor;
        let quotient;

        if (difficulty === "easy") {

            divisor =
                divisionRandom(2, 9) * 10;

            quotient =
                divisionRandom(2, 20);

        } else if (difficulty === "medium") {

            divisor =
                divisionRandom(2, 20) * 10;

            quotient =
                divisionRandom(10, 100);

        } else {

            divisor =
                divisionRandom(10, 100) * 10;

            quotient =
                divisionRandom(50, 500);
        }

        const dividend =
            divisor * quotient;

        return {
            question:
                `${divisionFormat(dividend)} ÷ ` +
                `${divisionFormat(divisor)} = ?`,

            answer:
                quotient,

            type: "direct",
            pattern: 8
        };
    },


    // --------------------------------------------------------
    // 9. Division by 11
    // --------------------------------------------------------

    function (difficulty) {

        let quotient;

        if (difficulty === "easy") {

            quotient =
                divisionRandom(2, 12);

        } else if (difficulty === "medium") {

            quotient =
                divisionRandom(10, 100);

        } else {

            quotient =
                divisionRandom(100, 1000);
        }

        const dividend =
            quotient * 11;

        return {
            question:
                `${divisionFormat(dividend)} ÷ 11 = ?`,

            answer:
                quotient,

            type: "direct",
            pattern: 9
        };
    },


    // --------------------------------------------------------
    // 10. Division by 25
    // --------------------------------------------------------

    function (difficulty) {

        let quotient;

        if (difficulty === "easy") {

            quotient =
                divisionRandom(2, 20);

        } else if (difficulty === "medium") {

            quotient =
                divisionRandom(20, 200);

        } else {

            quotient =
                divisionRandom(200, 2000);
        }

        const dividend =
            quotient * 25;

        return {
            question:
                `${divisionFormat(dividend)} ÷ 25 = ?`,

            answer:
                quotient,

            type: "direct",
            pattern: 10
        };
    },


    // --------------------------------------------------------
    // 11. Division by 50
    // --------------------------------------------------------

    function (difficulty) {

        let quotient;

        if (difficulty === "easy") {

            quotient =
                divisionRandom(2, 20);

        } else if (difficulty === "medium") {

            quotient =
                divisionRandom(20, 200);

        } else {

            quotient =
                divisionRandom(200, 2000);
        }

        const dividend =
            quotient * 50;

        return {
            question:
                `${divisionFormat(dividend)} ÷ 50 = ?`,

            answer:
                quotient,

            type: "direct",
            pattern: 11
        };
    },


    // --------------------------------------------------------
    // 12. Division by 100 with decimal answer
    // --------------------------------------------------------

    function (difficulty) {

        let dividend;

        if (difficulty === "easy") {

            dividend =
                divisionRandom(10, 999);

        } else if (difficulty === "medium") {

            dividend =
                divisionRandom(1000, 99999);

        } else {

            dividend =
                divisionRandom(100000, 9999999);
        }

        return {
            question:
                `${divisionFormat(dividend)} ÷ 100 = ?`,

            answer:
                divisionRound(
                    dividend / 100
                ),

            type: "direct",
            pattern: 12
        };
    },


    // --------------------------------------------------------
    // 13. Decimal divided by a whole number
    // --------------------------------------------------------

    function (difficulty) {

        let divisor;
        let quotient;

        if (difficulty === "easy") {

            divisor =
                divisionRandom(2, 10);

            quotient =
                divisionRandom(10, 100) / 10;

        } else if (difficulty === "medium") {

            divisor =
                divisionRandom(2, 20);

            quotient =
                divisionRandom(10, 1000) / 10;

        } else {

            divisor =
                divisionRandom(5, 50);

            quotient =
                divisionRandom(100, 10000) / 100;
        }

        quotient =
            divisionRound(quotient);

        const dividend =
            divisionRound(
                divisor * quotient
            );

        return {
            question:
                `${dividend} ÷ ${divisor} = ?`,

            answer:
                quotient,

            type: "direct",
            pattern: 13
        };
    },


    // --------------------------------------------------------
    // 14. Decimal divided by a decimal
    // --------------------------------------------------------

    function (difficulty) {

        let divisor;
        let quotient;

        if (difficulty === "easy") {

            divisor =
                divisionRandom(2, 9) / 10;

            quotient =
                divisionRandom(2, 20);

        } else if (difficulty === "medium") {

            divisor =
                divisionRandom(10, 50) / 10;

            quotient =
                divisionRandom(10, 100);

        } else {

            divisor =
                divisionRandom(10, 100) / 10;

            quotient =
                divisionRandom(50, 500);
        }

        divisor =
            divisionRound(divisor);

        const dividend =
            divisionRound(
                divisor * quotient
            );

        return {
            question:
                `${dividend} ÷ ${divisor} = ?`,

            answer:
                quotient,

            type: "direct",
            pattern: 14
        };
    },


    // --------------------------------------------------------
    // 15. Divide a product
    // --------------------------------------------------------

    function (difficulty) {

        let first;
        let second;
        let divisor;

        if (difficulty === "easy") {

            first =
                divisionRandom(2, 12);

            second =
                divisionRandom(2, 12);

            divisor =
                first;

        } else if (difficulty === "medium") {

            first =
                divisionRandom(10, 100);

            second =
                divisionRandom(5, 50);

            divisor =
                first;

        } else {

            first =
                divisionRandom(100, 1000);

            second =
                divisionRandom(20, 200);

            divisor =
                first;
        }

        const product =
            first * second;

        return {
            question:
                `(${divisionFormat(first)} × ` +
                `${divisionFormat(second)}) ÷ ` +
                `${divisionFormat(divisor)} = ?`,

            answer:
                second,

            type: "direct",
            pattern: 15
        };
    },


    // --------------------------------------------------------
    // 16. Divide after addition
    // --------------------------------------------------------

    function (difficulty) {

        let divisor;
        let firstQuotient;
        let secondQuotient;

        if (difficulty === "easy") {

            divisor =
                divisionRandom(2, 10);

            firstQuotient =
                divisionRandom(2, 10);

            secondQuotient =
                divisionRandom(2, 10);

        } else if (difficulty === "medium") {

            divisor =
                divisionRandom(5, 50);

            firstQuotient =
                divisionRandom(10, 100);

            secondQuotient =
                divisionRandom(10, 100);

        } else {

            divisor =
                divisionRandom(20, 200);

            firstQuotient =
                divisionRandom(50, 500);

            secondQuotient =
                divisionRandom(50, 500);
        }

        const firstNumber =
            divisor * firstQuotient;

        const secondNumber =
            divisor * secondQuotient;

        return {
            question:
                `(${divisionFormat(firstNumber)} + ` +
                `${divisionFormat(secondNumber)}) ÷ ` +
                `${divisionFormat(divisor)} = ?`,

            answer:
                firstQuotient +
                secondQuotient,

            type: "direct",
            pattern: 16
        };
    },


    // --------------------------------------------------------
    // 17. Divide after subtraction
    // --------------------------------------------------------

    function (difficulty) {

        let divisor;
        let largerQuotient;
        let smallerQuotient;

        if (difficulty === "easy") {

            divisor =
                divisionRandom(2, 10);

            largerQuotient =
                divisionRandom(8, 20);

            smallerQuotient =
                divisionRandom(2, 7);

        } else if (difficulty === "medium") {

            divisor =
                divisionRandom(5, 50);

            largerQuotient =
                divisionRandom(50, 200);

            smallerQuotient =
                divisionRandom(10, 49);

        } else {

            divisor =
                divisionRandom(20, 200);

            largerQuotient =
                divisionRandom(200, 1000);

            smallerQuotient =
                divisionRandom(50, 199);
        }

        const firstNumber =
            divisor * largerQuotient;

        const secondNumber =
            divisor * smallerQuotient;

        return {
            question:
                `(${divisionFormat(firstNumber)} − ` +
                `${divisionFormat(secondNumber)}) ÷ ` +
                `${divisionFormat(divisor)} = ?`,

            answer:
                largerQuotient -
                smallerQuotient,

            type: "direct",
            pattern: 17
        };
    },


    // --------------------------------------------------------
    // 18. Find half
    // --------------------------------------------------------

    function (difficulty) {

        let answer;

        if (difficulty === "easy") {

            answer =
                divisionRandom(5, 50);

        } else if (difficulty === "medium") {

            answer =
                divisionRandom(50, 1000);

        } else {

            answer =
                divisionRandom(1000, 10000);
        }

        const number =
            answer * 2;

        return {
            question:
                `Find one-half of ` +
                `${divisionFormat(number)}.`,

            answer:
                answer,

            type: "direct",
            pattern: 18
        };
    },


    // --------------------------------------------------------
    // 19. Find one-fourth
    // --------------------------------------------------------

    function (difficulty) {

        let answer;

        if (difficulty === "easy") {

            answer =
                divisionRandom(2, 50);

        } else if (difficulty === "medium") {

            answer =
                divisionRandom(50, 1000);

        } else {

            answer =
                divisionRandom(1000, 10000);
        }

        const number =
            answer * 4;

        return {
            question:
                `Find one-fourth of ` +
                `${divisionFormat(number)}.`,

            answer:
                answer,

            type: "direct",
            pattern: 19
        };
    },


    // --------------------------------------------------------
    // 20. Find one-fifth
    // --------------------------------------------------------

    function (difficulty) {

        let answer;

        if (difficulty === "easy") {

            answer =
                divisionRandom(2, 50);

        } else if (difficulty === "medium") {

            answer =
                divisionRandom(50, 1000);

        } else {

            answer =
                divisionRandom(1000, 10000);
        }

        const number =
            answer * 5;

        return {
            question:
                `Find one-fifth of ` +
                `${divisionFormat(number)}.`,

            answer:
                answer,

            type: "direct",
            pattern: 20
        };
    },


    // --------------------------------------------------------
    // 21. Find one-tenth
    // --------------------------------------------------------

    function (difficulty) {

        let answer;

        if (difficulty === "easy") {

            answer =
                divisionRandom(2, 100);

        } else if (difficulty === "medium") {

            answer =
                divisionRandom(100, 1000);

        } else {

            answer =
                divisionRandom(1000, 10000);
        }

        const number =
            answer * 10;

        return {
            question:
                `Find one-tenth of ` +
                `${divisionFormat(number)}.`,

            answer:
                answer,

            type: "direct",
            pattern: 21
        };
    },


    // --------------------------------------------------------
    // 22. Compare two quotients
    // --------------------------------------------------------

    function (difficulty) {

        let divisorA;
        let quotientA;
        let divisorB;
        let quotientB;

        if (difficulty === "easy") {

            divisorA = 4;
            quotientA = 9;

            divisorB = 6;
            quotientB = 8;

        } else if (difficulty === "medium") {

            divisorA = 12;
            quotientA = 25;

            divisorB = 15;
            quotientB = 22;

        } else {

            divisorA = 50;
            quotientA = 300;

            divisorB = 75;
            quotientB = 250;
        }

        const dividendA =
            divisorA * quotientA;

        const dividendB =
            divisorB * quotientB;

        return {
            question:
                `Find the larger quotient: ` +
                `${divisionFormat(dividendA)} ÷ ` +
                `${divisorA} or ` +
                `${divisionFormat(dividendB)} ÷ ` +
                `${divisorB}.`,

            answer:
                Math.max(
                    quotientA,
                    quotientB
                ),

            type: "direct",
            pattern: 22
        };
    },


    // --------------------------------------------------------
    // 23. Divide by 99
    // --------------------------------------------------------

    function (difficulty) {

        let quotient;

        if (difficulty === "easy") {

            quotient =
                divisionRandom(2, 12);

        } else if (difficulty === "medium") {

            quotient =
                divisionRandom(10, 100);

        } else {

            quotient =
                divisionRandom(100, 1000);
        }

        const dividend =
            quotient * 99;

        return {
            question:
                `${divisionFormat(dividend)} ÷ 99 = ?`,

            answer:
                quotient,

            type: "direct",
            pattern: 23
        };
    },


    // --------------------------------------------------------
    // 24. Multi-step division challenge
    // --------------------------------------------------------

    function (difficulty) {

        let divisor;
        let quotient;
        let extra;

        if (difficulty === "easy") {

            divisor =
                divisionRandom(2, 10);

            quotient =
                divisionRandom(5, 20);

            extra =
                divisionRandom(2, 10);

        } else if (difficulty === "medium") {

            divisor =
                divisionRandom(5, 50);

            quotient =
                divisionRandom(20, 200);

            extra =
                divisionRandom(10, 100);

        } else {

            divisor =
                divisionRandom(20, 200);

            quotient =
                divisionRandom(100, 1000);

            extra =
                divisionRandom(50, 500);
        }

        const dividend =
            divisor *
            (quotient + extra);

        return {
            question:
                `(${divisionFormat(dividend)} ÷ ` +
                `${divisionFormat(divisor)}) − ` +
                `${extra} = ?`,

            answer:
                quotient,

            type: "direct",
            pattern: 24
        };
    },


    // --------------------------------------------------------
    // 25. Advanced division challenge
    // --------------------------------------------------------

    function (difficulty) {

        let divisor;
        let first;
        let second;

        if (difficulty === "easy") {

            divisor =
                divisionRandom(2, 10);

            first =
                divisionRandom(5, 20);

            second =
                divisionRandom(5, 20);

        } else if (difficulty === "medium") {

            divisor =
                divisionRandom(5, 50);

            first =
                divisionRandom(20, 200);

            second =
                divisionRandom(20, 200);

        } else {

            divisor =
                divisionRandom(20, 200);

            first =
                divisionRandom(100, 1000);

            second =
                divisionRandom(100, 1000);
        }

        const firstNumber =
            divisor * first;

        const secondNumber =
            divisor * second;

        return {
            question:
                `(${divisionFormat(firstNumber)} + ` +
                `${divisionFormat(secondNumber)}) ÷ ` +
                `${divisionFormat(divisor)} = ?`,

            answer:
                first + second,

            type: "direct",
            pattern: 25
        };
    }

];


// ============================================================
// 25 DIVISION WORD-PROBLEM PATTERNS
// ============================================================

const divisionWordPatterns = [

    // --------------------------------------------------------
    // 1. Sharing books
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            divisionGetNumbers(difficulty);

        return {
            question:
                `${divisionFormat(numbers.dividend)} books are ` +
                `shared equally among ${numbers.divisor} students. ` +
                `How many books does each student receive?`,

            answer:
                numbers.quotient,

            type: "word",
            pattern: 1
        };
    },


    // --------------------------------------------------------
    // 2. Packing apples
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            divisionGetNumbers(difficulty);

        return {
            question:
                `A farmer packs ${divisionFormat(numbers.dividend)} ` +
                `apples equally into ${numbers.divisor} boxes. ` +
                `How many apples are in each box?`,

            answer:
                numbers.quotient,

            type: "word",
            pattern: 2
        };
    },


    // --------------------------------------------------------
    // 3. Equal money sharing
    // --------------------------------------------------------

    function (difficulty) {

        let people;
        let amountEach;

        if (difficulty === "easy") {

            people =
                divisionRandom(2, 10);

            amountEach =
                divisionRandom(5, 50);

        } else if (difficulty === "medium") {

            people =
                divisionRandom(5, 50);

            amountEach =
                divisionRandom(50, 500);

        } else {

            people =
                divisionRandom(20, 200);

            amountEach =
                divisionRandom(500, 5000);
        }

        const total =
            people * amountEach;

        return {
            question:
                `$${divisionFormat(total)} is shared equally ` +
                `among ${people} people. ` +
                `How much money does each person receive?`,

            answer:
                amountEach,

            type: "word",
            pattern: 3
        };
    },


    // --------------------------------------------------------
    // 4. Students in groups
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            divisionGetNumbers(difficulty);

        return {
            question:
                `${divisionFormat(numbers.dividend)} students ` +
                `are divided equally into ${numbers.divisor} groups. ` +
                `How many students are in each group?`,

            answer:
                numbers.quotient,

            type: "word",
            pattern: 4
        };
    },


    // --------------------------------------------------------
    // 5. Pages read each day
    // --------------------------------------------------------

    function (difficulty) {

        let days;
        let pagesPerDay;

        if (difficulty === "easy") {

            days =
                divisionRandom(2, 10);

            pagesPerDay =
                divisionRandom(5, 30);

        } else if (difficulty === "medium") {

            days =
                divisionRandom(5, 30);

            pagesPerDay =
                divisionRandom(20, 100);

        } else {

            days =
                divisionRandom(20, 100);

            pagesPerDay =
                divisionRandom(100, 1000);
        }

        const pages =
            days * pagesPerDay;

        return {
            question:
                `A student reads ${divisionFormat(pages)} pages ` +
                `in ${days} days at the same rate. ` +
                `How many pages does the student read each day?`,

            answer:
                pagesPerDay,

            type: "word",
            pattern: 5
        };
    },


    // --------------------------------------------------------
    // 6. Distance per day
    // --------------------------------------------------------

    function (difficulty) {

        let days;
        let distancePerDay;

        if (difficulty === "easy") {

            days =
                divisionRandom(2, 10);

            distancePerDay =
                divisionRandom(5, 50);

        } else if (difficulty === "medium") {

            days =
                divisionRandom(5, 30);

            distancePerDay =
                divisionRandom(50, 500);

        } else {

            days =
                divisionRandom(20, 100);

            distancePerDay =
                divisionRandom(500, 5000);
        }

        const totalDistance =
            days * distancePerDay;

        return {
            question:
                `A car travels ${divisionFormat(totalDistance)} km ` +
                `in ${days} days at the same rate. ` +
                `How far does it travel each day?`,

            answer:
                distancePerDay,

            type: "word",
            pattern: 6
        };
    },


    // --------------------------------------------------------
    // 7. Cookies in packets
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            divisionGetNumbers(difficulty);

        return {
            question:
                `${divisionFormat(numbers.dividend)} cookies ` +
                `are packed equally into ${numbers.divisor} packets. ` +
                `How many cookies are in each packet?`,

            answer:
                numbers.quotient,

            type: "word",
            pattern: 7
        };
    },


    // --------------------------------------------------------
    // 8. Factory production per machine
    // --------------------------------------------------------

    function (difficulty) {

        let machines;
        let production;

        if (difficulty === "easy") {

            machines =
                divisionRandom(2, 10);

            production =
                divisionRandom(10, 100);

        } else if (difficulty === "medium") {

            machines =
                divisionRandom(10, 50);

            production =
                divisionRandom(100, 1000);

        } else {

            machines =
                divisionRandom(50, 200);

            production =
                divisionRandom(1000, 10000);
        }

        const total =
            machines * production;

        return {
            question:
                `A factory produces ${divisionFormat(total)} items ` +
                `using ${machines} machines equally. ` +
                `How many items does each machine produce?`,

            answer:
                production,

            type: "word",
            pattern: 8
        };
    },


    // --------------------------------------------------------
    // 9. Seats in each row
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            divisionGetNumbers(difficulty);

        return {
            question:
                `An auditorium has ${divisionFormat(numbers.dividend)} ` +
                `seats arranged in ${numbers.divisor} equal rows. ` +
                `How many seats are in each row?`,

            answer:
                numbers.quotient,

            type: "word",
            pattern: 9
        };
    },


    // --------------------------------------------------------
    // 10. Bottles in cartons
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            divisionGetNumbers(difficulty);

        return {
            question:
                `${divisionFormat(numbers.dividend)} bottles ` +
                `are packed equally into ${numbers.divisor} cartons. ` +
                `How many bottles are in each carton?`,

            answer:
                numbers.quotient,

            type: "word",
            pattern: 10
        };
    },


    // --------------------------------------------------------
    // 11. Weekly savings
    // --------------------------------------------------------

    function (difficulty) {

        let weeks;
        let savingsPerWeek;

        if (difficulty === "easy") {

            weeks =
                divisionRandom(2, 12);

            savingsPerWeek =
                divisionRandom(5, 50);

        } else if (difficulty === "medium") {

            weeks =
                divisionRandom(10, 52);

            savingsPerWeek =
                divisionRandom(50, 500);

        } else {

            weeks =
                divisionRandom(50, 200);

            savingsPerWeek =
                divisionRandom(500, 5000);
        }

        const totalSavings =
            weeks * savingsPerWeek;

        return {
            question:
                `A student saves $${divisionFormat(totalSavings)} ` +
                `in ${weeks} weeks. If the same amount is saved ` +
                `every week, how much is saved per week?`,

            answer:
                savingsPerWeek,

            type: "word",
            pattern: 11
        };
    },


    // --------------------------------------------------------
    // 12. Cost of one item
    // --------------------------------------------------------

    function (difficulty) {

        let quantity;
        let price;

        if (difficulty === "easy") {

            quantity =
                divisionRandom(2, 10);

            price =
                divisionRandom(2, 30);

        } else if (difficulty === "medium") {

            quantity =
                divisionRandom(5, 50);

            price =
                divisionRandom(20, 300);

        } else {

            quantity =
                divisionRandom(20, 200);

            price =
                divisionRandom(200, 3000);
        }

        const total =
            quantity * price;

        return {
            question:
                `${quantity} identical items cost ` +
                `$${divisionFormat(total)} altogether. ` +
                `What is the cost of one item?`,

            answer:
                price,

            type: "word",
            pattern: 12
        };
    },


    // --------------------------------------------------------
    // 13. Trees in rows
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            divisionGetNumbers(difficulty);

        return {
            question:
                `${divisionFormat(numbers.dividend)} trees ` +
                `are planted equally in ${numbers.divisor} rows. ` +
                `How many trees are planted in each row?`,

            answer:
                numbers.quotient,

            type: "word",
            pattern: 13
        };
    },


    // --------------------------------------------------------
    // 14. Time per task
    // --------------------------------------------------------

    function (difficulty) {

        let tasks;
        let minutesPerTask;

        if (difficulty === "easy") {

            tasks =
                divisionRandom(2, 10);

            minutesPerTask =
                divisionRandom(5, 30);

        } else if (difficulty === "medium") {

            tasks =
                divisionRandom(5, 30);

            minutesPerTask =
                divisionRandom(20, 120);

        } else {

            tasks =
                divisionRandom(20, 100);

            minutesPerTask =
                divisionRandom(100, 1000);
        }

        const totalTime =
            tasks * minutesPerTask;

        return {
            question:
                `A worker spends ${divisionFormat(totalTime)} minutes ` +
                `completing ${tasks} identical tasks. ` +
                `How many minutes are spent on each task?`,

            answer:
                minutesPerTask,

            type: "word",
            pattern: 14
        };
    },


    // --------------------------------------------------------
    // 15. Area divided into equal plots
    // --------------------------------------------------------

    function (difficulty) {

        let plots;
        let areaPerPlot;

        if (difficulty === "easy") {

            plots =
                divisionRandom(2, 10);

            areaPerPlot =
                divisionRandom(10, 100);

        } else if (difficulty === "medium") {

            plots =
                divisionRandom(5, 50);

            areaPerPlot =
                divisionRandom(100, 1000);

        } else {

            plots =
                divisionRandom(20, 200);

            areaPerPlot =
                divisionRandom(1000, 10000);
        }

        const totalArea =
            plots * areaPerPlot;

        return {
            question:
                `A ${divisionFormat(totalArea)} square metre field ` +
                `is divided into ${plots} equal plots. ` +
                `What is the area of each plot?`,

            answer:
                areaPerPlot,

            type: "word",
            pattern: 15
        };
    },


    // --------------------------------------------------------
    // 16. Water in containers
    // --------------------------------------------------------

    function (difficulty) {

        let containers;
        let litres;

        if (difficulty === "easy") {

            containers =
                divisionRandom(2, 10);

            litres =
                divisionRandom(5, 50);

        } else if (difficulty === "medium") {

            containers =
                divisionRandom(5, 50);

            litres =
                divisionRandom(50, 500);

        } else {

            containers =
                divisionRandom(20, 200);

            litres =
                divisionRandom(500, 5000);
        }

        const total =
            containers * litres;

        return {
            question:
                `${divisionFormat(total)} litres of water ` +
                `are poured equally into ${containers} containers. ` +
                `How many litres are in each container?`,

            answer:
                litres,

            type: "word",
            pattern: 16
        };
    },


    // --------------------------------------------------------
    // 17. Decimal cost division
    // --------------------------------------------------------

    function (difficulty) {

        let quantity;
        let price;

        if (difficulty === "easy") {

            quantity =
                divisionRandom(2, 10);

            price =
                divisionRandom(10, 90) / 10;

        } else if (difficulty === "medium") {

            quantity =
                divisionRandom(5, 30);

            price =
                divisionRandom(100, 999) / 10;

        } else {

            quantity =
                divisionRandom(20, 100);

            price =
                divisionRandom(1000, 9999) / 100;
        }

        price =
            divisionRound(price);

        const total =
            divisionRound(
                quantity * price
            );

        return {
            question:
                `${quantity} identical items cost ` +
                `$${total} altogether. ` +
                `What is the cost of one item?`,

            answer:
                price,

            type: "word",
            pattern: 17
        };
    },


    // --------------------------------------------------------
    // 18. Points per round
    // --------------------------------------------------------

    function (difficulty) {

        let rounds;
        let pointsPerRound;

        if (difficulty === "easy") {

            rounds =
                divisionRandom(2, 10);

            pointsPerRound =
                divisionRandom(5, 30);

        } else if (difficulty === "medium") {

            rounds =
                divisionRandom(10, 50);

            pointsPerRound =
                divisionRandom(20, 200);

        } else {

            rounds =
                divisionRandom(50, 200);

            pointsPerRound =
                divisionRandom(100, 2000);
        }

        const total =
            rounds * pointsPerRound;

        return {
            question:
                `A player scores ${divisionFormat(total)} points ` +
                `in ${rounds} equal rounds. ` +
                `How many points are scored in each round?`,

            answer:
                pointsPerRound,

            type: "word",
            pattern: 18
        };
    },


    // --------------------------------------------------------
    // 19. Bricks per layer
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            divisionGetNumbers(difficulty);

        return {
            question:
                `A wall uses ${divisionFormat(numbers.dividend)} ` +
                `bricks in ${numbers.divisor} equal layers. ` +
                `How many bricks are used in each layer?`,

            answer:
                numbers.quotient,

            type: "word",
            pattern: 19
        };
    },


    // --------------------------------------------------------
    // 20. Monthly earnings
    // --------------------------------------------------------

    function (difficulty) {

        let months;
        let monthlyIncome;

        if (difficulty === "easy") {

            months =
                divisionRandom(2, 6);

            monthlyIncome =
                divisionRandom(100, 1000);

        } else if (difficulty === "medium") {

            months =
                divisionRandom(6, 24);

            monthlyIncome =
                divisionRandom(1000, 10000);

        } else {

            months =
                divisionRandom(24, 120);

            monthlyIncome =
                divisionRandom(10000, 100000);
        }

        const totalIncome =
            months * monthlyIncome;

        return {
            question:
                `A worker earns $${divisionFormat(totalIncome)} ` +
                `over ${months} months. ` +
                `What is the worker's monthly income?`,

            answer:
                monthlyIncome,

            type: "word",
            pattern: 20
        };
    },


    // --------------------------------------------------------
    // 21. Challenge: school supplies
    // --------------------------------------------------------

    function (difficulty) {

        let classes;
        let students;
        let notebooks;

        if (difficulty === "easy") {

            classes =
                divisionRandom(2, 5);

            students =
                divisionRandom(10, 20);

            notebooks =
                divisionRandom(2, 5);

        } else if (difficulty === "medium") {

            classes =
                divisionRandom(5, 20);

            students =
                divisionRandom(20, 50);

            notebooks =
                divisionRandom(3, 10);

        } else {

            classes =
                divisionRandom(20, 100);

            students =
                divisionRandom(50, 200);

            notebooks =
                divisionRandom(5, 20);
        }

        const total =
            classes *
            students *
            notebooks;

        return {
            question:
                `A school has ${classes} classes with ` +
                `${students} students in each class. ` +
                `Each student receives the same number of notebooks. ` +
                `If ${divisionFormat(total)} notebooks are used, ` +
                `how many notebooks does each student receive?`,

            answer:
                notebooks,

            type: "word",
            pattern: 21
        };
    },


    // --------------------------------------------------------
    // 22. Challenge: factory production
    // --------------------------------------------------------

    function (difficulty) {

        let days;
        let machines;
        let production;

        if (difficulty === "easy") {

            days = 5;

            machines =
                divisionRandom(2, 5);

            production =
                divisionRandom(10, 50);

        } else if (difficulty === "medium") {

            days = 20;

            machines =
                divisionRandom(5, 20);

            production =
                divisionRandom(100, 500);

        } else {

            days = 30;

            machines =
                divisionRandom(20, 100);

            production =
                divisionRandom(1000, 5000);
        }

        const total =
            days *
            machines *
            production;

        return {
            question:
                `A factory produces ${divisionFormat(total)} items ` +
                `in ${days} days using ${machines} machines. ` +
                `If every machine produces the same number of items ` +
                `per day, how many items does one machine produce ` +
                `per day?`,

            answer:
                production,

            type: "word",
            pattern: 22
        };
    },


    // --------------------------------------------------------
    // 23. Challenge: auditorium seats
    // --------------------------------------------------------

    function (difficulty) {

        let sections;
        let rows;
        let seats;

        if (difficulty === "easy") {

            sections =
                divisionRandom(2, 5);

            rows =
                divisionRandom(5, 10);

            seats =
                divisionRandom(5, 20);

        } else if (difficulty === "medium") {

            sections =
                divisionRandom(5, 20);

            rows =
                divisionRandom(20, 50);

            seats =
                divisionRandom(20, 100);

        } else {

            sections =
                divisionRandom(20, 100);

            rows =
                divisionRandom(50, 200);

            seats =
                divisionRandom(100, 500);
        }

        const total =
            sections *
            rows *
            seats;

        return {
            question:
                `An auditorium has ${sections} sections, ` +
                `with ${rows} rows in each section. ` +
                `There are ${divisionFormat(total)} seats altogether. ` +
                `How many seats are in each row?`,

            answer:
                seats,

            type: "word",
            pattern: 23
        };
    },


    // --------------------------------------------------------
    // 24. Challenge: travel speed
    // --------------------------------------------------------

    function (difficulty) {

        let hours;
        let speed;

        if (difficulty === "easy") {

            hours =
                divisionRandom(2, 10);

            speed =
                divisionRandom(20, 80);

        } else if (difficulty === "medium") {

            hours =
                divisionRandom(5, 24);

            speed =
                divisionRandom(50, 200);

        } else {

            hours =
                divisionRandom(20, 100);

            speed =
                divisionRandom(100, 1000);
        }

        const distance =
            hours * speed;

        return {
            question:
                `A train travels ${divisionFormat(distance)} km ` +
                `in ${hours} hours at a constant speed. ` +
                `What is its speed in kilometres per hour?`,

            answer:
                speed,

            type: "word",
            pattern: 24
        };
    },


    // --------------------------------------------------------
    // 25. Advanced multi-step challenge
    // --------------------------------------------------------

    function (difficulty) {

        let factories;
        let machines;
        let hours;
        let production;

        if (difficulty === "easy") {

            factories =
                divisionRandom(2, 4);

            machines =
                divisionRandom(2, 5);

            hours =
                divisionRandom(4, 8);

            production =
                divisionRandom(5, 20);

        } else if (difficulty === "medium") {

            factories =
                divisionRandom(5, 15);

            machines =
                divisionRandom(5, 20);

            hours =
                divisionRandom(8, 24);

            production =
                divisionRandom(20, 100);

        } else {

            factories =
                divisionRandom(20, 100);

            machines =
                divisionRandom(20, 100);

            hours =
                divisionRandom(20, 100);

            production =
                divisionRandom(100, 1000);
        }

        const total =
            factories *
            machines *
            hours *
            production;

        return {
            question:
                `${factories} factories each have ${machines} machines. ` +
                `All machines work for ${hours} hours and produce ` +
                `${divisionFormat(total)} items altogether. ` +
                `How many items does one machine produce per hour?`,

            answer:
                production,

            type: "word",
            pattern: 25
        };
    }

];


// ============================================================
// MAIN DIVISION QUESTION GENERATOR
// ============================================================

function generateDivisionQuestion(
    difficulty,
    questionCategory,
    usedPatterns = []
) {

    let patterns;


    if (questionCategory === "word") {

        patterns =
            divisionWordPatterns;

    } else {

        patterns =
            divisionDirectPatterns;
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
                divisionRandom(
                    0,
                    availableIndexes.length - 1
                )
            ];

    } else {

        selectedIndex =
            divisionRandom(
                0,
                patterns.length - 1
            );
    }


    const question =
        patterns[selectedIndex](difficulty);


    question.patternIndex =
        selectedIndex;


    question.topic =
        "division";


    return question;
}