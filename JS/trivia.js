const quizQuestion = document.querySelector(".quiz-question");
const quizChoices = document.querySelector(".quiz-choices");
const nextQuestion = document.querySelector(".fa-solid.fa-arrow-right");

let triviaSubject = "history";

let questionNow = null;


//Get question based off category chosen
const randomTriviaQuestion = () => {
const subjectQuestions = quizzes.find(cat => 
cat.category.toLowerCase() === triviaSubject.toLowerCase()).questions
|| [];

const randomQuestion = 
subjectQuestions[Math.floor(Math.random() * subjectQuestions.length)];
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
}


//Show question and append each
const showQuestion = () => {
  questionNow = randomTriviaQuestion();
  if(!questionNow) return;
  quizChoices.innerHTML = '';
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
