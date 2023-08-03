import QuestionClass from "./Question.js";

class Test {
  constructor(totalQuestions) {
    this.progress = 0;
    this.totalQuestions = totalQuestions; //this is a number
    this.correctAnswers = 0;
    this.completionPercent = 0;
    this.flagged = new Map();
    this.incorrect = new Map();
    this.allQuestions = {};
  }

  addQuestion(question) {
    this.allQuestions[question.id] = question;
  }

  generateExam(sheet, examSize) {
    let totalInBank = 0;
    const sheetObj = new Map();
    for (let question of sheet) {
      if (question["Question"]) {
        const category = question["Category"];
        const existingCategoryQuestions = sheetObj.get(category);
        if (existingCategoryQuestions) {
          existingCategoryQuestions.push(question);
        } else {
          sheetObj.set(category, [question]);
        }
        totalInBank++;
      }
    }
    let id = 1;
    for (const [category, categoryArray] of sheetObj) {
      const totalInCategory = categoryArray.length;
      const questionsFromEachCategory = Math.round(
        (totalInCategory * examSize) / totalInBank
      );
      const takenNums = new Set();
      while (takenNums.size < questionsFromEachCategory) {
        const num = Math.floor(Math.random() * totalInCategory);
        if (!takenNums.has(num)) {
          const {
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
          } = categoryArray[num];
          const newQuestion = new QuestionClass(
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
          );
          this.addQuestion(newQuestion);
          takenNums.add(num);
          id++;
        }
      }
    }
    return this.allQuestions;
  }

  //make the function for, given the amount of time or number of questions, the generation of those questions

  changeFlag(question, status) {
    if (status) {
      this.flagged.set(question.unique, question);
    } else {
      this.flagged.delete(question.unique);
    }
  }
}

// module.exports = Test;
export default Test;
