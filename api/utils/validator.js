import joi from 'joi'

const validate = (data, schema) => {
  if(!data) {
    return false
  }

  const validData = joi.validate(data, schema)

  return validData
}

export default validate