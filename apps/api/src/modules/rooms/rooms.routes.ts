import { Router } from "express";
import * as roomsController from "./rooms.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

const router = Router();

const STAFF_ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER", "RECEPTIONIST"];

// Public
router.post("/availability", roomsController.checkAvailability);
router.get("/types", roomsController.listRoomTypes);
router.get("/", roomsController.listRooms);
router.get("/:id", roomsController.getRoomById);

// Staff only
router.post("/types", authMiddleware, requireRole(...STAFF_ROLES), roomsController.createRoomType);
router.patch("/types/:id", authMiddleware, requireRole(...STAFF_ROLES), roomsController.updateRoomType);
router.delete("/types/:id", authMiddleware, requireRole(...STAFF_ROLES), roomsController.deleteRoomType);

router.post("/", authMiddleware, requireRole(...STAFF_ROLES), roomsController.createRoom);
router.patch("/:id", authMiddleware, requireRole(...STAFF_ROLES), roomsController.updateRoom);
router.patch(
  "/:id/status",
  authMiddleware,
  requireRole(...STAFF_ROLES, "HOUSEKEEPING", "MAINTENANCE"),
  roomsController.updateRoomStatus
);
router.delete("/:id", authMiddleware, requireRole(...STAFF_ROLES), roomsController.deleteRoom);

export default router;