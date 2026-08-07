// ============================================================
// MATHMIND AI
// SUBTRACTION QUESTION ENGINE
//
// 25 Direct Question Patterns
// 25 Word-Problem Patterns
//
// Supports:
// Easy, Medium, Hard
// Descriptive mode
// MCQ mode later through the main script
// ============================================================


// ============================================================
// HELPER FUNCTIONS
// ============================================================

function subtractionRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function subtractionFormat(number) {
    return Number(number).toLocaleString("en-US");
}


function subtractionDecimal(number) {
    return Number(number.toFixed(2));
}


function subtractionDifficultyRange(difficulty) {

    if (difficulty === "easy") {
        return {
            smallMin: 10,
            smallMax: 99,
            mediumMin: 100,
            mediumMax: 500
        };
    }

    if (difficulty === "medium") {
        return {
            smallMin: 100,
            smallMax: 999,
            mediumMin: 1000,
            mediumMax: 5000
        };
    }

    return {
        smallMin: 1000,
        smallMax: 9999,
        mediumMin: 10000,
        mediumMax: 50000
    };
}


function subtractionNumbers(difficulty) {

    const range = subtractionDifficultyRange(difficulty);

    const smaller = subtractionRandom(
        range.smallMin,
        range.smallMax
    );

    const difference = subtractionRandom(
        range.smallMin,
        range.smallMax
    );

    return {
        smaller: smaller,
        larger: smaller + difference,
        difference: difference
    };
}


// ============================================================
// 25 DIRECT SUBTRACTION PATTERNS
// ============================================================

const subtractionDirectPatterns = [

    // --------------------------------------------------------
    // 1. Basic subtraction
    // --------------------------------------------------------

    function (difficulty) {

        const values = subtractionNumbers(difficulty);

        return {
            question:
                `${subtractionFormat(values.larger)} − ` +
                `${subtractionFormat(values.smaller)} = ?`,

            answer: values.difference,

            type: "direct",
            pattern: 1
        };
    },


    // --------------------------------------------------------
    // 2. Three-number subtraction
    // --------------------------------------------------------

    function (difficulty) {

        const first = difficulty === "easy"
            ? subtractionRandom(100, 300)
            : difficulty === "medium"
                ? subtractionRandom(1000, 5000)
                : subtractionRandom(10000, 50000);

        const second = Math.floor(first * 0.2);

        const third = Math.floor(first * 0.15);

        return {
            question:
                `${subtractionFormat(first)} − ` +
                `${subtractionFormat(second)} − ` +
                `${subtractionFormat(third)} = ?`,

            answer: first - second - third,

            type: "direct",
            pattern: 2
        };
    },


    // --------------------------------------------------------
    // 3. Missing minuend
    // --------------------------------------------------------

    function (difficulty) {

        const values = subtractionNumbers(difficulty);

        return {
            question:
                `___ − ${subtractionFormat(values.smaller)} ` +
                `= ${subtractionFormat(values.difference)}`,

            answer: values.larger,

            type: "direct",
            pattern: 3
        };
    },


    // --------------------------------------------------------
    // 4. Missing subtrahend
    // --------------------------------------------------------

    function (difficulty) {

        const values = subtractionNumbers(difficulty);

        return {
            question:
                `${subtractionFormat(values.larger)} − ___ ` +
                `= ${subtractionFormat(values.difference)}`,

            answer: values.smaller,

            type: "direct",
            pattern: 4
        };
    },


    // --------------------------------------------------------
    // 5. Missing difference
    // --------------------------------------------------------

    function (difficulty) {

        const values = subtractionNumbers(difficulty);

        return {
            question:
                `${subtractionFormat(values.larger)} − ` +
                `${subtractionFormat(values.smaller)} = ___`,

            answer: values.difference,

            type: "direct",
            pattern: 5
        };
    },


    // --------------------------------------------------------
    // 6. Subtract from a target
    // --------------------------------------------------------

    function (difficulty) {

        let target;

        if (difficulty === "easy") {
            target = 100;
        }

        else if (difficulty === "medium") {
            target = 1000;
        }

        else {
            target = 10000;
        }

        const number = subtractionRandom(
            Math.floor(target * 0.1),
            Math.floor(target * 0.9)
        );

        return {
            question:
                `${subtractionFormat(target)} − ` +
                `${subtractionFormat(number)} = ?`,

            answer: target - number,

            type: "direct",
            pattern: 6
        };
    },


    // --------------------------------------------------------
    // 7. Subtraction involving zeroes
    // --------------------------------------------------------

    function (difficulty) {

        let larger;
        let smaller;

        if (difficulty === "easy") {
            larger = subtractionRandom(2, 9) * 100;
            smaller = subtractionRandom(10, 90);
        }

        else if (difficulty === "medium") {
            larger = subtractionRandom(10, 99) * 100;
            smaller = subtractionRandom(100, 999);
        }

        else {
            larger = subtractionRandom(100, 999) * 100;
            smaller = subtractionRandom(1000, 9999);
        }

        return {
            question:
                `${subtractionFormat(larger)} − ` +
                `${subtractionFormat(smaller)} = ?`,

            answer: larger - smaller,

            type: "direct",
            pattern: 7
        };
    },


    // --------------------------------------------------------
    // 8. Find the difference
    // --------------------------------------------------------

    function (difficulty) {

        const values = subtractionNumbers(difficulty);

        return {
            question:
                `Find the difference between ` +
                `${subtractionFormat(values.larger)} and ` +
                `${subtractionFormat(values.smaller)}.`,

            answer: values.difference,

            type: "direct",
            pattern: 8
        };
    },


    // --------------------------------------------------------
    // 9. Decimal subtraction
    // --------------------------------------------------------

    function (difficulty) {

        let larger;
        let smaller;

        if (difficulty === "easy") {

            smaller = subtractionDecimal(
                subtractionRandom(10, 50) / 10
            );

            larger = subtractionDecimal(
                smaller +
                subtractionRandom(10, 50) / 10
            );
        }

        else if (difficulty === "medium") {

            smaller = subtractionDecimal(
                subtractionRandom(100, 500) / 10
            );

            larger = subtractionDecimal(
                smaller +
                subtractionRandom(100, 500) / 10
            );
        }

        else {

            smaller = subtractionDecimal(
                subtractionRandom(1000, 5000) / 100
            );

            larger = subtractionDecimal(
                smaller +
                subtractionRandom(1000, 5000) / 100
            );
        }

        return {
            question:
                `${larger} − ${smaller} = ?`,

            answer:
                subtractionDecimal(
                    larger - smaller
                ),

            type: "direct",
            pattern: 9
        };
    },


    // --------------------------------------------------------
    // 10. Money subtraction
    // --------------------------------------------------------

    function (difficulty) {

        let total;
        let spent;

        if (difficulty === "easy") {
            total = subtractionRandom(50, 200);
            spent = subtractionRandom(10, total - 10);
        }

        else if (difficulty === "medium") {
            total = subtractionRandom(500, 2000);
            spent = subtractionRandom(100, total - 100);
        }

        else {
            total = subtractionRandom(5000, 20000);
            spent = subtractionRandom(1000, total - 1000);
        }

        return {
            question:
                `$${subtractionFormat(total)} − ` +
                `$${subtractionFormat(spent)} = ?`,

            answer: total - spent,

            type: "direct",
            pattern: 10
        };
    },


    // --------------------------------------------------------
    // 11. Mixed addition and subtraction
    // --------------------------------------------------------

    function (difficulty) {

        const base = difficulty === "easy"
            ? subtractionRandom(50, 150)
            : difficulty === "medium"
                ? subtractionRandom(500, 2000)
                : subtractionRandom(5000, 20000);

        const added = Math.floor(base * 0.3);

        const removed = Math.floor(base * 0.2);

        return {
            question:
                `${subtractionFormat(base)} + ` +
                `${subtractionFormat(added)} − ` +
                `${subtractionFormat(removed)} = ?`,

            answer:
                base +
                added -
                removed,

            type: "direct",
            pattern: 11
        };
    },


    // --------------------------------------------------------
    // 12. Subtract a rounded number
    // --------------------------------------------------------

    function (difficulty) {

        let larger;
        let smaller;

        if (difficulty === "easy") {
            larger = subtractionRandom(100, 500);
            smaller = subtractionRandom(1, 9) * 10;
        }

        else if (difficulty === "medium") {
            larger = subtractionRandom(1000, 5000);
            smaller = subtractionRandom(10, 99) * 10;
        }

        else {
            larger = subtractionRandom(10000, 50000);
            smaller = subtractionRandom(100, 999) * 10;
        }

        return {
            question:
                `${subtractionFormat(larger)} − ` +
                `${subtractionFormat(smaller)} = ?`,

            answer: larger - smaller,

            type: "direct",
            pattern: 12
        };
    },


    // --------------------------------------------------------
    // 13. Find the smaller number
    // --------------------------------------------------------

    function (difficulty) {

        const values = subtractionNumbers(difficulty);

        return {
            question:
                `The larger number is ` +
                `${subtractionFormat(values.larger)}. ` +
                `The difference is ` +
                `${subtractionFormat(values.difference)}. ` +
                `Find the smaller number.`,

            answer: values.smaller,

            type: "direct",
            pattern: 13
        };
    },


    // --------------------------------------------------------
    // 14. Find the larger number
    // --------------------------------------------------------

    function (difficulty) {

        const values = subtractionNumbers(difficulty);

        return {
            question:
                `The smaller number is ` +
                `${subtractionFormat(values.smaller)}. ` +
                `The difference is ` +
                `${subtractionFormat(values.difference)}. ` +
                `Find the larger number.`,

            answer: values.larger,

            type: "direct",
            pattern: 14
        };
    },


    // --------------------------------------------------------
    // 15. Consecutive-number subtraction
    // --------------------------------------------------------

    function (difficulty) {

        const number = difficulty === "easy"
            ? subtractionRandom(20, 99)
            : difficulty === "medium"
                ? subtractionRandom(100, 999)
                : subtractionRandom(1000, 9999);

        return {
            question:
                `Find the difference between ` +
                `${subtractionFormat(number + 1)} and ` +
                `${subtractionFormat(number)}.`,

            answer: 1,

            type: "direct",
            pattern: 15
        };
    },


    // --------------------------------------------------------
    // 16. Estimate the difference
    // --------------------------------------------------------

    function (difficulty) {

        let first;
        let second;

        if (difficulty === "easy") {
            first = subtractionRandom(100, 900);
            second = subtractionRandom(100, first - 10);
        }

        else if (difficulty === "medium") {
            first = subtractionRandom(1000, 9000);
            second = subtractionRandom(1000, first - 100);
        }

        else {
            first = subtractionRandom(10000, 90000);
            second = subtractionRandom(10000, first - 1000);
        }

        const roundedFirst =
            Math.round(first / 10) * 10;

        const roundedSecond =
            Math.round(second / 10) * 10;

        return {
            question:
                `Estimate the difference by rounding ` +
                `each number to the nearest ten: ` +
                `${subtractionFormat(first)} − ` +
                `${subtractionFormat(second)}.`,

            answer:
                roundedFirst -
                roundedSecond,

            type: "direct",
            pattern: 16
        };
    },


    // --------------------------------------------------------
    // 17. Two-step subtraction
    // --------------------------------------------------------

    function (difficulty) {

        const starting = difficulty === "easy"
            ? subtractionRandom(200, 500)
            : difficulty === "medium"
                ? subtractionRandom(2000, 5000)
                : subtractionRandom(20000, 50000);

        const first = Math.floor(starting * 0.2);

        const second = Math.floor(starting * 0.15);

        return {
            question:
                `Start with ${subtractionFormat(starting)}. ` +
                `Subtract ${subtractionFormat(first)} and then ` +
                `subtract ${subtractionFormat(second)}. ` +
                `What is the final answer?`,

            answer:
                starting -
                first -
                second,

            type: "direct",
            pattern: 17
        };
    },


    // --------------------------------------------------------
    // 18. Missing value in an expression
    // --------------------------------------------------------

    function (difficulty) {

        const values = subtractionNumbers(difficulty);

        const extra = difficulty === "easy"
            ? subtractionRandom(10, 50)
            : difficulty === "medium"
                ? subtractionRandom(100, 500)
                : subtractionRandom(1000, 5000);

        const finalAnswer =
            values.larger +
            extra -
            values.smaller;

        return {
            question:
                `___ + ${subtractionFormat(extra)} − ` +
                `${subtractionFormat(values.smaller)} = ` +
                `${subtractionFormat(finalAnswer)}`,

            answer: values.larger,

            type: "direct",
            pattern: 18
        };
    },


    // --------------------------------------------------------
    // 19. Compare two differences
    // --------------------------------------------------------

    function (difficulty) {

        const firstA = difficulty === "easy"
            ? 90
            : difficulty === "medium"
                ? 900
                : 9000;

        const firstB = difficulty === "easy"
            ? 35
            : difficulty === "medium"
                ? 350
                : 3500;

        const secondA = difficulty === "easy"
            ? 80
            : difficulty === "medium"
                ? 800
                : 8000;

        const secondB = difficulty === "easy"
            ? 20
            : difficulty === "medium"
                ? 200
                : 2000;

        return {
            question:
                `Find the larger difference: ` +
                `${subtractionFormat(firstA)} − ` +
                `${subtractionFormat(firstB)} or ` +
                `${subtractionFormat(secondA)} − ` +
                `${subtractionFormat(secondB)}.`,

            answer:
                Math.max(
                    firstA - firstB,
                    secondA - secondB
                ),

            type: "direct",
            pattern: 19
        };
    },


    // --------------------------------------------------------
    // 20. Subtract a fraction of a number
    // --------------------------------------------------------

    function (difficulty) {

        const total = difficulty === "easy"
            ? subtractionRandom(40, 100)
            : difficulty === "medium"
                ? subtractionRandom(200, 1000)
                : subtractionRandom(2000, 10000);

        const removed =
            Math.floor(total / 4);

        return {
            question:
                `Subtract one-fourth of ` +
                `${subtractionFormat(total)} from ` +
                `${subtractionFormat(total)}.`,

            answer:
                total - removed,

            type: "direct",
            pattern: 20
        };
    },


    // --------------------------------------------------------
    // 21. Subtraction with negative result
    // --------------------------------------------------------

    function (difficulty) {

        const smaller = difficulty === "easy"
            ? subtractionRandom(10, 50)
            : difficulty === "medium"
                ? subtractionRandom(100, 500)
                : subtractionRandom(1000, 5000);

        const larger =
            smaller +
            subtractionRandom(
                10,
                difficulty === "easy"
                    ? 50
                    : difficulty === "medium"
                        ? 500
                        : 5000
            );

        return {
            question:
                `${subtractionFormat(smaller)} − ` +
                `${subtractionFormat(larger)} = ?`,

            answer:
                smaller - larger,

            type: "direct",
            pattern: 21
        };
    },


    // --------------------------------------------------------
    // 22. Challenge: four-number subtraction
    // --------------------------------------------------------

    function (difficulty) {

        const start = difficulty === "easy"
            ? 500
            : difficulty === "medium"
                ? 5000
                : 50000;

        const a = Math.floor(start * 0.15);

        const b = Math.floor(start * 0.12);

        const c = Math.floor(start * 0.08);

        return {
            question:
                `${subtractionFormat(start)} − ` +
                `${subtractionFormat(a)} − ` +
                `${subtractionFormat(b)} − ` +
                `${subtractionFormat(c)} = ?`,

            answer:
                start - a - b - c,

            type: "direct",
            pattern: 22
        };
    },


    // --------------------------------------------------------
    // 23. Find the original number
    // --------------------------------------------------------

    function (difficulty) {

        const removed = difficulty === "easy"
            ? subtractionRandom(10, 50)
            : difficulty === "medium"
                ? subtractionRandom(100, 500)
                : subtractionRandom(1000, 5000);

        const remaining = difficulty === "easy"
            ? subtractionRandom(20, 80)
            : difficulty === "medium"
                ? subtractionRandom(200, 800)
                : subtractionRandom(2000, 8000);

        return {
            question:
                `A number becomes ` +
                `${subtractionFormat(remaining)} after ` +
                `${subtractionFormat(removed)} is subtracted from it. ` +
                `Find the original number.`,

            answer:
                remaining + removed,

            type: "direct",
            pattern: 23
        };
    },


    // --------------------------------------------------------
    // 24. Challenge with decimals
    // --------------------------------------------------------

    function (difficulty) {

        const first = difficulty === "easy"
            ? subtractionDecimal(
                subtractionRandom(100, 500) / 10
            )
            : difficulty === "medium"
                ? subtractionDecimal(
                    subtractionRandom(1000, 5000) / 100
                )
                : subtractionDecimal(
                    subtractionRandom(10000, 50000) / 100
                );

        const second =
            subtractionDecimal(first * 0.35);

        const third =
            subtractionDecimal(first * 0.15);

        return {
            question:
                `${first} − ${second} − ${third} = ?`,

            answer:
                subtractionDecimal(
                    first -
                    second -
                    third
                ),

            type: "direct",
            pattern: 24
        };
    },


    // --------------------------------------------------------
    // 25. Advanced challenge
    // --------------------------------------------------------

    function (difficulty) {

        const original = difficulty === "easy"
            ? subtractionRandom(200, 500)
            : difficulty === "medium"
                ? subtractionRandom(2000, 5000)
                : subtractionRandom(20000, 50000);

        const firstRemoved =
            Math.floor(original * 0.2);

        const secondRemoved =
            Math.floor(
                (original - firstRemoved) * 0.25
            );

        return {
            question:
                `A number is reduced by ` +
                `${subtractionFormat(firstRemoved)}. ` +
                `Then ${subtractionFormat(secondRemoved)} ` +
                `is subtracted. What is the final value?`,

            answer:
                original -
                firstRemoved -
                secondRemoved,

            type: "direct",
            pattern: 25
        };
    }

];


// ============================================================
// 25 WORD-PROBLEM PATTERNS
// ============================================================

const subtractionWordPatterns = [

    // 1. Books remaining
    function (difficulty) {

        const total = difficulty === "easy"
            ? subtractionRandom(100, 300)
            : difficulty === "medium"
                ? subtractionRandom(1000, 5000)
                : subtractionRandom(10000, 50000);

        const used =
            Math.floor(total * 0.35);

        return {
            question:
                `A library had ${subtractionFormat(total)} books. ` +
                `${subtractionFormat(used)} books were borrowed. ` +
                `How many books remained?`,

            answer: total - used,
            type: "word",
            pattern: 1
        };
    },


    // 2. Students absent
    function (difficulty) {

        const total = difficulty === "easy"
            ? subtractionRandom(40, 100)
            : difficulty === "medium"
                ? subtractionRandom(500, 2000)
                : subtractionRandom(5000, 20000);

        const absent =
            Math.floor(total * 0.1);

        return {
            question:
                `A school has ${subtractionFormat(total)} students. ` +
                `${subtractionFormat(absent)} students are absent. ` +
                `How many students are present?`,

            answer: total - absent,
            type: "word",
            pattern: 2
        };
    },


    // 3. Money remaining
    function (difficulty) {

        const money = difficulty === "easy"
            ? subtractionRandom(100, 300)
            : difficulty === "medium"
                ? subtractionRandom(1000, 5000)
                : subtractionRandom(10000, 50000);

        const spent =
            Math.floor(money * 0.4);

        return {
            question:
                `A student had $${subtractionFormat(money)}. ` +
                `The student spent $${subtractionFormat(spent)}. ` +
                `How much money remained?`,

            answer: money - spent,
            type: "word",
            pattern: 3
        };
    },


    // 4. Tickets remaining
    function (difficulty) {

        const tickets = difficulty === "easy"
            ? subtractionRandom(100, 500)
            : difficulty === "medium"
                ? subtractionRandom(1000, 10000)
                : subtractionRandom(10000, 100000);

        const sold =
            Math.floor(tickets * 0.55);

        return {
            question:
                `A concert had ${subtractionFormat(tickets)} tickets. ` +
                `${subtractionFormat(sold)} tickets were sold. ` +
                `How many tickets were left?`,

            answer: tickets - sold,
            type: "word",
            pattern: 4
        };
    },


    // 5. Distance remaining
    function (difficulty) {

        const total = difficulty === "easy"
            ? subtractionRandom(100, 300)
            : difficulty === "medium"
                ? subtractionRandom(500, 2000)
                : subtractionRandom(5000, 20000);

        const travelled =
            Math.floor(total * 0.6);

        return {
            question:
                `A journey is ${subtractionFormat(total)} km long. ` +
                `A car has travelled ` +
                `${subtractionFormat(travelled)} km. ` +
                `How many kilometres are left?`,

            answer: total - travelled,
            type: "word",
            pattern: 5
        };
    },


    // 6. Water remaining
    function (difficulty) {

        const water = difficulty === "easy"
            ? subtractionRandom(100, 500)
            : difficulty === "medium"
                ? subtractionRandom(1000, 5000)
                : subtractionRandom(10000, 50000);

        const used =
            Math.floor(water * 0.3);

        return {
            question:
                `A tank contained ${subtractionFormat(water)} litres ` +
                `of water. ${subtractionFormat(used)} litres were used. ` +
                `How many litres remain?`,

            answer: water - used,
            type: "word",
            pattern: 6
        };
    },


    // 7. Fruits sold
    function (difficulty) {

        const fruits = difficulty === "easy"
            ? subtractionRandom(100, 300)
            : difficulty === "medium"
                ? subtractionRandom(1000, 5000)
                : subtractionRandom(10000, 50000);

        const sold =
            Math.floor(fruits * 0.45);

        return {
            question:
                `A shop had ${subtractionFormat(fruits)} oranges. ` +
                `${subtractionFormat(sold)} oranges were sold. ` +
                `How many oranges remain?`,

            answer: fruits - sold,
            type: "word",
            pattern: 7
        };
    },


    // 8. Seats available
    function (difficulty) {

        const seats = difficulty === "easy"
            ? subtractionRandom(100, 500)
            : difficulty === "medium"
                ? subtractionRandom(1000, 10000)
                : subtractionRandom(10000, 100000);

        const occupied =
            Math.floor(seats * 0.7);

        return {
            question:
                `A stadium has ${subtractionFormat(seats)} seats. ` +
                `${subtractionFormat(occupied)} seats are occupied. ` +
                `How many seats are available?`,

            answer: seats - occupied,
            type: "word",
            pattern: 8
        };
    },


    // 9. Pages left
    function (difficulty) {

        const pages = difficulty === "easy"
            ? subtractionRandom(100, 300)
            : difficulty === "medium"
                ? subtractionRandom(500, 1500)
                : subtractionRandom(2000, 10000);

        const read =
            Math.floor(pages * 0.45);

        return {
            question:
                `A book has ${subtractionFormat(pages)} pages. ` +
                `A student has read ${subtractionFormat(read)} pages. ` +
                `How many pages are left?`,

            answer: pages - read,
            type: "word",
            pattern: 9
        };
    },


    // 10. Budget remaining
    function (difficulty) {

        const budget = difficulty === "easy"
            ? subtractionRandom(200, 500)
            : difficulty === "medium"
                ? subtractionRandom(2000, 10000)
                : subtractionRandom(20000, 100000);

        const expense =
            Math.floor(budget * 0.35);

        return {
            question:
                `A club has a budget of $${subtractionFormat(budget)}. ` +
                `It spent $${subtractionFormat(expense)}. ` +
                `How much of the budget remains?`,

            answer: budget - expense,
            type: "word",
            pattern: 10
        };
    },


    // 11. Points behind
    function (difficulty) {

        const leading = difficulty === "easy"
            ? subtractionRandom(50, 150)
            : difficulty === "medium"
                ? subtractionRandom(500, 1500)
                : subtractionRandom(5000, 15000);

        const trailing =
            leading -
            subtractionRandom(
                10,
                Math.floor(leading * 0.4)
            );

        return {
            question:
                `Team A has ${subtractionFormat(leading)} points. ` +
                `Team B has ${subtractionFormat(trailing)} points. ` +
                `How many points behind is Team B?`,

            answer: leading - trailing,
            type: "word",
            pattern: 11
        };
    },


    // 12. Temperature drop
    function (difficulty) {

        const start = difficulty === "easy"
            ? subtractionRandom(20, 40)
            : difficulty === "medium"
                ? subtractionRandom(50, 100)
                : subtractionRandom(100, 300);

        const drop =
            subtractionRandom(
                5,
                Math.floor(start * 0.4)
            );

        return {
            question:
                `The temperature was ${start}°C. ` +
                `It dropped by ${drop}°C. ` +
                `What is the new temperature?`,

            answer: start - drop,
            type: "word",
            pattern: 12
        };
    },


    // 13. Fuel remaining
    function (difficulty) {

        const fuel = difficulty === "easy"
            ? subtractionRandom(50, 100)
            : difficulty === "medium"
                ? subtractionRandom(500, 1000)
                : subtractionRandom(5000, 10000);

        const used =
            Math.floor(fuel * 0.4);

        return {
            question:
                `A vehicle had ${subtractionFormat(fuel)} litres ` +
                `of fuel. It used ${subtractionFormat(used)} litres. ` +
                `How many litres remain?`,

            answer: fuel - used,
            type: "word",
            pattern: 13
        };
    },


    // 14. Inventory remaining
    function (difficulty) {

        const stock = difficulty === "easy"
            ? subtractionRandom(200, 500)
            : difficulty === "medium"
                ? subtractionRandom(2000, 10000)
                : subtractionRandom(20000, 100000);

        const shipped =
            Math.floor(stock * 0.5);

        return {
            question:
                `A warehouse had ${subtractionFormat(stock)} items. ` +
                `${subtractionFormat(shipped)} items were shipped. ` +
                `How many items remain?`,

            answer: stock - shipped,
            type: "word",
            pattern: 14
        };
    },


    // 15. Donation target
    function (difficulty) {

        const target = difficulty === "easy"
            ? subtractionRandom(500, 1000)
            : difficulty === "medium"
                ? subtractionRandom(5000, 20000)
                : subtractionRandom(50000, 200000);

        const collected =
            Math.floor(target * 0.65);

        return {
            question:
                `A charity wants to collect ` +
                `$${subtractionFormat(target)}. ` +
                `It has already collected ` +
                `$${subtractionFormat(collected)}. ` +
                `How much more money is needed?`,

            answer: target - collected,
            type: "word",
            pattern: 15
        };
    },


    // 16. Original amount
    function (difficulty) {

        const removed = difficulty === "easy"
            ? subtractionRandom(20, 80)
            : difficulty === "medium"
                ? subtractionRandom(200, 800)
                : subtractionRandom(2000, 8000);

        const remaining = difficulty === "easy"
            ? subtractionRandom(50, 150)
            : difficulty === "medium"
                ? subtractionRandom(500, 1500)
                : subtractionRandom(5000, 15000);

        return {
            question:
                `After ${subtractionFormat(removed)} items were removed, ` +
                `${subtractionFormat(remaining)} items remained. ` +
                `How many items were there originally?`,

            answer:
                removed +
                remaining,

            type: "word",
            pattern: 16
        };
    },


    // 17. Two-step shopping
    function (difficulty) {

        const money = difficulty === "easy"
            ? subtractionRandom(200, 500)
            : difficulty === "medium"
                ? subtractionRandom(2000, 5000)
                : subtractionRandom(20000, 50000);

        const firstCost =
            Math.floor(money * 0.2);

        const secondCost =
            Math.floor(money * 0.25);

        return {
            question:
                `A shopper had $${subtractionFormat(money)}. ` +
                `They spent $${subtractionFormat(firstCost)} on a bag ` +
                `and $${subtractionFormat(secondCost)} on shoes. ` +
                `How much money remained?`,

            answer:
                money -
                firstCost -
                secondCost,

            type: "word",
            pattern: 17
        };
    },


    // 18. Population decrease
    function (difficulty) {

        const population = difficulty === "easy"
            ? subtractionRandom(1000, 5000)
            : difficulty === "medium"
                ? subtractionRandom(10000, 50000)
                : subtractionRandom(100000, 500000);

        const decrease =
            Math.floor(population * 0.08);

        return {
            question:
                `A town had a population of ` +
                `${subtractionFormat(population)}. ` +
                `The population decreased by ` +
                `${subtractionFormat(decrease)}. ` +
                `What is the new population?`,

            answer:
                population -
                decrease,

            type: "word",
            pattern: 18
        };
    },


    // 19. Marks needed
    function (difficulty) {

        const target = difficulty === "easy"
            ? 100
            : difficulty === "medium"
                ? 500
                : 1000;

        const score =
            subtractionRandom(
                Math.floor(target * 0.4),
                Math.floor(target * 0.9)
            );

        return {
            question:
                `A student needs ${target} points. ` +
                `The student has scored ${score} points. ` +
                `How many more points are needed?`,

            answer:
                target - score,

            type: "word",
            pattern: 19
        };
    },


    // 20. Package delivery
    function (difficulty) {

        const packages = difficulty === "easy"
            ? subtractionRandom(200, 500)
            : difficulty === "medium"
                ? subtractionRandom(2000, 10000)
                : subtractionRandom(20000, 100000);

        const delivered =
            Math.floor(packages * 0.6);

        return {
            question:
                `A delivery company had ` +
                `${subtractionFormat(packages)} packages. ` +
                `It delivered ${subtractionFormat(delivered)} packages. ` +
                `How many packages are still undelivered?`,

            answer:
                packages - delivered,

            type: "word",
            pattern: 20
        };
    },


    // 21. Fruit harvest comparison
    function (difficulty) {

        const farmA = difficulty === "easy"
            ? subtractionRandom(200, 500)
            : difficulty === "medium"
                ? subtractionRandom(2000, 10000)
                : subtractionRandom(20000, 100000);

        const farmB =
            farmA -
            Math.floor(farmA * 0.2);

        return {
            question:
                `Farm A harvested ${subtractionFormat(farmA)} apples. ` +
                `Farm B harvested ${subtractionFormat(farmB)} apples. ` +
                `How many more apples did Farm A harvest?`,

            answer:
                farmA - farmB,

            type: "word",
            pattern: 21
        };
    },


    // 22. Time remaining
    function (difficulty) {

        const totalMinutes = difficulty === "easy"
            ? 120
            : difficulty === "medium"
                ? 300
                : 600;

        const used =
            subtractionRandom(
                20,
                Math.floor(totalMinutes * 0.75)
            );

        return {
            question:
                `A project has ${totalMinutes} minutes available. ` +
                `${used} minutes have already been used. ` +
                `How many minutes remain?`,

            answer:
                totalMinutes - used,

            type: "word",
            pattern: 22
        };
    },


    // 23. Water used over two days
    function (difficulty) {

        const water = difficulty === "easy"
            ? 500
            : difficulty === "medium"
                ? 5000
                : 50000;

        const dayOne =
            Math.floor(water * 0.2);

        const dayTwo =
            Math.floor(water * 0.15);

        return {
            question:
                `A tank contained ${subtractionFormat(water)} litres. ` +
                `${subtractionFormat(dayOne)} litres were used on Monday ` +
                `and ${subtractionFormat(dayTwo)} litres on Tuesday. ` +
                `How much water remained?`,

            answer:
                water -
                dayOne -
                dayTwo,

            type: "word",
            pattern: 23
        };
    },


    // 24. Decimal measurement
    function (difficulty) {

        const ribbon = difficulty === "easy"
            ? 25.5
            : difficulty === "medium"
                ? 125.75
                : 1250.5;

        const used =
            subtractionDecimal(
                ribbon * 0.4
            );

        return {
            question:
                `A roll has ${ribbon} metres of ribbon. ` +
                `${used} metres are used. ` +
                `How many metres remain?`,

            answer:
                subtractionDecimal(
                    ribbon - used
                ),

            type: "word",
            pattern: 24
        };
    },


    // 25. Advanced multi-step challenge
    function (difficulty) {

        const total = difficulty === "easy"
            ? 1000
            : difficulty === "medium"
                ? 10000
                : 100000;

        const first =
            Math.floor(total * 0.18);

        const second =
            Math.floor(total * 0.22);

        const third =
            Math.floor(total * 0.15);

        return {
            question:
                `A warehouse had ${subtractionFormat(total)} boxes. ` +
                `${subtractionFormat(first)} boxes were sent to City A, ` +
                `${subtractionFormat(second)} boxes were sent to City B, ` +
                `and ${subtractionFormat(third)} boxes were damaged. ` +
                `How many boxes remained?`,

            answer:
                total -
                first -
                second -
                third,

            type: "word",
            pattern: 25
        };
    }

];


// ============================================================
// MAIN SUBTRACTION GENERATOR
// ============================================================

function generateSubtractionQuestion(
    difficulty,
    questionCategory,
    usedPatterns = []
) {

    let patterns;

    if (questionCategory === "word") {
        patterns = subtractionWordPatterns;
    }

    else {
        patterns = subtractionDirectPatterns;
    }


    const availableIndexes = [];


    for (
        let index = 0;
        index < patterns.length;
        index++
    ) {

        if (!usedPatterns.includes(index)) {
            availableIndexes.push(index);
        }
    }


    let selectedIndex;


    if (availableIndexes.length > 0) {

        selectedIndex =
            availableIndexes[
                subtractionRandom(
                    0,
                    availableIndexes.length - 1
                )
            ];

    }

    else {

        selectedIndex =
            subtractionRandom(
                0,
                patterns.length - 1
            );
    }


    const question =
        patterns[selectedIndex](difficulty);


    question.patternIndex =
        selectedIndex;


    question.topic =
        "subtraction";


    return question;
}