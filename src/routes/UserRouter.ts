import { Router } from "express";
import { UserController } from "../controllers";
import { authenticateJWT } from "../middlewares/jwtAuthenticator";
const router = Router();

router.get("/", authenticateJWT, UserController.get);
router.post("/", UserController.post);
router.patch("/", authenticateJWT, UserController.patch);

module.exports = router;
