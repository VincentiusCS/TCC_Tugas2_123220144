import multer from 'multer';
import Message from '../models/MsgModel.js';

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pastikan folder "uploads/" ada
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Hindari nama file duplikat
    }
});

const upload = multer({ storage });

// GET ALL NOTES
async function getMsg(req, res) {
    try {
        const response = await Message.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Error fetching notes" });
    }
}

// CREATE NOTES
async function createMsg(req, res) {
  try {
      console.log("Body:", req.body);   // Debugging
      console.log("File:", req.file);   // Debugging

      const inputResult = {
          notes: req.body.message,  
          pictures: req.file ? req.file.filename : null  
      };

      await Message.create(inputResult);
      res.status(201).json({ msg: "Notes Created" });
  } catch (error) {
      console.log("Database Error:", error.message);
      res.status(500).json({ msg: "Error creating notes" });
  }
}


// GET NOTE BY ID
export const getMsgById = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({ msg: "Notes not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Error fetching note" });
    }
};

// UPDATE NOTES
export const updateMsg = async (req, res) => {
    try {
        // Cek apakah note dengan ID tersebut ada
        const message = await Message.findByPk(req.params.id);
        if (!message) {
            return res.status(404).json({ msg: "Note not found" });
        }

        // Cek apakah ada file baru, jika tidak pakai gambar lama
        const updatedData = {
            notes: req.body.message || message.notes,  // Jika tidak ada pesan baru, pakai yang lama
            pictures: req.file ? req.file.filename : message.pictures  // Jika tidak ada file baru, pakai yang lama
        };

        // Lakukan update
        await Message.update(updatedData, { where: { id: req.params.id } });

        // Ambil ulang data setelah update
        const updatedNote = await Message.findByPk(req.params.id);

        console.log("Updated Note:", updatedNote);  // Debugging

        res.status(200).json({ msg: "Note Updated", note: updatedNote });
    } catch (error) {
        console.error("Update Error:", error.message);
        res.status(500).json({ msg: "Error updating note" });
    }
};


// DELETE NOTES
export const deleteMsg = async (req, res) => {
    try {
        await Message.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json({ msg: "Notes Deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Error deleting note" });
    }
};

// Export Upload Middleware
export { getMsg, createMsg, upload };
