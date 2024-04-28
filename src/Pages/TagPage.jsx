import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Pagination from '../components/Pagination';
import Blogs from '../components/Blogs';
import { navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


// import { navigate } from 'react-router-dom';



const TagPage = () => {

    // const navigation = useNavigate();
    const navigate = useNavigate();

    // blogs ma tags ni value apde URL thi mali jashe....mate aa niche nu lakhiyu
    const location = useLocation();
    // j URL ma last ma hase te apdi tag ni value che
    const tag = location.pathname.split("/").at(-1);
  return (
    <div>
        <Header/>
        <div>
            <button 
            onClick={() => navigate(-1)}
            >
                back
            </button>
            <h2>
                Blogs Tagged <span>#{tag}</span>
            </h2>
        </div>
        <Blogs/>
        <Pagination/>
      
    </div>
  )
}

export default TagPage
