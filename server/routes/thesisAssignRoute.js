import express from "express";
import {
  createAssignment,
  getAssignmentByThesis,
  addNote,
  updateStatus,
  getAllAssignments,
  getAssignmentsByReviewer,
  getAssignmentsBySubEditor,
} from "../controllers/thesisAssignController.js";

const router = express.Router();

router.post("/assignments", createAssignment);
router.get("/assignments/thesis/:thesisId", getAssignmentByThesis);
router.patch("/assignments/:id/note", addNote);
router.patch("/assignments/:id/status", updateStatus);

router.get("/assignments", getAllAssignments);
router.get("/assignments/reviewer/:reviewerId", getAssignmentsByReviewer);
router.get("/assignments/subeditor/:subEditorId", getAssignmentsBySubEditor);


export default router;
