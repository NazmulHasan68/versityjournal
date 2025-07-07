import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import {
  createThesis,
  getAllTheses,
  getThesisById,
  updateThesis,
  deleteThesis,
  incrementView
} from '../controllers/thesis_controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// ✅ Create destination folder if not exists
const storageDir = 'public/thesis';
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}

// ✅ Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storageDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });


router.post( '/', 
    upload.fields([{ name: 'cover', maxCount: 1 }, 
    { name: 'fileUrl', maxCount: 1 } ]), 
    verifyToken ,
    createThesis
);

router.get('/', getAllTheses);
router.get('/:id', getThesisById);

router.put( '/:id', upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'fileUrl', maxCount: 1 }
  ]),
  updateThesis
);

router.delete('/:id', deleteThesis);
router.put('/view/:id', incrementView);

export default router;
