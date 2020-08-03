import { Router } from "express";
import PlayerController from "../controllers/PlayerController";
const router = Router();

router.post("/append", PlayerController.append);
router.get("/play", PlayerController.play);

export default router;
