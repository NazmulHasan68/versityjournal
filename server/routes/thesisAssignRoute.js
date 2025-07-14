import express from "express";
import {
  createAssignment,
  getAssignmentByThesis,
  addNote,
  updateStatus,
  getAllAssignments,
  getAssignmentsByReviewer,
  getAssignmentsBySubEditor,
  addNoteAndAssignReviewer,
} from "../controllers/thesisAssignController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/assignments", createAssignment);
router.get("/assignments/thesis/:thesisId", getAssignmentByThesis);
router.patch("/assignments/:id/status", updateStatus);
router.patch("/assignments/:id/note",verifyToken, addNote); 
router.patch("/assignments/:id/note_and_assign",verifyToken, addNoteAndAssignReviewer); // add comment and assign form reviewer

router.get("/assignments", getAllAssignments);
router.get("/assignments/reviewer/:reviewerId", getAssignmentsByReviewer);
router.get("/assignments/subeditor/:subEditorId", getAssignmentsBySubEditor);


export default router;
