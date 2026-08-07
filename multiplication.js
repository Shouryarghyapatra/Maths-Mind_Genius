// ============================================================
// MATHMIND AI
// MULTIPLICATION QUESTION ENGINE
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

function multiplicationRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function multiplicationFormat(number) {
    return Number(number).toLocaleString("en-US");
}


function multiplicationRound(number, decimalPlaces = 2) {
    return Number(number.toFixed(decimalPlaces));
}


function multiplicationGetNumbers(difficulty) {

    let firstNumber;
    let secondNumber;

    if (difficulty === "easy") {

        firstNumber = multiplicationRandom(2, 12);
        secondNumber = multiplicationRandom(2, 12);

    } else if (difficulty === "medium") {

        firstNumber = multiplicationRandom(12, 99);
        secondNumber = multiplicationRandom(2, 25);

    } else {

        firstNumber = multiplicationRandom(100, 999);
        secondNumber = multiplicationRandom(10, 99);
    }

    return {
        firstNumber: firstNumber,
        secondNumber: secondNumber
    };
}


// ============================================================
// 25 DIRECT MULTIPLICATION PATTERNS
// ============================================================

const multiplicationDirectPatterns = [

    // --------------------------------------------------------
    // 1. Basic multiplication
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            multiplicationGetNumbers(difficulty);

        return {
            question:
                `${multiplicationFormat(numbers.firstNumber)} × ` +
                `${multiplicationFormat(numbers.secondNumber)} = ?`,

            answer:
                numbers.firstNumber *
                numbers.secondNumber,

            type: "direct",
            pattern: 1
        };
    },


    // --------------------------------------------------------
    // 2. Multiplication of three numbers
    // --------------------------------------------------------

    function (difficulty) {

        let first;
        let second;
        let third;

        if (difficulty === "easy") {

            first = multiplicationRandom(2, 5);
            second = multiplicationRandom(2, 5);
            third = multiplicationRandom(2, 5);

        } else if (difficulty === "medium") {

            first = multiplicationRandom(3, 12);
            second = multiplicationRandom(3, 12);
            third = multiplicationRandom(2, 10);

        } else {

            first = multiplicationRandom(10, 30);
            second = multiplicationRandom(5, 20);
            third = multiplicationRandom(2, 10);
        }

        return {
            question:
                `${first} × ${second} × ${third} = ?`,

            answer:
                first *
                second *
                third,

            type: "direct",
            pattern: 2
        };
    },


    // --------------------------------------------------------
    // 3. Missing first factor
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            multiplicationGetNumbers(difficulty);

        const product =
            numbers.firstNumber *
            numbers.secondNumber;

        return {
            question:
                `___ × ${numbers.secondNumber} = ` +
                `${multiplicationFormat(product)}`,

            answer:
                numbers.firstNumber,

            type: "direct",
            pattern: 3
        };
    },


    // --------------------------------------------------------
    // 4. Missing second factor
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            multiplicationGetNumbers(difficulty);

        const product =
            numbers.firstNumber *
            numbers.secondNumber;

        return {
            question:
                `${numbers.firstNumber} × ___ = ` +
                `${multiplicationFormat(product)}`,

            answer:
                numbers.secondNumber,

            type: "direct",
            pattern: 4
        };
    },


    // --------------------------------------------------------
    // 5. Multiplication by 10, 100, or 1000
    // --------------------------------------------------------

    function (difficulty) {

        let number;
        let multiplier;

        if (difficulty === "easy") {

            number = multiplicationRandom(2, 99);
            multiplier = 10;

        } else if (difficulty === "medium") {

            number = multiplicationRandom(10, 999);
            multiplier =
                Math.random() < 0.5
                    ? 10
                    : 100;

        } else {

            number = multiplicationRandom(100, 9999);

            const choices = [
                10,
                100,
                1000
            ];

            multiplier =
                choices[
                    multiplicationRandom(
                        0,
                        choices.length - 1
                    )
                ];
        }

        return {
            question:
                `${multiplicationFormat(number)} × ` +
                `${multiplicationFormat(multiplier)} = ?`,

            answer:
                number * multiplier,

            type: "direct",
            pattern: 5
        };
    },


    // --------------------------------------------------------
    // 6. Multiplication by a multiple of 10
    // --------------------------------------------------------

    function (difficulty) {

        let first;
        let second;

        if (difficulty === "easy") {

            first = multiplicationRandom(2, 12);
            second =
                multiplicationRandom(2, 9) * 10;

        } else if (difficulty === "medium") {

            first = multiplicationRandom(10, 99);
            second =
                multiplicationRandom(2, 20) * 10;

        } else {

            first = multiplicationRandom(100, 999);
            second =
                multiplicationRandom(10, 50) * 10;
        }

        return {
            question:
                `${multiplicationFormat(first)} × ` +
                `${multiplicationFormat(second)} = ?`,

            answer:
                first * second,

            type: "direct",
            pattern: 6
        };
    },


    // --------------------------------------------------------
    // 7. Multiplication by 11
    // --------------------------------------------------------

    function (difficulty) {

        let number;

        if (difficulty === "easy") {

            number = multiplicationRandom(2, 12);

        } else if (difficulty === "medium") {

            number = multiplicationRandom(10, 99);

        } else {

            number = multiplicationRandom(100, 999);
        }

        return {
            question:
                `${multiplicationFormat(number)} × 11 = ?`,

            answer:
                number * 11,

            type: "direct",
            pattern: 7
        };
    },


    // --------------------------------------------------------
    // 8. Square of a number
    // --------------------------------------------------------

    function (difficulty) {

        let number;

        if (difficulty === "easy") {

            number = multiplicationRandom(2, 15);

        } else if (difficulty === "medium") {

            number = multiplicationRandom(10, 50);

        } else {

            number = multiplicationRandom(50, 150);
        }

        return {
            question:
                `Find the square of ${number}.`,

            answer:
                number * number,

            type: "direct",
            pattern: 8
        };
    },


    // --------------------------------------------------------
    // 9. Product of consecutive numbers
    // --------------------------------------------------------

    function (difficulty) {

        let number;

        if (difficulty === "easy") {

            number = multiplicationRandom(2, 15);

        } else if (difficulty === "medium") {

            number = multiplicationRandom(10, 75);

        } else {

            number = multiplicationRandom(50, 300);
        }

        return {
            question:
                `Find the product of ` +
                `${number} and ${number + 1}.`,

            answer:
                number * (number + 1),

            type: "direct",
            pattern: 9
        };
    },


    // --------------------------------------------------------
    // 10. Decimal multiplication
    // --------------------------------------------------------

    function (difficulty) {

        let first;
        let second;

        if (difficulty === "easy") {

            first =
                multiplicationRound(
                    multiplicationRandom(10, 90) / 10
                );

            second =
                multiplicationRandom(2, 9);

        } else if (difficulty === "medium") {

            first =
                multiplicationRound(
                    multiplicationRandom(100, 999) / 10
                );

            second =
                multiplicationRound(
                    multiplicationRandom(10, 50) / 10
                );

        } else {

            first =
                multiplicationRound(
                    multiplicationRandom(1000, 9999) / 100
                );

            second =
                multiplicationRound(
                    multiplicationRandom(100, 999) / 100
                );
        }

        return {
            question:
                `${first} × ${second} = ?`,

            answer:
                multiplicationRound(
                    first * second
                ),

            type: "direct",
            pattern: 10
        };
    },


    // --------------------------------------------------------
    // 11. Money multiplication
    // --------------------------------------------------------

    function (difficulty) {

        let price;
        let quantity;

        if (difficulty === "easy") {

            price =
                multiplicationRandom(2, 20);

            quantity =
                multiplicationRandom(2, 10);

        } else if (difficulty === "medium") {

            price =
                multiplicationRandom(20, 200);

            quantity =
                multiplicationRandom(5, 25);

        } else {

            price =
                multiplicationRandom(200, 2000);

            quantity =
                multiplicationRandom(10, 100);
        }

        return {
            question:
                `$${multiplicationFormat(price)} × ` +
                `${quantity} = ?`,

            answer:
                price * quantity,

            type: "direct",
            pattern: 11
        };
    },


    // --------------------------------------------------------
    // 12. Double a number several times
    // --------------------------------------------------------

    function (difficulty) {

        let number;
        let times;

        if (difficulty === "easy") {

            number =
                multiplicationRandom(2, 20);

            times = 2;

        } else if (difficulty === "medium") {

            number =
                multiplicationRandom(10, 100);

            times = 3;

        } else {

            number =
                multiplicationRandom(100, 1000);

            times = 5;
        }

        return {
            question:
                `Multiply ${multiplicationFormat(number)} ` +
                `by 2, ${times} times. What is the result?`,

            answer:
                number * Math.pow(2, times),

            type: "direct",
            pattern: 12
        };
    },


    // --------------------------------------------------------
    // 13. Multiplication using distributive property
    // --------------------------------------------------------

    function (difficulty) {

        let number;
        let firstPart;
        let secondPart;

        if (difficulty === "easy") {

            number =
                multiplicationRandom(2, 12);

            firstPart = 5;
            secondPart = 3;

        } else if (difficulty === "medium") {

            number =
                multiplicationRandom(10, 99);

            firstPart = 10;
            secondPart = 5;

        } else {

            number =
                multiplicationRandom(100, 999);

            firstPart = 20;
            secondPart = 5;
        }

        return {
            question:
                `Use the distributive property to find: ` +
                `${number} × (${firstPart} + ${secondPart}).`,

            answer:
                number *
                (firstPart + secondPart),

            type: "direct",
            pattern: 13
        };
    },


    // --------------------------------------------------------
    // 14. Find a number from its product
    // --------------------------------------------------------

    function (difficulty) {

        const numbers =
            multiplicationGetNumbers(difficulty);

        const product =
            numbers.firstNumber *
            numbers.secondNumber;

        return {
            question:
                `A number multiplied by ` +
                `${numbers.secondNumber} gives ` +
                `${multiplicationFormat(product)}. ` +
                `Find the number.`,

            answer:
                numbers.firstNumber,

            type: "direct",
            pattern: 14
        };
    },


    // --------------------------------------------------------
    // 15. Multiply an even number
    // --------------------------------------------------------

    function (difficulty) {

        let evenNumber;
        let multiplier;

        if (difficulty === "easy") {

            evenNumber =
                multiplicationRandom(2, 20) * 2;

            multiplier =
                multiplicationRandom(2, 10);

        } else if (difficulty === "medium") {

            evenNumber =
                multiplicationRandom(20, 100) * 2;

            multiplier =
                multiplicationRandom(5, 25);

        } else {

            evenNumber =
                multiplicationRandom(100, 1000) * 2;

            multiplier =
                multiplicationRandom(10, 100);
        }

        return {
            question:
                `${multiplicationFormat(evenNumber)} × ` +
                `${multiplier} = ?`,

            answer:
                evenNumber * multiplier,

            type: "direct",
            pattern: 15
        };
    },


    // --------------------------------------------------------
    // 16. Multiply two multiples
    // --------------------------------------------------------

    function (difficulty) {

        let first;
        let second;

        if (difficulty === "easy") {

            first =
                multiplicationRandom(2, 10) * 5;

            second =
                multiplicationRandom(2, 10) * 5;

        } else if (difficulty === "medium") {

            first =
                multiplicationRandom(10, 50) * 5;

            second =
                multiplicationRandom(5, 25) * 10;

        } else {

            first =
                multiplicationRandom(50, 200) * 10;

            second =
                multiplicationRandom(20, 100) * 10;
        }

        return {
            question:
                `${multiplicationFormat(first)} × ` +
                `${multiplicationFormat(second)} = ?`,

            answer:
                first * second,

            type: "direct",
            pattern: 16
        };
    },


    // --------------------------------------------------------
    // 17. Mixed multiplication and addition
    // --------------------------------------------------------

    function (difficulty) {

        let first;
        let second;
        let extra;

        if (difficulty === "easy") {

            first =
                multiplicationRandom(2, 10);

            second =
                multiplicationRandom(2, 10);

            extra =
                multiplicationRandom(5, 30);

        } else if (difficulty === "medium") {

            first =
                multiplicationRandom(10, 50);

            second =
                multiplicationRandom(2, 20);

            extra =
                multiplicationRandom(50, 200);

        } else {

            first =
                multiplicationRandom(100, 500);

            second =
                multiplicationRandom(10, 50);

            extra =
                multiplicationRandom(500, 2000);
        }

        return {
            question:
                `${first} × ${second} + ` +
                `${multiplicationFormat(extra)} = ?`,

            answer:
                first *
                second +
                extra,

            type: "direct",
            pattern: 17
        };
    },


    // --------------------------------------------------------
    // 18. Mixed multiplication and subtraction
    // --------------------------------------------------------

    function (difficulty) {

        let first;
        let second;
        let subtract;

        if (difficulty === "easy") {

            first =
                multiplicationRandom(5, 12);

            second =
                multiplicationRandom(5, 12);

            subtract =
                multiplicationRandom(5, 20);

        } else if (difficulty === "medium") {

            first =
                multiplicationRandom(20, 80);

            second =
                multiplicationRandom(5, 20);

            subtract =
                multiplicationRandom(50, 200);

        } else {

            first =
                multiplicationRandom(100, 500);

            second =
                multiplicationRandom(10, 50);

            subtract =
                multiplicationRandom(500, 2000);
        }

        return {
            question:
                `${first} × ${second} − ` +
                `${multiplicationFormat(subtract)} = ?`,

            answer:
                first *
                second -
                subtract,

            type: "direct",
            pattern: 18
        };
    },


    // --------------------------------------------------------
    // 19. Compare two products
    // --------------------------------------------------------

    function (difficulty) {

        let firstA;
        let firstB;
        let secondA;
        let secondB;

        if (difficulty === "easy") {

            firstA = 8;
            firstB = 7;

            secondA = 9;
            secondB = 6;

        } else if (difficulty === "medium") {

            firstA = 25;
            firstB = 12;

            secondA = 20;
            secondB = 16;

        } else {

            firstA = 250;
            firstB = 40;

            secondA = 200;
            secondB = 55;
        }

        return {
            question:
                `Find the larger product: ` +
                `${firstA} × ${firstB} or ` +
                `${secondA} × ${secondB}.`,

            answer:
                Math.max(
                    firstA * firstB,
                    secondA * secondB
                ),

            type: "direct",
            pattern: 19
        };
    },


    // --------------------------------------------------------
    // 20. Multiplication by a fraction
    // --------------------------------------------------------

    function (difficulty) {

        let number;

        if (difficulty === "easy") {

            number =
                multiplicationRandom(10, 50) * 2;

        } else if (difficulty === "medium") {

            number =
                multiplicationRandom(50, 250) * 2;

        } else {

            number =
                multiplicationRandom(500, 2500) * 2;
        }

        return {
            question:
                `Find one-half of ` +
                `${multiplicationFormat(number)}.`,

            answer:
                number * 0.5,

            type: "direct",
            pattern: 20
        };
    },


    // --------------------------------------------------------
    // 21. Multiply by 25
    // --------------------------------------------------------

    function (difficulty) {

        let number;

        if (difficulty === "easy") {

            number =
                multiplicationRandom(2, 20);

        } else if (difficulty === "medium") {

            number =
                multiplicationRandom(20, 200);

        } else {

            number =
                multiplicationRandom(200, 2000);
        }

        return {
            question:
                `${multiplicationFormat(number)} × 25 = ?`,

            answer:
                number * 25,

            type: "direct",
            pattern: 21
        };
    },


    // --------------------------------------------------------
    // 22. Multiply by 50
    // --------------------------------------------------------

    function (difficulty) {

        let number;

        if (difficulty === "easy") {

            number =
                multiplicationRandom(2, 20);

        } else if (difficulty === "medium") {

            number =
                multiplicationRandom(20, 200);

        } else {

            number =
                multiplicationRandom(200, 2000);
        }

        return {
            question:
                `${multiplicationFormat(number)} × 50 = ?`,

            answer:
                number * 50,

            type: "direct",
            pattern: 22
        };
    },


    // --------------------------------------------------------
    // 23. Multiply by 99
    // --------------------------------------------------------

    function (difficulty) {

        let number;

        if (difficulty === "easy") {

            number =
                multiplicationRandom(2, 12);

        } else if (difficulty === "medium") {

            number =
                multiplicationRandom(10, 100);

        } else {

            number =
                multiplicationRandom(100, 1000);
        }

        return {
            question:
                `${multiplicationFormat(number)} × 99 = ?`,

            answer:
                number * 99,

            type: "direct",
            pattern: 23
        };
    },


    // --------------------------------------------------------
    // 24. Challenge: four factors
    // --------------------------------------------------------

    function (difficulty) {

        let first;
        let second;
        let third;
        let fourth;

        if (difficulty === "easy") {

            first = 2;
            second = 3;
            third = 4;
            fourth = 5;

        } else if (difficulty === "medium") {

            first =
                multiplicationRandom(2, 8);

            second =
                multiplicationRandom(2, 8);

            third =
                multiplicationRandom(2, 8);

            fourth =
                multiplicationRandom(2, 8);

        } else {

            first =
                multiplicationRandom(5, 15);

            second =
                multiplicationRandom(5, 15);

            third =
                multiplicationRandom(2, 10);

            fourth =
                multiplicationRandom(2, 10);
        }

        return {
            question:
                `${first} × ${second} × ` +
                `${third} × ${fourth} = ?`,

            answer:
                first *
                second *
                third *
                fourth,

            type: "direct",
            pattern: 24
        };
    },


    // --------------------------------------------------------
    // 25. Advanced multi-step challenge
    // --------------------------------------------------------

    function (difficulty) {

        let groups;
        let items;
        let extra;

        if (difficulty === "easy") {

            groups =
                multiplicationRandom(5, 12);

            items =
                multiplicationRandom(5, 12);

            extra =
                multiplicationRandom(10, 50);

        } else if (difficulty === "medium") {

            groups =
                multiplicationRandom(20, 80);

            items =
                multiplicationRandom(10, 30);

            extra =
                multiplicationRandom(100, 500);

        } else {

            groups =
                multiplicationRandom(100, 500);

            items =
                multiplicationRandom(20, 100);

            extra =
                multiplicationRandom(1000, 5000);
        }

        return {
            question:
                `Calculate: (${groups} × ${items}) + ` +
                `${multiplicationFormat(extra)}.`,

            answer:
                groups *
                items +
                extra,

            type: "direct",
            pattern: 25
        };
    }

];


// ============================================================
// 25 MULTIPLICATION WORD-PROBLEM PATTERNS
// ============================================================

const multiplicationWordPatterns = [

    // --------------------------------------------------------
    // 1. Boxes of books
    // --------------------------------------------------------

    function (difficulty) {

        let boxes;
        let books;

        if (difficulty === "easy") {

            boxes =
                multiplicationRandom(3, 12);

            books =
                multiplicationRandom(4, 12);

        } else if (difficulty === "medium") {

            boxes =
                multiplicationRandom(20, 100);

            books =
                multiplicationRandom(10, 50);

        } else {

            boxes =
                multiplicationRandom(100, 500);

            books =
                multiplicationRandom(50, 200);
        }

        return {
            question:
                `A library has ${boxes} boxes. ` +
                `Each box contains ${books} books. ` +
                `How many books are there altogether?`,

            answer:
                boxes * books,

            type: "word",
            pattern: 1
        };
    },


    // --------------------------------------------------------
    // 2. Rows of students
    // --------------------------------------------------------

    function (difficulty) {

        let rows;
        let students;

        if (difficulty === "easy") {

            rows =
                multiplicationRandom(3, 10);

            students =
                multiplicationRandom(4, 12);

        } else if (difficulty === "medium") {

            rows =
                multiplicationRandom(20, 100);

            students =
                multiplicationRandom(10, 40);

        } else {

            rows =
                multiplicationRandom(100, 500);

            students =
                multiplicationRandom(50, 150);
        }

        return {
            question:
                `There are ${rows} rows of students. ` +
                `Each row has ${students} students. ` +
                `How many students are there in total?`,

            answer:
                rows * students,

            type: "word",
            pattern: 2
        };
    },


    // --------------------------------------------------------
    // 3. Cost of identical items
    // --------------------------------------------------------

    function (difficulty) {

        let price;
        let quantity;

        if (difficulty === "easy") {

            price =
                multiplicationRandom(2, 20);

            quantity =
                multiplicationRandom(2, 10);

        } else if (difficulty === "medium") {

            price =
                multiplicationRandom(20, 250);

            quantity =
                multiplicationRandom(5, 30);

        } else {

            price =
                multiplicationRandom(200, 2500);

            quantity =
                multiplicationRandom(20, 100);
        }

        return {
            question:
                `One notebook costs $${price}. ` +
                `What is the cost of ${quantity} notebooks?`,

            answer:
                price * quantity,

            type: "word",
            pattern: 3
        };
    },


    // --------------------------------------------------------
    // 4. Trees in rows
    // --------------------------------------------------------

    function (difficulty) {

        const rows =
            difficulty === "easy"
                ? multiplicationRandom(4, 12)
                : difficulty === "medium"
                    ? multiplicationRandom(20, 100)
                    : multiplicationRandom(100, 500);

        const trees =
            difficulty === "easy"
                ? multiplicationRandom(4, 12)
                : difficulty === "medium"
                    ? multiplicationRandom(10, 50)
                    : multiplicationRandom(50, 200);

        return {
            question:
                `A park has ${rows} rows of trees. ` +
                `Each row contains ${trees} trees. ` +
                `How many trees are there?`,

            answer:
                rows * trees,

            type: "word",
            pattern: 4
        };
    },


    // --------------------------------------------------------
    // 5. Days and daily production
    // --------------------------------------------------------

    function (difficulty) {

        const days =
            difficulty === "easy"
                ? multiplicationRandom(3, 10)
                : difficulty === "medium"
                    ? multiplicationRandom(10, 30)
                    : multiplicationRandom(30, 100);

        const daily =
            difficulty === "easy"
                ? multiplicationRandom(10, 50)
                : difficulty === "medium"
                    ? multiplicationRandom(100, 500)
                    : multiplicationRandom(1000, 5000);

        return {
            question:
                `A factory produces ${multiplicationFormat(daily)} ` +
                `items each day. How many items will it produce ` +
                `in ${days} days?`,

            answer:
                days * daily,

            type: "word",
            pattern: 5
        };
    },


    // --------------------------------------------------------
    // 6. Weekly savings
    // --------------------------------------------------------

    function (difficulty) {

        const weeks =
            difficulty === "easy"
                ? multiplicationRandom(2, 12)
                : difficulty === "medium"
                    ? multiplicationRandom(10, 52)
                    : multiplicationRandom(50, 200);

        const saved =
            difficulty === "easy"
                ? multiplicationRandom(5, 50)
                : difficulty === "medium"
                    ? multiplicationRandom(50, 500)
                    : multiplicationRandom(500, 5000);

        return {
            question:
                `A student saves $${saved} every week. ` +
                `How much will the student save in ${weeks} weeks?`,

            answer:
                weeks * saved,

            type: "word",
            pattern: 6
        };
    },


    // --------------------------------------------------------
    // 7. Buses and passengers
    // --------------------------------------------------------

    function (difficulty) {

        const buses =
            difficulty === "easy"
                ? multiplicationRandom(2, 10)
                : difficulty === "medium"
                    ? multiplicationRandom(20, 100)
                    : multiplicationRandom(100, 500);

        const passengers =
            difficulty === "easy"
                ? multiplicationRandom(10, 50)
                : difficulty === "medium"
                    ? multiplicationRandom(30, 100)
                    : multiplicationRandom(100, 500);

        return {
            question:
                `${buses} buses each carry ${passengers} passengers. ` +
                `How many passengers can all the buses carry?`,

            answer:
                buses * passengers,

            type: "word",
            pattern: 7
        };
    },


    // --------------------------------------------------------
    // 8. Movie tickets
    // --------------------------------------------------------

    function (difficulty) {

        const groups =
            difficulty === "easy"
                ? multiplicationRandom(2, 10)
                : difficulty === "medium"
                    ? multiplicationRandom(10, 50)
                    : multiplicationRandom(50, 200);

        const people =
            difficulty === "easy"
                ? multiplicationRandom(3, 10)
                : difficulty === "medium"
                    ? multiplicationRandom(10, 30)
                    : multiplicationRandom(30, 100);

        return {
            question:
                `There are ${groups} groups. ` +
                `Each group buys ${people} movie tickets. ` +
                `How many tickets are bought altogether?`,

            answer:
                groups * people,

            type: "word",
            pattern: 8
        };
    },


    // --------------------------------------------------------
    // 9. Bricks in layers
    // --------------------------------------------------------

    function (difficulty) {

        const layers =
            difficulty === "easy"
                ? multiplicationRandom(3, 10)
                : difficulty === "medium"
                    ? multiplicationRandom(20, 100)
                    : multiplicationRandom(100, 500);

        const bricks =
            difficulty === "easy"
                ? multiplicationRandom(10, 50)
                : difficulty === "medium"
                    ? multiplicationRandom(100, 500)
                    : multiplicationRandom(1000, 5000);

        return {
            question:
                `A wall has ${layers} layers. ` +
                `Each layer contains ${bricks} bricks. ` +
                `How many bricks are used altogether?`,

            answer:
                layers * bricks,

            type: "word",
            pattern: 9
        };
    },


    // --------------------------------------------------------
    // 10. Pages printed
    // --------------------------------------------------------

    function (difficulty) {

        const printers =
            difficulty === "easy"
                ? multiplicationRandom(2, 8)
                : difficulty === "medium"
                    ? multiplicationRandom(10, 50)
                    : multiplicationRandom(50, 200);

        const pages =
            difficulty === "easy"
                ? multiplicationRandom(10, 50)
                : difficulty === "medium"
                    ? multiplicationRandom(100, 500)
                    : multiplicationRandom(1000, 5000);

        return {
            question:
                `${printers} printers each print ` +
                `${multiplicationFormat(pages)} pages. ` +
                `How many pages are printed altogether?`,

            answer:
                printers * pages,

            type: "word",
            pattern: 10
        };
    },


    // --------------------------------------------------------
    // 11. Packs of pencils
    // --------------------------------------------------------

    function (difficulty) {

        const packs =
            difficulty === "easy"
                ? multiplicationRandom(3, 12)
                : difficulty === "medium"
                    ? multiplicationRandom(20, 100)
                    : multiplicationRandom(100, 500);

        const pencils =
            difficulty === "easy"
                ? multiplicationRandom(5, 15)
                : difficulty === "medium"
                    ? multiplicationRandom(20, 100)
                    : multiplicationRandom(100, 500);

        return {
            question:
                `A school buys ${packs} packs of pencils. ` +
                `Each pack contains ${pencils} pencils. ` +
                `How many pencils does the school buy?`,

            answer:
                packs * pencils,

            type: "word",
            pattern: 11
        };
    },


    // --------------------------------------------------------
    // 12. Monthly salary
    // --------------------------------------------------------

    function (difficulty) {

        const months =
            difficulty === "easy"
                ? multiplicationRandom(2, 6)
                : difficulty === "medium"
                    ? multiplicationRandom(6, 24)
                    : multiplicationRandom(24, 120);

        const salary =
            difficulty === "easy"
                ? multiplicationRandom(100, 500)
                : difficulty === "medium"
                    ? multiplicationRandom(1000, 10000)
                    : multiplicationRandom(10000, 100000);

        return {
            question:
                `A worker earns $${multiplicationFormat(salary)} ` +
                `each month. How much will the worker earn ` +
                `in ${months} months?`,

            answer:
                months * salary,

            type: "word",
            pattern: 12
        };
    },


    // --------------------------------------------------------
    // 13. Chairs in halls
    // --------------------------------------------------------

    function (difficulty) {

        const halls =
            difficulty === "easy"
                ? multiplicationRandom(2, 8)
                : difficulty === "medium"
                    ? multiplicationRandom(10, 50)
                    : multiplicationRandom(50, 200);

        const chairs =
            difficulty === "easy"
                ? multiplicationRandom(20, 100)
                : difficulty === "medium"
                    ? multiplicationRandom(100, 1000)
                    : multiplicationRandom(1000, 10000);

        return {
            question:
                `A building has ${halls} halls. ` +
                `Each hall has ${multiplicationFormat(chairs)} chairs. ` +
                `How many chairs are there altogether?`,

            answer:
                halls * chairs,

            type: "word",
            pattern: 13
        };
    },


    // --------------------------------------------------------
    // 14. Multiple days and multiple shifts
    // --------------------------------------------------------

    function (difficulty) {

        const days =
            difficulty === "easy"
                ? multiplicationRandom(2, 5)
                : difficulty === "medium"
                    ? multiplicationRandom(5, 20)
                    : multiplicationRandom(20, 100);

        const shifts =
            difficulty === "easy"
                ? multiplicationRandom(2, 4)
                : difficulty === "medium"
                    ? multiplicationRandom(2, 6)
                    : multiplicationRandom(3, 10);

        const items =
            difficulty === "easy"
                ? multiplicationRandom(10, 30)
                : difficulty === "medium"
                    ? multiplicationRandom(100, 500)
                    : multiplicationRandom(1000, 5000);

        return {
            question:
                `A factory has ${shifts} shifts each day. ` +
                `Each shift produces ${multiplicationFormat(items)} items. ` +
                `How many items are produced in ${days} days?`,

            answer:
                days *
                shifts *
                items,

            type: "word",
            pattern: 14
        };
    },


    // --------------------------------------------------------
    // 15. Area of a rectangle
    // --------------------------------------------------------

    function (difficulty) {

        const length =
            difficulty === "easy"
                ? multiplicationRandom(5, 20)
                : difficulty === "medium"
                    ? multiplicationRandom(20, 100)
                    : multiplicationRandom(100, 1000);

        const width =
            difficulty === "easy"
                ? multiplicationRandom(3, 15)
                : difficulty === "medium"
                    ? multiplicationRandom(10, 50)
                    : multiplicationRandom(50, 500);

        return {
            question:
                `A rectangular garden is ${length} metres long ` +
                `and ${width} metres wide. ` +
                `What is its area in square metres?`,

            answer:
                length * width,

            type: "word",
            pattern: 15
        };
    },


    // --------------------------------------------------------
    // 16. Repeated distance
    // --------------------------------------------------------

    function (difficulty) {

        const trips =
            difficulty === "easy"
                ? multiplicationRandom(2, 10)
                : difficulty === "medium"
                    ? multiplicationRandom(10, 50)
                    : multiplicationRandom(50, 200);

        const distance =
            difficulty === "easy"
                ? multiplicationRandom(5, 50)
                : difficulty === "medium"
                    ? multiplicationRandom(50, 500)
                    : multiplicationRandom(500, 5000);

        return {
            question:
                `A bus travels ${distance} km on each trip. ` +
                `How far does it travel in ${trips} trips?`,

            answer:
                trips * distance,

            type: "word",
            pattern: 16
        };
    },


    // --------------------------------------------------------
    // 17. Cost with decimal price
    // --------------------------------------------------------

    function (difficulty) {

        let price;
        let quantity;

        if (difficulty === "easy") {

            price =
                multiplicationRound(
                    multiplicationRandom(10, 90) / 10
                );

            quantity =
                multiplicationRandom(2, 10);

        } else if (difficulty === "medium") {

            price =
                multiplicationRound(
                    multiplicationRandom(100, 999) / 10
                );

            quantity =
                multiplicationRandom(5, 30);

        } else {

            price =
                multiplicationRound(
                    multiplicationRandom(1000, 9999) / 100
                );

            quantity =
                multiplicationRandom(20, 100);
        }

        return {
            question:
                `One item costs $${price}. ` +
                `What is the total cost of ${quantity} items?`,

            answer:
                multiplicationRound(
                    price * quantity
                ),

            type: "word",
            pattern: 17
        };
    },


    // --------------------------------------------------------
    // 18. Total points
    // --------------------------------------------------------

    function (difficulty) {

        const rounds =
            difficulty === "easy"
                ? multiplicationRandom(2, 10)
                : difficulty === "medium"
                    ? multiplicationRandom(10, 50)
                    : multiplicationRandom(50, 200);

        const points =
            difficulty === "easy"
                ? multiplicationRandom(5, 20)
                : difficulty === "medium"
                    ? multiplicationRandom(20, 100)
                    : multiplicationRandom(100, 1000);

        return {
            question:
                `A player earns ${points} points in each round. ` +
                `How many points will the player earn in ` +
                `${rounds} rounds?`,

            answer:
                rounds * points,

            type: "word",
            pattern: 18
        };
    },


    // --------------------------------------------------------
    // 19. Flower beds
    // --------------------------------------------------------

    function (difficulty) {

        const beds =
            difficulty === "easy"
                ? multiplicationRandom(3, 12)
                : difficulty === "medium"
                    ? multiplicationRandom(20, 100)
                    : multiplicationRandom(100, 500);

        const flowers =
            difficulty === "easy"
                ? multiplicationRandom(5, 20)
                : difficulty === "medium"
                    ? multiplicationRandom(50, 200)
                    : multiplicationRandom(500, 2000);

        return {
            question:
                `A park has ${beds} flower beds. ` +
                `Each bed contains ${flowers} flowers. ` +
                `How many flowers are there altogether?`,

            answer:
                beds * flowers,

            type: "word",
            pattern: 19
        };
    },


    // --------------------------------------------------------
    // 20. Bottles in cartons
    // --------------------------------------------------------

    function (difficulty) {

        const cartons =
            difficulty === "easy"
                ? multiplicationRandom(3, 12)
                : difficulty === "medium"
                    ? multiplicationRandom(20, 100)
                    : multiplicationRandom(100, 500);

        const bottles =
            difficulty === "easy"
                ? multiplicationRandom(6, 24)
                : difficulty === "medium"
                    ? multiplicationRandom(50, 200)
                    : multiplicationRandom(500, 2000);

        return {
            question:
                `A warehouse has ${cartons} cartons. ` +
                `Each carton contains ${bottles} bottles. ` +
                `How many bottles are stored?`,

            answer:
                cartons * bottles,

            type: "word",
            pattern: 20
        };
    },


    // --------------------------------------------------------
    // 21. Challenge: school supplies
    // --------------------------------------------------------

    function (difficulty) {

        const classes =
            difficulty === "easy"
                ? multiplicationRandom(2, 8)
                : difficulty === "medium"
                    ? multiplicationRandom(10, 50)
                    : multiplicationRandom(50, 200);

        const students =
            difficulty === "easy"
                ? multiplicationRandom(10, 30)
                : difficulty === "medium"
                    ? multiplicationRandom(30, 100)
                    : multiplicationRandom(100, 500);

        const notebooks =
            difficulty === "easy"
                ? multiplicationRandom(2, 5)
                : difficulty === "medium"
                    ? multiplicationRandom(3, 10)
                    : multiplicationRandom(5, 20);

        return {
            question:
                `A school has ${classes} classes. ` +
                `Each class has ${students} students. ` +
                `Each student receives ${notebooks} notebooks. ` +
                `How many notebooks are needed?`,

            answer:
                classes *
                students *
                notebooks,

            type: "word",
            pattern: 21
        };
    },


    // --------------------------------------------------------
    // 22. Challenge: monthly production
    // --------------------------------------------------------

    function (difficulty) {

        const days =
            difficulty === "easy"
                ? 20
                : difficulty === "medium"
                    ? 25
                    : 30;

        const machines =
            difficulty === "easy"
                ? multiplicationRandom(2, 8)
                : difficulty === "medium"
                    ? multiplicationRandom(10, 50)
                    : multiplicationRandom(50, 200);

        const production =
            difficulty === "easy"
                ? multiplicationRandom(10, 50)
                : difficulty === "medium"
                    ? multiplicationRandom(100, 500)
                    : multiplicationRandom(1000, 5000);

        return {
            question:
                `A factory operates for ${days} days. ` +
                `It has ${machines} machines, and each machine ` +
                `produces ${multiplicationFormat(production)} items ` +
                `per day. How many items are produced in total?`,

            answer:
                days *
                machines *
                production,

            type: "word",
            pattern: 22
        };
    },


    // --------------------------------------------------------
    // 23. Challenge: event seats
    // --------------------------------------------------------

    function (difficulty) {

        const sections =
            difficulty === "easy"
                ? multiplicationRandom(2, 8)
                : difficulty === "medium"
                    ? multiplicationRandom(10, 30)
                    : multiplicationRandom(30, 100);

        const rows =
            difficulty === "easy"
                ? multiplicationRandom(5, 15)
                : difficulty === "medium"
                    ? multiplicationRandom(20, 60)
                    : multiplicationRandom(50, 200);

        const seats =
            difficulty === "easy"
                ? multiplicationRandom(5, 20)
                : difficulty === "medium"
                    ? multiplicationRandom(20, 100)
                    : multiplicationRandom(100, 500);

        return {
            question:
                `An auditorium has ${sections} sections. ` +
                `Each section has ${rows} rows, and each row ` +
                `has ${seats} seats. How many seats are there?`,

            answer:
                sections *
                rows *
                seats,

            type: "word",
            pattern: 23
        };
    },


    // --------------------------------------------------------
    // 24. Challenge: yearly earnings
    // --------------------------------------------------------

    function (difficulty) {

        const months =
            difficulty === "easy"
                ? 12
                : difficulty === "medium"
                    ? 24
                    : 60;

        const weeklyPay =
            difficulty === "easy"
                ? multiplicationRandom(100, 500)
                : difficulty === "medium"
                    ? multiplicationRandom(500, 3000)
                    : multiplicationRandom(3000, 20000);

        return {
            question:
                `A worker earns $${multiplicationFormat(weeklyPay)} ` +
                `per week. Assuming 4 weeks in each month, ` +
                `how much will the worker earn in ${months} months?`,

            answer:
                months *
                4 *
                weeklyPay,

            type: "word",
            pattern: 24
        };
    },


    // --------------------------------------------------------
    // 25. Advanced multi-step challenge
    // --------------------------------------------------------

    function (difficulty) {

        const factories =
            difficulty === "easy"
                ? multiplicationRandom(2, 5)
                : difficulty === "medium"
                    ? multiplicationRandom(5, 20)
                    : multiplicationRandom(20, 100);

        const machines =
            difficulty === "easy"
                ? multiplicationRandom(2, 6)
                : difficulty === "medium"
                    ? multiplicationRandom(5, 20)
                    : multiplicationRandom(20, 100);

        const hours =
            difficulty === "easy"
                ? multiplicationRandom(4, 10)
                : difficulty === "medium"
                    ? multiplicationRandom(8, 24)
                    : multiplicationRandom(20, 100);

        const perHour =
            difficulty === "easy"
                ? multiplicationRandom(5, 20)
                : difficulty === "medium"
                    ? multiplicationRandom(20, 100)
                    : multiplicationRandom(100, 1000);

        return {
            question:
                `There are ${factories} factories. ` +
                `Each factory has ${machines} machines. ` +
                `Each machine produces ${perHour} items per hour ` +
                `for ${hours} hours. How many items are produced ` +
                `altogether?`,

            answer:
                factories *
                machines *
                hours *
                perHour,

            type: "word",
            pattern: 25
        };
    }

];


// ============================================================
// MAIN MULTIPLICATION QUESTION GENERATOR
// ============================================================

function generateMultiplicationQuestion(
    difficulty,
    questionCategory,
    usedPatterns = []
) {

    let patterns;


    if (questionCategory === "word") {

        patterns =
            multiplicationWordPatterns;

    } else {

        patterns =
            multiplicationDirectPatterns;
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
                multiplicationRandom(
                    0,
                    availableIndexes.length - 1
                )
            ];

    } else {

        selectedIndex =
            multiplicationRandom(
                0,
                patterns.length - 1
            );
    }


    const question =
        patterns[selectedIndex](difficulty);


    question.patternIndex =
        selectedIndex;


    question.topic =
        "multiplication";


    return question;
}