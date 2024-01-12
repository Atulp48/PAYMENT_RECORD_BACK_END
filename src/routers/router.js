import express from "express";
import { authenticatt } from "../utils/midddlesr/atthenticatt.js";
const router = express.Router();
import {register, login, getuse,logout } from "../utils/utils.js";


router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", authenticatt, getuse);


export default router;