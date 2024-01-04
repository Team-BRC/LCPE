import QuestionClass from "./Question.js";

class Test {
  constructor(totalQuestions) {
    this.progress = 0;
    this.totalQuestions = totalQuestions;
    this.correctAnswers = 0;
    this.completionPercent = 0;
    this.flagged = new Map();
    this.incorrect = [];
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
      this.listOfCategories[category] = id; // this is where the categories and the first question for them is assigned
      const totalInCategory = categoryArray.length;
      const calculation = Math.round(
        (totalInCategory * examSize) / totalInBank
      );
      const questionsFromEachCategory =
        calculation < totalInCategory ? calculation : totalInCategory;
      if (questionsFromEachCategory === 0){
        alert("Add more questions to generate the exam!")
        return null
      }
      const takenNums = new Set();
      while (takenNums.size < questionsFromEachCategory) {
        const num = Math.floor(Math.random() * totalInCategory);
        if (!takenNums.has(num)) {
          const {
            A,
            Answer,
            B,
            C,
            Category,
            D,
            E,
            Explained,
            Flag,
            Picture,
            Question,
            SubCatNum,
            Subcategory,
          } = categoryArray[num];

          if (Picture !== undefined){
            // imgurl = getDirectImageUrl(Picture)
            // Getting Picture ID from image url
            const fileIdRegex = /\/d\/(.*?)\//;
            const match = Picture.match(fileIdRegex);
            // Check if there's a match and get the file ID
            const fileId = match && match[1];
            // Log or use the extracted file ID
            if (fileId) {
              const newQuestion = new QuestionClass(
                A,
                B,
                C,
                D,
                E,
                Answer,
                Category,
                Subcategory,
                Question,
                Explained,
                `https://drive.google.com/uc?export=view&id=${fileId}`,
                id,
                Flag
              );

              this.addQuestion(newQuestion);
              takenNums.add(num);
              id++;

            } else {
              const newQuestion = new QuestionClass(
                A,
                B,
                C,
                D,
                E,
                Answer,
                Category,
                Subcategory,
                Question,
                Explained,
                "",
                id,
                Flag
              );

              this.addQuestion(newQuestion);
              takenNums.add(num);
              id++;
            }

          } else {
            const newQuestion = new QuestionClass(
              A,
              B,
              C,
              D,
              E,
              Answer,
              Category,
              Subcategory,
              Question,
              Explained,
              "",
              id,
              Flag
            );

            this.addQuestion(newQuestion);
            takenNums.add(num);
            id++;
          }
  
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
