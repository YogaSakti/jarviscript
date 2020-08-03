import { Router } from "express";
import UserRoutes from "./UserRoutes";
import PlayerRoutes from "./PlayerRoutes";
const router = Router();

// router.use("/", (req, res) => {
//   return res.json({ message: "Hello, world!" });
// });

router.use("/api/user", UserRoutes);
router.use("/api/player", PlayerRoutes);

export default router;
