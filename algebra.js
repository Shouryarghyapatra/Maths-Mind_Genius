// ==========================================
// ICSE GRADE 9 ALGEBRA QUESTION BANK
// Original questions: expansions, factorisation,
// simultaneous equations, surds, indices, identities
// ==========================================

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function shuffle(items) {
    const copy = [...items];
  
    for (let i = copy.length - 1; i > 0; i--) {
      const j = rand(0, i);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
  
    return copy;
  }
  
  function makeMCQ(answer, distractors) {
    const options = [answer, ...distractors].map(String);
  
    if (options.length !== 4 || new Set(options).size !== 4) {
      throw new Error(`Invalid answer choices for: ${answer}`);
    }
  
    return shuffle(options);
  }
  
  function numberMCQ(answer, deltas = [-3, -1, 1]) {
    return makeMCQ(answer, deltas.map(delta => answer + delta));
  }
  
  function signed(number) {
    return number >= 0 ? `+ ${number}` : `− ${Math.abs(number)}`;
  }
  
  function algebraQuestion(topic, question, answer, options, explanation, type = "direct") {
    return {
      difficulty: "hard",
      type,
      topic,
      question,
      answer: String(answer),
      options,
      explanation
    };
  }
  
  function variantFractionEquation() {
    return [
      {
        question: "(x + 12)/3 = (x + 6)/2",
        answer: 6,
        explain: "Cross-multiply: 2(x + 12) = 3(x + 6). Expanding gives 2x + 24 = 3x + 18, so x = 6."
      },
      {
        question: "(x + 17)/3 = (x + 7)/2",
        answer: 13,
        explain: "Cross-multiply: 2(x + 17) = 3(x + 7). Therefore 2x + 34 = 3x + 21, so x = 13."
      },
      {
        question: "(x + 16)/4 = (x + 4)/2",
        answer: 8,
        explain: "Cross-multiply: 2(x + 16) = 4(x + 4). Therefore 2x + 32 = 4x + 16, so x = 8."
      }
    ][rand(0, 2)];
  }
  
  const algebraPatterns = [
  
    () => {
      const a = rand(2, 9);
      const answer = `x² + ${2 * a}x + ${a * a}`;
  
      return algebraQuestion(
        "Expansions",
        `Expand and simplify: (x + ${a})²`,
        answer,
        makeMCQ(answer, [
          `x² + ${a}x + ${a * a}`,
          `x² + ${2 * a}x + ${a}`,
          `x² + ${a * a}`
        ]),
        `Use (a + b)² = a² + 2ab + b². Therefore, (x + ${a})² = ${answer}.`
      );
    },
  
    () => {
      const a = rand(2, 9);
      const answer = `x² − ${2 * a}x + ${a * a}`;
  
      return algebraQuestion(
        "Expansions",
        `Expand and simplify: (x − ${a})²`,
        answer,
        makeMCQ(answer, [
          `x² − ${a}x + ${a * a}`,
          `x² + ${2 * a}x + ${a * a}`,
          `x² − ${2 * a}x − ${a * a}`
        ]),
        "Use (a − b)² = a² − 2ab + b². The middle term is negative, but the last term is positive."
      );
    },
  
    () => {
      const a = rand(2, 7);
      const b = a + rand(1, 5);
      const answer = `x² + ${a + b}x + ${a * b}`;
  
      return algebraQuestion(
        "Expansions",
        `Expand and simplify: (x + ${a})(x + ${b})`,
        answer,
        makeMCQ(answer, [
          `x² + ${a + b}x + ${a + b}`,
          `x² + ${a * b}x + ${a + b}`,
          `x² + ${b - a}x + ${a * b}`
        ]),
        `Multiply every term: x·x + ${b}x + ${a}x + ${a * b} = ${answer}.`
      );
    },
  
    () => {
      const a = rand(2, 8);
      const answer = `4x² + ${4 * a}x + ${a * a}`;
  
      return algebraQuestion(
        "Expansions",
        `Expand and simplify: (2x + ${a})²`,
        answer,
        makeMCQ(answer, [
          `4x² + ${2 * a}x + ${a * a}`,
          `2x² + ${4 * a}x + ${a * a}`,
          `4x² + ${4 * a}x + ${a}`
        ]),
        `Use (a + b)². Here, 2(2x)(${a}) = ${4 * a}x.`
      );
    },
  
    () => {
      const a = rand(2, 4);
      const answer = `x³ + ${3 * a}x² + ${3 * a * a}x + ${a ** 3}`;
  
      return algebraQuestion(
        "Cubic expansions",
        `Expand and simplify: (x + ${a})³`,
        answer,
        makeMCQ(answer, [
          `x³ + ${a}x² + ${a * a}x + ${a ** 3}`,
          `x³ + ${3 * a}x² + ${3 * a}x + ${a ** 3}`,
          `x³ + ${3 * a}x² + ${3 * a * a}x − ${a ** 3}`
        ]),
        "Use (a + b)³ = a³ + 3a²b + 3ab² + b³."
      );
    },
  
    () => algebraQuestion(
      "Expansions",
      "Expand and simplify: (x + y − z)²",
      "x² + y² + z² + 2xy − 2xz − 2yz",
      makeMCQ("x² + y² + z² + 2xy − 2xz − 2yz", [
        "x² + y² + z² + 2xy + 2xz + 2yz",
        "x² + y² − z² + 2xy − 2xz − 2yz",
        "x² + y² + z² − 2xy − 2xz − 2yz"
      ]),
      "Square each term and then add twice each pairwise product. Products involving −z are negative."
    ),
  
    () => {
      const a = rand(2, 4);
      const b = rand(2, 6);
      const answer = `${a * a}x² − ${2 * a * b}xy + ${b * b}y²`;
  
      return algebraQuestion(
        "Expansions",
        `Expand and simplify: (${a}x − ${b}y)²`,
        answer,
        makeMCQ(answer, [
          `${a * a}x² + ${2 * a * b}xy + ${b * b}y²`,
          `${a * a}x² − ${a * b}xy + ${b * b}y²`,
          `${a}x² − ${2 * a * b}xy + ${b}y²`
        ]),
        `Apply (A − B)² = A² − 2AB + B² with A = ${a}x and B = ${b}y.`
      );
    },
  
    () => {
      const a = rand(4, 9);
      const b = rand(2, a - 1);
      const answer = `x² ${signed(a - b)}x − ${a * b}`;
  
      return algebraQuestion(
        "Expansions",
        `Expand and simplify: (x + ${a})(x − ${b})`,
        answer,
        makeMCQ(answer, [
          `x² + ${a + b}x − ${a * b}`,
          `x² ${signed(a - b)}x + ${a * b}`,
          `x² ${signed(b - a)}x − ${a * b}`
        ]),
        `The x-coefficient is ${a} − ${b} = ${a - b}, while the constant product is −${a * b}.`
      );
    },
  
    () => {
      const a = rand(2, 7);
      const b = rand(2, 9);
      const answer = `(${a}x − ${b})(${a}x + ${b})`;
  
      return algebraQuestion(
        "Factorisation",
        `Factorise completely: ${a * a}x² − ${b * b}`,
        answer,
        makeMCQ(answer, [
          `(${a}x − ${b})²`,
          `(${a}x + ${b})²`,
          `(${a}x − ${b})(${a}x − ${b})`
        ]),
        `Recognise A² − B² = (A − B)(A + B), where A = ${a}x and B = ${b}.`
      );
    },
  
    () => {
      const a = rand(2, 6);
      const answer = `(x − ${a})(x² + ${a}x + ${a * a})`;
  
      return algebraQuestion(
        "Factorisation",
        `Factorise completely: x³ − ${a ** 3}`,
        answer,
        makeMCQ(answer, [
          `(x − ${a})(x² − ${a}x + ${a * a})`,
          `(x + ${a})(x² + ${a}x + ${a * a})`,
          `(x − ${a})(x² + ${a * a})`
        ]),
        "Use A³ − B³ = (A − B)(A² + AB + B²)."
      );
    },
  
    () => {
      const a = rand(2, 6);
      const answer = `(x + ${a})(x² − ${a}x + ${a * a})`;
  
      return algebraQuestion(
        "Factorisation",
        `Factorise completely: x³ + ${a ** 3}`,
        answer,
        makeMCQ(answer, [
          `(x + ${a})(x² + ${a}x + ${a * a})`,
          `(x − ${a})(x² − ${a}x + ${a * a})`,
          `(x + ${a})(x² − ${a * a})`
        ]),
        "Use A³ + B³ = (A + B)(A² − AB + B²)."
      );
    },
  
    () => algebraQuestion(
      "Factorisation",
      "Factorise completely: 8x³ + 27",
      "(2x + 3)(4x² − 6x + 9)",
      makeMCQ("(2x + 3)(4x² − 6x + 9)", [
        "(2x − 3)(4x² + 6x + 9)",
        "(2x + 3)(4x² + 6x + 9)",
        "(8x + 3)(x² − 3x + 9)"
      ]),
      "8x³ + 27 = (2x)³ + 3³. Apply the sum of cubes identity."
    ),
  
    () => {
      const p = rand(2, 8);
      const q = p + rand(1, 6);
      const answer = `(x + ${p})(x + ${q})`;
  
      return algebraQuestion(
        "Quadratic factorisation",
        `Factorise: x² + ${p + q}x + ${p * q}`,
        answer,
        makeMCQ(answer, [
          `(x − ${p})(x − ${q})`,
          `(x + ${p + q})(x + ${p * q})`,
          `(x + ${p})(x − ${q})`
        ]),
        `Find two numbers whose sum is ${p + q} and product is ${p * q}: ${p} and ${q}.`
      );
    },
  
    () => {
      const p = rand(4, 10);
      const q = rand(2, p - 1);
      const answer = `(x + ${p})(x − ${q})`;
  
      return algebraQuestion(
        "Quadratic factorisation",
        `Factorise: x² + ${p - q}x − ${p * q}`,
        answer,
        makeMCQ(answer, [
          `(x − ${p})(x + ${q})`,
          `(x + ${p})(x + ${q})`,
          `(x − ${p})(x − ${q})`
        ]),
        "The factors must have opposite signs because the constant term is negative."
      );
    },
  
    () => {
      const a = rand(2, 4);
      let c = rand(2, 5);
      let b = rand(1, 5);
      let d = rand(1, 5);
  
      while (c === a) c = rand(2, 5);
      while (d === b) d = rand(1, 5);
  
      const middle = a * d + b * c;
      const constant = b * d;
      const answer = `(${a}x + ${b})(${c}x + ${d})`;
  
      return algebraQuestion(
        "Quadratic factorisation",
        `Factorise: ${a * c}x² + ${middle}x + ${constant}`,
        answer,
        makeMCQ(answer, [
          `(${a}x − ${b})(${c}x − ${d})`,
          `(${a}x + ${d})(${c}x + ${b})`,
          `(${a * c}x + ${b})(${d}x + 1)`
        ]),
        `Split the middle term and group the terms to obtain ${answer}.`
      );
    },
  
    () => {
      const a = rand(2, 8);
      let b = rand(2, 8);
  
      if (a === b) b++;
  
      const answer = `${a + b}(x + y)`;
  
      return algebraQuestion(
        "Factorisation by grouping",
        `Factorise: ${a}x + ${a}y + ${b}x + ${b}y`,
        answer,
        makeMCQ(answer, [
          `${a - b}(x + y)`,
          `${a + b}(x − y)`,
          `${a * b}(x + y)`
        ]),
        `Group the terms: ${a}(x + y) + ${b}(x + y) = ${answer}.`
      );
    },
  
    () => {
      const a = rand(2, 9);
      const answer = `x + ${a}`;
  
      return algebraQuestion(
        "Algebraic fractions",
        `Simplify: (x² − ${a * a}) ÷ (x − ${a}), where x ≠ ${a}.`,
        answer,
        makeMCQ(answer, [
          `x − ${a}`,
          `x² + ${a * a}`,
          `${a}x`
        ]),
        `Factor the numerator: x² − ${a * a} = (x − ${a})(x + ${a}). Cancel x − ${a}.`
      );
    },
  
    () => {
      const answer = rand(5, 15);
      const a = rand(3, 7);
      const b = rand(2, 7);
      const c = rand(3, 12);
      const d = a - 1;
      const e = answer - a * b + c;
  
      return algebraQuestion(
        "Linear equations",
        `Solve for x: ${a}(x − ${b}) + ${c} = ${d}x ${signed(e)}`,
        String(answer),
        numberMCQ(answer, [-4, -2, 2]),
        `Expand the left side, collect x-terms on one side, and constants on the other. This gives x = ${answer}.`
      );
    },
  
    () => {
      const x = variantFractionEquation();
  
      return algebraQuestion(
        "Fractional equations",
        `Solve for x: ${x.question}`,
        String(x.answer),
        numberMCQ(x.answer, [-4, -2, 3]),
        x.explain
      );
    },
  
    () => {
      let a, b, c, d;
  
      do {
        a = rand(2, 6);
        b = rand(1, 5);
        c = rand(1, 5);
        d = rand(2, 6);
      } while (a * d === b * c);
  
      const x = rand(2, 9);
      const y = rand(2, 9);
  
      const first = a * x + b * y;
      const second = c * x + d * y;
  
      return algebraQuestion(
        "Simultaneous equations",
        `Solve the system: ${a}x + ${b}y = ${first} and ${c}x + ${d}y = ${second}. Find x.`,
        String(x),
        numberMCQ(x, [-3, -1, 2]),
        `Use elimination or substitution. The solution is x = ${x}, y = ${y}.`
      );
    },
  
    () => {
      const x = [
        { total:12, adult:50, child:30, amount:500, answer:7 },
        { total:15, adult:60, child:40, amount:780, answer:9 },
        { total:20, adult:75, child:45, amount:1260, answer:12 }
      ][rand(0, 2)];
  
      return algebraQuestion(
        "Simultaneous equations",
        `At a school event, ${x.total} tickets are sold. An adult ticket costs ₹${x.adult} and a student ticket costs ₹${x.child}. The total collection is ₹${x.amount}. How many adult tickets were sold?`,
        String(x.answer),
        numberMCQ(x.answer, [-3, -1, 2]),
        `Let adult tickets be a and student tickets be s. Use a + s = ${x.total} and ${x.adult}a + ${x.child}s = ${x.amount}.`,
        "word"
      );
    },
  
    () => {
      const x = [
        { total:35, past:4, multiple:2, older:"Asha", younger:"Bina", answer:13 },
        { total:42, past:5, multiple:3, older:"Rohan", younger:"Kunal", answer:13 },
        { total:54, past:3, multiple:2, older:"Meera", younger:"Tara", answer:19 }
      ][rand(0, 2)];
  
      return algebraQuestion(
        "Linear-equation applications",
        `${x.older} and ${x.younger} have a combined present age of ${x.total} years. ${x.past} years ago, ${x.older} was ${x.multiple} times as old as ${x.younger}. What is ${x.younger}'s present age?`,
        String(x.answer),
        numberMCQ(x.answer, [-4, -2, 3]),
        `Let ${x.younger}'s age be y. The other age is ${x.total} − y. Apply the age condition ${x.past} years ago.`,
        "word"
      );
    },
  
    () => {
      const x = [
        { perimeter:38, difference:3, area:88 },
        { perimeter:50, difference:5, area:150 },
        { perimeter:64, difference:8, area:240 }
      ][rand(0, 2)];
  
      return algebraQuestion(
        "Linear-equation applications",
        `The length of a rectangle is ${x.difference} cm more than its width. Its perimeter is ${x.perimeter} cm. Find its area.`,
        `${x.area} cm²`,
        makeMCQ(`${x.area} cm²`, [
          `${x.area - x.difference} cm²`,
          `${x.area + x.difference} cm²`,
          `${2 * x.area} cm²`
        ]),
        `Let the width be w cm, so the length is w + ${x.difference}. Solve 2[w + (w + ${x.difference})] = ${x.perimeter}.`,
        "word"
      );
    },
  
    () => {
      const x = [
        {
          q:"√72 − √8 + √18",
          answer:"7√2",
          wrong:["5√2","6√2","8√2"],
          explain:"√72 = 6√2, √8 = 2√2, and √18 = 3√2. Therefore 6√2 − 2√2 + 3√2 = 7√2."
        },
        {
          q:"√50 + √8 − √18",
          answer:"4√2",
          wrong:["2√2","3√2","6√2"],
          explain:"√50 = 5√2, √8 = 2√2, and √18 = 3√2. Therefore 5√2 + 2√2 − 3√2 = 4√2."
        },
        {
          q:"√98 − √8 + √32",
          answer:"9√2",
          wrong:["5√2","7√2","11√2"],
          explain:"√98 = 7√2, √8 = 2√2, and √32 = 4√2. Therefore the result is 9√2."
        }
      ][rand(0, 2)];
  
      return algebraQuestion(
        "Surds",
        `Simplify: ${x.q}`,
        x.answer,
        makeMCQ(x.answer, x.wrong),
        x.explain
      );
    },
  
    () => {
      const x = [
        {
          q:"1 ÷ (√5 − √2)",
          answer:"(√5 + √2) ÷ 3",
          wrong:["(√5 − √2) ÷ 3","√5 + √2","(√5 + √2) ÷ 7"],
          explain:"Multiply numerator and denominator by √5 + √2. The denominator becomes 5 − 2 = 3."
        },
        {
          q:"1 ÷ (√3 − √2)",
          answer:"√3 + √2",
          wrong:["√3 − √2","(√3 + √2) ÷ 5","(√3 − √2) ÷ 5"],
          explain:"The conjugate gives denominator 3 − 2 = 1, so the result is √3 + √2."
        },
        {
          q:"1 ÷ (√7 + √3)",
          answer:"(√7 − √3) ÷ 4",
          wrong:["(√7 + √3) ÷ 4","√7 − √3","(√7 − √3) ÷ 10"],
          explain:"Multiply by √7 − √3. The denominator becomes 7 − 3 = 4."
        }
      ][rand(0, 2)];
  
      return algebraQuestion(
        "Rationalisation",
        `Rationalise the denominator: ${x.q}`,
        x.answer,
        makeMCQ(x.answer, x.wrong),
        x.explain
      );
    },
  
    () => {
      const x = [
        {
          q:"(2⁸ × 2⁵) ÷ 2⁹",
          answer:16,
          explain:"Add powers when multiplying and subtract powers when dividing: 2^(8 + 5 − 9) = 2⁴ = 16."
        },
        {
          q:"(3⁶ × 3⁴) ÷ 3⁷",
          answer:27,
          explain:"3^(6 + 4 − 7) = 3³ = 27."
        },
        {
          q:"(5⁵ × 5³) ÷ 5⁶",
          answer:25,
          explain:"5^(5 + 3 − 6) = 5² = 25."
        }
      ][rand(0, 2)];
  
      return algebraQuestion(
        "Indices",
        `Evaluate: ${x.q}`,
        String(x.answer),
        numberMCQ(x.answer, [-x.answer / 2, -1, 1]),
        x.explain
      );
    },
  
    () => {
      const x = [
        {
          q:"(x³y²)² ÷ (x⁴y)",
          answer:"x²y³",
          wrong:["x⁶y⁴","x²y","x⁴y³"],
          explain:"First square: x⁶y⁴. Then subtract powers while dividing: x^(6−4)y^(4−1) = x²y³."
        },
        {
          q:"(a²b³)³ ÷ (a⁴b⁵)",
          answer:"a²b⁴",
          wrong:["a⁶b⁹","a²b⁶","a⁴b⁴"],
          explain:"The numerator is a⁶b⁹. Dividing gives a²b⁴."
        },
        {
          q:"(m⁴n²)² ÷ (m⁵n³)",
          answer:"m³n",
          wrong:["m⁸n⁴","m³n³","mn"],
          explain:"The numerator is m⁸n⁴. Dividing gives m³n."
        }
      ][rand(0, 2)];
  
      return algebraQuestion(
        "Indices",
        `Simplify: ${x.q}`,
        x.answer,
        makeMCQ(x.answer, x.wrong),
        x.explain
      );
    },
  
    () => {
      const n = rand(3, 6);
      const answer = n * n - 2;
  
      return algebraQuestion(
        "Algebraic identities",
        `If x + 1/x = ${n}, find x² + 1/x².`,
        String(answer),
        numberMCQ(answer, [-3, -1, 2]),
        `Square x + 1/x: x² + 2 + 1/x² = ${n * n}. Therefore x² + 1/x² = ${answer}.`
      );
    },
  
    () => {
      const x = [
        { sum:11, product:24, answer:73 },
        { sum:13, product:36, answer:97 },
        { sum:17, product:60, answer:169 }
      ][rand(0, 2)];
  
      return algebraQuestion(
        "Algebraic identities",
        `If a + b = ${x.sum} and ab = ${x.product}, find a² + b².`,
        String(x.answer),
        numberMCQ(x.answer, [-8, -4, 4]),
        `Use a² + b² = (a + b)² − 2ab = ${x.sum}² − 2(${x.product}) = ${x.answer}.`
      );
    },
  
    () => {
      const x = [
        { difference:4, product:21, answer:58 },
        { difference:5, product:18, answer:61 },
        { difference:7, product:12, answer:73 }
      ][rand(0, 2)];
  
      return algebraQuestion(
        "Algebraic identities",
        `If p − q = ${x.difference} and pq = ${x.product}, find p² + q².`,
        String(x.answer),
        numberMCQ(x.answer, [-6, -2, 3]),
        `Use (p − q)² = p² + q² − 2pq. Thus p² + q² = ${x.difference}² + 2(${x.product}) = ${x.answer}.`
      );
    },
  
    () => {
      const x = [
        { sum:78, answer:28 },
        { sum:96, answer:34 },
        { sum:132, answer:46 }
      ][rand(0, 2)];
  
      return algebraQuestion(
        "Linear-equation applications",
        `The sum of three consecutive even integers is ${x.sum}. Find the largest integer.`,
        String(x.answer),
        numberMCQ(x.answer, [-4, -2, 2]),
        `Let the integers be n − 2, n, and n + 2. Their sum is 3n = ${x.sum}; then add 2 to find the largest integer.`,
        "word"
      );
    },
  
    () => {
      const x = [
        {
          q:"x/3 + x/4 = 14",
          answer:24,
          explain:"Multiply by 12: 4x + 3x = 168, so 7x = 168 and x = 24."
        },
        {
          q:"x/5 + x/2 = 21",
          answer:30,
          explain:"Multiply by 10: 2x + 5x = 210, so x = 30."
        },
        {
          q:"x/6 + x/3 = 18",
          answer:36,
          explain:"Multiply by 6: x + 2x = 108, so x = 36."
        }
      ][rand(0, 2)];
  
      return algebraQuestion(
        "Fractional equations",
        `Solve for x: ${x.q}`,
        String(x.answer),
        numberMCQ(x.answer, [-6, -3, 3]),
        x.explain
      );
    }
  ];
  
  // ==========================================
  // RANDOM ALGEBRA QUESTION
  // ==========================================
  
  function generateAlgebraQuestion(difficulty = null) {
    let pool = algebraPatterns;
  
    if (difficulty) {
      const matchingPatterns = algebraPatterns.filter(
        pattern => pattern().difficulty === difficulty
      );
  
      if (matchingPatterns.length) {
        pool = matchingPatterns;
      }
    }
  
    return pool[rand(0, pool.length - 1)]();
  }
  
  // ==========================================
  // GET EXPLANATION
  // ==========================================
  
  function getAlgebraExplanation(question) {
    return question.explanation || "No explanation available.";
  }
  
  // ==========================================
  // EXPORTS
  // ==========================================
  
  window.generateAlgebraQuestion = generateAlgebraQuestion;
  window.getAlgebraExplanation = getAlgebraExplanation;
  window.algebraPatterns = algebraPatterns;