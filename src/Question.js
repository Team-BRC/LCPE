class QuestionClass {
  constructor(
    A,
    B,
    C,
    D,
    Answer,
    Category,
    Subcategory,
    Question,
    Explaination,
    Picture,
    id
  ) {
    this.id = id;
    this.category = Category;
    this.subcat = Subcategory;
    this.question = Question;
    this.answer = Answer;
    this.a = A;
    this.b = B;
    this.c = C;
    this.d = D;
    this.explaination = Explaination;
    this.picture = Picture;
    this.flag = false;
    this.selectedAnswer = null;
    this.ifCorrect = null;
  }

  static restartCounter() {
    counter = 0;
  }

  selectAnswerChoice(choice) {
    this.selectedAnswer = choice;
    switch (choice) {
      case this.answer:
        this.ifCorrect = true
        break
      case null:
        this.ifCorrect = null
        break
      default:
        this.ifCorrect = false
    }
    return choice
  }

  toggleFlag() {
    this.flag = !this.flag
    return this.flag
  }


}

// module.exports = QuestionClass;
export default QuestionClass
