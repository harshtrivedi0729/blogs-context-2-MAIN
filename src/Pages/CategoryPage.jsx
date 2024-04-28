import React from 'react'
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Blogs from '../components/Blogs';

const CategoryPage = () => {

  
    const navigation = useNavigate();
    // category ni value a apanane URL mathi malshe
    const location = useLocation();
    // category ni value ahiya thi malshe
    const category = location.pathname.split("/").at(-1);

  return (
    <div>
      <Header/>
      <div>
        <button
        onClick={() => navigation(-1)}
        >
            Back
        </button>
        <h2> 
            Blogs on <span>{category}</span>
        </h2>
      </div>
      <Blogs/>
      <Pagination/>
    </div>
  )
}

export default CategoryPage
