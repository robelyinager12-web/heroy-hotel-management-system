import { Router } from "express";
import * as restaurantController from "./restaurant.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

const router = Router();

const RESTAURANT_STAFF = ["SUPER_ADMIN", "ADMIN", "MANAGER", "RESTAURANT", "KITCHEN", "CASHIER"];

// Public — guests can view the menu and place orders without logging in
router.get("/menu", restaurantController.listMenuItems);
router.post("/orders", restaurantController.createOrder);

// Staff only
router.post("/menu", authMiddleware, requireRole(...RESTAURANT_STAFF), restaurantController.createMenuItem);
router.patch("/menu/:id", authMiddleware, requireRole(...RESTAURANT_STAFF), restaurantController.updateMenuItem);
router.delete("/menu/:id", authMiddleware, requireRole(...RESTAURANT_STAFF), restaurantController.deleteMenuItem);

router.get("/orders", authMiddleware, requireRole(...RESTAURANT_STAFF), restaurantController.listOrders);
router.get("/orders/:id", authMiddleware, requireRole(...RESTAURANT_STAFF), restaurantController.getOrderById);
router.patch(
  "/orders/:id/status",
  authMiddleware,
  requireRole(...RESTAURANT_STAFF),
  restaurantController.updateOrderStatus
);

export default router;