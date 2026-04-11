import React, { useState } from 'react'
import './App.css'

const App = () => {

  const [form, setForm] = useState({
    title: "",
    author :"",
    content : ""
  });

  const [blogs, setBlogs] = useState([]);

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

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  };

  return (
    <div className='container'>
      <div className='form-section'>     
       <h2>My Blog</h2>

      <input name='title' value= {form.title}  placeholder='Enter title' onChange={handleChange} />
      <input name='author' value= {form.author} placeholder='Enter author' onChange={handleChange} /> <br />
      <textarea name="content" value= {form.content} placeholder='Enter content...' onChange={handleChange}></textarea>

      <button onClick={createBlog}>Create blog</button>
      </div>
      <div className='blog-section'>
      <h3>All Blogs</h3>
      {blogs.map((blog)=>(
        <div key={blog.id} className='card'>
          <h4>{blog.title}</h4>
          <h5>{blog.author}</h5>
          <p>{blog.content}</p>

          <button onClick={()=> deleteBlog(blog.id)}>DELETE</button>
        </div>
      ))}
      </div>
    </div>
  )
}

export default App;