import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetAllBlogs, DeleteBlogById } from './api';
import { notify } from './utils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Modal, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [viewBlog, setViewBlog] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const navigate = useNavigate();
    const maxDescriptionLength = 100; // Set maximum length for description

    const fetchAllBlogs = async () => {
        try {
            const { data } = await GetAllBlogs();
            setBlogs(data);
        } catch (err) {
            console.error(err);
            notify('Failed to fetch blogs', 'error');
        }
    };

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    const handleDeleteBlog = async (id) => {
        try {
            const { success, message } = await DeleteBlogById(id);
            notify(message, success ? 'success' : 'error');
            if (success) {
                fetchAllBlogs(); // Refresh blog list
            }
        } catch (err) {
            console.error(err);
            notify('Failed to delete blog', 'error');
        }
    };

    const handleEditBlog = (blog) => {
        navigate('/new-blog', { state: { blog } });
    };

    return (
        <Container className='pt-2 inner2'>
            <h1 className='mb-4 text-center text-white'>Blog List</h1>
            <div className='text-center mb-4'>
                <Button
                    variant='primary'
                    onClick={() => navigate('/new-blog')}
                >
                    Add New Blog
                </Button>
            </div>
            {blogs.length === 0 ? (
                <p className='text-center text-white'>No data available</p>
            ) : (
                <Row>
                    {blogs.map((blog) => (
                        <Col key={blog._id} md={4} className='mb-4'>
                            <Card className='text-bg-light'>
                                <Card.Header className='fw-bold'>{blog.blogTitle}</Card.Header>
                                <Card.Body className='bg-white'>
                                    <div className='description-container'>
                                        <ReactQuill 
                                            value={blog.blogDescription.substring(0, maxDescriptionLength)} 
                                            readOnly={true} 
                                            theme='bubble'
                                            modules={{toolbar: false}}
                                        />
                                        {blog.blogDescription.length > maxDescriptionLength && (
                                            <div className='mt-2'>
                                                <Button
                                                    variant='link'
                                                    className='p-0'
                                                    onClick={() => {
                                                        setViewBlog(blog);
                                                        setShowViewModal(true);
                                                    }}
                                                >
                                                    Read More
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </Card.Body>
                                <Card.Footer className='d-flex justify-content-between'>
                                    <Button
                                        variant='info'
                                        size='sm' className='btn btn-warning'
                                        onClick={() => handleEditBlog(blog)}
                                    >
                                        <FaEdit> </FaEdit><span className='mx-2'>Edit</span>
                                    </Button>
                                    <Button
                                        variant='danger'
                                        size='sm' className='btn btn-warning'
                                        onClick={() => handleDeleteBlog(blog._id)}
                                    ><FaTrash> </FaTrash><span className='mx-2'>
                                        Delete</span>
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
            {showViewModal && (
                <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{viewBlog ? viewBlog.blogTitle : ''}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ReactQuill 
                            value={viewBlog ? viewBlog.blogDescription : ''} 
                            readOnly={true} 
                            theme='bubble'
                            modules={{toolbar: false}}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={() => setShowViewModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
}

export default Blogs;
