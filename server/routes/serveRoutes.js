import { Router } from "express";
const router = Router();

import {
  saveInfosLoginPost,
  verifyEmailAlreadyExist,
  verifyDataToLogin,
} from "../controller/InfosLoginController.js";
import { forgetPassword } from "../controller/ForgetPasswordController.js";


router.post("/saveInfosLogin", saveInfosLoginPost);
router.get("/verifyEmailAlreadyExist/:email", verifyEmailAlreadyExist);
router.get("/verifyDataToLogin/:email/:password", verifyDataToLogin);

router.post("/forgetEmail", forgetPassword);

export default router;
