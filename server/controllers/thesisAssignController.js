import { User } from "../models/authentication_model.js";
import ThesisAssignment from "../models/thesisAssign.js";
import Thesis from "../models/thesis_model.js";
import { sendEmailForStatus, sendEmailForUpdateStatusandMessage, sendEmailToAdmin, sendEmailToResearcher, sendEmailToReviwer, sendEmailToSubEditor } from "../resend/email.js";



// Create new assignment
export const createAssignment = async (req, res) => {
  try {
    const { thesisId, assignedSubEditor, assignedReviewer, status } = req.body;

    // Check if already assigned
    const existing = await ThesisAssignment.findOne({ thesisId });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Assignment already exists" });
    }

    // Create new assignment
    const assignment = new ThesisAssignment({
      thesisId,
      assignedSubEditor,
      assignedReviewer: assignedReviewer || null,
      status: status || "submitted",
    });

    await assignment.save();

    // Fetch thesis and user details
    const thesis = await Thesis.findById(thesisId).populate("author", "email name");
    if (!thesis) {
      return res.status(404).json({ success: false, message: "Thesis not found" });
    }

    const subEditor = await User.findById(assignedSubEditor);
    if (!subEditor) {
      return res.status(404).json({ success: false, message: "Sub-editor not found" });
    }

    // ✅ Update the status in the Thesis document
    thesis.status = status || "under_review";
    await thesis.save();

    // Send email notifications
    try {
      await sendEmailToResearcher(thesis.author.email, thesis.title, assignment.status, thesis._id);
      await sendEmailToSubEditor("n47712338@gmail.com", thesis.title, thesis._id);
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    // Final response
    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    console.error("Create Assignment error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get assignment by thesisId
export const getAssignmentByThesis = async (req, res) => {
  try {
    const { thesisId } = req.params;

    const assignment = await ThesisAssignment.findOne({ thesisId })
      .populate("assignedReviewer", "name email role")
      .populate("assignedSubEditor", "name email role")
      .populate("notes.by", "name email");

    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    console.error("Get Assignment error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Add a note
export const addNote = async (req, res) => {
  try {
    const { id } = req.params;  
    const { comment } = req.body;
    const userId = req.userId;

    if (!comment || !userId) {
      return res.status(400).json({ success: false, message: "Message and userId required" });
    }

    // Find the assignment by thesisId
    const assignment = await ThesisAssignment.findOne({ thesisId : id });
    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    const thesis = await Thesis.findById(id).populate("author");
    if (!thesis || !thesis.author?.email) {
      return res.status(404).json({ success: false, message: "Thesis or author not found" });
    }


    // ✅ Use 'message' to match the schema
    assignment.notes.push({ message: comment, by: userId });
    await assignment.save();

    await sendEmailForUpdateStatusandMessage(thesis.author.email, assignment.status, comment)

    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    console.error("Add Note error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




// ================================= ✅ Task: Assign Reviewer & Add Comment  ===== Reviwer
export const addNoteAndAssignReviewer = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, assignedReviewer } = req.body;
    const userId = req.userId;

    // Validate required fields
    if (!comment || !userId || !assignedReviewer) {
      return res.status(400).json({
        success: false,
        message: "Comment, userId, and Reviewer ID are required",
      });
    }

    // Find thesis assignment
    const assignment = await ThesisAssignment.findOne({ thesisId: id });
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    // Find thesis and author
    const thesis = await Thesis.findById(id).populate("author");

    if (!thesis || !thesis.author?.email) {
      return res.status(404).json({
        success: false,
        message: "Thesis or author not found",
      });
    }

    // Find reviewer
    const reviewer = await User.findById(assignedReviewer);
    if (!reviewer) {
      return res.status(404).json({
        success: false,
        message: "Reviewer not found!",
      });
    }

    // Push comment
    assignment.notes.push({ message: comment, by: userId });

   // Ensure assignedReviewer is an array
    if (!Array.isArray(assignment.assignedReviewer)) {
      assignment.assignedReviewer = [];
    }

    // Avoid duplicate
    if (!assignment.assignedReviewer.includes(assignedReviewer)) {
      assignment.assignedReviewer.push(assignedReviewer);
    }

    // Save updated assignment
    await assignment.save();

    // Send notification to researcher
    await sendEmailForUpdateStatusandMessage(
      thesis.author.email,
      assignment.status,
      comment
    );

    // Send notification to reviewer
    await sendEmailToReviwer(thesis.author.email, assignment.thesisId);

    // Success response
    res.status(200).json({
      success: true,
      message: "Note added and reviewer assigned successfully",
      data: assignment,
    });
  } catch (error) {
    console.error("❌ Error in addNoteAndAssignReviewer:", error);
    res.status(500).json({
      success: false,
      message: "Server error while assigning reviewer",
      error: error.message,
    });
  }
};



export const addAcceptsendAdmit = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, assignedadmin } = req.body;
    const userId = req.userId;

    // Validate required fields
    if (!comment || !userId || !assignedadmin) {
      return res.status(400).json({
        success: false,
        message: "Comment, userId, and Reviewer ID are required",
      });
    }

    // Find thesis assignment
    const assignment = await ThesisAssignment.findOne({ thesisId: id });
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    // Find thesis and author
    const thesis = await Thesis.findById(id).populate("author");

    if (!thesis || !thesis.author?.email) {
      return res.status(404).json({
        success: false,
        message: "Thesis or author not found",
      });
    }

    // Find reviewer
    const admin = await User.findById(assignedadmin);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!",
      });
    }

    // Push comment
    assignment.notes.push({ message: comment, by: userId });

    // Save updated assignment
    await assignment.save();

    // Send notification to researcher
    await sendEmailForUpdateStatusandMessage(
      thesis.author.email,
      assignment.status,
      comment
    );

    // Send notification to admin ====> ( admin.email )
    await sendEmailToAdmin(thesis.author.email, assignment.thesisId);

    // Success response
    res.status(200).json({
      success: true,
      message: "Note added and Admin assigned successfully",
      data: assignment,
    });


  } catch (error) {
    console.error("❌ Error in add Note And Assign Admin:", error);
    res.status(500).json({
      success: false,
      message: "Server error while assigning Admin",
      error: error.message,
    });
  }
};




// Update assignment status ============================ for status
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;  
    const { status } = req.body;

 
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const assignment = await ThesisAssignment.findOneAndUpdate(
      { thesisId: id },     
      { status },
      { new: true }
    );

    
    const thesis = await Thesis.findById(id).populate("author");
    
    if (!thesis || !thesis.author?.email) {
      return res.status(404).json({ success: false, message: "Thesis or author not found" });
    }
    thesis.status = status;
    await thesis.save()

    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    await sendEmailForStatus(thesis.author.email, status)

    res.status(200).json({ success: true, data: assignment });
  } catch (error) {
    console.error("Update Status error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};










//=============================================

//=============================================



// Get all assignments
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await ThesisAssignment.find()
      .populate("assignedReviewer", "name email role")
      .populate("assignedSubEditor", "name email role")
      .populate("notes.by", "name email");

    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    console.error("Get all assignments error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get assignments by reviewer
export const getAssignmentsByReviewer = async (req, res) => {
  try {
    const { reviewerId } = req.params;

    const assignments = await ThesisAssignment.find({ assignedReviewer: reviewerId })
      .populate("assignedReviewer", "name email role")
      .populate("assignedSubEditor", "name email role")
      .populate("notes.by", "name email")
      .populate({
        path:"thesisId",
        populate : {
          path: "author", 
          model: "User",  
        }}
      )

    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    console.error("Get assignments by reviewer error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get assignments by sub-editor
export const getAssignmentsBySubEditor = async (req, res) => {
  try {
    const { subEditorId } = req.params;

    const assignments = await ThesisAssignment.find({ assignedSubEditor: subEditorId })
      .populate("assignedReviewer", "name email role")
      .populate("assignedSubEditor", "name email role")
      .populate("notes.by", "name email")
      .populate({
        path: "thesisId",
        populate: [
          { path: "author", select: "name email role" },
          { path: "coAuthors", select: "name email role" },
        ],
      });

    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    console.error("Get assignments by sub-editor error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



