export const buildQuery = ({limit, cursor, ...conditions}, mapColumnNames) => {

  console.log(conditions)
  if (!conditions) {
    if (limit) {
      return  `LIMIT ${limit}`
    }

    return ''
  }

  const keyConditions = Object.keys(conditions)

  if (keyConditions.length === 0) {
    return ''
  }

  const query = []

  keyConditions.forEach( key => {
    const value = (typeof conditions[key] === 'string') && key.indexOf('Id') === -1 ? `"${conditions[key]}"`: `${conditions[key]}`
    const str = `${mapColumnNames[key]} = ` +  value
    query.push(str)
  })

  let whereClause = `WHERE ${query.join(' AND ')}`

  if (limit) {
    whereClause += ` LIMIT ${limit}`
  }

  return whereClause
}

export const buildUpdateQuery = (updateData, mapColumnNames) => {
  const keyObject = Object.keys(updateData)

  if (keyObject.length === 0) {
    return ''
  }

  const updateQuery = []

  keyObject.forEach( key => {
    if(typeof updateData[key] === 'string'){
      updateQuery.push(`${mapColumnNames[key]} = "${updateData[key]}"`)
      return
    }
    
    updateQuery.push(`${mapColumnNames[key]} = ${updateData[key]}`)
  })

  return updateQuery.join(', ')
  
}

export const buildInsertManyQuery = (data, mapColumnNames) => {
  const keyModel = Object.keys(mapColumnNames)

  let mathchData = []

  mathchData = data.map( item => {
      let insertRow = []

      keyModel.forEach( eachKey => {
        insertRow.push(item[eachKey])
      })

      return `(${insertRow.join(', ')})`
  })

  console.log(mathchData.join(', '))

  return mathchData.join(', ')

}


