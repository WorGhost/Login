import { Router } from "express";
import { createProyect } from "../controllers/proyect.js";

const router = Router();

router.post("/create", createProyect);

export default router;