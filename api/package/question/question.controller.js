import answerModel from '../answer/answer.model'
import { buildInsertManyQuery } from '../../helper/buildQuery'

async function createQuestion (req, res) {
  try {
    const {...questionData} = req.body

    const answers = questionData.answers 

    const buildQuery = buildInsertManyQuery(answers, answerModel.mapColumnTableAnswers)
 
    return buildQuery
  } catch (error) {
    
  }
}

export default {
  createQuestion,
}

