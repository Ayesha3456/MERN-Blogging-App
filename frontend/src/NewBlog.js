import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateBlog, UpdateBlogById } from "./api";
import { notify } from "./utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container } from "react-bootstrap";

function NewBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [updateBlog, setUpdateBlog] = useState(null);
  const [initialTitle, setInitialTitle] = useState("");
  const [initialDescription, setInitialDescription] = useState("");

  useEffect(() => {
    if (location.state?.blog) {
      const { blogTitle, blogDescription } = location.state.blog;
      setUpdateBlog(location.state.blog);
      setInputTitle(blogTitle);
      setInputDescription(blogDescription);
      setInitialTitle(blogTitle);
      setInitialDescription(blogDescription);
    }
  }, [location.state?.blog]);

  const handleBlog = async () => {
    let errorMessage = "";

    if (!inputTitle.trim()) {
      errorMessage += "Title cannot be empty. ";
    }
    if (!inputDescription.trim()) {
      errorMessage += "Description cannot be empty.";
    }

    if (errorMessage) {
      notify(errorMessage.trim(), "error");
      return;
    }

    // Check if there are any changes
    if (
      updateBlog &&
      inputTitle.trim() === initialTitle.trim() &&
      inputDescription.trim() === initialDescription.trim()
    ) {
      notify("No changes made", "info");
      navigate("/blogs"); // Redirect to blogs page even if no changes
      return;
    }

    const blogData = {
      blogTitle: inputTitle,
      blogDescription: inputDescription,
    };

    try {
      if (updateBlog) {
        await UpdateBlogById(updateBlog._id, blogData);
        notify("Blog updated successfully", "success");
      } else {
        await CreateBlog(blogData);
        notify("Blog created successfully", "success");
      }
      navigate("/blogs");
    } catch (err) {
      console.error(err);
      notify("Failed to save blog", "error");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header sizes
      [{ font: [] }], // Font families
      [{ size: ["small", "medium", "large", "huge"] }], // Font sizes
      ["bold", "italic", "underline", "strike", "blockquote"], // Text formatting
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ indent: "-1" }, { indent: "+1" }], // Indentation
      ["link", "image", "video"], // Media
      ["clean"], // Clear formatting
      [{ color: [] }, { background: [] }], // Text and background color
      [{ align: [] }], // Text alignment
      [{ script: "sub" }, { script: "super" }], // Subscript and superscript
      [{ direction: "rtl" }], // Text direction (right-to-left)
      ["code-block"], // Code blocks
      ["blockquote"], // Blockquotes
    ],
  };

  return (
    <Container className='pt-2 inner2'>
      <h1 className="mb-4 text-center">{updateBlog ? "Update Blog" : "New Blog"}</h1>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="blogTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="blogTitle"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="blogDescription" className="form-label">
              Description
            </label>
            <ReactQuill
              id="blogDescription"
              className="ax-quill"
              theme="snow"
              value={inputDescription}
              onChange={setInputDescription}
              modules={modules}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleBlog}
          >
            {updateBlog ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </div>
    </Container>
  );
}

export default NewBlog;
