const quizQuestion = document.querySelector(".quiz-question");
const gameContainer = document.querySelector(".game-container");
const timerUI = document.querySelector(".timer");
const quizChoices = document.querySelector(".quiz-choices");
const nextQuestion = document.querySelector(".fa-solid.fa-arrow-right");
const questionsLeft = document.querySelector(".questions-left");
const completedContainer = document.querySelector(".game-complete-container");

//State variables
let triviaSubject = "history";
let quizLength = 10;
let questionNow = null;
const unusedQuestionHistory = [];
const quizTime = 5;
let currentTIme = quizTime;
let myTimer = null;

const showCompleted = () => {
gameContainer.style.display = "none";
completedContainer.style.display = "block";

}

//TImer Functions
const restartTIme = () => {
  clearInterval(myTimer);
  currentTIme = quizTime;
  timerUI.textContent = `${currentTIme}s`
}

const beginTime = () => {
  myTimer = setInterval(() => {
  currentTIme--;
  timerUI.textContent = `${currentTIme}s`
  if(currentTIme <= 0){
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
//If incorrect this will show the correct answer
!isCorrect ? showCorrectAnswer() : "";

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

  restartTIme();
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
  };
showQuestion();

nextQuestion.addEventListener("click", showQuestion);
