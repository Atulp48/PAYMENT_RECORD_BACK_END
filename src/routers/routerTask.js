import express from "express"
import { newTsk, fndTsk, updtTsk, dlttTsk } from "../utils/utilsTask.js";
import { authenticatt } from "../utils/midddlesr/atthenticatt.js";


const router = express.Router();

router.post("/new", authenticatt, newTsk);
router.get("/my", authenticatt, fndTsk);
router.put("/:id", authenticatt, updtTsk);
router.delete("/:id", authenticatt, dlttTsk);


export default router;