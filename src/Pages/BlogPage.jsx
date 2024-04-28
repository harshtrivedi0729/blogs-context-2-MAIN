import React, { useContext } from 'react'
import { useNavigate, setNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';
import { baseUrl } from '../baseUrl';
// import { newbaseUrl } from '../newbaseUrl';

// Change the import path based on the actual location of newbaseUrl
// import {newbaseUrl} from '../newbaseUrl'; // Adjust the path as needed


const BlogPage = () => {
    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
    const [blog, setBlog] = useState(null);
    const[relatedblogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();
    const {setLoading, loading} = useContext(AppContext);

    // apde ani help thi perticulore blog ni ID nikadi
    const blogId = location.pathname.split("/").at(-1);

    // apde particulor BlogId related data ne fetch karva mate apde avu function banayu
    async function fetchRelatedBlogs() {
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
        console.log("URL is: ");
        console.log(url);
        try {
            // API call 
            const res = await fetch(url);
            const data = await res.json();
            
            // API call na output thi j apanane aa value mali jashe
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error) {
            console.log("Error aagya in blog id wali call");
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    //  async function che mate apde useEffect thi call kariyo aa function ne 
    useEffect( () => {
        if(blogId) {
            fetchRelatedBlogs();
        }
        // jyare jyare blogId change thashe te badha j case apde call karishu aa function ne mate apde niche  '[location.pathname]' lakhelu che 
    }, [location.pathname] )

  return (
    <div>
      <Header/>
      <div>
        <button
        onClick={() => navigation(-1)}
        >
            Back
        </button>
      </div>
      {
        loading ?
        (<div>
            <p> Loading</p>
        </div>) :
        /*  have aacase ma jo laoding true hse to loading avshe...jo loading a false hase to apde data (blogs) dekhadishu pan te pahela apde a pan check akrvu padshe k available che k nahi jo loading false hashe and blogs(data) available hashe to j apde blogs ne dekhadi shakishu..jo blogs available nahi hoy to apde 'No Blog Found' lakhishu  */
        blog ?
        (<div>
        {/* apde blog ne 'BlogDetails' vade dekhadiy chiye  */}
         {/* apde ahiya BlogDetails ne current blog api didho */}
            <BlogDetails post={blog} />
            <h2> Related Blogs </h2>
            {/* have apde darek blog ne aek card ma convert kariyu...aa card nu naam che BlogDetails  */}
            {
                /* have aa relatedblogs ma to akho bav badha blogs che to apde te tena upar map function lagaviyu and vara-farti-varo aek aek blog map function na lidhe card('BlogDetails') ma convert thay che  */
                relatedblogs.map( (post) => (
                    <div key = {post.id}>
                    {/* ama apde current vali post no data pass karleo che mate apde post={post} lakhelu che   */}
                        <BlogDetails post={post} />
                    </div>
                ) )
            }

        </div>) :
        (<div>
            <p>No Blog Found</p>
        </div>)
       
      }


    </div>
  )
}

export default BlogPage
