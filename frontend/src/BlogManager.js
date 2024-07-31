import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import BlogList from './BlogList';
import NewBlog from './NewBlog';
import { CreateNote, DeleteNoteById, GetAllNotes, UpdateNoteById } from './api';
import { notify } from './utils';
import { FaPlus } from 'react-icons/fa';

function BlogManager() {
    const [blogs, setBlogs] = useState([]); // Renamed to 'blogs' for clarity
    const [updateBlog, setUpdateBlog] = useState(null);
    const [viewBlog, setViewBlog] = useState(null);
    const [showBlogModal, setShowBlogModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    const fetchAllBlogs = async () => {
        try {
            const { data } = await GetAllNotes(); // Assuming this fetches all blogs
            setBlogs(data || []); // Ensure blogs is always an array
        } catch (err) {
            console.error(err);
            notify('Failed to fetch blogs', 'error');
        }
    };

    const handleAddOrUpdateBlog = async (blog) => {
        if (blog._id) {
            await handleUpdateBlogById(blog);
        } else {
            await handleAddBlog(blog);
        }
        setShowBlogModal(false);
        setUpdateBlog(null);
    };

    const handleAddBlog = async (blog) => {
        try {
            const { success, message } = await CreateNote(blog);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            fetchAllBlogs();
        } catch (err) {
            console.error(err);
            notify('Failed to create blog', 'error');
        }
    };

    const handleUpdateBlogById = async (blog) => {
        try {
            const { success, message } = await UpdateNoteById(blog._id, blog);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            fetchAllBlogs();
        } catch (err) {
            console.error(err);
            notify('Failed to update blog', 'error');
        }
    };

    const handleDeleteBlog = async (id) => {
        try {
            const { success, message } = await DeleteNoteById(id);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            fetchAllBlogs();
        } catch (err) {
            console.error(err);
            notify('Failed to delete blog', 'error');
        }
    };

    const formatDescription = (description) => {
        return description.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className='d-flex flex-column align-items-center w-75 m-auto mt-5'>
            <h1 className='mb-4'>Blogs Manager</h1>
            <ToastContainer />
            <button
                type='button'
                className='btn btn-primary mb-3'
                onClick={() => setShowBlogModal(true)}
            >
                Add Blog <FaPlus />
            </button>

            <BlogList
                blogs={blogs} // Ensure this is always an array
                onEdit={(blog) => {
                    setUpdateBlog(blog);
                    setShowBlogModal(true);
                }}
                onDelete={handleDeleteBlog}
                onView={(blog) => {
                    setViewBlog(blog);
                    setShowViewModal(true);
                }}
            />

            {showBlogModal && (
                <NewBlog
                    blog={updateBlog}
                    onSubmit={handleAddOrUpdateBlog}
                    onClose={() => {
                        setShowBlogModal(false);
                        setUpdateBlog(null);
                    }}
                />
            )}

            {showViewModal && (
                <div className='modal show d-block' tabIndex='-1'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>
                                    {viewBlog ? viewBlog.blogTitle : ''}
                                </h5>
                                <button
                                    type='button'
                                    className='btn-close'
                                    onClick={() => setShowViewModal(false)}
                                ></button>
                            </div>
                            <div className='modal-body'>
                                <p className="break-word">
                                    {viewBlog ? formatDescription(viewBlog.blogDescription) : ''}
                                </p>
                            </div>
                            <div className='modal-footer'>
                                <button
                                    type='button'
                                    className='btn btn-secondary'
                                    onClick={() => setShowViewModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BlogManager;