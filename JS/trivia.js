const quizQuestion = document.querySelector(".quiz-question");
const quizChoices = document.querySelector(".quiz-choices");
const nextQuestion = document.querySelector(".fa-solid.fa-arrow-right");

let triviaSubject = "history";
let questionNow = null;
const unusedQuestionHistory = [];


//Get question based off category chosen
const randomTriviaQuestion = () => {
const subjectQuestions = quizzes.find(cat => 
cat.category.toLowerCase() === triviaSubject.toLowerCase()).questions
|| [];

//Filter out used questions
const ununsedQuestion = 
subjectQuestions.filter((_, index) => !unusedQuestionHistory.includes(index));
const randomQuestion = 
ununsedQuestion[Math.floor(Math.random() * ununsedQuestion.length)];

unusedQuestionHistory.push(subjectQuestions.indexOf(randomQuestion));
return randomQuestion;
}

const showCorrectAnswer = () => {
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

  quizChoices.innerHTML = '';
  nextQuestion.style.visibility = "hidden";
  quizQuestion.textContent = questionNow.question;

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
