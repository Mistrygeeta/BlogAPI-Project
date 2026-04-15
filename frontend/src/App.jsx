import axios from "axios"
import React, { useEffect, useState } from 'react'
import './App.css'
const API = "http://localhost:3000/api/blog"
const App = () => {

  const [form, setForm] = useState({
    title: "",
    author :"",
    content :""
  });
  
  const [blogs, setBlogs] = useState([])

  useEffect(()=>{
    fetchBlogs();
  },[]);

  const fetchBlogs = async()=>{
    try {
      const res = await axios.get(API);
      setBlogs(res.data.blogs)
    } catch (error) {
      console.log(error)
    }
  }

  const [expandedId, setExpandedId] = useState(null)

  const [editId, setEditId] = useState(null)

  const handleSubmit = async()=>{
    try {
      if(editId){
        const res = await axios.put(`${API}/${editId}`, form)
        const updatedBlogs = blogs.map((b)=>
           b._id === editId ? res.data.blog  : b
      )
      console.log(res.data)
      setBlogs(updatedBlogs);
      setEditId(null);

      setForm({
        title: "",
        author: "",
        content: ""
      });
      }else{
        const res = await axios.post(API, form);
        setBlogs([...blogs, res.data.blog]);
        console.log(res.data)
        setForm({
          title: "",
          author: "",
          content: "",
        })
      };
    } catch (error) {
      console.log(error)
    }
  };

  const deleteBlog = async(id)=>{
    try {
      const res= await axios.delete(`${API}/${id}`);
       setBlogs(blogs.filter((blog)=> blog._id !== id));
       console.log(res.data)
    } catch (err) {
      console.log(err)
    }
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

    setEditId(blog._id);
  }

  return (
    <div className='container'>
      <div className='form-section'>     
       <h2>{editId ? "Edit Blog" : "My Blog"}</h2>

      <input name='title' value= {form.title}  placeholder='Enter title' onChange={handleChange} />
      <input name='author' value= {form.author} placeholder='Enter author' onChange={handleChange} /> <br />
      <textarea name="content" value= {form.content} placeholder='Enter content...' onChange={handleChange}></textarea>

      <button onClick={handleSubmit}>{editId ? "Update Blog" : "Create Blog"}</button>
      </div>
      <div className='blog-section'>
      <h3>All Blogs</h3>
      {blogs.map((blog)=>(
        <div key={blog._id} className='card'>
          <h4>{blog.title}</h4>
          <h5>{blog.author}</h5>
          <p className={expandedId === blog._id ? "full" : "short"}>
             {expandedId === blog._id ? blog.content : blog.content.substring(0, 200)}
             {blog.content.length > 200 && expandedId !== blog._id && "..."}
             
             {blog.content.length > 200 && (
              <span className="read-more" onClick={() => toggleReadMore(blog._id)}>
                {expandedId === blog._id ? "Show less" : "Read more"}
                </span>
              )}
              </p>
          <div className="btn-group">
            <button className="edit-btn" onClick={() => editBlog(blog)}>EDIT</button>
            <button className="delete-btn" onClick={() => deleteBlog(blog._id)}>DELETE</button>
            </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default App;