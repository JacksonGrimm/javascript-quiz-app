var scoreDisplay = document.getElementById("display-score");
var quizScreen = document.getElementById("quizId");
var questionP = document.getElementById("questionPElement");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var option4 = document.getElementById("option4");
var timerEl = document.getElementById("timer");
var correctSpanEl = document.getElementById("correct");
var incorrectSpanEl = document.getElementById("wrong");
var formScreen = document.getElementById("formScreen");
var form = document.getElementById("form");
var formButton = document.getElementById("formButton");
var localArr;

function localStorageCheck() {
  if (localStorage.length === 0) {
    console.log("nothing Stored");
    localArr = [];
  } else {
    console.log("Else");
    localArr = JSON.parse(localStorage.getItem("pastScores"));
  }
  return localArr;
}

var index = 0;
var timeLeft = 50;
var endTimer = false;

//questions
var questions = [
  {
    question: "1: What is JavaScript? (The answer is A)",
    optionA: { value: "A: a programing language", correct: true },
    optionB: { value: "B: a robot", correct: false },
    optionC: { value: "C: something Ben made up", correct: false },
    optionD: { value: "D: no one knows", correct: false },
  },
  {
    question: "2: How do you start a comment in JS? (The answer is B)",
    optionA: { value: "A: #comment", correct: false },
    optionB: { value: "B: //comment", correct: true },
    optionC: { value: "C: '''comment'''", correct: false },
    optionD: { value: "D: comment.. duh", correct: false },
  },
  {
    question: "3: How long did it take to develope JS? (The answer is C)",
    optionA: { value: "A: 10 years", correct: false },
    optionB: { value: "B: 6 weeks", correct: false },
    optionC: { value: "C: 10 days", correct: true },
    optionD: { value: "D: a weekend", correct: false },
  },
  {
    question:
      "4: Whats the first letter of the alphabet (The answer is A :) )?",
    optionA: { value: "A: A", correct: true },
    optionB: { value: "B: D", correct: false },
    optionC: { value: "C: X", correct: false },
    optionD: { value: "D: B", correct: false },
  },
  {
    question: "5: Does this assignment meet all of the acceptance criteria?",
    optionA: { value: "A: Yes it does", correct: true },
    optionB: { value: "B: No", correct: false },
    optionC: { value: "C: Not even close", correct: false },
    optionD: { value: "D: Your dreaming", correct: false },
  },
];

//timer
var timer = function () {
  var timerInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0 || endTimer) {
      //exit code
      clearInterval(timerInterval);
      endOfQuiz();
    }
  }, 1000);
};
//builds the quiz and displays to page
var buildQuiz = function () {
  console.log(index + " index");
  //hides correct/incorrect spans
  questionP.textContent = questions[index].question;
  option1.textContent = questions[index].optionA.value;
  option2.textContent = questions[index].optionB.value;
  option3.textContent = questions[index].optionC.value;
  option4.textContent = questions[index].optionD.value;
  validate();
};
//check if the programs at the end of the arr
var isCorrect = function () {
  correctSpanEl.style.visibility = "visible";
  incorrectSpanEl.style.visibility = "hidden";
  if (index === questions.length - 1) {
    console.log("out of questions");
    endTimer = true;
  } else {
    index++;
    console.log("selected option is correct");
    return buildQuiz();
  }
};

//if not correct move on and deduct time
var isIncorrect = function () {
  correctSpanEl.style.visibility = "hidden";
  incorrectSpanEl.style.visibility = "visible";
  timeLeft = timeLeft - 10;
  if (index === questions.length - 1) {
    console.log("out of questions");
    endTimer = true;
  } else {
    index++;
    console.log("selected option is wrong");
    return buildQuiz();
  }
};
//different option validation
var optionAValidate = function () {
  //check if question a is correct
  if (questions[index].optionA.correct) {
    return isCorrect();
  } else {
    return isIncorrect();
  }
};
var optionBValidate = function () {
  //check if question a is correct
  if (questions[index].optionB.correct) {
    return isCorrect();
  } else {
    return isIncorrect();
  }
};
var optionCValidate = function () {
  //check if question a is correct
  if (questions[index].optionC.correct) {
    return isCorrect();
  } else {
    return isIncorrect();
  }
};
var optionDValidate = function () {
  //check if question a is correct
  if (questions[index].optionD.correct) {
    return isCorrect();
  } else {
    return isIncorrect();
  }
};

var validate = function () {
  //checks if index is over the amount of questions
  if (index === questions.length) {
    //end game here
    console.log("out of questions");
  }
  //checks evens for each button if true runs option validation
  option1.addEventListener("click", optionAValidate);
  option2.addEventListener("click", optionBValidate);
  option3.addEventListener("click", optionCValidate);
  option4.addEventListener("click", optionDValidate);
};

var endOfQuiz = function () {
  console.log("end of quiz");
  timerEl.style.visibility = "hidden";
  correctSpanEl.style.visibility = "hidden";
  incorrectSpanEl.style.visibility = "hidden";
  quizScreen.style.visibility = "hidden";
  formScreen.style.visibility = "visible";
  saveScore();
};
var saveScore = function () {
  scoreDisplay.textContent = timeLeft;
  formButton.addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      //hides form screen and shows scores
      formScreen.style.visibility = "hidden";
      //sets score value to user input plus time lift as a string
      score = form.value + " " + timeLeft;
      localArr = localArr.concat(score);
      localStorage.setItem("pastScores", JSON.stringify(localArr));
      //Change to display scores section
      console.log(localArr);
      window.location.href = "./scorePage.html";
    },
    { once: true }
  );
};

correctSpanEl.style.visibility = "hidden";
incorrectSpanEl.style.visibility = "hidden";
formScreen.style.visibility = "hidden";
localStorageCheck();
timer();
buildQuiz();
