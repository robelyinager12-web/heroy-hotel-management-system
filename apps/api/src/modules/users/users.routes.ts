import { Router } from "express";
import * as usersController from "./users.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

const router = Router();

// Only Super Admin and Admin can manage staff accounts and roles
const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"];

router.use(authMiddleware, requireRole(...ADMIN_ROLES));

router.post("/", usersController.createStaffUser);
router.get("/", usersController.listUsers);
router.get("/:id", usersController.getUserById);
router.patch("/:id", usersController.updateUser);
router.post("/:id/deactivate", usersController.deactivateUser);
router.post("/:id/reactivate", usersController.reactivateUser);

export default router;