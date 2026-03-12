import express from "express"
import { login, registerUser, updateUser } from "../controllers/userController.js"
import { adminOnly, protect } from "../middlewares/authmiddleware.js"

const router = express.Router()

router.post("/registerUser", registerUser)
router.post("/login", login)
router.put("/update/:id", protect, adminOnly, updateUser)




export const userRout = router