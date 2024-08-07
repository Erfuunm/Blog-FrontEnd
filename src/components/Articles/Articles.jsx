import Article from "./Article";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";

import { CURRENTLINE, ORANGE, PINK, PURPLE, YELLOW, FOREGROUND, COMMENT } from "../../helpers/colors";
import { Link } from "react-router-dom";

import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

const Articles = () => {

  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);


  //************ FunCtions ******************/

  const getdata = () => {

    axios.get(`https://localhost:7282/api/Article`).then((result) => {
      setArticles(result.data)
    })
      .catch((error) => {
        console.log(error);
      });

  }

  useEffect(() => {
    getdata();
  }, [setArticles])


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

      const response = await axios.delete(`https://localhost:7282/api/Article/${articleId}`);

      if (response.status === 200) {

        axios.get(`https://localhost:7282/api/Article`).then((result) => {
          setArticles(result.data)
        })
          .catch((error) => {
            console.log(error);
          });



      }
    } catch (err) {
      console.log(err.message);

    }
  };


  //********************************************************************/


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
                  deleteArticle={() => confirmDelete(c.id, c.title)}
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
