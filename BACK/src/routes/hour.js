import {Router} from 'express'
import { authRequire } from '../middlewares/validateToken.js'
import { getHour, getHours , editHours, deleteHours, createHour } from '../controllers/hour.js'
import { createHourSchema } from '../schemas/hour.js'
import { validateSchema } from '../middlewares/validator.js'

const router = Router()

router.get('/hours' , authRequire , getHours)
router.get('/hours/:id' , authRequire , getHour)
router.post('/hours' , authRequire, validateSchema(createHourSchema), createHour)
router.delete('/hours/:id' , authRequire, deleteHours )
router.put('/hours/:id' , authRequire , editHours)

export default router