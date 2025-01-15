const quizQuestion = document.querySelector(".quiz-question");
const quizChoices = document.querySelectorAll(".quiz-choice");
const nextQuestion = document.querySelector(".fa-solid.fa-arrow-right");

let triviaSubject = "history";

let questionNow = null;


//Get question based off category chosen
const randomTriviaQuestion = () => {
const subjectQuestions = questions.find(cat => 
cat.category.toLowerCase() === triviaSubject.toLowerCase()).questions
|| [];

const randomQuestion = subjectQuestions[Math.floor(Math.random() * subjectQuestions.length)];
return randomQuestion;
}



const userChoice = (option, answerIndex) => {
  const isCorrect = questionNow.correctChoice ===
  answerIndex;
  option.classList.add(isCorrect ? 'correct' : 'wrong');
quizChoices.forEach(option => option.style.pointerEvents = 'none')
}


//Show question
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

  //Choose option
  li.addEventListener("click", () => userChoice(li, index));
  });
  };
showQuestion();

nextQuestion.addEventListener("click", showQuestion);
