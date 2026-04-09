import React, { useState } from 'react'
import "./App.css"

const App = () => {
  const [title, setTitle] = useState("");
  return (
    <div className='container'>
      <h2>Create Blog</h2>

      <input placeholder='Enter Title' value={title} 
      onChange={(e)=> setTitle(e.target.value)} />

      <button>Create</button>

      <p>Title : {title}</p>
    </div>
  )
}

export default App;