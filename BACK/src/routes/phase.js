import Router from 'express'
import { createPhase } from '../controllers/phase.js'

const router = Router()

router.route('/project/:idProject/phase')
   .post(createPhase)

export default router