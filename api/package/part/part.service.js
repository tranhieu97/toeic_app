import partModel from './part.model'
const findByID = async (partID) => {
  return new Promise ( async (resolve, reject) => {

    const part = await partModel.getPartByID(partID) 

    if (part) {
      return resolve(part)
    }

    const error = {
      code: 404,
      name: 'PartNotFound'
    }

    return reject(error)
  })
}

const updateOne = async (partID, updateData) => {
  return new Promise ( async (resolve, reject) => {
    const part = await partModel.getPartByID(partID)

    if(!part) {
      return reject({
        code: 404,
        name: 'PartNotFound'
      })
    }

    const existPart = await partModel.getPartByName(updateData.partName)

    if(existPart) {
      return reject({
        code: 400,
        name: 'Name part is already exist'
      })
    }

    const isUpdate = await partModel.updatePart(partID, updateData)

    if (!isUpdate) {
      return reject({
        code: 400,
        name: 'QueryError'
      })
    }

    return resolve(true)
  })
}

const createOne = async (createData) => {
  return new Promise (async (resolve, reject) => {

    const part = await partModel.getPartByName(createData.partName)

    if(part) {
      return reject({
        code: 400,
        name: 'DupplicatePart'
      })
    }

    const newPart = await partModel.insertPart(createData)

    if (!newPart) {
      return reject({
        code: 400,
        name: 'CannotCreatePart'
      })
    }

    return resolve(newPart)
  })
}

const deleteOne = async (partID) => {
  return new Promise ( async (resolve, reject) => {
    const part = await partModel.getPartByID(partID)

    if (!part) {
      return reject({
        code: 404,
        name: 'PartNotFound',
      })
    }

    const isDelete = await partModel.deletePart(partID) 

    if (!isDelete) {
      return reject({
        code: 400,
        name: 'QueryError, Cannot delete part'
      })
    }

    return resolve(true)
  })
}

const findAll = async () => {
  return new Promise ( async (resolve, reject) => {
    const parts = await partModel.getAllParts()

    if (parts && parts.length > 0) {
      return resolve(parts)
    }

    return reject({
      code: 404,
      name: 'PartNotFound'
    })
  })
}

export default {
  findByID,
  findAll,
  updateOne,
  createOne,
  deleteOne,
}