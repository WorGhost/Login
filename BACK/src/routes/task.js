import {Router} from 'express'
import { authRequire } from '../middlewares/validateToken.js'
import { getTask, getTasks , editTasks, deleteTasks, createTask } from '../controllers/task.js'
import { createTaskSchema } from '../schemas/task.js'
import { validateSchema } from '../middlewares/validator.js'

const router = Router()

router.get('/tasks' , authRequire , getTasks)
router.get('/tasks/:id' , authRequire , getTask)
router.post('/tasks' , authRequire, validateSchema(createTaskSchema), createTask)
router.delete('/tasks/:id' , authRequire, deleteTasks )
router.put('/tasks/:id' , authRequire , editTasks)

export default router