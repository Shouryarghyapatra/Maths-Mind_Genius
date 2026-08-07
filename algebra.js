// ==========================================
// ALGEBRA QUESTION BANK - PART 1
// Patterns 1-10 (Easy)
// MathMind AI
// ==========================================

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

function makeMCQ(correct) {
    let options = [correct];

    while (options.length < 4) {
        let wrong = correct + rand(-10, 10);
        if (wrong !== correct && !options.includes(wrong))
            options.push(wrong);
    }

    return shuffle(options);
}

const algebraPatterns = [

/*--------------------------------------------------
PATTERN 1
Evaluate x+a
---------------------------------------------------*/
() => {
    const x = rand(2,20);
    const a = rand(3,15);

    return {
        difficulty:"easy",
        type:"direct",
        question:`If x = ${x}, find x + ${a}.`,
        answer:x+a,
        options:makeMCQ(x+a)
    };
},

/*--------------------------------------------------
PATTERN 2
Evaluate ax
---------------------------------------------------*/
() => {
    const x = rand(2,12);
    const a = rand(2,9);

    return {
        difficulty:"easy",
        type:"direct",
        question:`If x = ${x}, find ${a}x.`,
        answer:a*x,
        options:makeMCQ(a*x)
    };
},

/*--------------------------------------------------
PATTERN 3
Evaluate ax+b
---------------------------------------------------*/
() => {
    const x = rand(2,15);
    const a = rand(2,7);
    const b = rand(2,20);

    return {
        difficulty:"easy",
        type:"direct",
        question:`If x = ${x}, find ${a}x + ${b}.`,
        answer:a*x+b,
        options:makeMCQ(a*x+b)
    };
},

/*--------------------------------------------------
PATTERN 4
Two Variables
---------------------------------------------------*/
() => {

    const a=rand(2,10);
    const b=rand(2,10);

    return{

        difficulty:"easy",

        type:"direct",

        question:`If a=${a} and b=${b}, find a+b.`,

        answer:a+b,

        options:makeMCQ(a+b)

    }

},

/*--------------------------------------------------
PATTERN 5
Two Variables Multiplication
---------------------------------------------------*/
()=>{

const a=rand(2,8);

const b=rand(2,8);

return{

difficulty:"easy",

type:"direct",

question:`If a=${a} and b=${b}, find ab.`,

answer:a*b,

options:makeMCQ(a*b)

}

},

/*--------------------------------------------------
PATTERN 6
Missing Number
---------------------------------------------------*/
()=>{

const x=rand(5,20);

const y=rand(5,20);

return{

difficulty:"easy",

type:"direct",

question:`Solve: □ + ${x} = ${x+y}`,

answer:y,

options:makeMCQ(y)

}

},

/*--------------------------------------------------
PATTERN 7
Simple Equation
---------------------------------------------------*/
()=>{

const x=rand(5,20);

const b=rand(2,15);

return{

difficulty:"easy",

type:"direct",

question:`Solve x + ${b} = ${x+b}`,

answer:x,

options:makeMCQ(x)

}

},

/*--------------------------------------------------
PATTERN 8
Simple Equation
---------------------------------------------------*/
()=>{

const x=rand(2,15);

const a=rand(2,8);

return{

difficulty:"easy",

type:"direct",

question:`Solve ${a}x = ${a*x}`,

answer:x,

options:makeMCQ(x)

}

},

/*--------------------------------------------------
PATTERN 9
Simple Equation
---------------------------------------------------*/
()=>{

const x=rand(3,15);

const a=rand(2,7);

const b=rand(2,20);

return{

difficulty:"easy",

type:"direct",

question:`Solve ${a}x + ${b} = ${a*x+b}`,

answer:x,

options:makeMCQ(x)

}

},

/*--------------------------------------------------
PATTERN 10
Identify Coefficient
---------------------------------------------------*/
()=>{

const a=rand(2,15);

const b=rand(2,20);

return{

difficulty:"easy",

type:"direct",

question:`What is the coefficient of x in ${a}x + ${b}?`,

answer:a,

options:makeMCQ(a)

}

},

/*--------------------------------------------------
PATTERN 11
Identify Constant
---------------------------------------------------*/
() => {

    const a = rand(2,15);
    const b = rand(5,30);

    return{
        difficulty:"easy",
        type:"direct",
        question:`What is the constant term in ${a}x + ${b}?`,
        answer:b,
        options:makeMCQ(b)
    }

},

/*--------------------------------------------------
PATTERN 12
Identify Variable
---------------------------------------------------*/
() => {

    const vars=["x","y","a","b","m","n","p"];
    const v=vars[rand(0,vars.length-1)];
    const a=rand(2,12);
    const b=rand(2,20);

    return{

        difficulty:"easy",

        type:"direct",

        question:`Identify the variable in ${a}${v} + ${b}.`,

        answer:v,

        options:shuffle([v,"x","5","Coefficient"])

    }

},

/*--------------------------------------------------
PATTERN 13
Combine Like Terms
---------------------------------------------------*/
() => {

    const a=rand(2,10);
    const b=rand(2,10);

    return{

        difficulty:"medium",

        type:"direct",

        question:`Simplify ${a}x + ${b}x.`,

        answer:`${a+b}x`

    }

},

/*--------------------------------------------------
PATTERN 14
Combine Like Terms (Subtraction)
---------------------------------------------------*/
() => {

    const a=rand(8,18);
    const b=rand(2,7);

    return{

        difficulty:"medium",

        type:"direct",

        question:`Simplify ${a}x - ${b}x.`,

        answer:`${a-b}x`

    }

},

/*--------------------------------------------------
PATTERN 15
Like or Unlike
---------------------------------------------------*/
() => {

    const terms=[
        ["3x","7x","Like"],
        ["5a","2a","Like"],
        ["4x","4y","Unlike"],
        ["2m","5n","Unlike"],
        ["8p","3p","Like"],
        ["6x","9z","Unlike"]
    ];

    const t=terms[rand(0,terms.length-1)];

    return{

        difficulty:"medium",

        type:"direct",

        question:`Are ${t[0]} and ${t[1]} like or unlike terms?`,

        answer:t[2],

        options:shuffle(["Like","Unlike","Cannot say","Both"])

    }

},

/*--------------------------------------------------
PATTERN 16
Collect Like Terms
---------------------------------------------------*/
() => {

    const a=rand(2,8);
    const b=rand(2,8);
    const c=rand(2,8);

    return{

        difficulty:"medium",

        type:"direct",

        question:`Simplify ${a}x + ${b} + ${c}x.` ,

        answer:`${a+c}x + ${b}`

    }

},

/*--------------------------------------------------
PATTERN 17
Expand Brackets
---------------------------------------------------*/
() => {

    const a=rand(2,6);
    const b=rand(2,12);

    return{

        difficulty:"medium",

        type:"direct",

        question:`Expand ${a}(x + ${b}).`,

        answer:`${a}x + ${a*b}`

    }

},

/*--------------------------------------------------
PATTERN 18
Expand Brackets (Negative)
---------------------------------------------------*/
() => {

    const a=rand(2,6);
    const b=rand(2,10);

    return{

        difficulty:"medium",

        type:"direct",

        question:`Expand ${a}(x - ${b}).`,

        answer:`${a}x - ${a*b}`

    }

},

/*--------------------------------------------------
PATTERN 19
Two-Step Equation
---------------------------------------------------*/
() => {

    const x=rand(3,15);
    const a=rand(2,8);
    const b=rand(2,20);

    return{

        difficulty:"medium",

        type:"direct",

        question:`Solve ${a}x + ${b} = ${a*x+b}.`,

        answer:x,

        options:makeMCQ(x)

    }

},

/*--------------------------------------------------
PATTERN 20
Equation with Subtraction
---------------------------------------------------*/
() => {

    const x=rand(5,15);
    const a=rand(2,8);
    const b=rand(2,15);

    return{

        difficulty:"medium",

        type:"direct",

        question:`Solve ${a}x - ${b} = ${a*x-b}.`,

        answer:x,

        options:makeMCQ(x)

    }

},
/*--------------------------------------------------
PATTERN 21
Simplify Three Like Terms
---------------------------------------------------*/
() => {

    const a = rand(2,10);
    const b = rand(2,10);
    const c = rand(2,10);

    return{

        difficulty:"medium",
        type:"direct",

        question:`Simplify ${a}x + ${b}x + ${c}x.`,

        answer:`${a+b+c}x`

    }

},

/*--------------------------------------------------
PATTERN 22
Collect Like Terms
---------------------------------------------------*/
() => {

    const a=rand(2,8);
    const b=rand(2,8);
    const c=rand(2,8);
    const d=rand(2,8);

    return{

        difficulty:"medium",
        type:"direct",

        question:`Simplify ${a}x + ${b} + ${c}x + ${d}.`,

        answer:`${a+c}x + ${b+d}`

    }

},

/*--------------------------------------------------
PATTERN 23
Expand Brackets
---------------------------------------------------*/
() => {

    const a=rand(2,8);
    const b=rand(2,12);
    const c=rand(2,12);

    return{

        difficulty:"medium",
        type:"direct",

        question:`Expand ${a}(x + ${b}) + ${c}.`,

        answer:`${a}x + ${a*b+c}`

    }

},

/*--------------------------------------------------
PATTERN 24
Expand Two Brackets
---------------------------------------------------*/
() => {

    const a=rand(2,5);
    const b=rand(2,8);
    const c=rand(2,5);
    const d=rand(2,8);

    return{

        difficulty:"medium",
        type:"direct",

        question:`Expand ${a}(x+${b}) + ${c}(x+${d}).`,

        answer:`${a+c}x + ${a*b+c*d}`

    }

},

/*--------------------------------------------------
PATTERN 25
Substitute Two Variables
---------------------------------------------------*/
() => {

    const x=rand(2,10);
    const y=rand(2,10);

    return{

        difficulty:"medium",
        type:"direct",

        question:`If x=${x} and y=${y}, find 2x + 3y.`,

        answer:2*x+3*y,

        options:makeMCQ(2*x+3*y)

    }

},

/*--------------------------------------------------
PATTERN 26
Equation with Division
---------------------------------------------------*/
() => {

    const x=rand(2,12);
    const a=rand(2,6);

    return{

        difficulty:"medium",
        type:"direct",

        question:`Solve x ÷ ${a} = ${x/a}.`,

        answer:x,

        options:makeMCQ(x)

    }

},

/*--------------------------------------------------
PATTERN 27
Unknown Coefficient
---------------------------------------------------*/
() => {

    const a=rand(2,9);
    const x=rand(2,10);

    return{

        difficulty:"medium",
        type:"direct",

        question:`Find the missing number: □x = ${a*x}, where x=${x}.`,

        answer:a,

        options:makeMCQ(a)

    }

},

/*--------------------------------------------------
PATTERN 28
Compare Expressions
---------------------------------------------------*/
() => {

    const x=rand(2,10);

    return{

        difficulty:"medium",
        type:"direct",

        question:`If x=${x}, which is greater: 3x+5 or 2x+9?`,

        answer:(3*x+5>2*x+9)?"3x+5":"2x+9",

        options:["3x+5","2x+9","Equal","Cannot say"]

    }

},

/*--------------------------------------------------
PATTERN 29
Evaluate Expression
---------------------------------------------------*/
() => {

    const x=rand(2,10);

    return{

        difficulty:"medium",
        type:"direct",

        question:`If x=${x}, evaluate x² + 2x.`,

        answer:x*x+2*x,

        options:makeMCQ(x*x+2*x)

    }

},

/*--------------------------------------------------
PATTERN 30
Simple Identity
---------------------------------------------------*/
() => {

    const x=rand(2,10);

    return{

        difficulty:"medium",
        type:"direct",

        question:`If x=${x}, evaluate (x+1)(x-1).`,

        answer:(x+1)*(x-1),

        options:makeMCQ((x+1)*(x-1))

    }

},
/*--------------------------------------------------
PATTERN 31
Variables on Both Sides
---------------------------------------------------*/
() => {

    const x = rand(3,12);
    const a = rand(2,6);
    const b = rand(2,6);

    return{

        difficulty:"hard",
        type:"direct",

        question:`Solve ${a}x + ${b} = ${a+1}x.`,

        answer:b,

        options:makeMCQ(b)

    }

},

/*--------------------------------------------------
PATTERN 32
Age Problem
---------------------------------------------------*/
() => {

    const age = rand(8,20);
    const plus = rand(3,8);

    return{

        difficulty:"hard",
        type:"word",

        question:`Rahul is ${plus} years older than Aman. Aman is ${age} years old. How old is Rahul?`,

        answer:age+plus,

        options:makeMCQ(age+plus)

    }

},

/*--------------------------------------------------
PATTERN 33
Consecutive Numbers
---------------------------------------------------*/
() => {

    const x = rand(10,40);

    return{

        difficulty:"hard",
        type:"word",

        question:`The first of two consecutive integers is ${x}. Find the next integer.`,

        answer:x+1,

        options:makeMCQ(x+1)

    }

},

/*--------------------------------------------------
PATTERN 34
Rectangle Perimeter
---------------------------------------------------*/
() => {

    const x = rand(4,12);

    return{

        difficulty:"hard",
        type:"word",

        question:`A rectangle has length ${x+4} cm and width ${x} cm. Find its perimeter.`,

        answer:2*((x+4)+x),

        options:makeMCQ(2*((x+4)+x))

    }

},

/*--------------------------------------------------
PATTERN 35
Rectangle Area
---------------------------------------------------*/
() => {

    const x = rand(3,10);

    return{

        difficulty:"hard",
        type:"word",

        question:`Length = ${x+5} cm and width = ${x} cm. Find the area.`,

        answer:(x+5)*x,

        options:makeMCQ((x+5)*x)

    }

},

/*--------------------------------------------------
PATTERN 36
Difference Puzzle
---------------------------------------------------*/
() => {

    const x = rand(15,40);
    const d = rand(3,10);

    return{

        difficulty:"hard",
        type:"word",

        question:`One number is ${d} more than another. The smaller number is ${x}. Find the larger number.`,

        answer:x+d,

        options:makeMCQ(x+d)

    }

},

/*--------------------------------------------------
PATTERN 37
Multiply Then Add
---------------------------------------------------*/
() => {

    const x = rand(2,8);

    return{

        difficulty:"hard",
        type:"direct",

        question:`Evaluate 5x + 8 when x = ${x}.`,

        answer:5*x+8,

        options:makeMCQ(5*x+8)

    }

},

/*--------------------------------------------------
PATTERN 38
Subtract Expression
---------------------------------------------------*/
() => {

    const x = rand(5,15);

    return{

        difficulty:"hard",
        type:"direct",

        question:`Evaluate 4x − 9 when x = ${x}.`,

        answer:4*x-9,

        options:makeMCQ(4*x-9)

    }

},

/*--------------------------------------------------
PATTERN 39
Half of Expression
---------------------------------------------------*/
() => {

    const x = rand(4,16);

    return{

        difficulty:"hard",
        type:"direct",

        question:`Find (2x + 6) ÷ 2 when x = ${x}.`,

        answer:(2*x+6)/2,

        options:makeMCQ((2*x+6)/2)

    }

},

/*--------------------------------------------------
PATTERN 40
Equation Reasoning
---------------------------------------------------*/
() => {

    const x = rand(5,15);

    return{

        difficulty:"hard",
        type:"direct",

        question:`Solve x + x = ${2*x}.`,

        answer:x,

        options:makeMCQ(x)

    }

},
/*--------------------------------------------------
PATTERN 41
Solve 2-Step Equation
---------------------------------------------------*/
() => {

    const x = rand(3,15);
    const a = rand(2,6);
    const b = rand(5,20);

    return{

        difficulty:"hard",
        type:"direct",

        question:`Solve ${a}x + ${b} = ${a*x+b}.`,

        answer:x,

        options:makeMCQ(x)

    }

},

/*--------------------------------------------------
PATTERN 42
Unknown Number
---------------------------------------------------*/
() => {

    const x=rand(20,60);
    const a=rand(3,10);

    return{

        difficulty:"hard",
        type:"word",

        question:`A number increased by ${a} equals ${x+a}. Find the number.`,

        answer:x,

        options:makeMCQ(x)

    }

},

/*--------------------------------------------------
PATTERN 43
Triple Number
---------------------------------------------------*/
() => {

    const x=rand(5,20);

    return{

        difficulty:"hard",
        type:"word",

        question:`Three times a number is ${3*x}. Find the number.`,

        answer:x,

        options:makeMCQ(x)

    }

},

/*--------------------------------------------------
PATTERN 44
Money Problem
---------------------------------------------------*/
() => {

    const x=rand(15,60);
    const y=rand(5,20);

    return{

        difficulty:"hard",
        type:"word",

        question:`Emma has $${x}. She earns another $${y}. How much money does she have now?`,

        answer:x+y,

        options:makeMCQ(x+y)

    }

},

/*--------------------------------------------------
PATTERN 45
Sharing Money
---------------------------------------------------*/
() => {

    const each=rand(8,25);

    return{

        difficulty:"hard",
        type:"word",

        question:`Four friends receive $${each} each. How much money do they receive altogether?`,

        answer:each*4,

        options:makeMCQ(each*4)

    }

},

/*--------------------------------------------------
PATTERN 46
Consecutive Integers Sum
---------------------------------------------------*/
() => {

    const x=rand(10,40);

    return{

        difficulty:"hard",
        type:"word",

        question:`Two consecutive integers are ${x} and ${x+1}. Find their sum.`,

        answer:x+x+1,

        options:makeMCQ(x+x+1)

    }

},

/*--------------------------------------------------
PATTERN 47
Rectangle Formula
---------------------------------------------------*/
() => {

    const l=rand(10,25);
    const w=rand(5,15);

    return{

        difficulty:"hard",
        type:"word",

        question:`A rectangle has length ${l} cm and width ${w} cm. Find its perimeter.`,

        answer:2*(l+w),

        options:makeMCQ(2*(l+w))

    }

},

/*--------------------------------------------------
PATTERN 48
Square Formula
---------------------------------------------------*/
() => {

    const s=rand(4,18);

    return{

        difficulty:"hard",
        type:"word",

        question:`A square has side ${s} cm. Find its perimeter.`,

        answer:4*s,

        options:makeMCQ(4*s)

    }

},

/*--------------------------------------------------
PATTERN 49
Expression Comparison
---------------------------------------------------*/
() => {

    const x=rand(3,12);

    return{

        difficulty:"hard",
        type:"direct",

        question:`If x=${x}, evaluate 4x−3.`,

        answer:4*x-3,

        options:makeMCQ(4*x-3)

    }

},

/*--------------------------------------------------
PATTERN 50
Equation with Division
---------------------------------------------------*/
() => {

    const x=rand(2,12);
    const a=rand(2,6);

    return{

        difficulty:"hard",
        type:"direct",

        question:`Solve x/${a} = ${x/a}.`,

        answer:x,

        options:makeMCQ(x)

    }

},
/*--------------------------------------------------
PATTERN 51
Variables on Both Sides
---------------------------------------------------*/
() => {

    const x = rand(3,12);
    const a = rand(2,6);
    const b = rand(2,8);

    return{
        difficulty:"hard",
        type:"direct",
        question:`Solve ${a}x + ${b} = ${a+1}x + ${b-x}.`,
        answer:x,
        options:makeMCQ(x)
    }

},

/*--------------------------------------------------
PATTERN 52
Fraction Equation
---------------------------------------------------*/
() => {

    const x = rand(2,12);

    return{

        difficulty:"hard",
        type:"direct",

        question:`Solve x/2 = ${x/2}.`,

        answer:x,

        options:makeMCQ(x)

    }

},

/*--------------------------------------------------
PATTERN 53
Decimal Equation
---------------------------------------------------*/
() => {

    const x=rand(2,20);

    return{

        difficulty:"hard",

        type:"direct",

        question:`Solve 0.5x = ${0.5*x}.`,

        answer:x,

        options:makeMCQ(x)

    }

},

/*--------------------------------------------------
PATTERN 54
Consecutive Integers
---------------------------------------------------*/
() => {

    const x=rand(5,20);

    return{

        difficulty:"hard",

        type:"word",

        question:`The sum of two consecutive integers is ${2*x+1}. Find the smaller integer.`,

        answer:x,

        options:makeMCQ(x)

    }

},

/*--------------------------------------------------
PATTERN 55
Age Puzzle
---------------------------------------------------*/
() => {

    const age=rand(8,18);

    return{

        difficulty:"hard",

        type:"word",

        question:`Five years from now, Riya will be ${age+5} years old. How old is she now?`,

        answer:age,

        options:makeMCQ(age)

    }

},

/*--------------------------------------------------
PATTERN 56
Perimeter Equation
---------------------------------------------------*/
() => {

    const w=rand(5,12);

    return{

        difficulty:"hard",

        type:"word",

        question:`The width of a rectangle is ${w} cm. The length is 4 cm more than the width. Find the perimeter.`,

        answer:2*(w+(w+4)),

        options:makeMCQ(2*(w+(w+4)))

    }

},

/*--------------------------------------------------
PATTERN 57
Area Equation
---------------------------------------------------*/
() => {

    const w=rand(4,10);

    return{

        difficulty:"hard",

        type:"word",

        question:`The width of a rectangle is ${w} cm. The length is twice the width. Find the area.`,

        answer:w*(2*w),

        options:makeMCQ(w*(2*w))

    }

},

/*--------------------------------------------------
PATTERN 58
Pattern Recognition
---------------------------------------------------*/
() => {

    const a=rand(2,6);

    return{

        difficulty:"hard",

        type:"direct",

        question:`Complete the pattern: ${a}, ${2*a}, ${3*a}, ${4*a}, ?`,

        answer:5*a,

        options:makeMCQ(5*a)

    }

},

/*--------------------------------------------------
PATTERN 59
Find Missing Coefficient
---------------------------------------------------*/
() => {

    const a=rand(2,8);
    const x=rand(3,12);

    return{

        difficulty:"hard",

        type:"direct",

        question:`Find the missing coefficient: □x = ${a*x}, where x=${x}.`,

        answer:a,

        options:makeMCQ(a)

    }

},

/*--------------------------------------------------
PATTERN 60
Expand Brackets
---------------------------------------------------*/
() => {

    const a=rand(2,6);
    const b=rand(2,8);

    return{

        difficulty:"hard",

        type:"direct",

        question:`Expand ${a}(x+${b}).`,

        answer:`${a}x + ${a*b}`

    }

},

/*--------------------------------------------------
PATTERN 61
Shopping Algebra
---------------------------------------------------*/
() => {

    const cost=rand(8,25);

    return{

        difficulty:"hard",

        type:"word",

        question:`Each notebook costs $${cost}. What is the total cost of x notebooks?`,

        answer:`${cost}x`

    }

},

/*--------------------------------------------------
PATTERN 62
Taxi Fare
---------------------------------------------------*/
() => {

    const base=rand(3,8);
    const km=rand(2,5);

    return{

        difficulty:"hard",

        type:"word",

        question:`A taxi charges $${base} plus $${km} per kilometre. Write an expression for travelling x kilometres.`,

        answer:`${km}x + ${base}`

    }

},

/*--------------------------------------------------
PATTERN 63
Saving Money
---------------------------------------------------*/
() => {

    const save=rand(5,20);

    return{

        difficulty:"hard",

        type:"word",

        question:`Emma saves $${save} every week. Write an expression for her savings after w weeks.`,

        answer:`${save}w`

    }

},

/*--------------------------------------------------
PATTERN 64
Guess My Number
---------------------------------------------------*/
() => {

    const x=rand(10,30);

    return{

        difficulty:"hard",

        type:"word",

        question:`I multiply my number by 4 and get ${4*x}. What is my number?`,

        answer:x,

        options:makeMCQ(x)

    }

},

/*--------------------------------------------------
PATTERN 65
Number Puzzle
---------------------------------------------------*/
() => {

    const x=rand(8,20);

    return{

        difficulty:"hard",

        type:"word",

        question:`Twice a number plus 6 equals ${2*x+6}. Find the number.`,

        answer:x,

        options:makeMCQ(x)

    }

},

/*--------------------------------------------------
PATTERN 66
Table Pattern
---------------------------------------------------*/
() => {

    const a=rand(2,5);

    return{

        difficulty:"hard",

        type:"direct",

        question:`Find the next value: ${a}, ${a+3}, ${a+6}, ${a+9}, ?`,

        answer:a+12,

        options:makeMCQ(a+12)

    }

},

/*--------------------------------------------------
PATTERN 67
Bar Model Style
---------------------------------------------------*/
() => {

    const part=rand(8,20);

    return{

        difficulty:"hard",

        type:"word",

        question:`Three equal parts together make ${part*3}. Find one part.`,

        answer:part,

        options:makeMCQ(part)

    }

},

/*--------------------------------------------------
PATTERN 68
Logical Algebra
---------------------------------------------------*/
() => {

    const x=rand(5,15);

    return{

        difficulty:"hard",

        type:"word",

        question:`A number plus itself equals ${2*x}. Find the number.`,

        answer:x,

        options:makeMCQ(x)

    }

},

/*--------------------------------------------------
PATTERN 69
Competition Style
---------------------------------------------------*/
() => {

    const x=rand(5,15);

    return{

        difficulty:"hard",

        type:"word",

        question:`The sum of a number and the next number is ${2*x+1}. Find the smaller number.`,

        answer:x,

        options:makeMCQ(x)

    }

},

/*--------------------------------------------------
PATTERN 70
Challenge Problem
---------------------------------------------------*/
() => {

    const x = rand(3,12);

    return{

        difficulty:"hard",

        type:"word",

        question:`A number is multiplied by 3 and then 7 is added. The result is ${3*x+7}. Find the number.`,

        answer:x,

        options:makeMCQ(x)

    };

}

];

// ==========================================
// RANDOM ALGEBRA QUESTION
// ==========================================

function generateAlgebraQuestion(difficulty = null) {

    let pool = algebraPatterns;

    if (difficulty) {

        pool = algebraPatterns.filter(
            pattern => pattern().difficulty === difficulty
        );

        if (pool.length === 0) {
            pool = algebraPatterns;
        }
    }

    const question = pool[rand(0, pool.length - 1)];

    return question();

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
