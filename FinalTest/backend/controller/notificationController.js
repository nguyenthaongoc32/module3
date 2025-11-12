import NotificationModel from "../model/notificationModel.js";
import AuthModel from "../model/authModel.js";

export const createNotification = async(req,res) => {
    try{
        const userId = req.user.id;
        const {title , message} = req.body;

        const newNotification = new NotificationModel({
            userId,
            title,
            message

        })
        await newNotification.save()
        await AuthModel.findByIdAndUpdate(userId, {
            $push: {notifications: newNotification._id}
        })
        res.status(201).json(newNotification);
    } catch (error) {
      console.error("Error creating notification:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const getAllNotifications = async(req,res) => {
    try{
        const notifications = await NotificationModel.find();
        res.status(200).json(notifications)
    }catch(error){
        console.error("Error getting notifications:", error);
        res.status(500).json({ message: "Server error" });
    }
  }

  export const getNotificationByUserId = async(req,res) => {
    try{
        const userId = req.user.id || req.params.userId;
        const notifications = await NotificationModel.find({
            userId
        });
        res.status(200).json(notifications)
    }catch (error) {
        console.error("Error getting notifications by user:", error);
        res.status(500).json({ message: "Server error" });
      }
    };

    export const markAsRead = async(req,res) => {
        try{
            const notificationId = req.params.id;
            const notification = await NotificationModel.findByIdAndUpdate(
                notificationId,
                {isRead:true},
                {new:true}
            )
            if (!notification) {
                return res.status(404).json({ message: "Notification not found" });
              }
              res.status(200).json(notification);
            } catch (error) {
              console.error("Error marking notification as read:", error);
              res.status(500).json({ message: "Server error" });
            }
          };

          export const deleteNotification = async(req,res) => {
            try {
                const notificationId = req.params.id;
                const notification = await NotificationModel.findByIdAndDelete(notificationId);
                if (!notification) {
                  return res.status(404).json({ message: "Notification not found" });
                }
                res.status(200).json({ message: "Notification deleted" });
              } catch (error) {
                console.error("Error deleting notification:", error);
                res.status(500).json({ message: "Server error" });
              }
            };