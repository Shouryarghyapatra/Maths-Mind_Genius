// =====================================================
// MATHMIND AI — ADDITION QUESTION ENGINE
// 25 Direct Patterns + 25 Word-Problem Patterns
// =====================================================


// -----------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------

function additionRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function additionShuffle(array) {
    const copiedArray = [...array];

    for (let i = copiedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [copiedArray[i], copiedArray[randomIndex]] =
            [copiedArray[randomIndex], copiedArray[i]];
    }

    return copiedArray;
}


function additionFormatNumber(number) {
    return Number(number).toLocaleString("en-US");
}


// -----------------------------------------------------
// DIRECT ADDITION PATTERNS
// -----------------------------------------------------

const additionDirectPatterns = [

    // Pattern 1:
    // Two-number addition
    function (difficulty) {

        let firstNumber;
        let secondNumber;

        if (difficulty === "easy") {
            firstNumber = additionRandom(20, 99);
            secondNumber = additionRandom(10, 99);
        }

        else if (difficulty === "medium") {
            firstNumber = additionRandom(100, 999);
            secondNumber = additionRandom(100, 999);
        }

        else {
            firstNumber = additionRandom(1000, 9999);
            secondNumber = additionRandom(1000, 9999);
        }

        return {
            question:
                `${additionFormatNumber(firstNumber)} + ` +
                `${additionFormatNumber(secondNumber)} = ?`,

            answer: firstNumber + secondNumber,

            type: "direct",

            pattern: 1
        };
    },


    // Pattern 2:
    // Addition of three numbers
    function (difficulty) {

        let firstNumber;
        let secondNumber;
        let thirdNumber;

        if (difficulty === "easy") {
            firstNumber = additionRandom(10, 50);
            secondNumber = additionRandom(10, 50);
            thirdNumber = additionRandom(10, 50);
        }

        else if (difficulty === "medium") {
            firstNumber = additionRandom(100, 500);
            secondNumber = additionRandom(100, 500);
            thirdNumber = additionRandom(100, 500);
        }

        else {
            firstNumber = additionRandom(1000, 5000);
            secondNumber = additionRandom(1000, 5000);
            thirdNumber = additionRandom(1000, 5000);
        }

        return {
            question:
                `${additionFormatNumber(firstNumber)} + ` +
                `${additionFormatNumber(secondNumber)} + ` +
                `${additionFormatNumber(thirdNumber)} = ?`,

            answer:
                firstNumber +
                secondNumber +
                thirdNumber,

            type: "direct",

            pattern: 2
        };
    },


    // Pattern 3:
    // Missing addend
    function (difficulty) {

        let firstNumber;
        let secondNumber;

        if (difficulty === "easy") {
            firstNumber = additionRandom(10, 60);
            secondNumber = additionRandom(10, 60);
        }

        else if (difficulty === "medium") {
            firstNumber = additionRandom(100, 700);
            secondNumber = additionRandom(100, 700);
        }

        else {
            firstNumber = additionRandom(1000, 8000);
            secondNumber = additionRandom(1000, 8000);
        }

        const total = firstNumber + secondNumber;

        return {
            question:
                `___ + ${additionFormatNumber(secondNumber)} ` +
                `= ${additionFormatNumber(total)}`,

            answer: firstNumber,

            type: "direct",

            pattern: 3
        };
    },


    // Pattern 4:
    // Missing second addend
    function (difficulty) {

        let firstNumber;
        let secondNumber;

        if (difficulty === "easy") {
            firstNumber = additionRandom(10, 70);
            secondNumber = additionRandom(10, 70);
        }

        else if (difficulty === "medium") {
            firstNumber = additionRandom(100, 800);
            secondNumber = additionRandom(100, 800);
        }

        else {
            firstNumber = additionRandom(1000, 9000);
            secondNumber = additionRandom(1000, 9000);
        }

        const total = firstNumber + secondNumber;

        return {
            question:
                `${additionFormatNumber(firstNumber)} + ___ ` +
                `= ${additionFormatNumber(total)}`,

            answer: secondNumber,

            type: "direct",

            pattern: 4
        };
    },


    // Pattern 5:
    // Find the missing number in a three-number sum
    function (difficulty) {

        let firstNumber;
        let secondNumber;
        let thirdNumber;

        if (difficulty === "easy") {
            firstNumber = additionRandom(10, 40);
            secondNumber = additionRandom(10, 40);
            thirdNumber = additionRandom(10, 40);
        }

        else if (difficulty === "medium") {
            firstNumber = additionRandom(100, 400);
            secondNumber = additionRandom(100, 400);
            thirdNumber = additionRandom(100, 400);
        }

        else {
            firstNumber = additionRandom(1000, 4000);
            secondNumber = additionRandom(1000, 4000);
            thirdNumber = additionRandom(1000, 4000);
        }

        const total =
            firstNumber +
            secondNumber +
            thirdNumber;

        return {
            question:
                `${additionFormatNumber(firstNumber)} + ___ + ` +
                `${additionFormatNumber(thirdNumber)} = ` +
                `${additionFormatNumber(total)}`,

            answer: secondNumber,

            type: "direct",

            pattern: 5
        };
    }

];


// -----------------------------------------------------
// WORD-PROBLEM PATTERNS
// -----------------------------------------------------

const additionWordPatterns = [

    // Pattern 1:
    // Books
    function (difficulty) {

        let firstAmount;
        let secondAmount;

        if (difficulty === "easy") {
            firstAmount = additionRandom(20, 90);
            secondAmount = additionRandom(20, 90);
        }

        else if (difficulty === "medium") {
            firstAmount = additionRandom(200, 900);
            secondAmount = additionRandom(200, 900);
        }

        else {
            firstAmount = additionRandom(2000, 9000);
            secondAmount = additionRandom(2000, 9000);
        }

        return {
            question:
                `A library received ` +
                `${additionFormatNumber(firstAmount)} books ` +
                `in January and ` +
                `${additionFormatNumber(secondAmount)} books ` +
                `in February. How many books did the library ` +
                `receive altogether?`,

            answer:
                firstAmount +
                secondAmount,

            type: "word",

            pattern: 1
        };
    },


    // Pattern 2:
    // Students
    function (difficulty) {

        let firstGroup;
        let secondGroup;

        if (difficulty === "easy") {
            firstGroup = additionRandom(15, 50);
            secondGroup = additionRandom(15, 50);
        }

        else if (difficulty === "medium") {
            firstGroup = additionRandom(100, 500);
            secondGroup = additionRandom(100, 500);
        }

        else {
            firstGroup = additionRandom(1000, 5000);
            secondGroup = additionRandom(1000, 5000);
        }

        return {
            question:
                `There were ${additionFormatNumber(firstGroup)} ` +
                `students at a science exhibition in the morning ` +
                `and ${additionFormatNumber(secondGroup)} students ` +
                `in the afternoon. How many students attended ` +
                `the exhibition in total?`,

            answer:
                firstGroup +
                secondGroup,

            type: "word",

            pattern: 2
        };
    },


    // Pattern 3:
    // Money saved
    function (difficulty) {

        let firstAmount;
        let secondAmount;

        if (difficulty === "easy") {
            firstAmount = additionRandom(10, 90);
            secondAmount = additionRandom(10, 90);
        }

        else if (difficulty === "medium") {
            firstAmount = additionRandom(100, 900);
            secondAmount = additionRandom(100, 900);
        }

        else {
            firstAmount = additionRandom(1000, 9000);
            secondAmount = additionRandom(1000, 9000);
        }

        return {
            question:
                `A student saved $${additionFormatNumber(firstAmount)} ` +
                `in the first month and $${additionFormatNumber(secondAmount)} ` +
                `in the second month. How much money was saved ` +
                `altogether?`,

            answer:
                firstAmount +
                secondAmount,

            type: "word",

            pattern: 3
        };
    },


    // Pattern 4:
    // Trees planted
    function (difficulty) {

        let firstAmount;
        let secondAmount;
        let thirdAmount;

        if (difficulty === "easy") {
            firstAmount = additionRandom(10, 40);
            secondAmount = additionRandom(10, 40);
            thirdAmount = additionRandom(10, 40);
        }

        else if (difficulty === "medium") {
            firstAmount = additionRandom(100, 400);
            secondAmount = additionRandom(100, 400);
            thirdAmount = additionRandom(100, 400);
        }

        else {
            firstAmount = additionRandom(1000, 4000);
            secondAmount = additionRandom(1000, 4000);
            thirdAmount = additionRandom(1000, 4000);
        }

        return {
            question:
                `Three groups planted ` +
                `${additionFormatNumber(firstAmount)}, ` +
                `${additionFormatNumber(secondAmount)}, and ` +
                `${additionFormatNumber(thirdAmount)} trees. ` +
                `How many trees did they plant altogether?`,

            answer:
                firstAmount +
                secondAmount +
                thirdAmount,

            type: "word",

            pattern: 4
        };
    },


    // Pattern 5:
    // Distance travelled
    function (difficulty) {

        let firstDistance;
        let secondDistance;

        if (difficulty === "easy") {
            firstDistance = additionRandom(10, 90);
            secondDistance = additionRandom(10, 90);
        }

        else if (difficulty === "medium") {
            firstDistance = additionRandom(100, 500);
            secondDistance = additionRandom(100, 500);
        }

        else {
            firstDistance = additionRandom(500, 2500);
            secondDistance = additionRandom(500, 2500);
        }

        return {
            question:
                `A bus travelled ` +
                `${additionFormatNumber(firstDistance)} km ` +
                `in the morning and ` +
                `${additionFormatNumber(secondDistance)} km ` +
                `in the afternoon. What total distance did ` +
                `the bus travel?`,

            answer:
                firstDistance +
                secondDistance,

            type: "word",

            pattern: 5
        };
    }

];


// -----------------------------------------------------
// CREATE AN ADDITION QUESTION
// -----------------------------------------------------

function generateAdditionQuestion(
    difficulty,
    questionCategory,
    usedPatterns = []
) {

    let availablePatterns;

    if (questionCategory === "word") {
        availablePatterns = additionWordPatterns;
    }

    else {
        availablePatterns = additionDirectPatterns;
    }


    const unusedPatternIndexes = [];

    for (
        let index = 0;
        index < availablePatterns.length;
        index++
    ) {

        if (!usedPatterns.includes(index)) {
            unusedPatternIndexes.push(index);
        }
    }


    let selectedIndex;

    if (unusedPatternIndexes.length > 0) {

        selectedIndex =
            unusedPatternIndexes[
                additionRandom(
                    0,
                    unusedPatternIndexes.length - 1
                )
            ];

    }

    else {

        selectedIndex =
            additionRandom(
                0,
                availablePatterns.length - 1
            );

    }


    const generatedQuestion =
        availablePatterns[selectedIndex](difficulty);


    generatedQuestion.patternIndex =
        selectedIndex;


    generatedQuestion.topic =
        "addition";


    return generatedQuestion;
}