import express from "express";
import { createMsg, deleteMsg, getMsg, getMsgById, updateMsg, upload } from "../controllers/MsgController.js";

const router = express.Router();

router.get("/notebook", getMsg);
router.get("/notebook/:id", getMsgById);
router.post('/add-notes', upload.single('photo'), createMsg);
router.put("/edit-notes/:id", upload.single('photo'), updateMsg); 
router.delete("/delete-notes/:id", deleteMsg);

export default router;
