
import testModel from './test.model'

const updateOne = (testId, updateData) => {
  return new Promise ( async (resolve, reject) => {
    const test = await testModel.getTestById(testId)

    if (!test) {
      return reject({
        code: 404,
        name: 'TestNotFound',
      })
    }

    const isUpdate = await testModel.updateTest(testId, updateData)

    return resolve(isUpdate)
  })
}

const deleteOne = (testId) => {
  return new Promise ( async (resolve, reject) => {
    const test = await testModel.getTestById(testId)

    if (!test) {
      return reject({
        code: 404,
        name: 'TestNotFound',
      })
    }
    //delete all of question group that relation to this test 

    const isDelete = await testModel.deleteTest(testId)

    return resolve(isDelete)
  })
}

export default {
  updateOne,
  deleteOne,
}