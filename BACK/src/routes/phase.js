import Router from 'express'
import { createPhase } from '../controllers/phase.js'
import { authRequire } from '../middlewares/validateToken.js'

const router = Router()

router.route('/project/:idProject/phase')
   .post( authRequire,createPhase)

export default router