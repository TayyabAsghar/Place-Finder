import { Router } from "express";
import { handleRootRequest, handleFaviconRequest } from "../controllers/base.controller.js";

const router = Router();

router.get("", handleRootRequest);
router.get("/heart", handleRootRequest);
// router.get("/favicon.ico", handleFaviconRequest);

export default router;