import { Router } from "express";
import * as guestsController from "./guests.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

const router = Router();

const STAFF_ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER", "RECEPTIONIST"];

router.use(authMiddleware, requireRole(...STAFF_ROLES));

router.post("/", guestsController.createGuest);
router.get("/", guestsController.listGuests);
router.get("/:id", guestsController.getGuestById);
router.get("/:id/stats", guestsController.getGuestStats);
router.patch("/:id", guestsController.updateGuest);
router.delete("/:id", guestsController.deleteGuest);

export default router;