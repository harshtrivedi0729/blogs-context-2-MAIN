import React from 'react'
import { NavLink } from 'react-router-dom'
// import {newbaseUrl} from '../newbaseUrl'; 

const BlogDetails = ({post}) => {
  return (
    <div className='mt-[50px]'>
    {/* aa link upar apde click karishu to aa apanane {`/blog/${post.id}`} aa jagiyaye lai jashe...........ahiya dhyan j rakh jo k (blog.ig)===(post.id) */}
      <NavLink to={`/blog/${post.id}`} >
        <span>{post.title}</span>
      </NavLink>
      <p>
        By
        <span>{post.author}</span>
        {/* space add kari {" "}  ana thi */}
        on {" "} 
        {/* ahiya apde spaces hoy to tene replace kari */}
        <NavLink to={`/categories/${post.category.replaceAll(" ","-")}`}>
            <span>{post.category}</span>
        </NavLink>
      </p>
      <p> Posted on {post.date} </p>
      <p> {post.content}</p>
      <div>
      {/* apde bav badha tags che and aa badha j tags a clickable che and apde badha j tags upar aa click thai shake tevu same kaam karvu che mate apde map i ander aa badha tags ne nakhi didha........multiple vastu j array ni ander che j same kam kare che tena upar apde map function lagaviye chiye */}
        {post.tags.map( (tag, index) => (
          /* ahiya  aek post ni ander bahu badha tag che mate temne post.id as a key na api shakay mate apde index apiyu as a key */
            <NavLink key={index} to={`/tags/${tag.replaceAll(" ","-")}`}>
                <span>{`#${tag}`}</span>
            </NavLink>
        ) )}
      </div>
    </div>
  )
}

export default BlogDetails
