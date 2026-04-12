import React, { useState } from 'react'
import './App.css'

const App = () => {

  const [form, setForm] = useState({
    title: "",
    author :"",
    content :""
  });

  const [blogs, setBlogs] = useState([]);

  const [expandedId, setExpandedId] = useState(null)

  const [editId, setEditId] = useState(null)

  const createBlog = ()=>{
    const newBlog = {
      id : Date.now(),
      ...form
    }
    setBlogs([
      ...blogs,
      newBlog
    ])
    setForm({
      title :"",
      author:"",
      content:""
    })
  };

  const deleteBlog = (id)=>{
    const upadatedBlogs = blogs.filter((blog)=>blog.id !== id);
    setBlogs(upadatedBlogs)
  };

  const updateBlog = ()=>{
    const updateBlogs = blogs.map((blog)=> blog.id === editId ? {...blog , ...form} : blog)

    setBlogs(updateBlogs);

    setForm({
      title : "",
      author: "",
      content: ""
    })

    setEditId(null);
  };


  const toggleReadMore =(id)=>{
    setExpandedId(expandedId === id ? null : id)
  };

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  };

  const editBlog = (blog)=>{

    setForm({
      title : blog.title,
      author : blog.author,
      content : blog.content
    });

    setEditId(blog.id);
  }

  return (
    <div className='container'>
      <div className='form-section'>     
       <h2>{editId ? "Edit Blog" : "My Blog"}</h2>

      <input name='title' value= {form.title}  placeholder='Enter title' onChange={handleChange} />
      <input name='author' value= {form.author} placeholder='Enter author' onChange={handleChange} /> <br />
      <textarea name="content" value= {form.content} placeholder='Enter content...' onChange={handleChange}></textarea>

      <button onClick={editId? updateBlog : createBlog}>{editId ? "Update Blog" : "Create Blog"}</button>
      </div>
      <div className='blog-section'>
      <h3>All Blogs</h3>
      {blogs.map((blog)=>(
        <div key={blog.id} className='card'>
          <h4>{blog.title}</h4>
          <h5>{blog.author}</h5>
          <p className={expandedId === blog.id ? "full" : "short"}>
             {expandedId === blog.id ? blog.content : blog.content.substring(0, 200)}
             {blog.content.length > 200 && expandedId !== blog.id && "..."}
             
             {blog.content.length > 200 && (
              <span className="read-more" onClick={() => toggleReadMore(blog.id)}>
                {expandedId === blog.id ? "Show less" : "Read more"}
                </span>
              )}
              </p>
          <div className="btn-group">
            <button className="edit-btn" onClick={() => editBlog(blog)}>EDIT</button>
            <button className="delete-btn" onClick={() => deleteBlog(blog.id)}>DELETE</button>
            </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default App;