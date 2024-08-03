
import { useState , useEffect } from "react";
import { Navigate, Route, Routes , useNavigate } from "react-router-dom";

import {getAllArticles , getAllGroups , createArticle} from "./services/ArticleService"
import './App.css';
import { AddArticle, Article, EditArticle, Navbar, ViewArticle } from './components';
import Articles from './components/Articles/Articles';
import axios from "axios";


const App = () => {




  const ArtData = [{

    ID : 1,
    Title : "Harry Potter",
    Description : "string",
    Author : "Jk Rolling",
    PblId : 0 ,
    PublisherID : 1

  }]

  const [loading, setLoading] = useState(false);
  const [getArticles, setArticles] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [getArticle, setArticle] = useState({
    title : "",
    description : "",
    author : "",
    group: "",
  })

  const navigate = useNavigate();


  const getdata = () => {

    getAllArticles()
    .then((result) =>{
      setArticles(result.data)
      console.log(getArticles);
    })
    .catch((error) =>{
      console.log(error);
    });

     axios.get("https://localhost:7282/api/Category")
    .then((response) =>{
      setGroups(response.data)
      console.log(getGroups);
    })
    .catch((error) =>{
      console.log(error);
    })

  }


  useEffect(() =>{
   getdata();
  }, [getdata])


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

  //       const { data: articleData } = await axios.get(
  //         "http://localhost:9000/articles"
  //       );
  //       const { data: groupsData } = await axios.get(
  //         "http://localhost:9000/groups"
  //       );
  //       setArticles(articleData);
  //       setGroups(groupsData);

  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);



  const createArticleForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createArticle(getArticle);

      if (status === 201) {
        setArticle({});
        navigate("/articles");
      }
    } catch (err) {
      console.log(err.message);
    }
  };


  const setArticleInfo = (event) => {
    setArticle({
      ...getArticle,
      [event.target.name]: event.target.value,
    });
  };




  return (


    <div className="App  "  >

      
    <Navbar />
    
      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route
          path="/articles"
          element={<Articles articles={getArticles} groups={getGroups} loading={loading} />}
        />
        

        <Route
          path="/articles/add"
          element={
            <AddArticle
              loading={loading}
              setArticleInfo={setArticleInfo}
              article={getArticle}
              groups={getGroups}
             createArticleForm ={createArticleForm}
            />
          }
        />     



        <Route path="/articles/:articleId" element={<ViewArticle />} />
        
        <Route path="/articles/edit/:articleId" element={<EditArticle />} />
      </Routes>
   
      
 
    </div>
  );
}

export default App;
