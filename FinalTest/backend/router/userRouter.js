import express from "express"
import verifyToken from "../middleware/verifyToken.js"
import allowRoles from "../middleware/allowRoles.js"
import { getAllUsers , getUserProfile, updateUserProfile } from "../controller/userController.js"

const Router = express.Router()

Router.route("/").get(verifyToken,allowRoles("ADMIN"),getAllUsers)
Router.route("/profile").get(verifyToken, allowRoles("CUSTOMER", "ADMIN"),getUserProfile)
Router.route("/profile").put(verifyToken, allowRoles("CUSTOMER", "ADMIN"), updateUserProfile)

export default Router