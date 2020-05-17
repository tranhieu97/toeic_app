const mockAccount = {
  accountID : '12345678',
  username: 'hieu97',
}
const findOne = async ({query, cridentials}) => {
  return new Promise( ( resolve, reject ) => {
    // gọi model để query tìm account ra 
    if ( query.accountID === mockAccount.accountID ) {
      console.log(query)
      resolve(mockAccount)
    }

    const error = {
      code: 404,
      name: 'AccountNotFound'
    }

    reject(error)
  })
}

const createOne = async ({query, cridentials, dataCreate}) => {
  return new Promise ( (resolve, reject ) => {

    // thực hiên gọi createOne đây

    const isUpdate = true
    
    if (isUpdate) {
      resolve(true)
    }

    const error = {
      code: 404,
      name: 'AccountNotFound'
    }

    reject(error)
  })
}

export default {
  findOne,
  createOne,
  
}