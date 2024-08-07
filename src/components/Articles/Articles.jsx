import Article from "./Article";
import Spinner from "../Spinner";
import { useContext } from "react";
import {ArticleContext} from "../../Context/ArticleContext"
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import { Link } from "react-router-dom";
// import NotFound from "../../assets/no-found.gif";

const Articles = () => {

  const { articles, loading, deleteArticle } = useContext(ArticleContext);

  

  return (
    <>
    {loading ? (
        <Spinner />
      ) : (
        <section className="container mt-4 ">
          <div className="row">
            {articles.length > 0 ? (
              articles.map((c) => (
                <Article
                  key={c.id}
                  deleteArticle={() => deleteArticle(c.id, c.title)}
                  article={c}
                />
              ))
            ) : (
              <div
                className="text-center py-5"
                style={{ backgroundColor: CURRENTLINE }}
              >
                <p className="h3" style={{ color: ORANGE }}>
                  مخاطب یافت نشد ...
                </p>
                <img
                  src={require("../../assets/no-found.gif")}
                  alt="پیدا نشد"
                  className="w-25"
                />
              </div>
            )}
          </div>
        </section>
      )}

     <section className="container mt-5">
         <div className="grid">
           <div className="row">
             <div className="col">
               <p className="h3">
                 <Link to={"/articles/add"} className="btn mx-2" style={{ backgroundColor: PINK }}>
                   ایجاد مقاله جدید  : 
                   <i className="fa fa-plus-circle mx-2" />
                 </Link>
               </p>
             </div>
           </div>
         </div>
        </section>
      </>
     );
};

export default Articles;
