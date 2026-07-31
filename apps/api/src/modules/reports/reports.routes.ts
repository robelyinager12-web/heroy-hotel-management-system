import { Router } from "express";
import * as reportsController from "./reports.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

const router = Router();

const MANAGEMENT_ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER", "ACCOUNTANT"];

router.use(authMiddleware, requireRole(...MANAGEMENT_ROLES));

router.get("/revenue", reportsController.revenueReport);
router.get("/occupancy", reportsController.occupancyReport);

export default router;