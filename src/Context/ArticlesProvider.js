import { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from './ApiProvider';


const ArticlesContext = createContext();

export default function ArticlesProvider({ children }) {

  const [articles, setArticles] = useState();
  const api = useApi();

  //************ FunCtions ******************/

  const GetArticles = () => {

    var response = api.get("/Article");

    if (response !== null) {
      setArticles(response.data)
    } else {
      console.log("Failed To Fetch Data")
    }
  }

  useEffect(() => {
    GetArticles();
  }, [])


//***********************************************/

  return (
    <ArticlesContext.Provider value={{ articles, setArticles, GetArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
}


export function useArticles() {
  return useContext(ArticlesContext);
}