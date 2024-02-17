import express from "express";
import { signin, signup, googleLogin } from "../controllers/user.js";

const router = express.Router();

router.post("/localSignIn", signin);
router.post("/signup", signup);
router.post("/googleLogin", googleLogin);

export default router;
