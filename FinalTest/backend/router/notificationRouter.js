import express from "express"
import {authMiddleware} from "../middleware/checkAuth.js"
import {getAllNotifications,getNotificationByUserId,createNotification,markAsRead,deleteNotification,} from "../controller/notificationController.js"

const router  = express.Router()

router.post("/", authMiddleware,createNotification);
router.get(
  "/:userId",
  authMiddleware,
  getNotificationByUserId
);
router.get("/", getAllNotifications);
router.put("/:id/read", markAsRead);
router.delete("/:id",deleteNotification);


export default router