// ============================================================
// MATHMIND AI — RATIO & PROPORTION QUESTION ENGINE
// Compatible with script.js: generateRatioQuestion(difficulty,
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
            [copy[index], copy[otherIndex]] =
                [copy[otherIndex], copy[index]];
        }
        return copy;
    };

    const gcd = (first, second) => {
        let a = Math.abs(first);
        let b = Math.abs(second);
        while (b !== 0) [a, b] = [b, a % b];
        return a;
    };

    const simplifyRatio = (first, second) => {
        const divisor = gcd(first, second);
        return `${first / divisor}:${second / divisor}`;
    };

    const difficultyValues = (difficulty) => {
        if (difficulty === "hard") return { multiplierMax: 12, valueMax: 24 };
        if (difficulty === "medium") return { multiplierMax: 8, valueMax: 16 };
        return { multiplierMax: 5, valueMax: 10 };
    };

    const numericOptions = (answer) => {
        const options = new Set([answer]);
        const spread = Math.max(2, Math.ceil(Math.abs(answer) * 0.25));

        while (options.size < 4) {
            const offset = randomInt(-spread, spread);
            const candidate = answer + (offset === 0 ? 1 : offset);
            if (candidate >= 0 && candidate !== answer) options.add(candidate);
        }
        return shuffle([...options]);
    };

    const ratioOptions = (answer, alternatives) => {
        const options = new Set([answer, ...alternatives]);
        let denominator = 2;
        while (options.size < 4) {
            options.add(`1:${denominator}`);
            denominator++;
        }
        return shuffle([...options].slice(0, 4));
    };

    const makeRatio = (difficulty) => {
        const { multiplierMax, valueMax } = difficultyValues(difficulty);
        const first = randomInt(1, valueMax);
        const second = randomInt(1, valueMax);
        const multiplier = randomInt(2, multiplierMax);
        return { first, second, multiplier };
    };

    const baseDirectPatterns = [
        (difficulty) => {
            const { first, second, multiplier } = makeRatio(difficulty);
            const answer = simplifyRatio(first * multiplier, second * multiplier);
            return {
                question: `Simplify the ratio ${first * multiplier}:${second * multiplier}.`,
                answer,
                options: ratioOptions(answer, [`${first}:${second}`, `${second}:${first}`, `${first * multiplier}:1`]),
                explanation: `Divide both terms by ${multiplier}: ${first * multiplier}:${second * multiplier} = ${answer}.`,
                type: "direct"
            };
        },
        (difficulty) => {
            const { first, second, multiplier } = makeRatio(difficulty);
            const answer = first * multiplier;
            return {
                question: `${first}:${second} = x:${second * multiplier}. Find x.`,
                answer,
                options: numericOptions(answer),
                explanation: `The second term was multiplied by ${multiplier}, so ${first} × ${multiplier} = ${answer}.`,
                type: "direct"
            };
        },
        (difficulty) => {
            const { first, second, multiplier } = makeRatio(difficulty);
            const answer = second * multiplier;
            return {
                question: `${first}:${second} = ${first * multiplier}:x. Find x.`,
                answer,
                options: numericOptions(answer),
                explanation: `The first term was multiplied by ${multiplier}, so ${second} × ${multiplier} = ${answer}.`,
                type: "direct"
            };
        },
        (difficulty) => {
            const { first, second } = makeRatio(difficulty);
            const total = first + second;
            const answer = first / total;
            return {
                question: `What fraction of the total is the first part in the ratio ${first}:${second}?`,
                answer: `${first}/${total}`,
                options: ratioOptions(`${first}/${total}`, [`${second}/${total}`, `${first}/${second}`, `${total}/${first}`]),
                explanation: `There are ${total} equal parts in total; the first part has ${first} of them.`,
                type: "direct"
            };
        },
        (difficulty) => {
            const { first, second, multiplier } = makeRatio(difficulty);
            const answer = first * multiplier + second * multiplier;
            return {
                question: `Two quantities are in the ratio ${first}:${second}. If the first is ${first * multiplier}, what is their total?`,
                answer,
                options: numericOptions(answer),
                explanation: `One ratio unit is ${multiplier}. Total = (${first} + ${second}) × ${multiplier} = ${answer}.`,
                type: "direct"
            };
        },
        (difficulty) => {
            const { first, second, multiplier } = makeRatio(difficulty);
            const total = (first + second) * multiplier;
            const answer = second * multiplier;
            return {
                question: `A total of ${total} is divided in the ratio ${first}:${second}. What is the second share?`,
                answer,
                options: numericOptions(answer),
                explanation: `There are ${first + second} parts. Each is ${multiplier}, so the second share is ${second} × ${multiplier} = ${answer}.`,
                type: "direct"
            };
        }
    ];

    const baseWordPatterns = [
        (difficulty) => {
            const { first, second, multiplier } = makeRatio(difficulty);
            const answer = first * multiplier;
            return {
                question: `The ratio of red to blue marbles is ${first}:${second}. If there are ${second * multiplier} blue marbles, how many red marbles are there?`,
                answer,
                options: numericOptions(answer),
                explanation: `Each ratio part is ${multiplier}; red marbles = ${first} × ${multiplier} = ${answer}.`,
                type: "word"
            };
        },
        (difficulty) => {
            const { first, second, multiplier } = makeRatio(difficulty);
            const answer = second * multiplier;
            return {
                question: `The ratio of boys to girls in a class is ${first}:${second}. If there are ${first * multiplier} boys, how many girls are there?`,
                answer,
                options: numericOptions(answer),
                explanation: `Each ratio part is ${multiplier}; girls = ${second} × ${multiplier} = ${answer}.`,
                type: "word"
            };
        },
        (difficulty) => {
            const { first, second, multiplier } = makeRatio(difficulty);
            const answer = (first + second) * multiplier;
            return {
                question: `A recipe uses flour and sugar in the ratio ${first}:${second}. If it uses ${first * multiplier} cups of flour, how many cups of flour and sugar are used altogether?`,
                answer,
                options: numericOptions(answer),
                explanation: `One ratio part is ${multiplier}; total = (${first} + ${second}) × ${multiplier} = ${answer}.`,
                type: "word"
            };
        },
        (difficulty) => {
            const { first, second, multiplier } = makeRatio(difficulty);
            const total = (first + second) * multiplier;
            const answer = first * multiplier;
            return {
                question: `${total} students are split into two teams in the ratio ${first}:${second}. How many students are in the first team?`,
                answer,
                options: numericOptions(answer),
                explanation: `There are ${first + second} ratio parts, each worth ${multiplier}. First team = ${first} × ${multiplier} = ${answer}.`,
                type: "word"
            };
        },
        (difficulty) => {
            const { first, second, multiplier } = makeRatio(difficulty);
            const answer = simplifyRatio(first * multiplier, second * multiplier);
            return {
                question: `A paint mix has ${first * multiplier} parts yellow and ${second * multiplier} parts blue. Write the simplified ratio of yellow to blue.`,
                answer,
                options: ratioOptions(answer, [`${first * multiplier}:${second}`, `${second}:${first}`, `${first * multiplier}:1`]),
                explanation: `Divide both quantities by ${multiplier}; the simplified ratio is ${answer}.`,
                type: "word"
            };
        },
        (difficulty) => {
            const { first, second, multiplier } = makeRatio(difficulty);
            const answer = second * multiplier;
            return {
                question: `The ratio of cats to dogs at a shelter is ${first}:${second}. There are ${first * multiplier} cats. How many dogs are there?`,
                answer,
                options: numericOptions(answer),
                explanation: `Each ratio part represents ${multiplier} animals, so dogs = ${second} × ${multiplier} = ${answer}.`,
                type: "word"
            };
        }
    ];

    const numericQuestion = (question, answer, explanation, type = "direct") => ({ question, answer, options: numericOptions(answer), explanation, type });

    const directPatterns = [
        ...baseDirectPatterns,
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const total = (first + second) * multiplier; const answer = first * multiplier; return numericQuestion(`A total of ${total} is shared in the ratio ${first}:${second}. Find the first share.`, answer, `There are ${first + second} parts; each is ${multiplier}. First share = ${first} × ${multiplier} = ${answer}.`); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const total = (first + second) * multiplier; const answer = second * multiplier; return numericQuestion(`A total of ${total} is shared in the ratio ${first}:${second}. Find the second share.`, answer, `Second share = ${second} × ${multiplier} = ${answer}.`); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = first * multiplier; return numericQuestion(`If ${first}:${second} = ${answer}:x, find x.`, second * multiplier, `The scale factor is ${multiplier}; x = ${second} × ${multiplier} = ${second * multiplier}.`); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = second * multiplier; return numericQuestion(`If x:${answer} = ${first}:${second}, find x.`, first * multiplier, `The scale factor is ${multiplier}; x = ${first} × ${multiplier} = ${first * multiplier}.`); },
        (difficulty) => { const { first, second } = makeRatio(difficulty); const answer = simplifyRatio(first, second); return { question: `Write the ratio ${first} to ${second} in simplest form.`, answer, options: ratioOptions(answer, [`${second}:${first}`, `${first * 2}:${second * 2}`, `${first}:1`]), explanation: `The simplest form is ${answer}.`, type: "direct" }; },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = (first + second) * multiplier; return numericQuestion(`The ratio is ${first}:${second}, and one ratio unit equals ${multiplier}. Find the total number of units.`, answer, `Total = (${first} + ${second}) × ${multiplier} = ${answer}.`); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const small = Math.min(first, second); const large = Math.max(first, second); const answer = small * multiplier; return numericQuestion(`In the ratio ${small}:${large}, the difference between the two quantities is ${(large - small) * multiplier}. What is the smaller quantity?`, answer, `The scale factor is ${multiplier}; smaller quantity = ${small} × ${multiplier} = ${answer}.`); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const small = Math.min(first, second); const large = Math.max(first, second); const answer = large * multiplier; return numericQuestion(`Two numbers are in the ratio ${small}:${large}. Their difference is ${(large - small) * multiplier}. Find the larger number.`, answer, `The larger number is ${large} × ${multiplier} = ${answer}.`); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = simplifyRatio(first * multiplier, second * multiplier); return { question: `Which ratio is equivalent to ${first}:${second}?`, answer, options: ratioOptions(answer, [`${second * multiplier}:${first * multiplier}`, `${first + multiplier}:${second + multiplier}`, `${first}:${second * multiplier}`]), explanation: `Multiply both terms by ${multiplier}: ${answer}.`, type: "direct" }; },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const total = (first + second) * multiplier; const answer = first * multiplier; return numericQuestion(`${first}/${first + second} of a quantity is the first part. If the total is ${total}, find that part.`, answer, `${total} ÷ ${first + second} = ${multiplier}; ${first} × ${multiplier} = ${answer}.`); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = multiplier; return numericQuestion(`The ratio ${first * multiplier}:${second * multiplier} is reduced to ${first}:${second}. What common factor was used?`, answer, `Both terms were divided by ${multiplier}.`); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = first * multiplier; return numericQuestion(`x:${second * multiplier} = ${first}:${second}. Find x using cross multiplication.`, answer, `x × ${second} = ${first} × ${second * multiplier}, so x = ${answer}.`); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = second * multiplier; return numericQuestion(`${first * multiplier}:x = ${first}:${second}. Find x using cross multiplication.`, answer, `${first * multiplier} × ${second} = ${first} × x, so x = ${answer}.`); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = (first + second) * multiplier; return numericQuestion(`The two parts of a ratio ${first}:${second} are ${first * multiplier} and ${second * multiplier}. What is their sum?`, answer, `${first * multiplier} + ${second * multiplier} = ${answer}.`); }
    ];

    const wordPatterns = [
        ...baseWordPatterns,
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = first * multiplier; return numericQuestion(`The ratio of apples to oranges is ${first}:${second}. If there are ${second * multiplier} oranges, how many apples are there?`, answer, `One ratio part is ${multiplier}; apples = ${first} × ${multiplier} = ${answer}.`, "word"); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = second * multiplier; return numericQuestion(`The ratio of tea to milk is ${first}:${second}. If ${first * multiplier} cups of tea are used, how many cups of milk are needed?`, answer, `Milk = ${second} × ${multiplier} = ${answer} cups.`, "word"); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const total = (first + second) * multiplier; const answer = first * multiplier; return numericQuestion(`${total} books are fiction and non-fiction in the ratio ${first}:${second}. How many are fiction?`, answer, `There are ${first + second} parts, each worth ${multiplier}; fiction = ${answer}.`, "word"); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const total = (first + second) * multiplier; const answer = second * multiplier; return numericQuestion(`${total} sweets are divided between Ali and Bea in the ratio ${first}:${second}. How many sweets does Bea get?`, answer, `Bea's share is ${second} × ${multiplier} = ${answer}.`, "word"); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = first * multiplier; return numericQuestion(`A map uses a scale where ${first} cm represents ${first * multiplier} km. How many km does ${second} cm represent?`, second * multiplier, `Each cm represents ${multiplier} km, so ${second} cm represents ${second * multiplier} km.`, "word"); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = (first + second) * multiplier; return numericQuestion(`A bag has red and green counters in the ratio ${first}:${second}. If red counters number ${first * multiplier}, how many counters are in the bag?`, answer, `Green counters = ${second * multiplier}; total = ${answer}.`, "word"); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = first * multiplier; return numericQuestion(`The ratio of flour to butter is ${first}:${second}. A baker uses ${second * multiplier} g of butter. How much flour is needed?`, answer, `Flour = ${first} × ${multiplier} = ${answer} g.`, "word"); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = second * multiplier; return numericQuestion(`The ratio of wins to losses is ${first}:${second}. A team has ${first * multiplier} wins. How many losses does it have?`, answer, `Losses = ${second} × ${multiplier} = ${answer}.`, "word"); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = first * multiplier; return numericQuestion(`Boys and girls are in the ratio ${first}:${second}. There are ${(first + second) * multiplier} children. How many are boys?`, answer, `Each ratio part is ${multiplier}; boys = ${first} × ${multiplier} = ${answer}.`, "word"); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = second * multiplier; return numericQuestion(`A paint mixture has yellow and blue paint in ratio ${first}:${second}. With ${(first + second) * multiplier} cups total, how many cups are blue?`, answer, `Blue paint = ${second} × ${multiplier} = ${answer} cups.`, "word"); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = simplifyRatio(first * multiplier, second * multiplier); return { question: `A garden has ${first * multiplier} rose plants and ${second * multiplier} lily plants. Give the simplified ratio of roses to lilies.`, answer, options: ratioOptions(answer, [`${second}:${first}`, `${first * multiplier}:1`, `${first}:${second * multiplier}`]), explanation: `Divide both counts by ${multiplier}; the ratio is ${answer}.`, type: "word" }; },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = (first + second) * multiplier; return numericQuestion(`The ratio of small to large boxes is ${first}:${second}. There are ${first * multiplier} small boxes. How many boxes are there altogether?`, answer, `Large boxes = ${second * multiplier}; total = ${answer}.`, "word"); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = first * multiplier; return numericQuestion(`The ratio of adults to children at an event is ${first}:${second}. If there are ${second * multiplier} children, how many adults attend?`, answer, `Adults = ${first} × ${multiplier} = ${answer}.`, "word"); },
        (difficulty) => { const { first, second, multiplier } = makeRatio(difficulty); const answer = second * multiplier; return numericQuestion(`A farm has chickens and ducks in the ratio ${first}:${second}. It has ${first * multiplier} chickens. How many ducks does it have?`, answer, `Ducks = ${second} × ${multiplier} = ${answer}.`, "word"); }
    ];

    function generateRatioQuestion(difficulty = "easy", questionCategory = "direct", usedPatterns = []) {
        const patterns = questionCategory === "word" ? wordPatterns : directPatterns;
        const unusedIndexes = patterns
            .map((_, index) => index)
            .filter((index) => !usedPatterns.includes(index));
        const selectedIndex = choose(unusedIndexes.length ? unusedIndexes : patterns.map((_, index) => index));
        const question = patterns[selectedIndex](difficulty);
        question.patternIndex = selectedIndex;
        question.topic = "ratio";
        return question;
    }

    window.generateRatioQuestion = generateRatioQuestion;
})();
