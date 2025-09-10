// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    darkModeToggle.textContent = "☀️";
  } else {
    darkModeToggle.textContent = "🌙";
  }
});

// Scroll Animations
const animatedElements = document.querySelectorAll(".fade-in, .slide-up");

window.addEventListener("scroll", () => {
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.style.animationPlayState = "running";
    }
  });
});

// Sample questions (Subject-wise)
const questions = {
  physics: [
    {
      q: "What is the SI unit of Force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      answer: "Newton"
    },
    {
      q: "Speed of light is approximately?",
      options: ["3×10^8 m/s", "3×10^6 m/s", "1.5×10^8 m/s", "None"],
      answer: "3×10^8 m/s"
    }
  ],
  maths: [
    {
      q: "Derivative of sin(x) is?",
      options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
      answer: "cos(x)"
    },
    {
      q: "Integral of 1/x dx is?",
      options: ["x", "ln(x)", "1/x", "e^x"],
      answer: "ln(x)"
    }
  ],
  chemistry: [
    {
      q: "H2O is chemical formula of?",
      options: ["Oxygen", "Hydrogen", "Water", "Hydrogen peroxide"],
      answer: "Water"
    }
  ]
};

let currentSubject = "physics";
let currentQuestion = 0;
let score = 0;

// Load subject
document.getElementById("subjectSelect").addEventListener("change", function() {
  currentSubject = this.value;
  resetQuiz();
});

function loadQuestion() {
  const qData = questions[currentSubject][currentQuestion];
  document.getElementById("question").innerText = qData.q;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  qData.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt, qData.answer);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    score++;
  }
  document.querySelectorAll("#options button").forEach(b => b.disabled = true);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions[currentSubject].length) {
    loadQuestion();
  } else {
    document.getElementById("quizBox").style.display = "none";
    document.getElementById("result").innerText =
      `You scored ${score} out of ${questions[currentSubject].length}`;
  }
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quizBox").style.display = "block";
  document.getElementById("result").innerText = "";
  loadQuestion();
}

// Start first quiz
resetQuiz();
