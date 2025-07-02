const express = require("express")
const { RegisterUser, Login, VerifyToken } = require("../controller/authController")
const { Authentication } = require("../middleware/auth.middleware")
const { createResume, fetchResume, updateResume, fetchSingleResume, deleteResume, razerPayment } = require("../controller/resumeController")
const router = express.Router()


router.post("/register", RegisterUser)
router.post("/login", Login)

router.use(Authentication)

router.get("/verifyToken", VerifyToken)

router.get("/fetchUserResume", fetchResume)
router.get("/fetchSingleResume", fetchSingleResume)
router.post("/createResume", createResume)
router.patch("/updateResume/:id", updateResume)
router.delete("/deleteResume/:id", deleteResume)
router.post("/razerPayment", razerPayment)


module.exports = router