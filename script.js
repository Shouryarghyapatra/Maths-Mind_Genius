"use strict";

/*=========================================================
                    MATHMIND AI V3
=========================================================*/

const CONFIG = {

    TOTAL_QUESTIONS:20,

    TIMER:30,

    XP_PER_CORRECT:10,

    COINS_PER_CORRECT:2,

    STORAGE_KEY:"mathmind-ai"

};

const App={

    state:{

        studentName:"",

        topic:"",

        difficulty:"easy",

        format:"mcq",

        timerEnabled:false,

        currentQuestion:null,

        questionNumber:0,

        score:0,

        correct:0,

        wrong:0,

        streak:0,

        bestStreak:0,

        xp:0,

        coins:0,

        level:1,

        timer:30,

        timerId:null,

        answered:false,

        askedQuestions:[]

    },

    dom:{},

    generators:{}

};

/*=========================================================
                    DOM CACHE
=========================================================*/

function cacheDOM(){

    App.dom={

        welcomeScreen:
        document.getElementById("welcome-screen"),

        quizScreen:
        document.getElementById("quiz-screen"),

        resultScreen:
        document.getElementById("result-screen"),

        studentName:
        document.getElementById("student-name"),

        topic:
        document.getElementById("topic"),

        difficulty:
        document.getElementById("difficulty"),

        questionFormat:
        document.getElementById("question-format"),

        timerChoice:
        document.getElementById("timer-choice"),

        welcomeMessage:
        document.getElementById("welcome-message"),

        currentTopic:
        document.getElementById("current-topic"),

        questionType:
        document.getElementById("question-type"),

        question:
        document.getElementById("question"),

        answer:
        document.getElementById("answer"),

        mcqArea:
        document.getElementById("mcq-answer-area"),

        descriptiveArea:
        document.getElementById("descriptive-answer-area"),

        mcqOptions:
        document.getElementById("mcq-options"),

        questionNumber:
        document.getElementById("question-number"),

        questionCircle:
        document.getElementById("question-circle"),

        progressFill:
        document.getElementById("progress-fill"),

        progressPercent:
        document.getElementById("progress-percent"),

        timerBox:
        document.getElementById("timer-box"),

        timer:
        document.getElementById("timer"),

        score:
        document.getElementById("score"),

        streak:
        document.getElementById("streak"),

        bestStreak:
        document.getElementById("best-streak"),

        accuracy:
        document.getElementById("accuracy"),

        xp:
        document.getElementById("xp"),

        level:
        document.getElementById("level"),

        earnedXP:
        document.getElementById("earned-xp"),

        correctCount:
        document.getElementById("correct-count"),

        wrongCount:
        document.getElementById("wrong-count"),

        feedback:
        document.getElementById("feedback"),

        feedbackText:
        document.getElementById("feedback-text"),

        feedbackIcon:
        document.getElementById("feedback-icon"),

        explanation:
        document.getElementById("explanation"),

        explanationText:
        document.getElementById("explanation-text"),

        hintBox:
        document.getElementById("hint-box"),

        nextButton:
        document.getElementById("next-question-btn")

    };

}

/*=========================================================
                    GENERATORS
=========================================================*/

function registerGenerators(){

    App.generators={

        addition:window.generateAdditionQuestion,

        subtraction:window.generateSubtractionQuestion,

        multiplication:window.generateMultiplicationQuestion,

        division:window.generateDivisionQuestion,

        fractions:window.generateFractionQuestion,

        decimals:window.generateDecimalsQuestion,

        percentages:window.generatePercentageQuestion,

        ratio:window.generateRatioQuestion,

        factors:window.generateFactorsMultiplesQuestion,

        algebra:window.generateAlgebraQuestion

    };

}

/*=========================================================
                    UTILITIES
=========================================================*/

const Utils={

    show(element){

        if(element)
            element.classList.remove("hidden");

    },

    hide(element){

        if(element)
            element.classList.add("hidden");

    },

    random(min,max){

        return Math.floor(
            Math.random()*(max-min+1)
        )+min;

    },

    shuffle(array){

        const arr=[...array];

        for(let i=arr.length-1;i>0;i--){

            const j=Math.floor(Math.random()*(i+1));

            [arr[i],arr[j]]=[arr[j],arr[i]];

        }

        return arr;

    },

    capitalize(text){

        return text.charAt(0).toUpperCase()+text.slice(1);

    }

};

/*=========================================================
                    MCQ OPTIONS
=========================================================*/

function buildMCQOptions(answer){

    const answerText=String(answer).trim();

    if(answerText.includes(":")){

        return Utils.shuffle([
            answerText,
            "1:1",
            "2:1",
            "1:2"
        ].filter((value,index,values)=>
            values.indexOf(value)===index
        ));
    }

    let numericAnswer;

    if(answerText.includes("/")){

        const parts=answerText.split("/").map(Number);

        if(parts.length===2 &&
            Number.isFinite(parts[0]) &&
            Number.isFinite(parts[1]) &&
            parts[1]!==0){

            numericAnswer=parts[0]/parts[1];
        }
    }

    else{
        numericAnswer=Number(answerText);
    }

    if(!Number.isFinite(numericAnswer)){

        return Utils.shuffle([
            answerText,
            "Cannot be determined",
            "None of these",
            "Not enough information"
        ]);
    }

    const decimalPlaces=
    answerText.includes(".")
    ? answerText.split(".")[1].length
    : 0;

    const step=decimalPlaces>0
    ? Math.pow(10,-decimalPlaces)
    : Math.max(1,Math.ceil(Math.abs(numericAnswer)*0.15));

    const options=new Set([answerText]);

    let distance=1;

    while(options.size<4){

        [-1,1].forEach(sign=>{

            const candidate=
            numericAnswer+(sign*step*distance);

            if(candidate>=0 && options.size<4){

                options.add(
                    decimalPlaces>0
                    ? Number(candidate.toFixed(decimalPlaces)).toString()
                    : String(Math.round(candidate))
                );
            }
        });

        distance++;
    }

    return Utils.shuffle([...options]);
}

/*=========================================================
                    STORAGE
=========================================================*/

const Storage={

    save(){

        localStorage.setItem(

            CONFIG.STORAGE_KEY,

            JSON.stringify({

                xp:App.state.xp,

                bestStreak:App.state.bestStreak,

                coins:App.state.coins

            })

        );

    },

    load(){

        const data=JSON.parse(

            localStorage.getItem(CONFIG.STORAGE_KEY)

        );

        if(!data) return;

        App.state.xp=data.xp||0;

        App.state.bestStreak=data.bestStreak||0;

        App.state.coins=data.coins||0;

        App.state.level=Math.floor(App.state.xp/100)+1;

    }

};

/*=========================================================
                    RESET
=========================================================*/

function resetQuiz(){

    App.state.questionNumber=0;

    App.state.score=0;

    App.state.correct=0;

    App.state.wrong=0;

    App.state.streak=0;

    App.state.currentQuestion=null;

    App.state.timer=CONFIG.TIMER;

    App.state.answered=false;

    App.state.askedQuestions=[];

}

/*=========================================================
                    INITIALIZE
=========================================================*/

window.addEventListener("DOMContentLoaded",()=>{

    cacheDOM();

    registerGenerators();

    Storage.load();

    updateDashboard();

    console.log("MathMind AI Loaded");

});
/*=========================================================
                    START QUIZ
=========================================================*/

function startQuiz(){

    const name=App.dom.studentName.value.trim();

    const topic=App.dom.topic.value;

    const difficulty=App.dom.difficulty.value;

    const format=App.dom.questionFormat.value;

    const timer=App.dom.timerChoice.value;

    if(name===""){

        alert("Please enter your name.");

        return;

    }

    if(topic===""){

        alert("Please select a topic.");

        return;

    }

    resetQuiz();

    App.state.studentName=name;

    App.state.topic=topic;

    App.state.difficulty=difficulty;

    App.state.format=format;

    App.state.timerEnabled=(timer==="yes");

    App.dom.welcomeMessage.innerHTML=
    `Welcome, <strong>${name}</strong> ð`;

    App.dom.currentTopic.innerHTML=
    Utils.capitalize(topic);

    App.dom.questionType.innerHTML=
    format==="mcq"
    ? "ð Multiple Choice"
    : "âï¸ Descriptive";

    Utils.hide(App.dom.welcomeScreen);

    Utils.hide(App.dom.resultScreen);

    Utils.show(App.dom.quizScreen);

    if(App.state.timerEnabled){

        Utils.show(App.dom.timerBox);

    }else{

        Utils.hide(App.dom.timerBox);

    }

    loadQuestion();

}

/*=========================================================
                    GENERATE QUESTION
=========================================================*/

function generateQuestion(){

    let generator;

    if(
        App.state.topic==="mixed" ||
        App.state.topic==="challenge"
    ){

        const topics=Object.keys(App.generators).filter(
            topic=>typeof App.generators[topic]==="function"
        );

        const randomTopic=
        topics[Utils.random(0,topics.length-1)];

        generator=App.generators[randomTopic];

        App.dom.currentTopic.innerHTML=
        Utils.capitalize(randomTopic);

    }

    else{

        generator=
        App.generators[App.state.topic];

    }

    if(typeof generator!=="function"){

        console.error("Generator Missing");

        return null;

    }

    let question;

    let attempts=0;

    do{

        question=
        generator(App.state.difficulty);

        attempts++;

        if(attempts>100){

            break;

        }

    }

    while(

        App.state.askedQuestions.includes(

            JSON.stringify(question)

        )

    );

    App.state.askedQuestions.push(

        JSON.stringify(question)

    );

    question.mode=App.state.format;

    return question;

}

/*=========================================================
                    LOAD QUESTION
=========================================================*/

function loadQuestion(){

    clearTimer();

    App.state.questionNumber++;

    if(

        App.state.questionNumber>

        CONFIG.TOTAL_QUESTIONS

    ){

        finishQuiz();

        return;

    }

    App.state.currentQuestion=

    generateQuestion();

    App.state.answered=false;

    renderQuestion();

    updateDashboard();

    updateProgress();

    if(App.state.timerEnabled){

        startTimer();

    }

}

/*=========================================================
                    RENDER QUESTION
=========================================================*/

function renderQuestion(){

    const q=App.state.currentQuestion;

    App.dom.question.innerHTML=q.question;

    App.dom.questionCircle.innerHTML=

    App.state.questionNumber;

    App.dom.answer.value="";

    Utils.hide(App.dom.feedback);

    Utils.hide(App.dom.explanation);

    Utils.hide(App.dom.nextButton);

    Utils.hide(App.dom.hintBox);

    if(q.mode==="mcq"){

        renderMCQ(q);

    }

    else{

        renderDescriptive();

    }

}

/*=========================================================
                    MCQ
=========================================================*/

function renderMCQ(q){

    Utils.show(App.dom.mcqArea);

    Utils.hide(App.dom.descriptiveArea);

    App.dom.mcqOptions.innerHTML="";

    const options=

    Utils.shuffle(
        Array.isArray(q.options) && q.options.length>0
        ? q.options
        : buildMCQOptions(q.answer)
    );

    options.forEach(option=>{

        const div=

        document.createElement("div");

        div.className="mcq-option";

        div.innerHTML=`

<label>

<input

type="radio"

name="mcq"

value="${option}">

<span>${option}</span>

</label>

        `;

        App.dom.mcqOptions.appendChild(div);

        const radio=div.querySelector(
            'input[type="radio"]'
        );

        radio.addEventListener(
            "change",
            checkAnswer
        );

    });

}

/*=========================================================
                    DESCRIPTIVE
=========================================================*/

function renderDescriptive(){

    Utils.hide(App.dom.mcqArea);

    Utils.show(App.dom.descriptiveArea);

    App.dom.answer.focus();

}

/*=========================================================
                    TIMER
=========================================================*/

function startTimer(){

    App.state.timer=CONFIG.TIMER;

    App.dom.timer.innerHTML=

    App.state.timer;

    App.state.timerId=

    setInterval(()=>{

        App.state.timer--;

        App.dom.timer.innerHTML=

        App.state.timer;

        if(App.state.timer<=0){

            clearTimer();

            wrongAnswer();

        }

    },1000);

}

function clearTimer(){

    clearInterval(

        App.state.timerId

    );

}

/*=========================================================
                    PROGRESS
=========================================================*/

function updateProgress(){

    const percent=

    Math.round(

        (App.state.questionNumber/

        CONFIG.TOTAL_QUESTIONS)

        *100

    );

    App.dom.progressFill.style.width=

    percent+"%";

    App.dom.progressPercent.innerHTML=

    percent+"%";

    App.dom.questionNumber.innerHTML=

    App.state.questionNumber;

}

/*=========================================================
                    DASHBOARD
=========================================================*/

function updateDashboard(){

    App.state.level=

    Math.floor(App.state.xp/100)+1;

    App.dom.score.innerHTML=

    App.state.score;

    App.dom.streak.innerHTML=

    App.state.streak;

    App.dom.bestStreak.innerHTML=

    App.state.bestStreak;

    App.dom.correctCount.innerHTML=

    App.state.correct;

    App.dom.wrongCount.innerHTML=

    App.state.wrong;

    App.dom.xp.innerHTML=

    App.state.xp;

    App.dom.level.innerHTML=

    App.state.level;

    const total=

    App.state.correct+

    App.state.wrong;

    let accuracy=100;

    if(total>0){

        accuracy=Math.round(

            (App.state.correct/

            total)*100

        );

    }

    App.dom.accuracy.innerHTML=

    accuracy+"%";

}
/*=========================================================
                    GET USER ANSWER
=========================================================*/

function getUserAnswer(){

    if(App.state.format==="mcq"){

        const selected=document.querySelector(
            'input[name="mcq"]:checked'
        );

        if(!selected) return null;

        return selected.value;

    }

    return App.dom.answer.value.trim();

}

/*=========================================================
                    CHECK ANSWER
=========================================================*/

function checkAnswer(){

    if(App.state.answered) return;

    const userAnswer=getUserAnswer();

    if(userAnswer===null || userAnswer===""){

        alert("Please answer the question.");

        return;

    }

    App.state.answered=true;

    clearTimer();

    const correctAnswer=String(App.state.currentQuestion.answer)
        .trim()
        .toLowerCase();

    const answer=String(userAnswer)
        .trim()
        .toLowerCase();

    if(answer===correctAnswer){

        correctAnswerFunction();

    }else{

        wrongAnswer();

    }

}

/*=========================================================
                    CORRECT ANSWER
=========================================================*/

function correctAnswerFunction(){

    App.state.score++;

    App.state.correct++;

    App.state.streak++;

    if(App.state.streak>App.state.bestStreak){

        App.state.bestStreak=App.state.streak;

    }

    App.state.xp+=CONFIG.XP_PER_CORRECT;

    App.state.coins+=CONFIG.COINS_PER_CORRECT;

    App.dom.feedbackIcon.innerHTML="â";

    App.dom.feedbackText.innerHTML="Correct! Great Job!";

    Utils.show(App.dom.feedback);

    if(App.state.currentQuestion.explanation){

        App.dom.explanationText.innerHTML=
        App.state.currentQuestion.explanation;

        Utils.show(App.dom.explanation);

    }

    App.dom.earnedXP.innerHTML=App.state.xp;

    updateDashboard();

    Storage.save();

    Utils.show(App.dom.nextButton);

}

/*=========================================================
                    WRONG ANSWER
=========================================================*/

function wrongAnswer(){

    App.state.wrong++;

    App.state.streak=0;

    App.dom.feedbackIcon.innerHTML="â";

    App.dom.feedbackText.innerHTML=
    "Wrong Answer";

    Utils.show(App.dom.feedback);

    App.dom.explanationText.innerHTML=`

        <strong>Correct Answer:</strong>

        ${App.state.currentQuestion.answer}

        <br><br>

        ${App.state.currentQuestion.explanation || ""}

    `;

    Utils.show(App.dom.explanation);

    updateDashboard();

    Storage.save();

    Utils.show(App.dom.nextButton);

}

/*=========================================================
                    NEXT QUESTION
=========================================================*/

function nextQuestion(){

    loadQuestion();

}

/*=========================================================
                    SHOW HINT
=========================================================*/

function showHint(){

    if(!App.state.currentQuestion) return;

    Utils.show(App.dom.hintBox);

    if(App.state.currentQuestion.hint){

        App.dom.hintBox.innerHTML=`

            <div class="hint-header">

            ð¡ Hint

            </div>

            <p>

            ${App.state.currentQuestion.hint}

            </p>

        `;

    }

}

/*=========================================================
                    SKIP QUESTION
=========================================================*/

function skipQuestion(){

    clearTimer();

    App.state.wrong++;

    App.state.streak=0;

    updateDashboard();

    loadQuestion();

}

/*=========================================================
                    END QUIZ
=========================================================*/

function endQuiz(){

    if(confirm("Are you sure you want to end the quiz?")){

        finishQuiz();

    }

}

/*=========================================================
                    HOME
=========================================================*/

function goBackHome(){

    clearTimer();

    Utils.hide(App.dom.quizScreen);

    Utils.hide(App.dom.resultScreen);

    Utils.show(App.dom.welcomeScreen);

    resetQuiz();

}

/*=========================================================
                    RESULT SCREEN
=========================================================*/

function finishQuiz(){

    clearTimer();

    Utils.hide(App.dom.quizScreen);

    Utils.show(App.dom.resultScreen);

    const accuracy=Math.round(

        (App.state.correct/

        CONFIG.TOTAL_QUESTIONS)*100

    );

    document.getElementById("final-score").innerHTML=
    App.state.correct;

    document.getElementById("final-total").innerHTML=
    CONFIG.TOTAL_QUESTIONS;

    document.getElementById("final-percentage").innerHTML=
    accuracy+"%";

    document.getElementById("result-score").innerHTML=
    App.state.correct;

    document.getElementById("result-wrong").innerHTML=
    App.state.wrong;

    document.getElementById("result-streak").innerHTML=
    App.state.bestStreak;

    document.getElementById("result-xp").innerHTML=
    App.state.xp;

    document.getElementById("result-level").innerHTML=
    App.state.level;

    document.getElementById("result-accuracy").innerHTML=
    accuracy+"%";

    let feedback="Good Job!";

    if(accuracy>=95){

        feedback="Outstanding Performance!";

    }else if(accuracy>=80){

        feedback="Excellent Work!";

    }else if(accuracy>=60){

        feedback="Nice Effort!";

    }else{

        feedback="Keep Practicing!";

    }

    document.getElementById("personal-feedback-text").innerHTML=
    feedback;

}

/*=========================================================
                    PLAY AGAIN
=========================================================*/

function restartQuiz(){

    resetQuiz();

    Utils.hide(App.dom.resultScreen);

    Utils.show(App.dom.quizScreen);

    loadQuestion();

}
/*=========================================================
                    ACHIEVEMENTS
=========================================================*/

function updateBadge() {

    let badge = "None";

    if (App.state.xp >= 1000)
        badge = "ð Diamond";

    else if (App.state.xp >= 700)
        badge = "ð¥ Gold";

    else if (App.state.xp >= 400)
        badge = "ð¥ Silver";

    else if (App.state.xp >= 150)
        badge = "ð¥ Bronze";

    const badgeElement =
        document.getElementById("current-badge");

    if (badgeElement)
        badgeElement.innerHTML = badge;

}

/*=========================================================
                    MOTIVATION
=========================================================*/

const motivationMessages = [

"ð Believe in yourself!",

"ð¥ Every question makes you stronger!",

"ð Small progress every day!",

"ð Keep solving. Keep growing!",

"ð¡ Mistakes are opportunities to learn.",

"â­ Practice beats talent."

];

function updateMotivation(){

    const text=

    document.getElementById("motivation-text");

    if(!text) return;

    const random=

    Utils.random(0,motivationMessages.length-1);

    text.innerHTML=

    motivationMessages[random];

}

/*=========================================================
                    CHALLENGE MODE
=========================================================*/

function updateChallengeLevel(){

    if(App.state.topic!=="challenge")
        return;

    const banner=

    document.getElementById("challenge-level");

    const levelText=

    document.getElementById("challenge-level-text");

    Utils.show(banner);

    let level="Easy";

    if(App.state.questionNumber>15){

        level="Expert";

        App.state.difficulty="hard";

    }

    else if(App.state.questionNumber>10){

        level="Hard";

        App.state.difficulty="hard";

    }

    else if(App.state.questionNumber>5){

        level="Medium";

        App.state.difficulty="medium";

    }

    else{

        level="Easy";

        App.state.difficulty="easy";

    }

    levelText.innerHTML=level;

}

/*=========================================================
                    KEYBOARD SHORTCUTS
=========================================================*/

document.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        if(App.state.answered){

            nextQuestion();

        }else{

            checkAnswer();

        }

    }

});

/*=========================================================
                    SCREEN HELPERS
=========================================================*/

function showScreen(screen){

    Utils.hide(App.dom.welcomeScreen);

    Utils.hide(App.dom.quizScreen);

    Utils.hide(App.dom.resultScreen);

    Utils.show(screen);

}

/*=========================================================
                    AUTO SAVE
=========================================================*/

function autoSave(){

    Storage.save();

}

setInterval(autoSave,30000);

/*=========================================================
                    AFTER EVERY QUESTION
=========================================================*/

function afterQuestionUpdate(){

    updateDashboard();

    updateBadge();

    updateMotivation();

    updateChallengeLevel();

    Storage.save();

}

/*=========================================================
                    OVERRIDE ANSWER FUNCTIONS
=========================================================*/

const oldCorrectAnswerFunction=correctAnswerFunction;

correctAnswerFunction=function(){

    oldCorrectAnswerFunction();

    afterQuestionUpdate();

};

const oldWrongAnswer=wrongAnswer;

wrongAnswer=function(){

    oldWrongAnswer();

    afterQuestionUpdate();

};

/*=========================================================
                    FINAL INITIALIZATION
=========================================================*/

window.addEventListener("DOMContentLoaded",()=>{

    cacheDOM();

    registerGenerators();

    Storage.load();

    updateDashboard();

    updateBadge();

    updateMotivation();

    console.log("â MathMind AI V3 Ready");

});

/*=========================================================
                    EXPOSE FUNCTIONS
=========================================================*/

window.startQuiz=startQuiz;
window.checkAnswer=checkAnswer;
window.nextQuestion=nextQuestion;
window.restartQuiz=restartQuiz;
window.goBackHome=goBackHome;
window.showHint=showHint;
window.skipQuestion=skipQuestion;
window.endQuiz=endQuiz;
