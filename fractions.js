// ============================================================
// MATHMIND AI
// FRACTIONS QUESTION ENGINE
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

function fractionRandom(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


function fractionGCD(a, b) {

    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {

        const temporary = b;

        b = a % b;

        a = temporary;
    }

    return a;
}


function simplifyFraction(
    numerator,
    denominator
) {

    if (denominator < 0) {

        numerator = -numerator;
        denominator = -denominator;
    }

    const gcd =
        fractionGCD(
            numerator,
            denominator
        );

    return {
        numerator:
            numerator / gcd,

        denominator:
            denominator / gcd
    };
}


function fractionText(
    numerator,
    denominator
) {

    const simplified =
        simplifyFraction(
            numerator,
            denominator
        );

    if (
        simplified.denominator === 1
    ) {

        return String(
            simplified.numerator
        );
    }

    return (
        `${simplified.numerator}/` +
        `${simplified.denominator}`
    );
}


function fractionAnswer(
    numerator,
    denominator
) {

    const simplified =
        simplifyFraction(
            numerator,
            denominator
        );

    return (
        `${simplified.numerator}/` +
        `${simplified.denominator}`
    );
}


function mixedNumberText(
    whole,
    numerator,
    denominator
) {

    const simplified =
        simplifyFraction(
            numerator,
            denominator
        );

    if (
        simplified.numerator === 0
    ) {

        return String(whole);
    }

    return (
        `${whole} ${simplified.numerator}/` +
        `${simplified.denominator}`
    );
}


function improperFromMixed(
    whole,
    numerator,
    denominator
) {

    return {
        numerator:
            whole * denominator +
            numerator,

        denominator:
            denominator
    };
}


function fractionDifficultyValues(
    difficulty
) {

    if (difficulty === "easy") {

        return {
            maximumDenominator: 10,
            maximumMultiplier: 5,
            maximumWhole: 5
        };
    }

    if (difficulty === "medium") {

        return {
            maximumDenominator: 20,
            maximumMultiplier: 10,
            maximumWhole: 12
        };
    }

    return {
        maximumDenominator: 50,
        maximumMultiplier: 20,
        maximumWhole: 30
    };
}


function getSimpleFraction(
    difficulty
) {

    const values =
        fractionDifficultyValues(
            difficulty
        );

    let denominator =
        fractionRandom(
            2,
            values.maximumDenominator
        );

    let numerator =
        fractionRandom(
            1,
            denominator - 1
        );

    const simplified =
        simplifyFraction(
            numerator,
            denominator
        );

    return {
        numerator:
            simplified.numerator,

        denominator:
            simplified.denominator
    };
}


function getProperFraction(
    minimumDenominator,
    maximumDenominator
) {

    const denominator =
        fractionRandom(
            minimumDenominator,
            maximumDenominator
        );

    const numerator =
        fractionRandom(
            1,
            denominator - 1
        );

    return simplifyFraction(
        numerator,
        denominator
    );
}


function fractionToDecimal(
    numerator,
    denominator
) {

    return numerator / denominator;
}


// ============================================================
// 25 DIRECT FRACTION QUESTION PATTERNS
// ============================================================

const fractionDirectPatterns = [

    // --------------------------------------------------------
    // 1. Simplify a fraction
    // --------------------------------------------------------

    function (difficulty) {

        let baseNumerator;
        let baseDenominator;
        let multiplier;

        if (difficulty === "easy") {

            baseDenominator =
                fractionRandom(2, 8);

            baseNumerator =
                fractionRandom(
                    1,
                    baseDenominator - 1
                );

            multiplier =
                fractionRandom(2, 5);

        } else if (difficulty === "medium") {

            baseDenominator =
                fractionRandom(5, 15);

            baseNumerator =
                fractionRandom(
                    1,
                    baseDenominator - 1
                );

            multiplier =
                fractionRandom(3, 10);

        } else {

            baseDenominator =
                fractionRandom(10, 30);

            baseNumerator =
                fractionRandom(
                    1,
                    baseDenominator - 1
                );

            multiplier =
                fractionRandom(5, 20);
        }

        return {
            question:
                `Simplify ${baseNumerator * multiplier}/` +
                `${baseDenominator * multiplier}.`,

            answer:
                fractionAnswer(
                    baseNumerator,
                    baseDenominator
                ),

            type: "direct",
            pattern: 1
        };
    },


    // --------------------------------------------------------
    // 2. Find an equivalent fraction
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        let multiplier;

        if (difficulty === "easy") {

            multiplier =
                fractionRandom(2, 5);

        } else if (difficulty === "medium") {

            multiplier =
                fractionRandom(3, 10);

        } else {

            multiplier =
                fractionRandom(5, 20);
        }

        return {
            question:
                `Complete the equivalent fraction: ` +
                `${fraction.numerator}/` +
                `${fraction.denominator} = ` +
                `___/${fraction.denominator * multiplier}`,

            answer:
                fraction.numerator *
                multiplier,

            type: "direct",
            pattern: 2
        };
    },


    // --------------------------------------------------------
    // 3. Missing denominator
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        let multiplier;

        if (difficulty === "easy") {

            multiplier =
                fractionRandom(2, 5);

        } else if (difficulty === "medium") {

            multiplier =
                fractionRandom(3, 10);

        } else {

            multiplier =
                fractionRandom(5, 20);
        }

        return {
            question:
                `Complete the equivalent fraction: ` +
                `${fraction.numerator}/` +
                `${fraction.denominator} = ` +
                `${fraction.numerator * multiplier}/___`,

            answer:
                fraction.denominator *
                multiplier,

            type: "direct",
            pattern: 3
        };
    },


    // --------------------------------------------------------
    // 4. Add fractions with same denominator
    // --------------------------------------------------------

    function (difficulty) {

        let denominator;

        if (difficulty === "easy") {

            denominator =
                fractionRandom(3, 10);

        } else if (difficulty === "medium") {

            denominator =
                fractionRandom(8, 20);

        } else {

            denominator =
                fractionRandom(15, 50);
        }

        const firstNumerator =
            fractionRandom(
                1,
                denominator - 2
            );

        const secondNumerator =
            fractionRandom(
                1,
                denominator -
                firstNumerator
            );

        return {
            question:
                `${firstNumerator}/${denominator} + ` +
                `${secondNumerator}/${denominator} = ?`,

            answer:
                fractionAnswer(
                    firstNumerator +
                    secondNumerator,
                    denominator
                ),

            type: "direct",
            pattern: 4
        };
    },


    // --------------------------------------------------------
    // 5. Subtract fractions with same denominator
    // --------------------------------------------------------

    function (difficulty) {

        let denominator;

        if (difficulty === "easy") {

            denominator =
                fractionRandom(4, 10);

        } else if (difficulty === "medium") {

            denominator =
                fractionRandom(8, 20);

        } else {

            denominator =
                fractionRandom(15, 50);
        }

        const smaller =
            fractionRandom(
                1,
                denominator - 2
            );

        const larger =
            fractionRandom(
                smaller + 1,
                denominator - 1
            );

        return {
            question:
                `${larger}/${denominator} − ` +
                `${smaller}/${denominator} = ?`,

            answer:
                fractionAnswer(
                    larger - smaller,
                    denominator
                ),

            type: "direct",
            pattern: 5
        };
    },


    // --------------------------------------------------------
    // 6. Add fractions with different denominators
    // --------------------------------------------------------

    function (difficulty) {

        let firstDenominator;
        let secondDenominator;

        if (difficulty === "easy") {

            firstDenominator = 2;
            secondDenominator =
                fractionRandom(2, 5) * 2;

        } else if (difficulty === "medium") {

            firstDenominator =
                fractionRandom(2, 8);

            secondDenominator =
                firstDenominator *
                fractionRandom(2, 5);

        } else {

            firstDenominator =
                fractionRandom(4, 15);

            secondDenominator =
                firstDenominator *
                fractionRandom(2, 8);
        }

        const firstNumerator =
            fractionRandom(
                1,
                firstDenominator - 1
            );

        const secondNumerator =
            fractionRandom(
                1,
                secondDenominator - 1
            );

        return {
            question:
                `${firstNumerator}/${firstDenominator} + ` +
                `${secondNumerator}/${secondDenominator} = ?`,

            answer:
                fractionAnswer(
                    firstNumerator *
                    secondDenominator +
                    secondNumerator *
                    firstDenominator,

                    firstDenominator *
                    secondDenominator
                ),

            type: "direct",
            pattern: 6
        };
    },


    // --------------------------------------------------------
    // 7. Subtract fractions with different denominators
    // --------------------------------------------------------

    function (difficulty) {

        let denominator;

        if (difficulty === "easy") {

            denominator =
                fractionRandom(2, 5) * 2;

        } else if (difficulty === "medium") {

            denominator =
                fractionRandom(3, 10) *
                fractionRandom(2, 4);

        } else {

            denominator =
                fractionRandom(8, 20) *
                fractionRandom(2, 6);
        }

        const firstNumerator =
            fractionRandom(
                Math.ceil(
                    denominator / 2
                ),
                denominator - 1
            );

        const secondNumerator =
            fractionRandom(
                1,
                Math.floor(
                    denominator / 2
                )
            );

        return {
            question:
                `${firstNumerator}/${denominator} − ` +
                `${secondNumerator}/` +
                `${denominator / 2} = ?`,

            answer:
                fractionAnswer(
                    firstNumerator -
                    secondNumerator * 2,

                    denominator
                ),

            type: "direct",
            pattern: 7
        };
    },


    // --------------------------------------------------------
    // 8. Multiply two fractions
    // --------------------------------------------------------

    function (difficulty) {

        const first =
            getSimpleFraction(
                difficulty
            );

        const second =
            getSimpleFraction(
                difficulty
            );

        return {
            question:
                `${first.numerator}/` +
                `${first.denominator} × ` +
                `${second.numerator}/` +
                `${second.denominator} = ?`,

            answer:
                fractionAnswer(
                    first.numerator *
                    second.numerator,

                    first.denominator *
                    second.denominator
                ),

            type: "direct",
            pattern: 8
        };
    },


    // --------------------------------------------------------
    // 9. Divide two fractions
    // --------------------------------------------------------

    function (difficulty) {

        const first =
            getSimpleFraction(
                difficulty
            );

        const second =
            getSimpleFraction(
                difficulty
            );

        return {
            question:
                `${first.numerator}/` +
                `${first.denominator} ÷ ` +
                `${second.numerator}/` +
                `${second.denominator} = ?`,

            answer:
                fractionAnswer(
                    first.numerator *
                    second.denominator,

                    first.denominator *
                    second.numerator
                ),

            type: "direct",
            pattern: 9
        };
    },


    // --------------------------------------------------------
    // 10. Find a fraction of a number
    // --------------------------------------------------------

    function (difficulty) {

        let denominator;
        let numerator;
        let answer;

        if (difficulty === "easy") {

            denominator =
                fractionRandom(2, 10);

            numerator =
                fractionRandom(
                    1,
                    denominator - 1
                );

            answer =
                fractionRandom(2, 20);

        } else if (difficulty === "medium") {

            denominator =
                fractionRandom(5, 20);

            numerator =
                fractionRandom(
                    1,
                    denominator - 1
                );

            answer =
                fractionRandom(10, 100);

        } else {

            denominator =
                fractionRandom(10, 50);

            numerator =
                fractionRandom(
                    1,
                    denominator - 1
                );

            answer =
                fractionRandom(50, 1000);
        }

        const number =
            answer *
            denominator /
            numerator;

        const wholeNumber =
            Math.round(number);

        const correctedAnswer =
            wholeNumber *
            numerator /
            denominator;

        return {
            question:
                `Find ${numerator}/${denominator} ` +
                `of ${wholeNumber}.`,

            answer:
                correctedAnswer,

            type: "direct",
            pattern: 10
        };
    },


    // --------------------------------------------------------
    // 11. Convert improper fraction to mixed number
    // --------------------------------------------------------

    function (difficulty) {

        let denominator;
        let whole;
        let numeratorPart;

        if (difficulty === "easy") {

            denominator =
                fractionRandom(2, 8);

            whole =
                fractionRandom(1, 5);

        } else if (difficulty === "medium") {

            denominator =
                fractionRandom(5, 15);

            whole =
                fractionRandom(2, 12);

        } else {

            denominator =
                fractionRandom(10, 30);

            whole =
                fractionRandom(5, 30);
        }

        numeratorPart =
            fractionRandom(
                1,
                denominator - 1
            );

        const numerator =
            whole *
            denominator +
            numeratorPart;

        return {
            question:
                `Convert ${numerator}/` +
                `${denominator} to a mixed number. ` +
                `Write your answer like 2 1/3.`,

            answer:
                mixedNumberText(
                    whole,
                    numeratorPart,
                    denominator
                ),

            type: "direct",
            pattern: 11
        };
    },


    // --------------------------------------------------------
    // 12. Convert mixed number to improper fraction
    // --------------------------------------------------------

    function (difficulty) {

        let denominator;
        let whole;
        let numerator;

        if (difficulty === "easy") {

            denominator =
                fractionRandom(2, 8);

            whole =
                fractionRandom(1, 5);

        } else if (difficulty === "medium") {

            denominator =
                fractionRandom(5, 15);

            whole =
                fractionRandom(2, 12);

        } else {

            denominator =
                fractionRandom(10, 30);

            whole =
                fractionRandom(5, 30);
        }

        numerator =
            fractionRandom(
                1,
                denominator - 1
            );

        const improper =
            improperFromMixed(
                whole,
                numerator,
                denominator
            );

        return {
            question:
                `Convert ${whole} ${numerator}/` +
                `${denominator} to an improper fraction.`,

            answer:
                fractionAnswer(
                    improper.numerator,
                    improper.denominator
                ),

            type: "direct",
            pattern: 12
        };
    },


    // --------------------------------------------------------
    // 13. Compare fractions
    // --------------------------------------------------------

    function (difficulty) {

        const first =
            getSimpleFraction(
                difficulty
            );

        let second =
            getSimpleFraction(
                difficulty
            );

        while (
            first.numerator *
            second.denominator ===
            second.numerator *
            first.denominator
        ) {

            second =
                getSimpleFraction(
                    difficulty
                );
        }

        const answer =
            first.numerator *
            second.denominator >
            second.numerator *
            first.denominator

                ? ">"

                : "<";

        return {
            question:
                `Compare ${first.numerator}/` +
                `${first.denominator} and ` +
                `${second.numerator}/` +
                `${second.denominator}. ` +
                `Enter > or <.`,

            answer:
                answer,

            type: "direct",
            pattern: 13
        };
    },


    // --------------------------------------------------------
    // 14. Order fractions: smallest
    // --------------------------------------------------------

    function (difficulty) {

        const first =
            getSimpleFraction(
                difficulty
            );

        const second =
            getSimpleFraction(
                difficulty
            );

        const third =
            getSimpleFraction(
                difficulty
            );

        const fractions = [
            first,
            second,
            third
        ];

        fractions.sort(
            function (a, b) {

                return (
                    a.numerator /
                    a.denominator
                ) -
                (
                    b.numerator /
                    b.denominator
                );
            }
        );

        return {
            question:
                `Which is the smallest fraction: ` +
                `${first.numerator}/${first.denominator}, ` +
                `${second.numerator}/${second.denominator}, or ` +
                `${third.numerator}/${third.denominator}?`,

            answer:
                fractionAnswer(
                    fractions[0].numerator,
                    fractions[0].denominator
                ),

            type: "direct",
            pattern: 14
        };
    },


    // --------------------------------------------------------
    // 15. Order fractions: largest
    // --------------------------------------------------------

    function (difficulty) {

        const first =
            getSimpleFraction(
                difficulty
            );

        const second =
            getSimpleFraction(
                difficulty
            );

        const third =
            getSimpleFraction(
                difficulty
            );

        const fractions = [
            first,
            second,
            third
        ];

        fractions.sort(
            function (a, b) {

                return (
                    b.numerator /
                    b.denominator
                ) -
                (
                    a.numerator /
                    a.denominator
                );
            }
        );

        return {
            question:
                `Which is the largest fraction: ` +
                `${first.numerator}/${first.denominator}, ` +
                `${second.numerator}/${second.denominator}, or ` +
                `${third.numerator}/${third.denominator}?`,

            answer:
                fractionAnswer(
                    fractions[0].numerator,
                    fractions[0].denominator
                ),

            type: "direct",
            pattern: 15
        };
    },


    // --------------------------------------------------------
    // 16. Add a whole number and fraction
    // --------------------------------------------------------

    function (difficulty) {

        let whole;
        const fraction =
            getSimpleFraction(
                difficulty
            );

        if (difficulty === "easy") {

            whole =
                fractionRandom(1, 10);

        } else if (difficulty === "medium") {

            whole =
                fractionRandom(5, 50);

        } else {

            whole =
                fractionRandom(20, 500);
        }

        return {
            question:
                `${whole} + ` +
                `${fraction.numerator}/` +
                `${fraction.denominator} = ? ` +
                `Write as a mixed number.`,

            answer:
                mixedNumberText(
                    whole,
                    fraction.numerator,
                    fraction.denominator
                ),

            type: "direct",
            pattern: 16
        };
    },


    // --------------------------------------------------------
    // 17. Subtract a fraction from a whole number
    // --------------------------------------------------------

    function (difficulty) {

        let whole;
        const fraction =
            getSimpleFraction(
                difficulty
            );

        if (difficulty === "easy") {

            whole =
                fractionRandom(2, 10);

        } else if (difficulty === "medium") {

            whole =
                fractionRandom(5, 50);

        } else {

            whole =
                fractionRandom(20, 500);
        }

        return {
            question:
                `${whole} − ` +
                `${fraction.numerator}/` +
                `${fraction.denominator} = ? ` +
                `Write as a mixed number.`,

            answer:
                mixedNumberText(
                    whole - 1,

                    fraction.denominator -
                    fraction.numerator,

                    fraction.denominator
                ),

            type: "direct",
            pattern: 17
        };
    },


    // --------------------------------------------------------
    // 18. Multiply a fraction by a whole number
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        let whole;

        if (difficulty === "easy") {

            whole =
                fractionRandom(2, 10);

        } else if (difficulty === "medium") {

            whole =
                fractionRandom(5, 50);

        } else {

            whole =
                fractionRandom(20, 500);
        }

        return {
            question:
                `${whole} × ` +
                `${fraction.numerator}/` +
                `${fraction.denominator} = ?`,

            answer:
                fractionAnswer(
                    whole *
                    fraction.numerator,

                    fraction.denominator
                ),

            type: "direct",
            pattern: 18
        };
    },


    // --------------------------------------------------------
    // 19. Divide a fraction by a whole number
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        let whole;

        if (difficulty === "easy") {

            whole =
                fractionRandom(2, 8);

        } else if (difficulty === "medium") {

            whole =
                fractionRandom(3, 20);

        } else {

            whole =
                fractionRandom(5, 50);
        }

        return {
            question:
                `${fraction.numerator}/` +
                `${fraction.denominator} ÷ ` +
                `${whole} = ?`,

            answer:
                fractionAnswer(
                    fraction.numerator,

                    fraction.denominator *
                    whole
                ),

            type: "direct",
            pattern: 19
        };
    },


    // --------------------------------------------------------
    // 20. Fraction of a fraction
    // --------------------------------------------------------

    function (difficulty) {

        const first =
            getSimpleFraction(
                difficulty
            );

        const second =
            getSimpleFraction(
                difficulty
            );

        return {
            question:
                `Find ${first.numerator}/` +
                `${first.denominator} of ` +
                `${second.numerator}/` +
                `${second.denominator}.`,

            answer:
                fractionAnswer(
                    first.numerator *
                    second.numerator,

                    first.denominator *
                    second.denominator
                ),

            type: "direct",
            pattern: 20
        };
    },


    // --------------------------------------------------------
    // 21. Add mixed numbers
    // --------------------------------------------------------

    function (difficulty) {

        let denominator;
        let firstWhole;
        let secondWhole;

        if (difficulty === "easy") {

            denominator =
                fractionRandom(2, 8);

            firstWhole =
                fractionRandom(1, 5);

            secondWhole =
                fractionRandom(1, 5);

        } else if (difficulty === "medium") {

            denominator =
                fractionRandom(5, 15);

            firstWhole =
                fractionRandom(2, 20);

            secondWhole =
                fractionRandom(2, 20);

        } else {

            denominator =
                fractionRandom(10, 30);

            firstWhole =
                fractionRandom(10, 100);

            secondWhole =
                fractionRandom(10, 100);
        }

        const firstNumerator =
            fractionRandom(
                1,
                denominator - 1
            );

        const secondNumerator =
            fractionRandom(
                1,
                denominator - 1
            );

        const totalNumerator =
            firstNumerator +
            secondNumerator;

        const extraWhole =
            Math.floor(
                totalNumerator /
                denominator
            );

        const remainingNumerator =
            totalNumerator %
            denominator;

        return {
            question:
                `${firstWhole} ${firstNumerator}/` +
                `${denominator} + ` +
                `${secondWhole} ${secondNumerator}/` +
                `${denominator} = ?`,

            answer:
                mixedNumberText(
                    firstWhole +
                    secondWhole +
                    extraWhole,

                    remainingNumerator,
                    denominator
                ),

            type: "direct",
            pattern: 21
        };
    },


    // --------------------------------------------------------
    // 22. Subtract mixed numbers
    // --------------------------------------------------------

    function (difficulty) {

        let denominator;
        let firstWhole;
        let secondWhole;

        if (difficulty === "easy") {

            denominator =
                fractionRandom(2, 8);

            firstWhole =
                fractionRandom(4, 10);

            secondWhole =
                fractionRandom(1, 3);

        } else if (difficulty === "medium") {

            denominator =
                fractionRandom(5, 15);

            firstWhole =
                fractionRandom(10, 50);

            secondWhole =
                fractionRandom(2, 9);

        } else {

            denominator =
                fractionRandom(10, 30);

            firstWhole =
                fractionRandom(50, 500);

            secondWhole =
                fractionRandom(10, 49);
        }

        const firstNumerator =
            fractionRandom(
                1,
                denominator - 1
            );

        const secondNumerator =
            fractionRandom(
                1,
                denominator - 1
            );

        let answerWhole =
            firstWhole -
            secondWhole;

        let answerNumerator =
            firstNumerator -
            secondNumerator;

        if (answerNumerator < 0) {

            answerWhole--;

            answerNumerator +=
                denominator;
        }

        return {
            question:
                `${firstWhole} ${firstNumerator}/` +
                `${denominator} − ` +
                `${secondWhole} ${secondNumerator}/` +
                `${denominator} = ?`,

            answer:
                mixedNumberText(
                    answerWhole,
                    answerNumerator,
                    denominator
                ),

            type: "direct",
            pattern: 22
        };
    },


    // --------------------------------------------------------
    // 23. Fraction equation
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        let answer;

        if (difficulty === "easy") {

            answer =
                fractionRandom(2, 10);

        } else if (difficulty === "medium") {

            answer =
                fractionRandom(10, 100);

        } else {

            answer =
                fractionRandom(100, 1000);
        }

        const result =
            fractionAnswer(
                answer *
                fraction.numerator,

                fraction.denominator
            );

        return {
            question:
                `${fraction.numerator}/` +
                `${fraction.denominator} × x = ` +
                `${result}. Find x.`,

            answer:
                answer,

            type: "direct",
            pattern: 23
        };
    },


    // --------------------------------------------------------
    // 24. Multi-step fraction challenge
    // --------------------------------------------------------

    function (difficulty) {

        let denominator;

        if (difficulty === "easy") {

            denominator = 10;

        } else if (difficulty === "medium") {

            denominator = 20;

        } else {

            denominator = 50;
        }

        const first =
            fractionRandom(
                1,
                Math.floor(
                    denominator / 3
                )
            );

        const second =
            fractionRandom(
                1,
                Math.floor(
                    denominator / 3
                )
            );

        const third =
            fractionRandom(
                1,
                Math.floor(
                    denominator / 3
                )
            );

        return {
            question:
                `${first}/${denominator} + ` +
                `${second}/${denominator} − ` +
                `${third}/${denominator} = ?`,

            answer:
                fractionAnswer(
                    first +
                    second -
                    third,

                    denominator
                ),

            type: "direct",
            pattern: 24
        };
    },


    // --------------------------------------------------------
    // 25. Advanced fraction challenge
    // --------------------------------------------------------

    function (difficulty) {

        const first =
            getSimpleFraction(
                difficulty
            );

        const second =
            getSimpleFraction(
                difficulty
            );

        const third =
            getSimpleFraction(
                difficulty
            );

        const productNumerator =
            first.numerator *
            second.numerator;

        const productDenominator =
            first.denominator *
            second.denominator;

        return {
            question:
                `(${first.numerator}/` +
                `${first.denominator} × ` +
                `${second.numerator}/` +
                `${second.denominator}) ÷ ` +
                `${third.numerator}/` +
                `${third.denominator} = ?`,

            answer:
                fractionAnswer(
                    productNumerator *
                    third.denominator,

                    productDenominator *
                    third.numerator
                ),

            type: "direct",
            pattern: 25
        };
    }

];


// ============================================================
// 25 FRACTION WORD-PROBLEM PATTERNS
// ============================================================

const fractionWordPatterns = [

    // --------------------------------------------------------
    // 1. Pizza eaten
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        return {
            question:
                `A pizza is divided into ` +
                `${fraction.denominator} equal slices. ` +
                `A student eats ${fraction.numerator} slices. ` +
                `What fraction of the pizza was eaten?`,

            answer:
                fractionAnswer(
                    fraction.numerator,
                    fraction.denominator
                ),

            type: "word",
            pattern: 1
        };
    },


    // --------------------------------------------------------
    // 2. Books read
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        let total;

        if (difficulty === "easy") {

            total =
                fraction.denominator *
                fractionRandom(2, 10);

        } else if (difficulty === "medium") {

            total =
                fraction.denominator *
                fractionRandom(10, 50);

        } else {

            total =
                fraction.denominator *
                fractionRandom(50, 500);
        }

        const answer =
            total *
            fraction.numerator /
            fraction.denominator;

        return {
            question:
                `A student reads ${fraction.numerator}/` +
                `${fraction.denominator} of a ${total}-page book. ` +
                `How many pages does the student read?`,

            answer:
                answer,

            type: "word",
            pattern: 2
        };
    },


    // --------------------------------------------------------
    // 3. Students who play a sport
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        const groupMultiplier =
            difficulty === "easy"

                ? fractionRandom(2, 10)

                : difficulty === "medium"

                    ? fractionRandom(10, 50)

                    : fractionRandom(50, 500);

        const total =
            fraction.denominator *
            groupMultiplier;

        const answer =
            fraction.numerator *
            groupMultiplier;

        return {
            question:
                `In a class of ${total} students, ` +
                `${fraction.numerator}/` +
                `${fraction.denominator} play football. ` +
                `How many students play football?`,

            answer:
                answer,

            type: "word",
            pattern: 3
        };
    },


    // --------------------------------------------------------
    // 4. Fraction of money spent
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        const multiplier =
            difficulty === "easy"

                ? fractionRandom(5, 20)

                : difficulty === "medium"

                    ? fractionRandom(20, 200)

                    : fractionRandom(200, 2000);

        const money =
            fraction.denominator *
            multiplier;

        const answer =
            fraction.numerator *
            multiplier;

        return {
            question:
                `A student has $${money}. ` +
                `The student spends ${fraction.numerator}/` +
                `${fraction.denominator} of the money. ` +
                `How much money is spent?`,

            answer:
                answer,

            type: "word",
            pattern: 4
        };
    },


    // --------------------------------------------------------
    // 5. Cake remaining
    // --------------------------------------------------------

    function (difficulty) {

        const denominator =
            difficulty === "easy"

                ? fractionRandom(4, 10)

                : difficulty === "medium"

                    ? fractionRandom(8, 20)

                    : fractionRandom(15, 50);

        const eaten =
            fractionRandom(
                1,
                denominator - 1
            );

        return {
            question:
                `A cake is divided into ${denominator} ` +
                `equal pieces. ${eaten} pieces are eaten. ` +
                `What fraction of the cake remains?`,

            answer:
                fractionAnswer(
                    denominator -
                    eaten,

                    denominator
                ),

            type: "word",
            pattern: 5
        };
    },


    // --------------------------------------------------------
    // 6. Distance travelled
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        const multiplier =
            difficulty === "easy"

                ? fractionRandom(5, 20)

                : difficulty === "medium"

                    ? fractionRandom(20, 200)

                    : fractionRandom(200, 2000);

        const distance =
            fraction.denominator *
            multiplier;

        const answer =
            fraction.numerator *
            multiplier;

        return {
            question:
                `A cyclist travels ${fraction.numerator}/` +
                `${fraction.denominator} of a ` +
                `${distance} km route. ` +
                `How many kilometres does the cyclist travel?`,

            answer:
                answer,

            type: "word",
            pattern: 6
        };
    },


    // --------------------------------------------------------
    // 7. Recipe ingredient
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        const quantity =
            difficulty === "easy"

                ? fractionRandom(2, 10)

                : difficulty === "medium"

                    ? fractionRandom(10, 50)

                    : fractionRandom(50, 500);

        const answer =
            fractionAnswer(
                quantity *
                fraction.numerator,

                fraction.denominator
            );

        return {
            question:
                `A recipe uses ${quantity} cups of flour. ` +
                `Only ${fraction.numerator}/` +
                `${fraction.denominator} of the recipe is prepared. ` +
                `How many cups of flour are needed?`,

            answer:
                answer,

            type: "word",
            pattern: 7
        };
    },


    // --------------------------------------------------------
    // 8. Adding fractions of a journey
    // --------------------------------------------------------

    function (difficulty) {

        const denominator =
            difficulty === "easy"

                ? fractionRandom(4, 10)

                : difficulty === "medium"

                    ? fractionRandom(10, 20)

                    : fractionRandom(20, 50);

        const first =
            fractionRandom(
                1,
                Math.floor(
                    denominator / 3
                )
            );

        const second =
            fractionRandom(
                1,
                Math.floor(
                    denominator / 3
                )
            );

        return {
            question:
                `A traveller completes ${first}/` +
                `${denominator} of a journey in the morning ` +
                `and ${second}/${denominator} in the evening. ` +
                `What fraction of the journey is completed?`,

            answer:
                fractionAnswer(
                    first + second,
                    denominator
                ),

            type: "word",
            pattern: 8
        };
    },


    // --------------------------------------------------------
    // 9. Fraction of marbles
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        const multiplier =
            difficulty === "easy"

                ? fractionRandom(2, 15)

                : difficulty === "medium"

                    ? fractionRandom(10, 100)

                    : fractionRandom(100, 1000);

        const total =
            fraction.denominator *
            multiplier;

        const answer =
            fraction.numerator *
            multiplier;

        return {
            question:
                `A box contains ${total} marbles. ` +
                `${fraction.numerator}/` +
                `${fraction.denominator} of them are blue. ` +
                `How many blue marbles are there?`,

            answer:
                answer,

            type: "word",
            pattern: 9
        };
    },


    // --------------------------------------------------------
    // 10. Fraction remaining after two parts
    // --------------------------------------------------------

    function (difficulty) {

        const denominator =
            difficulty === "easy"

                ? 10

                : difficulty === "medium"

                    ? 20

                    : 50;

        const first =
            fractionRandom(
                1,
                Math.floor(
                    denominator / 4
                )
            );

        const second =
            fractionRandom(
                1,
                Math.floor(
                    denominator / 4
                )
            );

        return {
            question:
                `A student completes ${first}/` +
                `${denominator} of a project on Monday ` +
                `and ${second}/${denominator} on Tuesday. ` +
                `What fraction of the project remains?`,

            answer:
                fractionAnswer(
                    denominator -
                    first -
                    second,

                    denominator
                ),

            type: "word",
            pattern: 10
        };
    },


    // --------------------------------------------------------
    // 11. Sharing a chocolate bar
    // --------------------------------------------------------

    function (difficulty) {

        let people;
        let piecesEach;

        if (difficulty === "easy") {

            people =
                fractionRandom(2, 8);

            piecesEach =
                fractionRandom(1, 5);

        } else if (difficulty === "medium") {

            people =
                fractionRandom(5, 20);

            piecesEach =
                fractionRandom(2, 20);

        } else {

            people =
                fractionRandom(20, 100);

            piecesEach =
                fractionRandom(10, 100);
        }

        const total =
            people *
            piecesEach;

        return {
            question:
                `A chocolate bar has ${total} equal pieces. ` +
                `It is shared equally among ${people} children. ` +
                `How many pieces does each child receive?`,

            answer:
                piecesEach,

            type: "word",
            pattern: 11
        };
    },


    // --------------------------------------------------------
    // 12. Fraction of a collection
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        const multiplier =
            difficulty === "easy"

                ? fractionRandom(2, 20)

                : difficulty === "medium"

                    ? fractionRandom(20, 200)

                    : fractionRandom(200, 2000);

        const total =
            fraction.denominator *
            multiplier;

        const answer =
            fraction.numerator *
            multiplier;

        return {
            question:
                `A library has ${total} books. ` +
                `${fraction.numerator}/` +
                `${fraction.denominator} of them are science books. ` +
                `How many science books are there?`,

            answer:
                answer,

            type: "word",
            pattern: 12
        };
    },


    // --------------------------------------------------------
    // 13. Garden area
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        const multiplier =
            difficulty === "easy"

                ? fractionRandom(5, 30)

                : difficulty === "medium"

                    ? fractionRandom(20, 200)

                    : fractionRandom(200, 2000);

        const area =
            fraction.denominator *
            multiplier;

        const answer =
            fraction.numerator *
            multiplier;

        return {
            question:
                `A garden has an area of ${area} square metres. ` +
                `${fraction.numerator}/` +
                `${fraction.denominator} of it is used for flowers. ` +
                `What area is used for flowers?`,

            answer:
                answer,

            type: "word",
            pattern: 13
        };
    },


    // --------------------------------------------------------
    // 14. Water tank
    // --------------------------------------------------------

    function (difficulty) {

        const denominator =
            difficulty === "easy"

                ? fractionRandom(4, 10)

                : difficulty === "medium"

                    ? fractionRandom(10, 20)

                    : fractionRandom(20, 50);

        const filled =
            fractionRandom(
                1,
                denominator - 1
            );

        return {
            question:
                `A water tank is ${filled}/` +
                `${denominator} full. ` +
                `What fraction of the tank is empty?`,

            answer:
                fractionAnswer(
                    denominator -
                    filled,

                    denominator
                ),

            type: "word",
            pattern: 14
        };
    },


    // --------------------------------------------------------
    // 15. Test questions answered
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        const multiplier =
            difficulty === "easy"

                ? fractionRandom(2, 10)

                : difficulty === "medium"

                    ? fractionRandom(10, 50)

                    : fractionRandom(50, 500);

        const total =
            fraction.denominator *
            multiplier;

        const answer =
            fraction.numerator *
            multiplier;

        return {
            question:
                `A test has ${total} questions. ` +
                `A student answers ${fraction.numerator}/` +
                `${fraction.denominator} of them correctly. ` +
                `How many questions are answered correctly?`,

            answer:
                answer,

            type: "word",
            pattern: 15
        };
    },


    // --------------------------------------------------------
    // 16. Two fractions of money
    // --------------------------------------------------------

    function (difficulty) {

        const denominator =
            difficulty === "easy"

                ? 10

                : difficulty === "medium"

                    ? 20

                    : 50;

        const spent =
            fractionRandom(
                1,
                Math.floor(
                    denominator / 3
                )
            );

        const saved =
            fractionRandom(
                1,
                Math.floor(
                    denominator / 3
                )
            );

        return {
            question:
                `A student spends ${spent}/` +
                `${denominator} of their money ` +
                `and saves ${saved}/${denominator}. ` +
                `What fraction of the money is spent or saved?`,

            answer:
                fractionAnswer(
                    spent + saved,
                    denominator
                ),

            type: "word",
            pattern: 16
        };
    },


    // --------------------------------------------------------
    // 17. Recipe doubled
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        return {
            question:
                `A recipe needs ${fraction.numerator}/` +
                `${fraction.denominator} cup of sugar. ` +
                `The recipe is doubled. ` +
                `How many cups of sugar are needed?`,

            answer:
                fractionAnswer(
                    fraction.numerator * 2,
                    fraction.denominator
                ),

            type: "word",
            pattern: 17
        };
    },


    // --------------------------------------------------------
    // 18. Fraction of a fraction
    // --------------------------------------------------------

    function (difficulty) {

        const first =
            getSimpleFraction(
                difficulty
            );

        const second =
            getSimpleFraction(
                difficulty
            );

        return {
            question:
                `${first.numerator}/` +
                `${first.denominator} of a farm is used for crops. ` +
                `Of that crop area, ${second.numerator}/` +
                `${second.denominator} is used for wheat. ` +
                `What fraction of the entire farm is used for wheat?`,

            answer:
                fractionAnswer(
                    first.numerator *
                    second.numerator,

                    first.denominator *
                    second.denominator
                ),

            type: "word",
            pattern: 18
        };
    },


    // --------------------------------------------------------
    // 19. Comparing portions
    // --------------------------------------------------------

    function (difficulty) {

        const first =
            getSimpleFraction(
                difficulty
            );

        let second =
            getSimpleFraction(
                difficulty
            );

        while (
            first.numerator *
            second.denominator ===
            second.numerator *
            first.denominator
        ) {

            second =
                getSimpleFraction(
                    difficulty
                );
        }

        const firstIsLarger =
            first.numerator *
            second.denominator >

            second.numerator *
            first.denominator;

        return {
            question:
                `Asha drinks ${first.numerator}/` +
                `${first.denominator} of a bottle of juice. ` +
                `Riya drinks ${second.numerator}/` +
                `${second.denominator}. ` +
                `Who drinks more? Enter Asha or Riya.`,

            answer:
                firstIsLarger

                    ? "Asha"

                    : "Riya",

            type: "word",
            pattern: 19
        };
    },


    // --------------------------------------------------------
    // 20. Remaining distance
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        return {
            question:
                `A runner completes ${fraction.numerator}/` +
                `${fraction.denominator} of a race. ` +
                `What fraction of the race is still remaining?`,

            answer:
                fractionAnswer(
                    fraction.denominator -
                    fraction.numerator,

                    fraction.denominator
                ),

            type: "word",
            pattern: 20
        };
    },


    // --------------------------------------------------------
    // 21. Challenge: three parts
    // --------------------------------------------------------

    function (difficulty) {

        const denominator =
            difficulty === "easy"

                ? 12

                : difficulty === "medium"

                    ? 24

                    : 60;

        const first =
            fractionRandom(1, 5);

        const second =
            fractionRandom(1, 5);

        const third =
            fractionRandom(1, 5);

        return {
            question:
                `A student spends ${first}/` +
                `${denominator} of a day studying, ` +
                `${second}/${denominator} playing, ` +
                `and ${third}/${denominator} exercising. ` +
                `What fraction of the day is used for these activities?`,

            answer:
                fractionAnswer(
                    first +
                    second +
                    third,

                    denominator
                ),

            type: "word",
            pattern: 21
        };
    },


    // --------------------------------------------------------
    // 22. Challenge: school budget
    // --------------------------------------------------------

    function (difficulty) {

        const first =
            getSimpleFraction(
                difficulty
            );

        const second =
            getSimpleFraction(
                difficulty
            );

        return {
            question:
                `A school uses ${first.numerator}/` +
                `${first.denominator} of its budget for teachers. ` +
                `It then uses ${second.numerator}/` +
                `${second.denominator} of the remaining budget ` +
                `for equipment. What fraction of the original ` +
                `budget is used for equipment?`,

            answer:
                fractionAnswer(
                    (
                        first.denominator -
                        first.numerator
                    ) *
                    second.numerator,

                    first.denominator *
                    second.denominator
                ),

            type: "word",
            pattern: 22
        };
    },


    // --------------------------------------------------------
    // 23. Challenge: tank filling
    // --------------------------------------------------------

    function (difficulty) {

        const denominator =
            difficulty === "easy"

                ? 10

                : difficulty === "medium"

                    ? 20

                    : 50;

        const first =
            fractionRandom(
                1,
                Math.floor(
                    denominator / 4
                )
            );

        const second =
            fractionRandom(
                1,
                Math.floor(
                    denominator / 4
                )
            );

        return {
            question:
                `A tank is filled by ${first}/` +
                `${denominator} in the morning ` +
                `and ${second}/${denominator} in the afternoon. ` +
                `What fraction of the tank is still empty?`,

            answer:
                fractionAnswer(
                    denominator -
                    first -
                    second,

                    denominator
                ),

            type: "word",
            pattern: 23
        };
    },


    // --------------------------------------------------------
    // 24. Challenge: discount
    // --------------------------------------------------------

    function (difficulty) {

        const fraction =
            getSimpleFraction(
                difficulty
            );

        const multiplier =
            difficulty === "easy"

                ? fractionRandom(10, 50)

                : difficulty === "medium"

                    ? fractionRandom(50, 500)

                    : fractionRandom(500, 5000);

        const price =
            fraction.denominator *
            multiplier;

        const discount =
            fraction.numerator *
            multiplier;

        return {
            question:
                `A product costs $${price}. ` +
                `A discount equal to ${fraction.numerator}/` +
                `${fraction.denominator} of the price is given. ` +
                `How many dollars is the discount?`,

            answer:
                discount,

            type: "word",
            pattern: 24
        };
    },


    // --------------------------------------------------------
    // 25. Advanced fraction challenge
    // --------------------------------------------------------

    function (difficulty) {

        const first =
            getSimpleFraction(
                difficulty
            );

        const second =
            getSimpleFraction(
                difficulty
            );

        const third =
            getSimpleFraction(
                difficulty
            );

        const firstPart =
            first.numerator /
            first.denominator;

        const remaining =
            1 - firstPart;

        const secondPart =
            remaining *
            second.numerator /
            second.denominator;

        const thirdPart =
            remaining -
            secondPart;

        return {
            question:
                `A student completes ${first.numerator}/` +
                `${first.denominator} of a project on Monday. ` +
                `The student completes ${second.numerator}/` +
                `${second.denominator} of the remaining work ` +
                `on Tuesday. What fraction of the original ` +
                `project remains?`,

            answer:
                fractionAnswer(
                    (
                        first.denominator -
                        first.numerator
                    ) *
                    (
                        second.denominator -
                        second.numerator
                    ),

                    first.denominator *
                    second.denominator
                ),

            type: "word",
            pattern: 25
        };
    }

];


// ============================================================
// MAIN FRACTION QUESTION GENERATOR
// ============================================================

function generateFractionQuestion(
    difficulty,
    questionCategory,
    usedPatterns = []
) {

    let patterns;


    if (
        questionCategory === "word"
    ) {

        patterns =
            fractionWordPatterns;

    } else {

        patterns =
            fractionDirectPatterns;
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
                fractionRandom(
                    0,
                    availableIndexes.length - 1
                )
            ];

    } else {

        selectedIndex =
            fractionRandom(
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
        "fractions";


    return question;
}