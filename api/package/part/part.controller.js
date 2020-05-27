import partService from './part.service'

async function getListPart(req, res) {
  try {
    const parts = await partService.findAll()

    if (!parts) {
      return res.status(404).json({
        isSuccess: false,
        massage: 'can not get list parts',
        totalCount: parts.length,
        data: null,
      })
    }

    return res.status(200).json({
      isSuccess: true,
      massagea: 'get parts successfully',
      totalCount: parts.length,
      data: parts,
    })

  } catch (error) {
    return res.status(401).json(error)
  }
}

async function getPart (req, res) {
  try {
    const { partID } = req.params

    const part = await partService.findByID(partID) 

    if(!part) {
      return res.status(401).json({
        isSuccess: false,
        message: 'cannot get part',
        data: null,
      }) 
    }

    return res.status(401).json({
      isSuccess: true,
      message: 'get part successfully',
      data: part,
    }) 
  } catch (error) {
    return res.status(401).json(error)
  }
}

async function createPart (req, res) {
  try {
    const { partName, totalTime } = req.body

    if (!partName || typeof partName == undefined || !totalTime || typeof totalTime == undefined) {
      return res.status(400).json({
        isSuccess: false,
        message: 'partName or total time must be defined', 
      })
    }

    const part = await partService.createOne({
      partName,
      totalTime
    })

    if (!part) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Can not create a part'
      })
    }

    return res.status(200).json({
      isSuccess: true,
      message: 'created part',
      data: part
    })
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function updatePart (req, res) {
  try {
    const { partID } = req.params


    const updateData = {...req.body}

    if (!updateData.partName || typeof updateData.partName == undefined || !updateData.totalTime || typeof updateData.totalTime == undefined) {
      return res.status(400).json({
        isSuccess: false,
        message: 'partName or total time must be defined', 
      })
    }

    const isUpdate = await partService.updateOne(partID, updateData)

    if(!isUpdate) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Can not update a part'
      })
    }

    return res.status(200).json({
      isSuccess: true,
      message: 'updated part',
      data: true
    })


  } catch (error) {
    return res.status(400).json(error)
  }
}

async function deletePart (req, res) {
  try {
    const { partID } = req.params

    const isDeletePart = await partService.deleteOne(partID)

    if (!isDeletePart) {
      return res.status(400).json({
        isSuccess: false,
        message: 'cannot delete a part',
        data: false,
      })
    }

    return res.status(200).json({
      isSuccess: true,
      message: 'deleted part',
      data: true
    })
  } catch (error) {
    return res.status(400).json(error)
  }
}
export default {
  getListPart,
  getPart,
  createPart,
  updatePart,
  deletePart
}