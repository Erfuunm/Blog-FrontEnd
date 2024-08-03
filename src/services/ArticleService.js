import axios  from "axios";

const SERVER_URL = "https://localhost:7282";

export const getAllArticles = () =>{
    const url = `${SERVER_URL}/api/Article`;
    return axios.get(url);
}


export const getArticle = (articleId) => {
    const url = `${SERVER_URL}/api/Article/${articleId}`;
    return axios.get(url);
  };


  export const getAllGroups = () => {
    const url = `${SERVER_URL}/api/Category`;
    return axios.get(url);
  };


  export const getGroup = (groupId) => {
    const url = `${SERVER_URL}/api/Category/${groupId}`;
    return axios.get(url);
  };


  export const createArticle = (article) => {
    const url = `${SERVER_URL}/api/Article`;
    return axios.post(url, article);
  };

  export const UpdateArticle = (article, articleId) => {
    const url = `${SERVER_URL}/api/Article/${articleId}`;
    return axios.put(url, article);
  };

  export const deleteArticle = (articleId) => {
    const url = `${SERVER_URL}/api/Article/${articleId}`;
    return axios.delete(url);
  };