const { Announcement } = require("../models");
const { v4: uuidv4 } = require("uuid");

const announcementController = {
  getAnnouncements: async (req, res) => {
    try {
      const announcements = await Announcement.findAll({
        order: [["created_at", "DESC"]],
      });

      res.status(200).json(announcements);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error in getting announcements!" });
    }
  },

  postAnnouncement: async (req, res) => {
    try {
      const { title, content } = req.body;
      const created_by = req.user.id;

      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are mandatory!" });
      }

      const newAnnouncement = await Announcement.create({
        id: uuidv4(),
        created_by,
        title,
        content,
      });

      res.status(201).json({
        message: "Announcement created succesfully!",
        announcement: newAnnouncement,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error in creating announcement!" });
    }
  },

  deleteAnnouncement: async (req, res) => {
    try {
      const announcementId = req.params.announcementId;

      const announcement = await Announcement.findByPk(announcementId);
      if (!announcement) {
        return res.status(404).json({ message: "Announcement not found!" });
      }

      await announcement.destroy();

      res.status(200).json({ message: "Announcement deleted successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting announcement!" });
    }
  },

};

module.exports = announcementController;