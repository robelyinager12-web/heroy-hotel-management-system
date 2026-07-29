import { Router } from "express";
import * as housekeepingController from "./housekeeping.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

const router = Router();

const HOUSEKEEPING_ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER", "HOUSEKEEPING"];

router.use(authMiddleware, requireRole(...HOUSEKEEPING_ROLES));

router.get("/priority-queue", housekeepingController.getCleaningPriorityQueue);
router.post("/", housekeepingController.createLog);
router.get("/", housekeepingController.listLogs);
router.get("/:id", housekeepingController.getLogById);
router.patch("/:id", housekeepingController.updateLog);
router.post("/:id/start", housekeepingController.startCleaning);
router.post("/:id/complete", housekeepingController.completeCleaning);

export default router;