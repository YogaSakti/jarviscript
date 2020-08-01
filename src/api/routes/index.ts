import { Router } from "express";
import UserRoutes from "./UserRoutes";
const router = Router();

// router.use("/", (req, res) => {
//   return res.json({ message: "Hello, world!" });
// });

router.use("/api/user", UserRoutes);

export default router;
