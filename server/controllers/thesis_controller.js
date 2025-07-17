import Thesis from '../models/thesis_model.js';
import { User } from "../models/authentication_model.js";
import fs from 'fs';
import path from 'path';


export const createThesis = async (req, res) => {
  try {
    const userId = req.userId; 
    const { body, files } = req;

    // Parse coAuthorsEmails from JSON string in the request body
    let coAuthorsEmails = [];
    if (body.coAuthorsEmails) {
      try {
        coAuthorsEmails = JSON.parse(body.coAuthorsEmails);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid coAuthorsEmails format. Must be JSON array string.' });
      }
    }

    // Find users by their email addresses
    const coAuthorsUsers = await User.find({ email: { $in: coAuthorsEmails } }, '_id');
    const coAuthorsIds = coAuthorsUsers.map(user => user._id);

    const coverPath = files.cover?.[0]?.path.replace(/\\/g, '/').replace(/^public\//, '') || '';
    const fileUrlPath = files.fileUrl?.[0]?.path.replace(/\\/g, '/').replace(/^public\//, '') || '';

    // Create new Thesis document
    const thesis = new Thesis({
      ...body,
      cover: coverPath,
      fileUrl: fileUrlPath,
      author: userId,
      coAuthors: coAuthorsIds,
    });

    await thesis.save();

    res.status(201).json({ message: 'Thesis created successfully.', thesis });
  } catch (error) {
    console.error('Error creating thesis:', error);
    res.status(400).json({ error: error.message });
  }
};



// Get all theses with optional filtering & pagination
export const getAllTheses = async (req, res) => {
  try {
    const { category, type, status, search, page = 1, limit = 10 } = req.query;

    const query = {};
    if (category) query.category = category;
    if (type) query.type = type;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { abstract: new RegExp(search, 'i') },
        { keywords: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const theses = await Thesis.find(query)
      .populate('author', 'name email')
      .populate('coAuthors', 'name email')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const count = await Thesis.countDocuments(query);

    res.json({ total: count, theses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single thesis by ID
export const getThesisById = async (req, res) => {

  
  try {
    const thesis = await Thesis.findById(req.params.id)
      .populate('author', 'name email')
      .populate('coAuthors', 'name email');

    if (!thesis) return res.status(404).json({ message: 'Thesis not found.' });

    res.json(thesis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update thesis
export const updateThesis = async (req, res) => {
  try {
    const thesis = await Thesis.findById(req.params.id);
    if (!thesis) return res.status(404).json({ message: 'Thesis not found.' });

    const { body, files } = req;

    // Remove old files if new ones are uploaded
    if (files.cover?.[0]) {
      if (thesis.cover && fs.existsSync(thesis.cover)) fs.unlinkSync(thesis.cover);
      thesis.cover = files.cover[0].path;
    }

    if (files.fileUrl?.[0]) {
      if (thesis.fileUrl && fs.existsSync(thesis.fileUrl)) fs.unlinkSync(thesis.fileUrl);
      thesis.fileUrl = files.fileUrl[0].path;
    }

    // Update other fields
    Object.assign(thesis, body);

    await thesis.save();
    res.json({ message: 'Thesis updated successfully.', thesis });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete thesis and its files
export const deleteThesis = async (req, res) => {
  try {
    const thesis = await Thesis.findById(req.params.id);
    if (!thesis) return res.status(404).json({ message: 'Thesis not found.' });

    // Delete files
    [thesis.cover, thesis.fileUrl].forEach(filePath => {
      if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await thesis.deleteOne();
    res.json({ message: 'Thesis and files deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Increment view count
export const incrementView = async (req, res) => {
  try {
    const thesis = await Thesis.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewed: 1 } },
      { new: true }
    );
    if (!thesis) return res.status(404).json({ message: 'Thesis not found.' });

    res.json({ message: 'View count updated.', thesis });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







export const updateThesisFormAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const updatedThesis = await Thesis.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedThesis) {
      return res.status(404).json({ success: false, message: "Thesis not found" });
    }

    res.status(200).json({
      success: true,
      message: "Thesis updated successfully",
      thesis: updatedThesis,
    });
  } catch (error) {
    console.error("Error updating thesis:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
