import { Router } from "express";
import { createProject, deleteProject, viewProjects, editProject } from "../controllers/project.js";
import { authRequire } from "../middlewares/validateToken.js";
import { verifyToken } from "../controllers/auth.js";

const router = Router();

router.route('/project')
    .get(authRequire, viewProjects)
    .post(authRequire, createProject)


router.route("/project/:projectId")
    .put(authRequire, editProject)
    .delete(authRequire, deleteProject)


export default router;