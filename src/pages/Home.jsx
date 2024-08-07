

import { useState , useEffect } from "react";
import { useApi } from "../Context/ApiProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import {
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from "../helpers/colors";
import { ArticleContext } from "../Context/ArticleContext";
import { getAllArticles } from "../services/ArticleService";

 const Home = () => {


  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [groups, setGroups] = useState([]);
  const [article, setArticle] = useState({});
  const [articleQuery, setArticleQuery] = useState({ text: "" });

  const api = useApi();
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



  }

  useEffect(() =>{
   getdata();
  }, [])

  const createArticleForm = async (event) => {
    event.preventDefault();
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await api.post('/Article' , article);

      if (status === 201) {
        const allArticles = [...articles, data];

        setArticles(allArticles);
        setFilteredArticles(allArticles);

        setArticle({});
        setLoading((prevLoading) => !prevLoading);
        Navigate("/articles");
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

      const response = await api.post('/Article/' + articleId);
      
      if (response === 200) {

        getdata();

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
     <div>

<ArticleContext.Provider value={{
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

</ArticleContext.Provider>

     </div>
    );
  };

  export default Home