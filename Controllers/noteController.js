const Note = require("../Models/noteModel");

module.exports = {
  //create new note
  addNote: async (req, res) => {
    try {
      const { title, description, content } = req.body;
      const id = req.user_id
      console.log(id)
      const newNote = await Note.create({
        title,
        description,
        content,
        user_id: id
      });
      res.status(201).json({ message: "New note added" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //get all notes
  getAllNotes: async (req, res) => {
    try {
      const pageSize = 5;

      const { pageNumber = 1, title } = req.query;
      const id = req.user_id

      const searchQuery = {
          user_id:  id
      };

      if (title) {
        searchQuery.title = title;
      }
      const skip = (pageNumber - 1) * pageSize;

      const notes = await Note.find(searchQuery)
        .skip(skip)
        .limit(pageSize)
        .sort({ createdAt: -1 });
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //get single note
  getOneNote: async (req, res) => {
    try {
      const { id } = req.params;
      const note = await Note.findById(id);
      res.status(200).json(note);
    } catch (error) {
        res.status(500).json({})
    }
  },

  //update note
  updateNote: async (req, res) => {
    try {
        const {title,description,content} = req.body
        const {id} = req.params
        console.log(id)

        const updatedNote = await Note.findByIdAndUpdate(id,{title,description,content})
        res.status(201).json({message:"Note updated successfully"})

    } catch (error) {
        console.log(error)
    }
  },

  //delete a note
  deleteNote: async (req, res) => {
    try {
        const {id} = req.params
        const deleted = await Note.findByIdAndDelete(id)
        res.status(200).json({message:"Note deleted succesfully"})
    } catch (error) {
        console.log(error)
    }
  },
};
