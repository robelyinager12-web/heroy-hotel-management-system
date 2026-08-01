import { Router } from "express";
import * as reservationsController from "./reservations.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

const router = Router();

const STAFF_ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER", "RECEPTIONIST"];

// Guests can create their own booking; staff can also book on behalf of guests
router.post("/", reservationsController.createReservation);

// Guest — must come before "/:id" or Express will treat "mine" as an id param
router.get("/mine", authMiddleware, reservationsController.getMyReservations);

// Staff only
router.get("/", authMiddleware, requireRole(...STAFF_ROLES), reservationsController.listReservations);
router.get("/:id", authMiddleware, requireRole(...STAFF_ROLES), reservationsController.getReservationById);
router.patch(
  "/:id/status",
  authMiddleware,
  requireRole(...STAFF_ROLES),
  reservationsController.updateReservationStatus
);
router.post(
  "/:id/cancel",
  authMiddleware,
  requireRole(...STAFF_ROLES),
  reservationsController.cancelReservation
);

export default router;