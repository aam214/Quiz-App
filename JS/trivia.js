let quizSubject = "history";

const triviaQuestions = () => {
  const subjectQuestions = questions.find(cat => cat.category === quizSubject)
  console.log(subjectQuestions); 
}
triviaQuestions();