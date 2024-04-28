import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import BlogPage from "./Pages/BlogPage";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";


export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  //  apda URL mathi koi pan parameter ne access karvu che / koi parameter ne update karvu hoy to apde "useSearchParams" HOOK no use kariye chiye
  const [searchParams, setSearchParams] = useSearchParams();

  // apde componet ma currently jya hoiye tenu current location ne access kari shakiye chiye "useLocation" HOOK no use kari ne 
  const location = useLocation();

  useEffect(() => {
    // jo apanane page ni value male to 'searchParams.get("page")' valu value store karavishu and jo page ni value na male/"page" avi koi key j nathi to apde by default '1' rakhishu page ni value
    // MMMMMIIIIMMMPPPP
    // AHIYA "??" A FORMATE CHE JENA THI APDE BY DEFULT VALUE SET-KARI SHAKIYE CHIYE
    const page =  searchParams.get("page") ?? 1;

    if(location.pathname.includes("tags")) {
      // jotag naam ni koi vastu available hoy to apde te vastu ne show karishu
      //iska matlab tag wala page show krna h 
      // niche ni line no matalab che k apda path ne "/" thi split karo and and j last slash(/) ni pachi ni value (at(-1)) sodhi ne apo......apanane at(-1) thi j last vali entiti(SLASH[/]) che teni value male che ...and ana pachi apde simple replace karelu che 
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), tag);
    }
    else if(location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      // ahiya tag nathi hoy mate tag ni jagiyaye "null" lakhelu che
      fetchBlogPosts(Number(page), null, category);
    }
    else {
      // Normal call 
      fetchBlogPosts(Number(page));
    }
    // have apde jyare pan location ni ander chnage thay tyare apdee aa call/function chalavishu te mate niche lakhi didhu..............location change thay ano matalab che k path name change thay......and page change thay/page number change thay tyare apde aa function chalavishu ...and aa page a apanane "location.search" thi mali jashe
  }, [location.pathname, location.search]);

  return (
    <Routes>
    {/* MMMMMIIIIMMMPP */}
    {/* ahiya path ma apde aa vakhate navu add karelu che "/:blogId" , "/:tag" , "/:category" to aa badha a DYNAMIC PARAMETER CHE   */}
    {/* ama avu kahe che k jyare pan niche na "path" hoy tyare niche ne ELEMENT vala componet (<Home/>,<BlogPage/>,<TagPage/>,<CategoryPage/>) render karishu...........have jo render karavavu hoy to aa badha element no data pan apde lavo pdshe....to aa data a  fetchBlogPosts() vala function thi ave che mte apde aa function ne run karvu padshe  */}
      <Route path="/" element = {<Home/>}   />
      <Route path="/blog/:blogId" element = {<BlogPage/>}   />
      <Route path="/tags/:tag" element = {<TagPage/>}   />
      <Route path="/categories/:category" element = {<CategoryPage/>}   />
    </Routes>
  );
}
