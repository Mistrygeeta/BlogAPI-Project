import React, { useState } from 'react'
import './App.css'

const App = () => {

  const [form, setForm] = useState({
    title: "",
    author :"",
    content : ""
  });

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  };

  return (
    <div className='container'>
      <h2>My Blog</h2>

      <input name='title' placeholder='Enter title' onChange={handleChange} />
      <input name='author' placeholder='Enter author' onChange={handleChange} />
      <textarea name="content" placeholder='Eneter content...' onChange={handleChange}></textarea>

      <button>Create blog</button>
    </div>
  )
}

export default App;