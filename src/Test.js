import QuestionClass from "./Question.js";

class Test {
  constructor(totalQuestions) {
    this.progress = 0;
    this.totalQuestions = totalQuestions;
    this.correctAnswers = 0;
    this.completionPercent = 0;
    this.flagged = new Map();
    this.incorrect = new Map();
    this.allQuestions = {};
    this.listOfCategories = {};
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
      this.listOfCategories[category] = id;
      const totalInCategory = categoryArray.length;
      const calculation = Math.round(
        (totalInCategory * examSize) / totalInBank
      );
      const questionsFromEachCategory =
        calculation < totalInCategory ? calculation : totalInCategory;
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

  changeFlag(question, status) {
    if (status) {
      this.flagged.set(question.unique, question);
    } else {
      this.flagged.delete(question.unique);
    }
  }
}

export default Test;
