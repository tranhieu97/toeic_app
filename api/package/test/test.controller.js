import testModel from './test.model'
import testService from './test.service'
import groupQuestion from '../group_question/group_question.model'
import validate from '../../utils/validator'

async function getListTest (req, res) {
  try {
    const { limit, sortBy, cursor, ...conditions} = req.body

    const listTest = await testModel.getManyTests(conditions)

    return res.status(200).json({
      countTotal: 0,
      list: listTest
    })
  } catch (error) {
    return res.status(404).json({
      code: 404,
      name: "NotFound"
    })
  }
}

async function getTest (req, res) {
  try {
    const { testId } = req.params

    const test = await testModel.getTestById(testId)

    return res.status(200).json({
      isSuccess: true,
      data: test
    })
  } catch (error) {
    return res.status(404).json({
      code: 404,
      name: "NotFound"
    })
  }
}

async function update (req, res) {
  try {
    const { testId } = req.params

    const {...updateData} = req.body 

    const isValidData = validate(updateData, testModel.testSchema.updateTestSchema)

    if(isValidData.error) {
      throw {
        code: 400,
        name: validationData.error.name,
        message: validationData.error.details,
      }
    }

    const isUpdate = await testService.updateOne(testId, updateData)

    return res.status(200).json(isUpdate)
  } catch (error) {
    return res.status(error.code).json(error)
  }
}

async function deleteOne (req, res) {
  try {
    const { testId } = req.params

    const isDelete = await testService.deleteOne(testId)

    return res.status(200).json(isDelete)
  } catch (error) {
    return res.status(error.code).json(error)
  }
}

async function getDetail (req, res) {
  try {
    const { testId } = req.params
    await groupQuestion.testGetGroupQuestion()
  } catch (error) {
    
  }
}

async function createTest (req, res) {
  try {
    const {...createData } = req.body
    
    const validationData = validate(createData, testModel.testSchema.createTestSchema)

    if(validationData.error) {
      throw {
        code: 400,
        name: validationData.error.name,
        message: validationData.error.details,
      }
    }
    const insertId = await testModel.insertTest(createData)

    const newTest = {
      insertId,
      ...createData,
    }

    if(!insertId) {
      throw {
        code: 400,
        name: 'CreateTestFail'
      }
    }

    return res.status(200).json({
      isSuccess: true,
      data: newTest,
      message: 'Created test'
    })
  } catch (error) {
    return res.status(error.code).json(error)
  }
} 

export default {
  getListTest,
  getTest,
  update,
  deleteOne,
  getDetail,
  createTest,
}