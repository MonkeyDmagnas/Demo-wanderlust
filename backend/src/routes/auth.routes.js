import { Router } from "express";
import {
  userLogin,
  userLogout,
  signUpWithEmail,
  isLoggedIn,
} from "../controllers/auth.controller.js";
import { VerifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(signUpWithEmail);
router.route("/login").post(userLogin);
router.route("/logout").post(VerifyToken, userLogout);
router.get("/check/:_id", isLoggedIn);

export default router;
