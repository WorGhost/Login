import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js";
import {
  getHours,
  editHours,
  deleteHours,
  createHour,
} from "../controllers/hour.js";
import { createHourSchema } from "../schemas/hour.js";
import { validateSchema } from "../middlewares/validator.js";

const router = Router();

router
  .route("/project/:idProject/phase/:idPhase/hour")
  .get(authRequire, getHours)
  .post(authRequire, validateSchema(createHourSchema), createHour);
router
  .route("/project/:idProject/phase/:idPhase/hour/:id")
  .delete(authRequire, deleteHours)
  .put(authRequire, editHours);

export default router;
