import Router from "express";
import {
  createPhase,
  viewPhase,
  deletePhase,
  editPhase,
} from "../controllers/phase.js";
import { authRequire } from "../middlewares/validateToken.js";

const router = Router();

router
  .route("/project/:idProject/phase")
  .post(authRequire, createPhase)
  .get(authRequire, viewPhase);

router
  .route("/project/:idProject/phase/:idPhase")
  .delete(authRequire, deletePhase)
  .put(authRequire, editPhase);

export default router;
