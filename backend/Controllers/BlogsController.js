const BlogsModel = require("../Models/BlogsModel");

// Create a new blog
const createBlogs = async (req, res) => {
    const data = req.body;
    try {
        const model = new BlogsModel(data);
        await model.save();
        res.status(201).json({ message: 'Blog is created', success: true });
    } catch (err) {
        console.error('Error creating blog:', err);
        res.status(500).json({ message: 'Failed to create Blog', success: false });
    }
}

// Fetch all blogs
const fetchAllBlogs = async (req, res) => {
    try {
        const data = await BlogsModel.find({});
        res.status(200).json({ message: 'All Blogs', success: true, data });
    } catch (err) {
        console.error('Error fetching all blogs:', err);
        res.status(500).json({ message: 'Failed to get all Blogs', success: false });
    }
}

// Update a blog by ID
const updateBlogsById = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const updateData = { $set: { ...body } };

    try {
        await BlogsModel.findByIdAndUpdate(id, updateData);
        res.status(200).json({ message: 'Blog Updated', success: true });
    } catch (err) {
        console.error(`Error updating blog with ID ${id}:`, err);
        res.status(500).json({ message: 'Failed to update Blog', success: false });
    }
}

// Delete a blog by ID
const deleteBlogsById = async (req, res) => {
    const id = req.params.id;
    try {
        await BlogsModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Blog is deleted', success: true });
    } catch (err) {
        console.error(`Error deleting blog with ID ${id}:`, err);
        res.status(500).json({ message: 'Failed to delete Blog', success: false });
    }
}

module.exports = {
    createBlogs,
    fetchAllBlogs,
    updateBlogsById,
    deleteBlogsById
}
