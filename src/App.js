import { useState , useEffect } from "react";
import { Navigate, Route, Routes , useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import {getAllArticles , getAllGroups , createArticle} from "./services/ArticleService"
import './App.css';
import { AddArticle, EditArticle, Navbar, ViewArticle } from './components';
import Articles from './components/Articles/Articles';
import axios from "axios";
import { ArticleContext } from "./Context/ArticleContext";
import FlashProvider from './Context/FlashProvider'
import  Home  from "./pages/Home"
import {
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from "./helpers/colors";
import ApiProvider from "./Context/ApiProvider";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";


const App = () => {


  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [groups, setGroups] = useState([]);
  const [article, setArticle] = useState({});
  const [articleQuery, setArticleQuery] = useState({ text: "" });

  const navigate = useNavigate();


  const getdata = () => {



    getAllArticles().then((result) =>{
      setArticles(result.data)
      setFilteredArticles(result.data)
      console.log(result);
    })
    .catch((error) =>{
      console.log(error);
    });

     getAllGroups().then((response) =>{
      setGroups(response.data)
    })
    .catch((error) =>{
      console.log(error);
    });

  }

  useEffect(() =>{
   getdata();
  }, [])


  const createArticleForm = async (event) => {
    event.preventDefault();
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createArticle(article);

      if (status === 201) {
        const allArticles = [...articles, data];

        setArticles(allArticles);
        setFilteredArticles(allArticles);

        setArticle({});
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setLoading((prevLoading) => !prevLoading);
    }
  };


  const onArticleChange = (event) => {
    setArticle({
      ...article,
      [event.target.name]: event.target.value,
    });
  };

  const confirmDelete = (articleId, ArticleFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مقاله</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مقاله {ArticleFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeArticle(articleId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };


  const removeArticle = async (articleId) => {
    try {
      setLoading(true);

      // const allArticles = [...articles];

      // const updatedArticle = articles.filter(c => c.id != articleId)

      const response = await axios.delete(`https://localhost:7282/api/Article/${articleId}`);
      
      if (response === 200) {

        getAllArticles().then((result) =>{
          setArticles(result.data)     
        })
        .catch((error) =>{
          console.log(error);
        });

        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const articleSearch = (event) => {
    setArticleQuery({ ...articleQuery, text: event.target.value });
    const allArticles = articles.filter((article) => {
      return article.title
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setFilteredArticles(allArticles);
  };



  return (
    <ArticleContext.Provider value={{
      loading,
      setLoading,
      article,
      setArticles,
      setFilteredArticles,
      articleQuery,
      articles,
      filteredArticles,
      groups,
      onArticleChange,
      deleteArticle: confirmDelete,
      createArticle: createArticleForm,
      articleSearch,
    }} >

   <div className="App " >

<FlashProvider>

<ApiProvider>

<Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/add" element={<AddArticle />} />
      <Route path="/articles/:articleId" element={<ViewArticle />} />
      <Route path="/articles/edit/:articleId" element={<EditArticle />} />
      <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      </Routes>


</ApiProvider>

  
</FlashProvider>
   
    
   </div>

    </ArticleContext.Provider>
 
  );
}

export default App;
