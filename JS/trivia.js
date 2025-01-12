let triviaSubject = "history";

const triviaQuestions = () => {
  const subjectQuestions = questions.find(cat => 
  cat.category.toLowerCase() === triviaSubject.toLowerCase()).questions;


  const randomQuestion = subjectQuestions[Math.floor(Math.random() * subjectQuestions.length)];
  console.log(randomQuestion); 
}
triviaQuestions();