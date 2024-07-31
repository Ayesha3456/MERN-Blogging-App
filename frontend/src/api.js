import { API_URL } from "./utils";

export const CreateBlog = async (blogObj) => {
    const url = `${API_URL}/blog`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogObj)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error creating blog:', err);
        return { success: false, message: 'Failed to create blog' };
    }
};

export const GetAllBlogs = async () => {
    const url = `${API_URL}/blog`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error fetching blogs:', err);
        return { success: false, message: 'Failed to fetch blogs' };
    }
};

export const DeleteBlogById = async (id) => {
    const url = `${API_URL}/blog/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error deleting blog:', err);
        return { success: false, message: 'Failed to delete blog' };
    }
};

export const UpdateBlogById = async (id, reqBody) => {
    const url = `${API_URL}/blog/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error updating blog:', err);
        return { success: false, message: 'Failed to update blog' };
    }
};
