/* ==========================================================
   MATHMIND PROGRESS DASHBOARD
========================================================== */

const mmProgressKey = "mathmind-progress-v1";

const mmTopics = [
  "addition",
  "subtraction",
  "multiplication",
  "division",
  "fractions",
  "decimals",
  "percentages",
  "ratio",
  "factors",
  "algebra"
];

function mmTopicName(topicId) {
  return topics[topicId] ? topics[topicId].label : topicId;
}

function mmShortName(topicId) {
  const names = {
    addition: "Add",
    subtraction: "Sub",
    multiplication: "Multiply",
    division: "Divide",
    fractions: "Fractions",
    decimals: "Decimals",
    percentages: "%",
    ratio: "Ratio",
    factors: "Factors",
    algebra: "Algebra"
  };

  return names[topicId];
}

function mmReadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(mmProgressKey));

    if (saved && Array.isArray(saved.sessions)) {
      return saved;
    }
  } catch (error) {
    console.log("No saved dashboard data yet.");
  }

  return {
    sessions: []
  };
}

function mmWriteProgress(progress) {
  localStorage.setItem(mmProgressKey, JSON.stringify(progress));
}

function mmSaveCurrentSession() {
  const progress = mmReadProgress();

  const accuracy = Math.round(
    (state.score / state.total) * 100
  );

  progress.sessions.unshift({
    id: Date.now(),
    topic: state.topic,
    score: state.score,
    total: state.total,
    accuracy: accuracy,
    bestStreak: state.bestStreak,
    date: new Date().toLocaleDateString(undefined, {
      month: "short",
      day: "numeric"
    })
  });

  progress.sessions = progress.sessions.slice(0, 30);

  mmWriteProgress(progress);
}

function mmTopicSummary(progress, topicId) {
  const sessions = progress.sessions.filter((session) => {
    return session.topic === topicId || session.topic === "mixed";
  });

  if (!sessions.length) {
    return {
      sessions: 0,
      accuracy: null
    };
  }

  const totalAccuracy = sessions.reduce((sum, session) => {
    return sum + session.accuracy;
  }, 0);

  return {
    sessions: sessions.length,
    accuracy: Math.round(totalAccuracy / sessions.length)
  };
}

function mmLevel(accuracy) {
  if (accuracy === null || accuracy === undefined) {
    return "mm-empty";
  }

  if (accuracy < 40) {
    return "mm-level-1";
  }

  if (accuracy < 60) {
    return "mm-level-2";
  }

  if (accuracy < 75) {
    return "mm-level-3";
  }

  if (accuracy < 90) {
    return "mm-level-4";
  }

  return "mm-level-5";
}

function mmCreateDashboard() {
  if (document.getElementById("progressDashboard")) {
    return;
  }

  const dashboard = document.createElement("section");

  dashboard.id = "progressDashboard";
  dashboard.className = "screen";

  dashboard.innerHTML = `
    <div class="mm-dashboard-top">
      <button class="back-button" id="mmBackToResults" type="button">
        ← Back to results
      </button>

      <div class="mm-dashboard-title">
        <p class="eyebrow">Personal learning analytics</p>
        <h1>Your progress dashboard</h1>
      </div>

      <button class="mm-clear" id="mmClearData" type="button">
        Clear history
      </button>
    </div>

    <section class="mm-welcome">
      <div>
        <p class="eyebrow">Learning overview</p>
        <h2 id="mmGreeting">Every practice makes you stronger.</h2>
        <p id="mmSubtext">
          Your dashboard updates after every completed session.
        </p>
      </div>

      <button class="primary-button" id="mmNewPractice" type="button">
        Start another practice <span>→</span>
      </button>
    </section>

    <section class="mm-stats">
      <article class="mm-stat">
        <span class="mm-stat-icon mm-purple">◴</span>
        <div>
          <p>Practice sessions</p>
          <strong id="mmSessions">0</strong>
          <small>all time</small>
        </div>
      </article>

      <article class="mm-stat">
        <span class="mm-stat-icon mm-blue">✓</span>
        <div>
          <p>Questions completed</p>
          <strong id="mmQuestions">0</strong>
          <small>all time</small>
        </div>
      </article>

      <article class="mm-stat">
        <span class="mm-stat-icon mm-yellow">◎</span>
        <div>
          <p>Average accuracy</p>
          <strong id="mmAccuracy">—</strong>
          <small>across sessions</small>
        </div>
      </article>

      <article class="mm-stat">
        <span class="mm-stat-icon mm-mint">♨</span>
        <div>
          <p>Best streak</p>
          <strong id="mmStreak">0</strong>
          <small>correct answers</small>
        </div>
      </article>
    </section>

    <section class="mm-main-grid">
      <article class="mm-ai-card">
        <div class="mm-ai-icon">✦</div>

        <p class="eyebrow">AI insight</p>

        <h2 id="mmInsightTitle">Your next opportunity</h2>

        <p id="mmInsightText">
          Complete a practice session to unlock personalised guidance.
        </p>

        <button class="mm-ai-button" id="mmInsightPractice" type="button">
          Start practising →
        </button>

        <div class="mm-ai-orb"></div>
      </article>

      <article class="mm-panel">
        <div class="mm-panel-head">
          <div>
            <p class="eyebrow">Student mastery heat map</p>
            <h2>Topics vs recent sessions</h2>
          </div>

          <span class="mm-badge">Live data</span>
        </div>

        <div class="mm-heatmap-scroll">
          <div id="mmHeatmap" class="mm-heatmap"></div>
        </div>

        <div class="mm-legend">
          <span>Needs support</span>
          <i class="mm-level-1"></i>
          <i class="mm-level-2"></i>
          <i class="mm-level-3"></i>
          <i class="mm-level-4"></i>
          <i class="mm-level-5"></i>
          <span>Mastered</span>
        </div>
      </article>
    </section>

    <section class="mm-chart-grid">
      <article class="mm-panel mm-performance">
        <div class="mm-panel-head">
          <div>
            <p class="eyebrow">Performance overview</p>
            <h2>Average mastery by topic</h2>
          </div>

          <span class="mm-badge mm-purple-badge">All time</span>
        </div>

        <div id="mmBars" class="mm-bars"></div>
      </article>

      <article class="mm-panel mm-trajectory">
        <div class="mm-panel-head">
          <div>
            <p class="eyebrow">Growth trajectory</p>
            <h2>Accuracy across sessions</h2>
          </div>

          <span class="mm-badge mm-purple-badge">Your trend</span>
        </div>

        <div id="mmGrowth" class="mm-growth"></div>
      </article>
    </section>
  `;

  document.querySelector("main").appendChild(dashboard);

  const resultActions = document.querySelector(".result-actions");

  const dashboardButton = document.createElement("button");

  dashboardButton.id = "mmDashboardButton";
  dashboardButton.type = "button";
  dashboardButton.className = "secondary-button";
  dashboardButton.textContent = "View progress dashboard";

  resultActions.insertBefore(
    dashboardButton,
    resultActions.firstChild
  );

  dashboardButton.addEventListener("click", mmShowDashboard);

  document
    .getElementById("mmBackToResults")
    .addEventListener("click", () => {
      setScreen("resultScreen");
    });

  document
    .getElementById("mmNewPractice")
    .addEventListener("click", goHome);

  document
    .getElementById("mmInsightPractice")
    .addEventListener("click", goHome);

  document
    .getElementById("mmClearData")
    .addEventListener("click", () => {
      const confirmed = window.confirm(
        "Clear all saved MathMind progress from this browser?"
      );

      if (!confirmed) {
        return;
      }

      localStorage.removeItem(mmProgressKey);

      mmRenderDashboard();
    });
}

function mmRenderHeatmap(progress) {
  const heatmap = document.getElementById("mmHeatmap");

  const recentSessions = [...progress.sessions]
    .slice(0, 5)
    .reverse();

  const rows = recentSessions.length
    ? recentSessions
    : [null, null, null, null, null];

  let markup = `<div></div>`;

  mmTopics.forEach((topicId) => {
    markup += `
      <div class="mm-heat-topic">
        ${mmShortName(topicId)}
      </div>
    `;
  });

  rows.forEach((session, index) => {
    markup += `
      <div class="mm-heat-label">
        ${session ? session.date : `Session ${index + 1}`}
      </div>
    `;

    mmTopics.forEach((topicId) => {
      const applies =
        session &&
        (session.topic === topicId || session.topic === "mixed");

      const level = applies
        ? mmLevel(session.accuracy)
        : "mm-empty";

      const title = applies
        ? `${mmTopicName(topicId)}: ${session.accuracy}%`
        : "No data yet";

      markup += `
        <span
          class="mm-heat-cell ${level}"
          title="${title}"
        ></span>
      `;
    });
  });

  heatmap.innerHTML = markup;
}

function mmRenderBars(progress) {
  const bars = document.getElementById("mmBars");

  bars.innerHTML = mmTopics
    .map((topicId, index) => {
      const summary = mmTopicSummary(progress, topicId);

      const value = summary.accuracy;

      const height = value === null
        ? 7
        : Math.max(10, value);

      const color = `mm-bar-${(index % 5) + 1}`;

      return `
        <div class="mm-bar-group">
          <strong>${value === null ? "—" : `${value}%`}</strong>

          <div class="mm-bar-track">
            <span
              class="${color}"
              style="height:${height}%"
            ></span>
          </div>

          <small>${mmShortName(topicId)}</small>
        </div>
      `;
    })
    .join("");
}

function mmRenderGrowth(progress) {
  const growth = document.getElementById("mmGrowth");

  const sessions = [...progress.sessions]
    .slice(0, 8)
    .reverse();

  if (!sessions.length) {
    growth.innerHTML = `
      <div class="mm-empty-chart">
        <span>⌁</span>
        <p>
          Your growth line will appear after your first
          completed practice.
        </p>
      </div>
    `;

    return;
  }

  const width = 620;
  const height = 170;
  const padding = 18;

  const step =
    sessions.length === 1
      ? 0
      : (width - padding * 2) / (sessions.length - 1);

  const points = sessions.map((session, index) => {
    const x = sessions.length === 1
      ? width / 2
      : padding + index * step;

    const y =
      height -
      padding -
      (session.accuracy / 100) * (height - padding * 2);

    return {
      x,
      y,
      accuracy: session.accuracy,
      date: session.date
    };
  });

  const line = points
    .map((point, index) => {
      return `${index ? "L" : "M"}${point.x},${point.y}`;
    })
    .join(" ");

  const area = `
    ${line}
    L${points[points.length - 1].x},${height - padding}
    L${points[0].x},${height - padding}
    Z
  `;

  const circles = points
    .map((point) => {
      return `
        <circle
          cx="${point.x}"
          cy="${point.y}"
          r="5"
        ></circle>
      `;
    })
    .join("");

  const labels = points
    .map((point) => `<span>${point.date}</span>`)
    .join("");

  growth.innerHTML = `
    <div class="mm-axis">
      <span>100</span>
      <span>75</span>
      <span>50</span>
      <span>25</span>
      <span>0</span>
    </div>

    <div class="mm-graph">
      <svg
        viewBox="0 0 ${width} ${height}"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="mmGrowthFill"
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stop-color="#24b6a3"
              stop-opacity=".25"
            ></stop>

            <stop
              offset="100%"
              stop-color="#24b6a3"
              stop-opacity="0"
            ></stop>
          </linearGradient>
        </defs>

        <path class="mm-growth-area" d="${area}"></path>
        <path class="mm-growth-line" d="${line}"></path>

        <g class="mm-growth-points">
          ${circles}
        </g>
      </svg>

      <div class="mm-growth-labels">
        ${labels}
      </div>
    </div>
  `;
}

function mmRenderDashboard() {
  const progress = mmReadProgress();
  const sessions = progress.sessions;

  const totalQuestions = sessions.reduce((sum, session) => {
    return sum + session.total;
  }, 0);

  const averageAccuracy = sessions.length
    ? Math.round(
        sessions.reduce((sum, session) => {
          return sum + session.accuracy;
        }, 0) / sessions.length
      )
    : null;

  const bestStreak = sessions.reduce((best, session) => {
    return Math.max(best, session.bestStreak);
  }, 0);

  const studentName = state.student || "there";

  document.getElementById("mmGreeting").textContent =
    sessions.length
      ? `Strong work, ${studentName}. Here’s what your practice is showing.`
      : "Every practice makes you stronger.";

  document.getElementById("mmSubtext").textContent =
    sessions.length
      ? `You have completed ${sessions.length} session${
          sessions.length === 1 ? "" : "s"
        }. Keep building your momentum.`
      : "Complete your first test to unlock your learning analytics.";

  document.getElementById("mmSessions").textContent =
    sessions.length;

  document.getElementById("mmQuestions").textContent =
    totalQuestions;

  document.getElementById("mmAccuracy").textContent =
    averageAccuracy === null
      ? "—"
      : `${averageAccuracy}%`;

  document.getElementById("mmStreak").textContent =
    bestStreak;

  const triedTopics = mmTopics
    .map((topicId) => {
      return {
        topicId,
        ...mmTopicSummary(progress, topicId)
      };
    })
    .filter((topic) => topic.accuracy !== null)
    .sort((first, second) => {
      return first.accuracy - second.accuracy;
    });

  const insightTitle =
    document.getElementById("mmInsightTitle");

  const insightText =
    document.getElementById("mmInsightText");

  const insightButton =
    document.getElementById("mmInsightPractice");

  if (!triedTopics.length) {
    insightTitle.textContent = "Your next opportunity";
    insightText.textContent =
      "Complete a practice session to unlock personalised guidance.";
    insightButton.textContent = "Start practising →";
  } else {
    const focus = triedTopics[0];
    const focusName = mmTopicName(focus.topicId);

    if (focus.accuracy >= 85) {
      insightTitle.textContent =
        `${focusName} is a real strength.`;

      insightText.textContent =
        `You are averaging ${focus.accuracy}% in ${focusName}. Try a mixed challenge to stretch that confidence.`;

      insightButton.textContent =
        "Try mixed challenge →";
    } else {
      insightTitle.textContent =
        `${focusName} is your next growth area.`;

      insightText.textContent =
        `You are currently averaging ${focus.accuracy}% here. A focused 5-question practice could make a difference.`;

      insightButton.textContent =
        `Practise ${focusName} →`;
    }
  }

  mmRenderHeatmap(progress);
  mmRenderBars(progress);
  mmRenderGrowth(progress);
}

function mmShowDashboard() {
  mmRenderDashboard();
  setScreen("progressDashboard");
}

/* Save every completed test, then show the normal result screen. */

const mmOriginalFinishQuiz = finishQuiz;

finishQuiz = function () {
  mmSaveCurrentSession();

  mmOriginalFinishQuiz();

  mmRenderDashboard();
};

mmCreateDashboard();
