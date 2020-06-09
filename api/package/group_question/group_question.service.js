import groupQuestionModel from './group_question.model'
import questionModel from '../question/question.model'
import answersModel from '../answer/answer.model'

const createOneGroupQuestion = (groupQuestionData) => {
  return new Promise(async (resolve, reject) => {
  
    try {
      const { text, imagePath, audioPath, testId, questions } = groupQuestionData

      const newGroupQuestionId = await groupQuestionModel.insertGroupQuestion({
        text,
        imagePath,
        audioPath,
        testId
      })

      if(!newGroupQuestionId) {
        return reject({
          code: 400,
          name: 'Cannot create new Group question'
        })
      }

      if (newGroupQuestionId && questions && questions.length > 0 ) {

        for (const question of questions) {
          const { answers , ...createQuestion } = question
          
          const newQuestionId = await questionModel.insertQuestion({groupQuestionId: newGroupQuestionId, ...createQuestion})

          const createAnswers = answers.map( each => {
            each.questionId = newQuestionId
            return each
          })

          await answersModel.insertManyAnswers(createAnswers)
        }

      }

      return resolve(newGroupQuestionId)

    } catch (error) {
      console.log(error)
      return reject(error)
    }
  })
  
}

export default {
  createOneGroupQuestion
}