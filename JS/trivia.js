const quizQuestion = document.querySelector(".quiz-question");
const quizChoices = document.querySelector(".quiz-choices");

let triviaSubject = "history";

//Get question based off category chosen
const randomTriviaQuestion = () => {
const subjectQuestions = questions.find(cat => 
cat.category.toLowerCase() === triviaSubject.toLowerCase()).questions;

const randomQuestion = subjectQuestions[Math.floor(Math.random() * subjectQuestions.length)];
return randomQuestion;
}

//Show question

const showQuestion = () => {
  const questionNow = randomTriviaQuestion();
  if(!questionNow) return;
  quizQuestion.textContent = questionNow.question;

  questionNow.options.forEach(option => {
  const li = document.createElement("li");
  li.classList.add("quiz-choice");
  li.textContent = option;
  quizChoices.appendChild(li);
  });

}

showQuestion();