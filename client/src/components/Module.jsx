// Clear input function 
export const clearInput = (element) => document.getElementById(element).value = ''
// Element Selector
export const elementSelector = element => document.querySelector(element)


//****************** Question answer template ******************
export class QuestionTemplate {
    constructor(studentId, courseTitle, level, department, date, score, question_type, uniqueId, studentAnswer) {
        Object.assign(this, {
        studentId: studentId,
        courseTitle: courseTitle,
        level: level,
        department: department,
        date: date,
        score: score,
        question_type: question_type,
        uniqueId: uniqueId,
        studentAnswer: studentAnswer,
        })
    }
}

//************************* Date function *************************
export const date_function = () => {
    let today = new Date(), year = today.getFullYear()
    // Date Formatting 
    let options = {day: "numeric", month: "short"};
    // The method to string returns a date as string value 
    return `${today.toLocaleDateString("en-US", options)} ${year}`
}