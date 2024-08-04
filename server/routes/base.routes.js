import { Router } from "express";
import { handleRootRequest } from "../controllers/base.controller.js";

const router = Router();

router.get("", handleRootRequest);
router.get("/heart", handleRootRequest);

export default router;