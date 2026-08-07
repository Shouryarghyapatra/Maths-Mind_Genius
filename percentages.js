// ============================================================
// MATHMIND AI
// PERCENTAGES QUESTION ENGINE
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

function percentageRandom(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


function percentageRound(
    number,
    places = 2
) {
    const factor =
        Math.pow(10, places);

    return (
        Math.round(
            (number + Number.EPSILON) *
            factor
        ) / factor
    );
}


function percentageFormat(
    number,
    places = null
) {
    const rounded =
        percentageRound(
            number,
            4
        );

    if (places !== null) {
        return rounded.toFixed(
            places
        );
    }

    return String(rounded);
}


function percentageChoose(
    values
) {
    return values[
        percentageRandom(
            0,
            values.length - 1
        )
    ];
}


function percentageDifficultyValues(
    difficulty
) {

    if (
        difficulty === "easy"
    ) {

        return {
            maximum: 100,
            percentages: [
                1,
                5,
                10,
                20,
                25,
                50,
                75
            ]
        };
    }


    if (
        difficulty === "medium"
    ) {

        return {
            maximum: 1000,
            percentages: [
                5,
                10,
                12,
                15,
                20,
                25,
                30,
                35,
                40,
                45,
                50,
                60,
                75
            ]
        };
    }


    return {
        maximum: 10000,
        percentages: [
            2,
            5,
            7.5,
            8,
            10,
            12.5,
            15,
            17.5,
            20,
            22.5,
            25,
            30,
            35,
            40,
            45,
            50,
            60,
            75,
            80,
            90
        ]
    };
}


function getPercentageValue(
    difficulty
) {

    const values =
        percentageDifficultyValues(
            difficulty
        );

    return percentageChoose(
        values.percentages
    );
}


function getPercentageBase(
    difficulty
) {

    if (
        difficulty === "easy"
    ) {

        const values = [
            20,
            40,
            50,
            60,
            80,
            100,
            120,
            200,
            400
        ];

        return percentageChoose(
            values
        );
    }


    if (
        difficulty === "medium"
    ) {

        const values = [
            100,
            120,
            150,
            200,
            240,
            250,
            300,
            400,
            500,
            600,
            800,
            1000
        ];

        return percentageChoose(
            values
        );
    }


    return percentageRandom(
        100,
        10000
    );
}


function percentageOf(
    percentage,
    number
) {

    return percentageRound(
        (
            percentage / 100
        ) * number,
        4
    );
}


function percentageIncrease(
    original,
    percentage
) {

    return percentageRound(
        original *
        (
            1 +
            percentage / 100
        ),
        4
    );
}


function percentageDecrease(
    original,
    percentage
) {

    return percentageRound(
        original *
        (
            1 -
            percentage / 100
        ),
        4
    );
}


// ============================================================
// 25 DIRECT PERCENTAGE QUESTION PATTERNS
// ============================================================

const percentageDirectPatterns = [

    // --------------------------------------------------------
    // 1. Find a percentage of a number
    // --------------------------------------------------------

    function (difficulty) {

        const percent =
            getPercentageValue(
                difficulty
            );

        const number =
            getPercentageBase(
                difficulty
            );

        return {
            question:
                `Find ${percent}% of ${number}.`,

            answer:
                percentageOf(
                    percent,
                    number
                ),

            type: "direct",
            pattern: 1
        };
    },


    // --------------------------------------------------------
    // 2. Find 10% of a number
    // --------------------------------------------------------

    function (difficulty) {

        let number;

        if (
            difficulty === "easy"
        ) {

            number =
                percentageRandom(
                    10,
                    500
                );

        } else if (
            difficulty === "medium"
        ) {

            number =
                percentageRandom(
                    100,
                    5000
                );

        } else {

            number =
                percentageRandom(
                    1000,
                    100000
                );
        }

        return {
            question:
                `Find 10% of ${number}.`,

            answer:
                percentageRound(
                    number / 10,
                    4
                ),

            type: "direct",
            pattern: 2
        };
    },


    // --------------------------------------------------------
    // 3. Find 25% of a number
    // --------------------------------------------------------

    function (difficulty) {

        let number;

        if (
            difficulty === "easy"
        ) {

            number =
                percentageChoose([
                    20,
                    40,
                    60,
                    80,
                    100,
                    200
                ]);

        } else if (
            difficulty === "medium"
        ) {

            number =
                percentageChoose([
                    100,
                    200,
                    300,
                    400,
                    500,
                    800,
                    1000
                ]);

        } else {

            number =
                percentageRandom(
                    100,
                    50000
                );
        }

        return {
            question:
                `Find 25% of ${number}.`,

            answer:
                percentageRound(
                    number / 4,
                    4
                ),

            type: "direct",
            pattern: 3
        };
    },


    // --------------------------------------------------------
    // 4. Find 50% of a number
    // --------------------------------------------------------

    function (difficulty) {

        let number;

        if (
            difficulty === "easy"
        ) {

            number =
                percentageRandom(
                    10,
                    500
                );

        } else if (
            difficulty === "medium"
        ) {

            number =
                percentageRandom(
                    100,
                    10000
                );

        } else {

            number =
                percentageRandom(
                    1000,
                    100000
                );
        }

        return {
            question:
                `Find 50% of ${number}.`,

            answer:
                percentageRound(
                    number / 2,
                    4
                ),

            type: "direct",
            pattern: 4
        };
    },


    // --------------------------------------------------------
    // 5. Find 1% of a number
    // --------------------------------------------------------

    function (difficulty) {

        let number;

        if (
            difficulty === "easy"
        ) {

            number =
                percentageChoose([
                    100,
                    200,
                    300,
                    400,
                    500
                ]);

        } else if (
            difficulty === "medium"
        ) {

            number =
                percentageRandom(
                    100,
                    10000
                );

        } else {

            number =
                percentageRandom(
                    1000,
                    1000000
                );
        }

        return {
            question:
                `Find 1% of ${number}.`,

            answer:
                percentageRound(
                    number / 100,
                    4
                ),

            type: "direct",
            pattern: 5
        };
    },


    // --------------------------------------------------------
    // 6. Find the percentage
    // --------------------------------------------------------

    function (difficulty) {

        let total;
        let part;

        if (
            difficulty === "easy"
        ) {

            total =
                percentageChoose([
                    20,
                    40,
                    50,
                    100,
                    200
                ]);

            part =
                percentageChoose([
                    total / 10,
                    total / 5,
                    total / 4,
                    total / 2
                ]);

        } else {

            total =
                getPercentageBase(
                    difficulty
                );

            const percent =
                getPercentageValue(
                    difficulty
                );

            part =
                percentageOf(
                    percent,
                    total
                );
        }

        return {
            question:
                `${part} is what percentage ` +
                `of ${total}?`,

            answer:
                percentageRound(
                    (
                        part / total
                    ) * 100,
                    2
                ),

            type: "direct",
            pattern: 6
        };
    },


    // --------------------------------------------------------
    // 7. Find the whole
    // --------------------------------------------------------

    function (difficulty) {

        const percent =
            getPercentageValue(
                difficulty
            );

        let whole;

        if (
            difficulty === "easy"
        ) {

            whole =
                percentageChoose([
                    20,
                    40,
                    50,
                    100,
                    200
                ]);

        } else if (
            difficulty === "medium"
        ) {

            whole =
                percentageChoose([
                    100,
                    200,
                    400,
                    500,
                    800,
                    1000
                ]);

        } else {

            whole =
                percentageRandom(
                    100,
                    10000
                );
        }

        const part =
            percentageOf(
                percent,
                whole
            );

        return {
            question:
                `${part} is ${percent}% of what number?`,

            answer:
                percentageRound(
                    whole,
                    4
                ),

            type: "direct",
            pattern: 7
        };
    },


    // --------------------------------------------------------
    // 8. Percentage increase
    // --------------------------------------------------------

    function (difficulty) {

        const original =
            getPercentageBase(
                difficulty
            );

        const percent =
            getPercentageValue(
                difficulty
            );

        return {
            question:
                `Increase ${original} by ${percent}%.`,

            answer:
                percentageIncrease(
                    original,
                    percent
                ),

            type: "direct",
            pattern: 8
        };
    },


    // --------------------------------------------------------
    // 9. Percentage decrease
    // --------------------------------------------------------

    function (difficulty) {

        const original =
            getPercentageBase(
                difficulty
            );

        const percent =
            getPercentageValue(
                difficulty
            );

        return {
            question:
                `Decrease ${original} by ${percent}%.`,

            answer:
                percentageDecrease(
                    original,
                    percent
                ),

            type: "direct",
            pattern: 9
        };
    },


    // --------------------------------------------------------
    // 10. Find percentage change
    // --------------------------------------------------------

    function (difficulty) {

        let original;
        let percent;

        original =
            getPercentageBase(
                difficulty
            );

        percent =
            getPercentageValue(
                difficulty
            );

        const newValue =
            percentageIncrease(
                original,
                percent
            );

        return {
            question:
                `A value changes from ${original} ` +
                `to ${newValue}. What is the percentage increase?`,

            answer:
                percentageRound(
                    percent,
                    2
                ),

            type: "direct",
            pattern: 10
        };
    },


    // --------------------------------------------------------
    // 11. Percentage decrease from two values
    // --------------------------------------------------------

    function (difficulty) {

        const original =
            getPercentageBase(
                difficulty
            );

        const percent =
            getPercentageValue(
                difficulty
            );

        const newValue =
            percentageDecrease(
                original,
                percent
            );

        return {
            question:
                `A value decreases from ${original} ` +
                `to ${newValue}. What is the percentage decrease?`,

            answer:
                percentageRound(
                    percent,
                    2
                ),

            type: "direct",
            pattern: 11
        };
    },


    // --------------------------------------------------------
    // 12. Find the original value
    // --------------------------------------------------------

    function (difficulty) {

        const original =
            getPercentageBase(
                difficulty
            );

        const percent =
            getPercentageValue(
                difficulty
            );

        const finalValue =
            percentageIncrease(
                original,
                percent
            );

        return {
            question:
                `A number becomes ${finalValue} ` +
                `after a ${percent}% increase. ` +
                `Find the original number.`,

            answer:
                percentageRound(
                    original,
                    4
                ),

            type: "direct",
            pattern: 12
        };
    },


    // --------------------------------------------------------
    // 13. Find original after decrease
    // --------------------------------------------------------

    function (difficulty) {

        const original =
            getPercentageBase(
                difficulty
            );

        let percent =
            getPercentageValue(
                difficulty
            );

        if (
            percent >= 100
        ) {
            percent = 50;
        }

        const finalValue =
            percentageDecrease(
                original,
                percent
            );

        return {
            question:
                `A number becomes ${finalValue} ` +
                `after a ${percent}% decrease. ` +
                `Find the original number.`,

            answer:
                percentageRound(
                    original,
                    4
                ),

            type: "direct",
            pattern: 13
        };
    },


    // --------------------------------------------------------
    // 14. Percentage of a decimal
    // --------------------------------------------------------

    function (difficulty) {

        const percent =
            getPercentageValue(
                difficulty
            );

        let number;

        if (
            difficulty === "easy"
        ) {

            number =
                percentageRandom(
                    10,
                    500
                ) / 10;

        } else if (
            difficulty === "medium"
        ) {

            number =
                percentageRandom(
                    100,
                    10000
                ) / 100;

        } else {

            number =
                percentageRandom(
                    1000,
                    1000000
                ) / 1000;
        }

        return {
            question:
                `Find ${percent}% of ${percentageFormat(number)}.`,

            answer:
                percentageOf(
                    percent,
                    number
                ),

            type: "direct",
            pattern: 14
        };
    },


    // --------------------------------------------------------
    // 15. Percentage increase with decimals
    // --------------------------------------------------------

    function (difficulty) {

        let original;

        if (
            difficulty === "easy"
        ) {

            original =
                percentageRandom(
                    100,
                    1000
                ) / 10;

        } else if (
            difficulty === "medium"
        ) {

            original =
                percentageRandom(
                    1000,
                    100000
                ) / 100;

        } else {

            original =
                percentageRandom(
                    10000,
                    10000000
                ) / 1000;
        }

        const percent =
            getPercentageValue(
                difficulty
            );

        return {
            question:
                `Increase ${percentageFormat(original)} ` +
                `by ${percent}%.`,

            answer:
                percentageIncrease(
                    original,
                    percent
                ),

            type: "direct",
            pattern: 15
        };
    },


    // --------------------------------------------------------
    // 16. Percentage decrease with decimals
    // --------------------------------------------------------

    function (difficulty) {

        let original;

        if (
            difficulty === "easy"
        ) {

            original =
                percentageRandom(
                    100,
                    1000
                ) / 10;

        } else if (
            difficulty === "medium"
        ) {

            original =
                percentageRandom(
                    1000,
                    100000
                ) / 100;

        } else {

            original =
                percentageRandom(
                    10000,
                    10000000
                ) / 1000;
        }

        let percent =
            getPercentageValue(
                difficulty
            );

        if (
            percent >= 100
        ) {
            percent = 50;
        }

        return {
            question:
                `Decrease ${percentageFormat(original)} ` +
                `by ${percent}%.`,

            answer:
                percentageDecrease(
                    original,
                    percent
                ),

            type: "direct",
            pattern: 16
        };
    },


    // --------------------------------------------------------
    // 17. Successive percentage increases
    // --------------------------------------------------------

    function (difficulty) {

        const original =
            getPercentageBase(
                difficulty
            );

        const firstPercent =
            getPercentageValue(
                difficulty
            );

        const secondPercent =
            getPercentageValue(
                difficulty
            );

        const afterFirst =
            percentageIncrease(
                original,
                firstPercent
            );

        const finalValue =
            percentageIncrease(
                afterFirst,
                secondPercent
            );

        return {
            question:
                `A value of ${original} is increased by ` +
                `${firstPercent}% and then by ${secondPercent}%. ` +
                `Find the final value.`,

            answer:
                finalValue,

            type: "direct",
            pattern: 17
        };
    },


    // --------------------------------------------------------
    // 18. Increase then decrease
    // --------------------------------------------------------

    function (difficulty) {

        const original =
            getPercentageBase(
                difficulty
            );

        const increase =
            getPercentageValue(
                difficulty
            );

        let decrease =
            getPercentageValue(
                difficulty
            );

        if (
            decrease >= 100
        ) {
            decrease = 50;
        }

        const afterIncrease =
            percentageIncrease(
                original,
                increase
            );

        const finalValue =
            percentageDecrease(
                afterIncrease,
                decrease
            );

        return {
            question:
                `A value of ${original} is increased by ` +
                `${increase}% and then decreased by ` +
                `${decrease}%. Find the final value.`,

            answer:
                finalValue,

            type: "direct",
            pattern: 18
        };
    },


    // --------------------------------------------------------
    // 19. Percentage difference
    // --------------------------------------------------------

    function (difficulty) {

        const smaller =
            getPercentageBase(
                difficulty
            );

        const percent =
            getPercentageValue(
                difficulty
            );

        const larger =
            percentageIncrease(
                smaller,
                percent
            );

        return {
            question:
                `${larger} is what percentage more than ` +
                `${smaller}?`,

            answer:
                percentageRound(
                    percent,
                    2
                ),

            type: "direct",
            pattern: 19
        };
    },


    // --------------------------------------------------------
    // 20. Find missing percentage
    // --------------------------------------------------------

    function (difficulty) {

        const total =
            getPercentageBase(
                difficulty
            );

        const percent =
            getPercentageValue(
                difficulty
            );

        const part =
            percentageOf(
                percent,
                total
            );

        return {
            question:
                `${part} = x% of ${total}. Find x.`,

            answer:
                percentageRound(
                    percent,
                    2
                ),

            type: "direct",
            pattern: 20
        };
    },


    // --------------------------------------------------------
    // 21. Percentage remaining
    // --------------------------------------------------------

    function (difficulty) {

        let used =
            getPercentageValue(
                difficulty
            );

        if (
            used > 90
        ) {
            used = 75;
        }

        return {
            question:
                `If ${used}% of a quantity is used, ` +
                `what percentage remains?`,

            answer:
                percentageRound(
                    100 - used,
                    2
                ),

            type: "direct",
            pattern: 21
        };
    },


    // --------------------------------------------------------
    // 22. Find number after percentage is removed
    // --------------------------------------------------------

    function (difficulty) {

        const original =
            getPercentageBase(
                difficulty
            );

        let removed =
            getPercentageValue(
                difficulty
            );

        if (
            removed >= 100
        ) {
            removed = 50;
        }

        const remaining =
            percentageDecrease(
                original,
                removed
            );

        return {
            question:
                `${removed}% of ${original} is removed. ` +
                `What is the remaining amount?`,

            answer:
                remaining,

            type: "direct",
            pattern: 22
        };
    },


    // --------------------------------------------------------
    // 23. Hard percentage equation
    // --------------------------------------------------------

    function (difficulty) {

        const whole =
            getPercentageBase(
                difficulty
            );

        const percent =
            getPercentageValue(
                difficulty
            );

        const result =
            percentageOf(
                percent,
                whole
            );

        return {
            question:
                `${percent}% of x is ${result}. ` +
                `Find x.`,

            answer:
                percentageRound(
                    whole,
                    4
                ),

            type: "direct",
            pattern: 23
        };
    },


    // --------------------------------------------------------
    // 24. Percentage challenge
    // --------------------------------------------------------

    function (difficulty) {

        const original =
            getPercentageBase(
                difficulty
            );

        const firstPercent =
            getPercentageValue(
                difficulty
            );

        const secondPercent =
            getPercentageValue(
                difficulty
            );

        const firstAmount =
            percentageOf(
                firstPercent,
                original
            );

        const remaining =
            original -
            firstAmount;

        const secondAmount =
            percentageOf(
                secondPercent,
                remaining
            );

        return {
            question:
                `From ${original}, first remove ` +
                `${firstPercent}%. Then remove ` +
                `${secondPercent}% of the remaining amount. ` +
                `How much remains?`,

            answer:
                percentageRound(
                    remaining -
                    secondAmount,
                    4
                ),

            type: "direct",
            pattern: 24
        };
    },


    // --------------------------------------------------------
    // 25. Advanced percentage challenge
    // --------------------------------------------------------

    function (difficulty) {

        const original =
            getPercentageBase(
                difficulty
            );

        const increase =
            getPercentageValue(
                difficulty
            );

        let decrease =
            getPercentageValue(
                difficulty
            );

        if (
            decrease >= 100
        ) {
            decrease = 50;
        }

        const afterIncrease =
            percentageIncrease(
                original,
                increase
            );

        const finalValue =
            percentageDecrease(
                afterIncrease,
                decrease
            );

        return {
            question:
                `A value starts at ${original}. ` +
                `It increases by ${increase}% and then ` +
                `decreases by ${decrease}%. ` +
                `Find the final value.`,

            answer:
                finalValue,

            type: "direct",
            pattern: 25
        };
    }

];


// ============================================================
// 25 PERCENTAGE WORD-PROBLEM PATTERNS
// ============================================================

const percentageWordPatterns = [

    // --------------------------------------------------------
    // 1. Exam marks
    // --------------------------------------------------------

    function (difficulty) {

        const total =
            getPercentageBase(
                difficulty
            );

        const percent =
            getPercentageValue(
                difficulty
            );

        const marks =
            percentageOf(
                percent,
                total
            );

        return {
            question:
                `A student scores ${percent}% in an exam ` +
                `worth ${total} marks. ` +
                `How many marks did the student score?`,

            answer:
                marks,

            type: "word",
            pattern: 1
        };
    },


    // --------------------------------------------------------
    // 2. Discount
    // --------------------------------------------------------

    function (difficulty) {

        const price =
            getPercentageBase(
                difficulty
            );

        let discount =
            getPercentageValue(
                difficulty
            );

        if (
            discount >= 100
        ) {
            discount = 50;
        }

        const finalPrice =
            percentageDecrease(
                price,
                discount
            );

        return {
            question:
                `A product costs $${price}. ` +
                `It is sold with a ${discount}% discount. ` +
                `What is the sale price?`,

            answer:
                finalPrice,

            type: "word",
            pattern: 2
        };
    },


    // --------------------------------------------------------
    // 3. Population increase
    // --------------------------------------------------------

    function (difficulty) {

        const population =
            getPercentageBase(
                difficulty
            );

        const increase =
            getPercentageValue(
                difficulty
            );

        return {
            question:
                `A town has a population of ${population}. ` +
                `The population increases by ${increase}%. ` +
                `What is the new population?`,

            answer:
                percentageIncrease(
                    population,
                    increase
                ),

            type: "word",
            pattern: 3
        };
    },


    // --------------------------------------------------------
    // 4. Population decrease
    // --------------------------------------------------------

    function (difficulty) {

        const population =
            getPercentageBase(
                difficulty
            );

        let decrease =
            getPercentageValue(
                difficulty
            );

        if (
            decrease >= 100
        ) {
            decrease = 50;
        }

        return {
            question:
                `A town has a population of ${population}. ` +
                `The population decreases by ${decrease}%. ` +
                `What is the new population?`,

            answer:
                percentageDecrease(
                    population,
                    decrease
                ),

            type: "word",
            pattern: 4
        };
    },


    // --------------------------------------------------------
    // 5. Test score percentage
    // --------------------------------------------------------

    function (difficulty) {

        const total =
            getPercentageBase(
                difficulty
            );

        const percent =
            getPercentageValue(
                difficulty
            );

        const score =
            percentageOf(
                percent,
                total
            );

        return {
            question:
                `A student gets ${score} marks out of ` +
                `${total}. What percentage did the student score?`,

            answer:
                percentageRound(
                    percent,
                    2
                ),

            type: "word",
            pattern: 5
        };
    },


    // --------------------------------------------------------
    // 6. Students present
    // --------------------------------------------------------

    function (difficulty) {

        const total =
            getPercentageBase(
                difficulty
            );

        let presentPercent =
            getPercentageValue(
                difficulty
            );

        if (
            presentPercent > 100
        ) {
            presentPercent = 75;
        }

        const present =
            percentageOf(
                presentPercent,
                total
            );

        return {
            question:
                `A school has ${total} students. ` +
                `${presentPercent}% are present today. ` +
                `How many students are present?`,

            answer:
                present,

            type: "word",
            pattern: 6
        };
    },


    // --------------------------------------------------------
    // 7. Students absent
    // --------------------------------------------------------

    function (difficulty) {

        const total =
            getPercentageBase(
                difficulty
            );

        let absentPercent =
            getPercentageValue(
                difficulty
            );

        if (
            absentPercent > 90
        ) {
            absentPercent = 25;
        }

        return {
            question:
                `A school has ${total} students. ` +
                `${absentPercent}% are absent. ` +
                `How many students are absent?`,

            answer:
                percentageOf(
                    absentPercent,
                    total
                ),

            type: "word",
            pattern: 7
        };
    },


    // --------------------------------------------------------
    // 8. Tax
    // --------------------------------------------------------

    function (difficulty) {

        const price =
            getPercentageBase(
                difficulty
            );

        const tax =
            difficulty === "easy"

                ? percentageChoose([
                    5,
                    10
                ])

                : difficulty === "medium"

                    ? percentageChoose([
                        5,
                        8,
                        10,
                        12
                    ])

                    : percentageChoose([
                        5,
                        7.5,
                        8,
                        12.5,
                        15,
                        18
                    ]);

        return {
            question:
                `An item costs $${price}. ` +
                `A ${tax}% tax is added. ` +
                `What is the final price?`,

            answer:
                percentageIncrease(
                    price,
                    tax
                ),

            type: "word",
            pattern: 8
        };
    },


    // --------------------------------------------------------
    // 9. Restaurant tip
    // --------------------------------------------------------

    function (difficulty) {

        const bill =
            getPercentageBase(
                difficulty
            );

        const tip =
            difficulty === "easy"

                ? 10

                : difficulty === "medium"

                    ? percentageChoose([
                        10,
                        15,
                        20
                    ])

                    : percentageChoose([
                        12.5,
                        15,
                        18,
                        20,
                        22.5
                    ]);

        return {
            question:
                `A restaurant bill is $${bill}. ` +
                `A ${tip}% tip is added. ` +
                `What is the total amount paid?`,

            answer:
                percentageIncrease(
                    bill,
                    tip
                ),

            type: "word",
            pattern: 9
        };
    },


    // --------------------------------------------------------
    // 10. Salary increase
    // --------------------------------------------------------

    function (difficulty) {

        const salary =
            getPercentageBase(
                difficulty
            );

        const increase =
            getPercentageValue(
                difficulty
            );

        return {
            question:
                `A worker earns $${salary} per month. ` +
                `Their salary increases by ${increase}%. ` +
                `What is the new monthly salary?`,

            answer:
                percentageIncrease(
                    salary,
                    increase
                ),

            type: "word",
            pattern: 10
        };
    },


    // --------------------------------------------------------
    // 11. Salary decrease
    // --------------------------------------------------------

    function (difficulty) {

        const salary =
            getPercentageBase(
                difficulty
            );

        let decrease =
            getPercentageValue(
                difficulty
            );

        if (
            decrease >= 100
        ) {
            decrease = 25;
        }

        return {
            question:
                `A worker earns $${salary} per month. ` +
                `Their salary decreases by ${decrease}%. ` +
                `What is the new monthly salary?`,

            answer:
                percentageDecrease(
                    salary,
                    decrease
                ),

            type: "word",
            pattern: 11
        };
    },


    // --------------------------------------------------------
    // 12. Profit
    // --------------------------------------------------------

    function (difficulty) {

        const cost =
            getPercentageBase(
                difficulty
            );

        const profit =
            getPercentageValue(
                difficulty
            );

        return {
            question:
                `A shopkeeper buys an item for $${cost}. ` +
                `They make a profit of ${profit}%. ` +
                `What is the selling price?`,

            answer:
                percentageIncrease(
                    cost,
                    profit
                ),

            type: "word",
            pattern: 12
        };
    },


    // --------------------------------------------------------
    // 13. Loss
    // --------------------------------------------------------

    function (difficulty) {

        const cost =
            getPercentageBase(
                difficulty
            );

        let loss =
            getPercentageValue(
                difficulty
            );

        if (
            loss >= 100
        ) {
            loss = 25;
        }

        return {
            question:
                `A shopkeeper buys an item for $${cost}. ` +
                `They sell it at a loss of ${loss}%. ` +
                `What is the selling price?`,

            answer:
                percentageDecrease(
                    cost,
                    loss
                ),

            type: "word",
            pattern: 13
        };
    },


    // --------------------------------------------------------
    // 14. Savings
    // --------------------------------------------------------

    function (difficulty) {

        const income =
            getPercentageBase(
                difficulty
            );

        const savedPercent =
            getPercentageValue(
                difficulty
            );

        return {
            question:
                `A person earns $${income}. ` +
                `They save ${savedPercent}% of their income. ` +
                `How much do they save?`,

            answer:
                percentageOf(
                    savedPercent,
                    income
                ),

            type: "word",
            pattern: 14
        };
    },


    // --------------------------------------------------------
    // 15. Money spent
    // --------------------------------------------------------

    function (difficulty) {

        const money =
            getPercentageBase(
                difficulty
            );

        let spentPercent =
            getPercentageValue(
                difficulty
            );

        if (
            spentPercent > 100
        ) {
            spentPercent = 50;
        }

        return {
            question:
                `A person has $${money}. ` +
                `They spend ${spentPercent}% of it. ` +
                `How much money do they spend?`,

            answer:
                percentageOf(
                    spentPercent,
                    money
                ),

            type: "word",
            pattern: 15
        };
    },


    // --------------------------------------------------------
    // 16. Remaining money
    // --------------------------------------------------------

    function (difficulty) {

        const money =
            getPercentageBase(
                difficulty
            );

        let spentPercent =
            getPercentageValue(
                difficulty
            );

        if (
            spentPercent >= 100
        ) {
            spentPercent = 50;
        }

        return {
            question:
                `A person has $${money}. ` +
                `They spend ${spentPercent}% of it. ` +
                `How much money remains?`,

            answer:
                percentageDecrease(
                    money,
                    spentPercent
                ),

            type: "word",
            pattern: 16
        };
    },


    // --------------------------------------------------------
    // 17. Price after two discounts
    // --------------------------------------------------------

    function (difficulty) {

        const price =
            getPercentageBase(
                difficulty
            );

        let firstDiscount =
            getPercentageValue(
                difficulty
            );

        let secondDiscount =
            getPercentageValue(
                difficulty
            );

        if (
            firstDiscount >= 100
        ) {
            firstDiscount = 25;
        }

        if (
            secondDiscount >= 100
        ) {
            secondDiscount = 20;
        }

        const afterFirst =
            percentageDecrease(
                price,
                firstDiscount
            );

        const finalPrice =
            percentageDecrease(
                afterFirst,
                secondDiscount
            );

        return {
            question:
                `A product costs $${price}. ` +
                `It receives a ${firstDiscount}% discount, ` +
                `followed by another ${secondDiscount}% discount. ` +
                `What is the final price?`,

            answer:
                finalPrice,

            type: "word",
            pattern: 17
        };
    },


    // --------------------------------------------------------
    // 18. Price increase then discount
    // --------------------------------------------------------

    function (difficulty) {

        const price =
            getPercentageBase(
                difficulty
            );

        const increase =
            getPercentageValue(
                difficulty
            );

        let discount =
            getPercentageValue(
                difficulty
            );

        if (
            discount >= 100
        ) {
            discount = 25;
        }

        const increasedPrice =
            percentageIncrease(
                price,
                increase
            );

        const finalPrice =
            percentageDecrease(
                increasedPrice,
                discount
            );

        return {
            question:
                `A product costs $${price}. ` +
                `Its price increases by ${increase}% and then ` +
                `it receives a ${discount}% discount. ` +
                `What is the final price?`,

            answer:
                finalPrice,

            type: "word",
            pattern: 18
        };
    },


    // --------------------------------------------------------
    // 19. Percentage of books read
    // --------------------------------------------------------

    function (difficulty) {

        const total =
            getPercentageBase(
                difficulty
            );

        const percent =
            getPercentageValue(
                difficulty
            );

        const read =
            percentageOf(
                percent,
                total
            );

        return {
            question:
                `A student reads ${read} books out of ` +
                `${total} books. What percentage of the books ` +
                `did the student read?`,

            answer:
                percentageRound(
                    percent,
                    2
                ),

            type: "word",
            pattern: 19
        };
    },


    // --------------------------------------------------------
    // 20. Percentage of correct answers
    // --------------------------------------------------------

    function (difficulty) {

        const total =
            getPercentageBase(
                difficulty
            );

        const percent =
            getPercentageValue(
                difficulty
            );

        const correct =
            percentageOf(
                percent,
                total
            );

        return {
            question:
                `A student answers ${correct} questions correctly ` +
                `out of ${total} questions. ` +
                `What percentage is correct?`,

            answer:
                percentageRound(
                    percent,
                    2
                ),

            type: "word",
            pattern: 20
        };
    },


    // --------------------------------------------------------
    // 21. Sports team win rate
    // --------------------------------------------------------

    function (difficulty) {

        const games =
            difficulty === "easy"

                ? percentageChoose([
                    10,
                    20,
                    40,
                    50
                ])

                : getPercentageBase(
                    difficulty
                );

        const winPercent =
            getPercentageValue(
                difficulty
            );

        const wins =
            percentageOf(
                winPercent,
                games
            );

        return {
            question:
                `A team wins ${wins} out of ${games} games. ` +
                `What is its win percentage?`,

            answer:
                percentageRound(
                    winPercent,
                    2
                ),

            type: "word",
            pattern: 21
        };
    },


    // --------------------------------------------------------
    // 22. Challenge: exam improvement
    // --------------------------------------------------------

    function (difficulty) {

        const original =
            getPercentageBase(
                difficulty
            );

        const increase =
            getPercentageValue(
                difficulty
            );

        const newScore =
            percentageIncrease(
                original,
                increase
            );

        return {
            question:
                `A student's score is ${original}. ` +
                `It improves by ${increase}%. ` +
                `What is the new score?`,

            answer:
                newScore,

            type: "word",
            pattern: 22
        };
    },


    // --------------------------------------------------------
    // 23. Challenge: factory production
    // --------------------------------------------------------

    function (difficulty) {

        const production =
            getPercentageBase(
                difficulty
            );

        const increase =
            getPercentageValue(
                difficulty
            );

        const afterIncrease =
            percentageIncrease(
                production,
                increase
            );

        return {
            question:
                `A factory produces ${production} items. ` +
                `Production increases by ${increase}%. ` +
                `How many items are produced now?`,

            answer:
                afterIncrease,

            type: "word",
            pattern: 23
        };
    },


    // --------------------------------------------------------
    // 24. Challenge: damaged products
    // --------------------------------------------------------

    function (difficulty) {

        const total =
            getPercentageBase(
                difficulty
            );

        let damagedPercent =
            getPercentageValue(
                difficulty
            );

        if (
            damagedPercent > 90
        ) {
            damagedPercent = 20;
        }

        return {
            question:
                `A factory makes ${total} products. ` +
                `${damagedPercent}% are damaged. ` +
                `How many products are not damaged?`,

            answer:
                percentageDecrease(
                    total,
                    damagedPercent
                ),

            type: "word",
            pattern: 24
        };
    },


    // --------------------------------------------------------
    // 25. Advanced percentage challenge
    // --------------------------------------------------------

    function (difficulty) {

        const price =
            getPercentageBase(
                difficulty
            );

        const tax =
            difficulty === "easy"

                ? 5

                : difficulty === "medium"

                    ? percentageChoose([
                        5,
                        8,
                        10
                    ])

                    : percentageChoose([
                        5,
                        7.5,
                        8,
                        12.5,
                        15,
                        18
                    ]);

        let discount =
            getPercentageValue(
                difficulty
            );

        if (
            discount >= 100
        ) {
            discount = 25;
        }

        const discountedPrice =
            percentageDecrease(
                price,
                discount
            );

        const finalPrice =
            percentageIncrease(
                discountedPrice,
                tax
            );

        return {
            question:
                `A product costs $${price}. ` +
                `It receives a ${discount}% discount. ` +
                `Then a ${tax}% tax is added. ` +
                `What is the final price?`,

            answer:
                finalPrice,

            type: "word",
            pattern: 25
        };
    }

];


// ============================================================
// MAIN PERCENTAGE QUESTION GENERATOR
// ============================================================

function generatePercentageQuestion(
    difficulty,
    questionCategory,
    usedPatterns = []
) {

    let patterns;


    if (
        questionCategory === "word"
    ) {

        patterns =
            percentageWordPatterns;

    } else {

        patterns =
            percentageDirectPatterns;
    }


    const availableIndexes = [];


    for (
        let index = 0;
        index < patterns.length;
        index++
    ) {

        if (
            !usedPatterns.includes(
                index
            )
        ) {

            availableIndexes.push(
                index
            );
        }
    }


    let selectedIndex;


    if (
        availableIndexes.length > 0
    ) {

        selectedIndex =
            availableIndexes[
                percentageRandom(
                    0,
                    availableIndexes.length - 1
                )
            ];

    } else {

        selectedIndex =
            percentageRandom(
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
        "percentages";


    return question;
}