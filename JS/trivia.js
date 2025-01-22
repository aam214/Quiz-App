const quizQuestion = document.querySelector(".quiz-question");
const startButton = document.querySelector(".start-button");
const startContainer = document.querySelector(".start-container");
const gameContainer = document.querySelector(".game-container");
const timerUI = document.querySelector(".timer");
const quizChoices = document.querySelector(".quiz-choices");
const nextQuestion = document.querySelector(".fa-solid.fa-arrow-right");
const questionsLeft = document.querySelector(".questions-left");
const completedContainer = document.querySelector(".game-complete-container");
const newGameButton = document.querySelector(".new-game-button");

//State variables
let triviaSubject = "history";
let quizLength = 3;
let questionNow = null;
const unusedQuestionHistory = [];
const quizTime = 10;
let currentTime = quizTime;
let myTimer = null;
let score = 0;

//Quiz Completed Container
const showCompleted = () => {
gameContainer.style.display = "none";
completedContainer.style.display = "block";

const gameCompletedMessage = 
`You answered <b>${score}</b> out of <b>${quizLength}</b> correctly`;

document.querySelector(".quiz-score").innerHTML = gameCompletedMessage;
}

//TImer Functions
const restartTime = () => {
  clearInterval(myTimer);
  currentTime = quizTime;
  timerUI.textContent = `${currentTime}s`
}

const beginTime = () => {
  myTimer = setInterval(() => {
  currentTime--;
  timerUI.innerHTML = 
  `${currentTime}s <i class="fa-regular fa-clock"></i>`
  if(currentTime <= 0){
    clearInterval(myTimer);
    showCorrectAnswer();
    quizChoices.querySelectorAll('.quiz-choice').forEach(option => option.style.pointerEvents 
      = 'none');
      nextQuestion.style.visibility = "visible";
  }
  }, 1000);
}

//Get question based off category chosen
const randomTriviaQuestion = () => {
const subjectQuestions = quizzes.find(cat => 
cat.category.toLowerCase() === triviaSubject.toLowerCase()).questions
|| [];

if(unusedQuestionHistory.length >= Math.min(subjectQuestions.length, quizLength))
{
  return showCompleted();
}

//Filter out used questions
const ununsedQuestion = 
subjectQuestions.filter((_, index) => !unusedQuestionHistory.includes(index));
const randomQuestion = 
ununsedQuestion[Math.floor(Math.random() * ununsedQuestion.length)];

unusedQuestionHistory.push(subjectQuestions.indexOf(randomQuestion));
return randomQuestion;
}

//Show Correct with styling and icons
const showCorrectAnswer = () => {
clearInterval(myTimer);
const markCorrection = quizChoices.querySelectorAll('.quiz-choice')
[questionNow.correctChoice];
markCorrection.classList.add("correct");
const quizIcon = `<span class="material-symbols-outlined">
check</span>`;
markCorrection.insertAdjacentHTML("beforeend", quizIcon);
}


//Handle User Input
const handleInput = (option, answerIndex) => {
const isCorrect = questionNow.correctChoice === answerIndex;
option.classList.add(isCorrect ? 'correct' : 'wrong');
//If incorrect this will show the correct answer otherwise increase score
!isCorrect ? showCorrectAnswer() : score++;

//Icon based on right and wrong 
const quizIcon = `<span class="material-symbols-outlined">
${isCorrect? 'check' : 'close'}</span>`;
option.insertAdjacentHTML("beforeend", quizIcon);

//Disable multiple options selected
quizChoices.querySelectorAll('.quiz-choice').forEach(option => option.style.pointerEvents 
= 'none');
nextQuestion.style.visibility = "visible";
}


//Show question and append each
const showQuestion = () => {
  questionNow = randomTriviaQuestion();
  if(!questionNow) return;

  restartTime();
  beginTime();
//Update UI
quizChoices.innerHTML = '';
nextQuestion.style.visibility = "hidden";
quizQuestion.textContent = questionNow.question;
questionsLeft.innerHTML = 
`Question: <b>${unusedQuestionHistory.length} of ${quizLength}</b>`;

  questionNow.options.forEach((option, index) => {
  const li = document.createElement("li");
  li.classList.add("quiz-choice");
  li.textContent = option;
  quizChoices.appendChild(li);
  li.addEventListener("click", () => handleInput(li, index));
  });
}

const beginQuiz = () => {
  gameContainer.style.display = "block";
  startContainer.style.display = "none";
  
showQuestion();
}
const newQuiz = () => {
  restartTime();
  score = 0;
  unusedQuestionHistory.length = 0;
  startContainer.style.display = "block";
  completedContainer.style.display = "none";

}


showQuestion();
startButton.addEventListener("click", beginQuiz);
nextQuestion.addEventListener("click", showQuestion);
newGameButton.addEventListener("click", newQuiz);