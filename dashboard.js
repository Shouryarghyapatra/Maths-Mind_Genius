const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const topics = {
  addition: {
    label: "Addition",
    generator: () => window.generateAdditionQuestion
  },

  subtraction: {
    label: "Subtraction",
    generator: () => window.generateSubtractionQuestion
  },

  multiplication: {
    label: "Multiplication",
    generator: () => window.generateMultiplicationQuestion
  },

  division: {
    label: "Division",
    generator: () => window.generateDivisionQuestion
  },

  fractions: {
    label: "Fractions",
    generator: () => window.generateFractionQuestion
  },

  decimals: {
    label: "Decimals",
    generator: () => window.generateDecimalsQuestion
  },

  percentages: {
    label: "Percentages",
    generator: () => window.generatePercentageQuestion
  },

  ratio: {
    label: "Ratio & Proportion",
    generator: () => window.generateRatioQuestion
  },

  factors: {
    label: "Factors & Multiples",
    generator: () => window.generateFactorsMultiplesQuestion
  },

  algebra: {
    label: "Algebra",
    generator: () => window.generateAlgebraQuestion
  }
};

const state = {
  selectedTopic: "addition",
  topic: "addition",
  difficulty: "medium",
  category: "mixed",
  total: 10,
  timerSeconds: 0,
  questions: [],
  index: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  answered: false,
  usedPatterns: {},
  timerId: null,
  secondsLeft: 0,
  student: ""
};

const tips = [
  "Read carefully, then take one step at a time.",
  "Use scratch paper if a problem has several steps.",
  "Check whether your answer makes sense before submitting.",
  "A tricky question is just a chance to think more slowly."
];

function titleCase(value) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function randomize(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function setScreen(screenId) {
  $$(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  $(`#${screenId}`).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function toast(message) {
  const box = $("#toast");

  box.textContent = message;
  box.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    box.classList.remove("show");
  }, 3600);
}

function updateSelectionText() {
  const difficulty = $("#difficulty").value;
  const count = $("#questionCount").value;

  const topic =
    state.selectedTopic === "mixed"
      ? "Mixed challenge"
      : topics[state.selectedTopic].label;

  $("#selectionText").textContent =
    `${topic} · ${titleCase(difficulty)} · ${count} questions`;
}

function chooseTopic(topic) {
  state.selectedTopic = topic;

  $$(".topic-card").forEach((card) => {
    card.classList.toggle("selected", card.dataset.topic === topic);
  });

  updateSelectionText();
}

function categoryForQuestion() {
  if (state.category !== "mixed") {
    return state.category;
  }

  return Math.random() < 0.5 ? "direct" : "word";
}

function topicForQuestion() {
  if (state.topic !== "mixed") {
    return state.topic;
  }

  return randomize(Object.keys(topics))[0];
}

function generateQuestion() {
  const topicId = topicForQuestion();
  const category = categoryForQuestion();
  const engine = topics[topicId].generator();

  if (typeof engine !== "function") {
    throw new Error(
      `${topics[topicId].label} is not available. Check that its question-bank file has the correct filename.`
    );
  }

  const key = `${topicId}-${category}`;
  const used = state.usedPatterns[key] || [];

  const raw =
    topicId === "algebra"
      ? engine(state.difficulty)
      : engine(state.difficulty, category, used);

  if (!raw || raw.question === undefined || raw.answer === undefined) {
    throw new Error(
      `The ${topics[topicId].label} question engine did not return a usable question.`
    );
  }

  if (Number.isInteger(raw.patternIndex)) {
    state.usedPatterns[key] = [...used, raw.patternIndex];
  }

  return {
    ...raw,
    topic: topicId,
    category: raw.type || category,
    answer: String(raw.answer)
  };
}

function normalise(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[\s,]/g, "")
    .replace(/−/g, "-");
}

function answerMatches(given, expected) {
  const typed = normalise(given);
  const correct = normalise(expected);

  if (typed === correct) {
    return true;
  }

  const typedNumber = Number(typed);
  const correctNumber = Number(correct);

  return (
    Number.isFinite(typedNumber) &&
    Number.isFinite(correctNumber) &&
    Math.abs(typedNumber - correctNumber) < 0.00001
  );
}

function generatedOptions(question) {
  if (Array.isArray(question.options) && question.options.length >= 2) {
    return randomize([...new Set(question.options.map(String))]);
  }

  const answer = Number(question.answer);

  if (!Number.isFinite(answer)) {
    return null;
  }

  const decimals = String(question.answer).includes(".") ? 2 : 0;

  const step = decimals
    ? 0.1
    : Math.max(1, Math.round(Math.abs(answer) * 0.18));

  const options = new Set([String(question.answer)]);
  const offsets = [-2, -1, 1, 2, 3, -3];

  offsets.forEach((offset) => {
    const value = answer + step * offset;

    options.add(
      decimals
        ? String(Number(value.toFixed(2)))
        : String(Math.round(value))
    );
  });

  return randomize([...options].slice(0, 4));
}

function updateSessionStats() {
  const attempted = state.index + (state.answered ? 1 : 0);

  const accuracy = attempted
    ? Math.round((state.score / attempted) * 100)
    : 0;

  $("#scoreStat").textContent = state.score;
  $("#streakStat").textContent = state.streak;
  $("#accuracyStat").textContent = attempted ? `${accuracy}%` : "—";
}

function stopTimer() {
  clearInterval(state.timerId);
  state.timerId = null;
}

function formatTime(seconds) {
  return `00:${String(Math.max(0, seconds)).padStart(2, "0")}`;
}

function startTimer() {
  stopTimer();

  const timerBox = $("#timerBox");

  if (!state.timerSeconds) {
    timerBox.classList.add("hidden");
    return;
  }

  state.secondsLeft = state.timerSeconds;

  $("#timer").textContent = formatTime(state.secondsLeft);

  timerBox.classList.remove("hidden");

  state.timerId = setInterval(() => {
    state.secondsLeft -= 1;

    $("#timer").textContent = formatTime(state.secondsLeft);

    if (state.secondsLeft <= 0) {
      stopTimer();

      if (!state.answered) {
        submitAnswer("");
      }
    }
  }, 1000);
}

function showFeedback(isCorrect, question, forcedMessage = "") {
  const feedback = $("#feedback");

  feedback.className = `feedback ${isCorrect ? "good" : "bad"}`;

  $("#feedbackIcon").textContent = isCorrect ? "✓" : "!";
  $("#feedbackTitle").textContent = isCorrect
    ? "That’s correct!"
    : "Not quite this time.";

  const explanation =
    question.explanation ||
    `The correct answer is ${question.answer}.`;

  $("#feedbackText").textContent = forcedMessage || explanation;

  $("#nextButton").classList.remove("hidden");
}

function lockResponses() {
  $("#answerInput").disabled = true;
  $("#submitButton").disabled = true;
  $("#skipButton").disabled = true;
  $("#hintButton").disabled = true;

  $$(".option").forEach((button) => {
    button.disabled = true;
  });
}

function submitAnswer(value) {
  if (state.answered) {
    return;
  }

  const question = state.questions[state.index];
  const isCorrect = answerMatches(value, question.answer);

  state.answered = true;

  stopTimer();
  lockResponses();

  if (isCorrect) {
    state.score += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
  } else {
    state.streak = 0;
  }

  $$(".option").forEach((button) => {
    if (answerMatches(button.dataset.answer, question.answer)) {
      button.classList.add("correct");
    }

    if (button.dataset.answer === String(value) && !isCorrect) {
      button.classList.add("wrong");
    }
  });

  updateSessionStats();

  const timeMessage =
    state.timerSeconds > 0 && state.secondsLeft <= 0
      ? `Time is up. ${
          question.explanation ||
          `The correct answer is ${question.answer}.`
        }`
      : "";

  showFeedback(isCorrect, question, timeMessage);
}

function renderQuestion() {
  state.answered = false;

  const question = state.questions[state.index];
  const number = state.index + 1;
  const progress = Math.round((number / state.total) * 100);

  const options = generatedOptions(question);

  $("#questionNumber").textContent = `Question ${number}`;
  $("#questionCountText").textContent = `of ${state.total}`;
  $("#progressPercent").textContent = `${progress}%`;
  $("#progressFill").style.width = `${progress}%`;

  $("#questionText").textContent = question.question;

  $("#questionTopicBadge").textContent =
    topics[question.topic].label;

  $("#questionCategoryBadge").textContent =
    question.category === "word"
      ? "Word problem"
      : "Direct question";

  $("#feedback").className = "feedback hidden";

  $("#nextButton").classList.add("hidden");

  $("#answerInput").value = "";
  $("#answerInput").disabled = false;
  $("#submitButton").disabled = false;
  $("#skipButton").disabled = false;
  $("#hintButton").disabled = false;

  $("#tipText").textContent = randomize(tips)[0];

  if (options) {
    $("#textArea").classList.add("hidden");
    $("#mcqArea").classList.remove("hidden");

    $("#options").innerHTML = "";

    options.forEach((option) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "option";
      button.dataset.answer = option;
      button.textContent = option;

      button.addEventListener("click", () => {
        submitAnswer(option);
      });

      $("#options").appendChild(button);
    });
  } else {
    $("#mcqArea").classList.add("hidden");
    $("#textArea").classList.remove("hidden");

    setTimeout(() => {
      $("#answerInput").focus();
    }, 150);
  }

  updateSessionStats();
  startTimer();
}

function finishQuiz() {
  stopTimer();

  const accuracy = Math.round((state.score / state.total) * 100);

  const xp = state.score * 20 + state.bestStreak * 5;

  const topicName =
    state.topic === "mixed"
      ? "Mixed challenge"
      : topics[state.topic].label;

  let headline = "Every question helps you grow.";
  let message =
    "Review the explanations, then try another round when you’re ready.";

  if (accuracy >= 90) {
    headline = "Outstanding work!";
    message = "You showed excellent focus and mathematical confidence.";
  } else if (accuracy >= 70) {
    headline = "Great progress!";
    message = "You showed focus and strong problem-solving today.";
  } else if (accuracy >= 45) {
    headline = "You kept going!";
    message = "That persistence is how real confidence is built.";
  }

  $("#resultHeadline").textContent = headline;
  $("#resultMessage").textContent = message;
  $("#finalScore").textContent = `${state.score}/${state.total}`;
  $("#finalAccuracy").textContent = `${accuracy}% accuracy`;
  $("#finalStreak").textContent = state.bestStreak;
  $("#finalXp").textContent = xp;
  $("#finalTopic").textContent = topicName;

  $(".result-score").style.setProperty("--score", `${accuracy}%`);

  setScreen("resultScreen");
}

function nextQuestion() {
  if (!state.answered) {
    return;
  }

  state.index += 1;

  if (state.index >= state.total) {
    finishQuiz();
  } else {
    renderQuestion();
  }
}

function beginQuiz() {
  state.topic = state.selectedTopic;
  state.difficulty = $("#difficulty").value;
  state.category = $("#category").value;
  state.total = Number($("#questionCount").value);
  state.timerSeconds = Number($("#timerChoice").value);
  state.student = $("#studentName").value.trim();

  state.questions = [];
  state.index = 0;
  state.score = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.usedPatterns = {};

  try {
    for (let index = 0; index < state.total; index += 1) {
      state.questions.push(generateQuestion());
    }
  } catch (error) {
    console.error(error);
    toast(error.message);
    return;
  }

  const topicName =
    state.topic === "mixed"
      ? "Mixed challenge"
      : topics[state.topic].label;

  $("#quizTopic").textContent = `${topicName} practice`;

  $("#quizStudent").textContent = state.student
    ? `${state.student}’s focus session`
    : "Focus mode";

  $("#headerGreeting").textContent = state.student
    ? `Good luck, ${state.student}`
    : "Practice ready";

  setScreen("quizScreen");

  renderQuestion();
}

function goHome() {
  stopTimer();
  setScreen("homeScreen");
}

/* Events */

$$(".topic-card").forEach((card) => {
  card.addEventListener("click", () => {
    chooseTopic(card.dataset.topic);
  });
});

[$("#difficulty"), $("#questionCount")].forEach((field) => {
  field.addEventListener("change", updateSelectionText);
});

$("#startButton").addEventListener("click", beginQuiz);

$("#submitButton").addEventListener("click", () => {
  submitAnswer($("#answerInput").value);
});

$("#answerInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    submitAnswer($("#answerInput").value);
  }
});

$("#nextButton").addEventListener("click", nextQuestion);

$("#skipButton").addEventListener("click", () => {
  submitAnswer("");
});

$("#hintButton").addEventListener("click", () => {
  const question = state.questions[state.index];

  const hint =
    question.category === "word"
      ? "Underline the important numbers and decide which operation the story needs."
      : "Work one operation at a time, then check your answer.";

  toast(hint);
});

$("#retryButton").addEventListener("click", beginQuiz);

$$("[data-go-home]").forEach((button) => {
  button.addEventListener("click", goHome);
});

$("#brandHome").addEventListener("click", (event) => {
  event.preventDefault();
  goHome();
});

$$("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .getElementById(button.dataset.scroll)
      .scrollIntoView({ behavior: "smooth" });
  });
});

updateSelectionText();
