import { Router } from "express";
import * as paymentsController from "./payments.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

const router = Router();

const FINANCE_ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER", "CASHIER", "ACCOUNTANT"];

router.use(authMiddleware, requireRole(...FINANCE_ROLES));

router.post("/", paymentsController.createPayment);
router.get("/", paymentsController.listPayments);
router.get("/:id", paymentsController.getPaymentById);
router.patch("/:id/status", paymentsController.updatePaymentStatus);
router.post("/:id/refund", paymentsController.refundPayment);

export default router;