// ============================================================
// MATHMIND AI — DECIMALS QUESTION ENGINE
// Compatible with script.js: generateDecimalsQuestion(difficulty,
// questionCategory, usedPatterns)
// ============================================================

(() => {
    "use strict";

    const randomInt = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    const choose = (items) => items[randomInt(0, items.length - 1)];

    const shuffle = (items) => {
        const copy = [...items];
        for (let index = copy.length - 1; index > 0; index--) {
            const otherIndex = randomInt(0, index);
            [copy[index], copy[otherIndex]] = [copy[otherIndex], copy[index]];
        }
        return copy;
    };

    const round = (value, places = 2) => {
        const factor = 10 ** places;
        return Math.round((value + Number.EPSILON) * factor) / factor;
    };

    const format = (value, places = null) => {
        const rounded = round(value, places ?? 4);
        return places === null ? String(rounded) : rounded.toFixed(places);
    };

    const decimal = (wholeMax, places) => {
        const denominator = 10 ** places;
        return randomInt(1, wholeMax * denominator - 1) / denominator;
    };

    const valuesFor = (difficulty) => {
        if (difficulty === "hard") return { wholeMax: 100, places: 2 };
        if (difficulty === "medium") return { wholeMax: 30, places: 2 };
        return { wholeMax: 10, places: 1 };
    };

    const numericOptions = (answer, places = 2) => {
        const options = new Set([format(answer, places)]);
        const step = places <= 0 ? 1 : (places === 1 ? 0.1 : 0.01);

        while (options.size < 4) {
            const offset = randomInt(-15, 15) * step;
            const candidate = round(answer + (offset === 0 ? step : offset), places);
            if (candidate >= 0) options.add(format(candidate, places));
        }
        return shuffle([...options]);
    };

    const makePair = (difficulty) => {
        const { wholeMax, places } = valuesFor(difficulty);
        const first = decimal(wholeMax, places);
        const second = decimal(wholeMax, places);
        return { first, second, places };
    };

    const baseDirectPatterns = [
        (difficulty) => {
            const { first, second, places } = makePair(difficulty);
            const answer = round(first + second, places);
            return {
                question: `${format(first, places)} + ${format(second, places)} = ?`,
                answer: format(answer, places),
                options: numericOptions(answer, places),
                explanation: `Align the decimal points and add: ${format(first, places)} + ${format(second, places)} = ${format(answer, places)}.`,
                type: "direct"
            };
        },
        (difficulty) => {
            const { first, second, places } = makePair(difficulty);
            const larger = Math.max(first, second);
            const smaller = Math.min(first, second);
            const answer = round(larger - smaller, places);
            return {
                question: `${format(larger, places)} − ${format(smaller, places)} = ?`,
                answer: format(answer, places),
                options: numericOptions(answer, places),
                explanation: `Align the decimal points and subtract: ${format(larger, places)} − ${format(smaller, places)} = ${format(answer, places)}.`,
                type: "direct"
            };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty);
            const first = decimal(wholeMax, places);
            const multiplier = randomInt(2, difficulty === "hard" ? 20 : 10);
            const answer = round(first * multiplier, places);
            return {
                question: `${format(first, places)} × ${multiplier} = ?`,
                answer: format(answer, places),
                options: numericOptions(answer, places),
                explanation: `Multiply ${format(first, places)} by ${multiplier}: ${format(answer, places)}.`,
                type: "direct"
            };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty);
            const divisor = randomInt(2, difficulty === "hard" ? 20 : 10);
            const quotient = decimal(wholeMax, places);
            const dividend = round(divisor * quotient, places);
            return {
                question: `${format(dividend, places)} ÷ ${divisor} = ?`,
                answer: format(quotient, places),
                options: numericOptions(quotient, places),
                explanation: `${format(dividend, places)} ÷ ${divisor} = ${format(quotient, places)}.`,
                type: "direct"
            };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty);
            const value = decimal(wholeMax, places);
            const answer = round(value * 10, Math.max(0, places - 1));
            return {
                question: `${format(value, places)} × 10 = ?`,
                answer: format(answer, Math.max(0, places - 1)),
                options: numericOptions(answer, Math.max(0, places - 1)),
                explanation: `Multiplying by 10 moves the decimal point one place right: ${format(answer, Math.max(0, places - 1))}.`,
                type: "direct"
            };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty);
            const value = decimal(wholeMax, places);
            const answer = round(value / 10, places + 1);
            return {
                question: `${format(value, places)} ÷ 10 = ?`,
                answer: format(answer, places + 1),
                options: numericOptions(answer, places + 1),
                explanation: `Dividing by 10 moves the decimal point one place left: ${format(answer, places + 1)}.`,
                type: "direct"
            };
        }
    ];

    const baseWordPatterns = [
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty);
            const first = decimal(wholeMax, places);
            const second = decimal(wholeMax, places);
            const answer = round(first + second, places);
            return {
                question: `Maya walked ${format(first, places)} km in the morning and ${format(second, places)} km in the evening. How far did she walk altogether?`,
                answer: format(answer, places),
                options: numericOptions(answer, places),
                explanation: `Add the distances: ${format(first, places)} + ${format(second, places)} = ${format(answer, places)} km.`,
                type: "word"
            };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty);
            const capacity = decimal(wholeMax, places);
            const used = decimal(wholeMax, places);
            const larger = Math.max(capacity, used);
            const smaller = Math.min(capacity, used);
            const answer = round(larger - smaller, places);
            return {
                question: `A bottle holds ${format(larger, places)} L. ${format(smaller, places)} L has been used. How much remains?`,
                answer: format(answer, places),
                options: numericOptions(answer, places),
                explanation: `Subtract the amount used: ${format(larger, places)} − ${format(smaller, places)} = ${format(answer, places)} L.`,
                type: "word"
            };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty);
            const price = decimal(wholeMax, places);
            const quantity = randomInt(2, difficulty === "hard" ? 20 : 10);
            const answer = round(price * quantity, places);
            return {
                question: `One notebook costs $${format(price, places)}. What is the cost of ${quantity} notebooks?`,
                answer: format(answer, places),
                options: numericOptions(answer, places),
                explanation: `$${format(price, places)} × ${quantity} = $${format(answer, places)}.`,
                type: "word"
            };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty);
            const people = randomInt(2, difficulty === "hard" ? 20 : 10);
            const share = decimal(wholeMax, places);
            const total = round(people * share, places);
            return {
                question: `${format(total, places)} kg of fruit is shared equally among ${people} people. How many kg does each person receive?`,
                answer: format(share, places),
                options: numericOptions(share, places),
                explanation: `${format(total, places)} ÷ ${people} = ${format(share, places)} kg.`,
                type: "word"
            };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty);
            const temperature = decimal(wholeMax, places);
            const increase = decimal(Math.max(2, Math.floor(wholeMax / 2)), places);
            const answer = round(temperature + increase, places);
            return {
                question: `The temperature was ${format(temperature, places)}°C and rose by ${format(increase, places)}°C. What is the new temperature?`,
                answer: format(answer, places),
                options: numericOptions(answer, places),
                explanation: `${format(temperature, places)} + ${format(increase, places)} = ${format(answer, places)}°C.`,
                type: "word"
            };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty);
            const length = decimal(wholeMax, places);
            const answer = round(length / 10, places + 1);
            return {
                question: `A ribbon is ${format(length, places)} m long. What is its length after dividing it by 10?`,
                answer: format(answer, places + 1),
                options: numericOptions(answer, places + 1),
                explanation: `Divide by 10: ${format(length, places)} ÷ 10 = ${format(answer, places + 1)} m.`,
                type: "word"
            };
        }
    ];

    const directPatterns = [
        ...baseDirectPatterns,
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty); const a = decimal(wholeMax, places); const b = decimal(wholeMax, places); const c = decimal(wholeMax, places); const answer = round(a + b + c, places);
            return { question: `${format(a, places)} + ${format(b, places)} + ${format(c, places)} = ?`, answer: format(answer, places), options: numericOptions(answer, places), explanation: `Add the three decimals: ${format(answer, places)}.`, type: "direct" };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty); const a = decimal(wholeMax, places); const b = decimal(wholeMax, places); const answer = round(a * b, Math.min(4, places * 2)); const answerPlaces = Math.min(4, places * 2);
            return { question: `${format(a, places)} × ${format(b, places)} = ?`, answer: format(answer, answerPlaces), options: numericOptions(answer, answerPlaces), explanation: `Multiply the decimals: ${format(answer, answerPlaces)}.`, type: "direct" };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty); const divisor = randomInt(2, 9); const quotient = decimal(wholeMax, places); const dividend = round(divisor * quotient, places);
            return { question: `${format(dividend, places)} ÷ ${format(divisor, 1)} = ?`, answer: format(quotient, places), options: numericOptions(quotient, places), explanation: `Divide ${format(dividend, places)} by ${divisor}.`, type: "direct" };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty); const a = decimal(wholeMax, places); const b = decimal(wholeMax, places); const answer = a > b ? ">" : (a < b ? "<" : "=");
            return { question: `Choose the correct sign: ${format(a, places)} __ ${format(b, places)}.`, answer, options: shuffle([">", "<", "=", "≠"]), explanation: `${format(a, places)} ${answer} ${format(b, places)}.`, type: "direct" };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty); const value = decimal(wholeMax, places); const answer = round(value, 1);
            return { question: `Round ${format(value, places)} to the nearest tenth.`, answer: format(answer, 1), options: numericOptions(answer, 1), explanation: `The number rounded to one decimal place is ${format(answer, 1)}.`, type: "direct" };
        },
        (difficulty) => {
            const value = randomInt(101, 999) / 100; const answer = String(Math.floor(value * 10) % 10);
            return { question: `What is the tenths digit in ${format(value, 2)}?`, answer, options: shuffle([answer, "0", "5", "9"].filter((item, index, array) => array.indexOf(item) === index)), explanation: `The first digit after the decimal point is ${answer}.`, type: "direct" };
        },
        () => {
            const numerator = choose([1, 2, 3, 4, 5, 6, 7, 8, 9]); const answer = `${numerator}/10`;
            return { question: `Write ${format(numerator / 10, 1)} as a fraction with denominator 10.`, answer, options: shuffle([answer, `${numerator}/100`, `10/${numerator}`, `${10 - numerator}/10`]), explanation: `${format(numerator / 10, 1)} means ${numerator} tenths, or ${answer}.`, type: "direct" };
        },
        () => {
            const numerator = choose([1, 2, 3, 4, 5, 6, 7, 8, 9]); const answer = format(numerator / 10, 1);
            return { question: `Write ${numerator}/10 as a decimal.`, answer, options: shuffle([answer, format(numerator / 100, 2), String(numerator), format((10 - numerator) / 10, 1)]), explanation: `${numerator}/10 = ${answer}.`, type: "direct" };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty); const total = decimal(wholeMax, places); const known = decimal(wholeMax, places); const larger = Math.max(total, known); const smaller = Math.min(total, known); const answer = round(larger - smaller, places);
            return { question: `${format(smaller, places)} + x = ${format(larger, places)}. Find x.`, answer: format(answer, places), options: numericOptions(answer, places), explanation: `Subtract ${format(smaller, places)} from ${format(larger, places)}: ${format(answer, places)}.`, type: "direct" };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty); const value = decimal(wholeMax, places); const answer = round(value * 100, Math.max(0, places - 2)); const answerPlaces = Math.max(0, places - 2);
            return { question: `${format(value, places)} × 100 = ?`, answer: format(answer, answerPlaces), options: numericOptions(answer, answerPlaces), explanation: `Multiplying by 100 moves the decimal two places right.`, type: "direct" };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty); const value = decimal(wholeMax, places); const answer = round(value / 100, places + 2);
            return { question: `${format(value, places)} ÷ 100 = ?`, answer: format(answer, places + 2), options: numericOptions(answer, places + 2), explanation: `Dividing by 100 moves the decimal two places left.`, type: "direct" };
        },
        () => {
            const value = randomInt(1, 99) / 100; const answer = `${randomInt(1, 1)}`; const hundredths = Math.floor(value * 100) % 10;
            return { question: `What is the hundredths digit in ${format(value, 2)}?`, answer: String(hundredths), options: shuffle([String(hundredths), "0", "5", "9"].filter((item, index, array) => array.indexOf(item) === index)), explanation: `The second digit after the decimal point is ${hundredths}.`, type: "direct" };
        },
        () => {
            const whole = randomInt(1, 9); const numerator = choose([1, 2, 3, 4, 5, 6, 7, 8, 9]); const answer = format(whole + numerator / 10, 1);
            return { question: `Write ${whole} ${numerator}/10 as a decimal.`, answer, options: shuffle([answer, format(whole + numerator / 100, 2), String(whole + numerator), format(whole + (10 - numerator) / 10, 1)]), explanation: `${whole} ${numerator}/10 = ${answer}.`, type: "direct" };
        },
        (difficulty) => {
            const { wholeMax, places } = valuesFor(difficulty); const a = decimal(wholeMax, places); const b = decimal(wholeMax, places); const c = decimal(wholeMax, places); const answer = round(a + b - c, places);
            return { question: `${format(a, places)} + ${format(b, places)} − ${format(c, places)} = ?`, answer: format(answer, places), options: numericOptions(answer, places), explanation: `Work left to right and align decimal points: ${format(answer, places)}.`, type: "direct" };
        }
    ];

    const wordPatterns = [
        ...baseWordPatterns,
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const speed = decimal(wholeMax, places); const hours = randomInt(2, 8); const answer = round(speed * hours, places); return { question: `A cyclist travels ${format(speed, places)} km each hour for ${hours} hours. How far do they travel?`, answer: format(answer, places), options: numericOptions(answer, places), explanation: `${format(speed, places)} × ${hours} = ${format(answer, places)} km.`, type: "word" }; },
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const price = decimal(wholeMax, places); const paid = round(price * 2, places); return { question: `A toy costs $${format(price, places)}. You pay $${format(paid, places)}. How much change should you receive?`, answer: format(price, places), options: numericOptions(price, places), explanation: `$${format(paid, places)} − $${format(price, places)} = $${format(price, places)}.`, type: "word" }; },
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const length = decimal(wholeMax, places); const pieces = randomInt(2, 10); const answer = round(length * pieces, places); return { question: `Each piece of wire is ${format(length, places)} m long. What is the length of ${pieces} pieces?`, answer: format(answer, places), options: numericOptions(answer, places), explanation: `${format(length, places)} × ${pieces} = ${format(answer, places)} m.`, type: "word" }; },
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const perBottle = decimal(wholeMax, places); const bottles = randomInt(2, 10); const total = round(perBottle * bottles, places); return { question: `${format(total, places)} L of juice is poured equally into ${bottles} bottles. How many litres are in each bottle?`, answer: format(perBottle, places), options: numericOptions(perBottle, places), explanation: `${format(total, places)} ÷ ${bottles} = ${format(perBottle, places)} L.`, type: "word" }; },
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const start = decimal(wholeMax, places); const decrease = decimal(Math.max(2, Math.floor(wholeMax / 2)), places); const answer = round(Math.max(start, decrease) - Math.min(start, decrease), places); const larger = Math.max(start, decrease); const smaller = Math.min(start, decrease); return { question: `A tank has ${format(larger, places)} L of water. ${format(smaller, places)} L is drained. How much remains?`, answer: format(answer, places), options: numericOptions(answer, places), explanation: `${format(larger, places)} − ${format(smaller, places)} = ${format(answer, places)} L.`, type: "word" }; },
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const first = decimal(wholeMax, places); const second = decimal(wholeMax, places); const answer = round(first + second, places); return { question: `A runner completed ${format(first, places)} km on Monday and ${format(second, places)} km on Tuesday. How many km did they run in total?`, answer: format(answer, places), options: numericOptions(answer, places), explanation: `Add both distances: ${format(answer, places)} km.`, type: "word" }; },
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const mass = decimal(wholeMax, places); const answer = round(mass * 1000, Math.max(0, places - 3)); return { question: `A parcel weighs ${format(mass, places)} kg. How many grams does it weigh?`, answer: format(answer, Math.max(0, places - 3)), options: numericOptions(answer, Math.max(0, places - 3)), explanation: `Multiply kilograms by 1,000: ${format(answer, Math.max(0, places - 3))} g.`, type: "word" }; },
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const kilometres = decimal(wholeMax, places); const answer = round(kilometres * 1000, Math.max(0, places - 3)); return { question: `A walk is ${format(kilometres, places)} km. How many metres is that?`, answer: format(answer, Math.max(0, places - 3)), options: numericOptions(answer, Math.max(0, places - 3)), explanation: `1 km = 1,000 m, so the distance is ${format(answer, Math.max(0, places - 3))} m.`, type: "word" }; },
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const amount = decimal(wholeMax, places); const answer = round(amount * 10, Math.max(0, places - 1)); return { question: `A jug contains ${format(amount, places)} L. How many decilitres is this?`, answer: format(answer, Math.max(0, places - 1)), options: numericOptions(answer, Math.max(0, places - 1)), explanation: `1 L = 10 dL, so ${format(amount, places)} L = ${format(answer, Math.max(0, places - 1))} dL.`, type: "word" }; },
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const score = decimal(wholeMax, places); const bonus = decimal(Math.max(2, Math.floor(wholeMax / 2)), places); const answer = round(score + bonus, places); return { question: `A game score is ${format(score, places)} points. A bonus of ${format(bonus, places)} points is added. What is the new score?`, answer: format(answer, places), options: numericOptions(answer, places), explanation: `${format(score, places)} + ${format(bonus, places)} = ${format(answer, places)}.`, type: "word" }; },
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const amount = decimal(wholeMax, places); const days = randomInt(2, 10); const answer = round(amount * days, places); return { question: `A plant grows ${format(amount, places)} cm each day for ${days} days. How much does it grow?`, answer: format(answer, places), options: numericOptions(answer, places), explanation: `${format(amount, places)} × ${days} = ${format(answer, places)} cm.`, type: "word" }; },
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const reading = decimal(wholeMax, places); const answer = round(reading / 10, places + 1); return { question: `A measuring cup holds ${format(reading, places)} L. What is one tenth of this amount?`, answer: format(answer, places + 1), options: numericOptions(answer, places + 1), explanation: `Divide by 10: ${format(answer, places + 1)} L.`, type: "word" }; },
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const first = decimal(wholeMax, places); const second = decimal(wholeMax, places); const answer = first > second ? format(first, places) : format(second, places); return { question: `Which is longer: ${format(first, places)} m or ${format(second, places)} m?`, answer, options: shuffle([format(first, places), format(second, places), format(first + second, places), "They are equal"].filter((item, index, array) => array.indexOf(item) === index)), explanation: `${answer} m is the greater decimal.`, type: "word" }; },
        (difficulty) => { const { wholeMax, places } = valuesFor(difficulty); const bill = decimal(wholeMax, places); const friends = randomInt(2, 8); const total = round(bill * friends, places); return { question: `${friends} friends each pay $${format(bill, places)}. What is the total amount paid?`, answer: format(total, places), options: numericOptions(total, places), explanation: `$${format(bill, places)} × ${friends} = $${format(total, places)}.`, type: "word" }; }
    ];

    function generateDecimalsQuestion(difficulty = "easy", questionCategory = "direct", usedPatterns = []) {
        const patterns = questionCategory === "word" ? wordPatterns : directPatterns;
        const indexes = patterns.map((_, index) => index);
        const unusedIndexes = indexes.filter((index) => !usedPatterns.includes(index));
        const selectedIndex = choose(unusedIndexes.length ? unusedIndexes : indexes);
        const question = patterns[selectedIndex](difficulty);
        question.patternIndex = selectedIndex;
        question.topic = "decimals";
        return question;
    }

    window.generateDecimalsQuestion = generateDecimalsQuestion;
})();
