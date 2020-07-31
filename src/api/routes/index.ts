import { Router } from "express";
const router = Router();

router.use("/", (req, res) => {
  return res.json({ message: "Hello, world!" });
});

export default router;
