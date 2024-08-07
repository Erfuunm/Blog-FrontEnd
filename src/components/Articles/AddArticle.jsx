import { Link, useNavigate } from "react-router-dom";
import { useArticles } from "../../Context/ArticlesProvider"
import { Spinner } from "../";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import { useApi } from "../../Context/ApiProvider";
import { useState } from "react";

const AddArticle = () => {

  const { articles, setArticles } = useArticles();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState({});
  const navigate = useNavigate();
  const api = useApi();


  //************ FunCtions ******************/


  const createArticleForm = async (event) => {
    event.preventDefault();
    try {

      const { status, data } = await api.post('/Article', article);

      if (status === 200) {
        const allArticles = [...articles, data];
        setArticles(allArticles);
        setArticle({});
        navigate("/articles");
        window.location.reload();

      }
    } catch (err) {
      console.log(err.message);
      navigate("/articles");
    }
  };


  const onArticleChange = (event) => {
    setArticle({
      ...article,
      [event.target.name]: event.target.value,
    });
  };


  //******************************************/


  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assets/man-taking-note.png")}
              height="400px"
              className="ps-5 mt-4 ms-5"
              style={{
                position: "absolute",

                top: "130px",
                left: "500px",

              }}
            />
            <div className="container mt-5">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    ساخت مقاله جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />
              <div className="row mt-5 pt-5 pe-5 me-5">
                <div className="col-md-4">
                  <form onSubmit={createArticleForm}>
                    <div className="mb-2">
                      <input
                        name="title"
                        type="text"
                        value={article.title}
                        onChange={onArticleChange}
                        className="form-control"
                        placeholder="موضوع مقاله"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="description"
                        value={article.description}
                        onChange={onArticleChange}
                        className="form-control"
                        required={true}
                        placeholder="توضیحات"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="author"
                        value={article.author}
                        onChange={onArticleChange}
                        className="form-control"
                        required={true}
                        placeholder="نویسنده"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="category"
                        value={article.category}
                        onChange={onArticleChange}
                        className="form-control"
                        required={true}
                        placeholder="عنوان"
                      />
                    </div>
                    {/* <div className="mb-2">
                      <select
                        name="group"
                        value={article.Category}
                        onChange={setArticleInfo}
                        required={true}
                        className="form-control "
                      >
                        <option value="">انتخاب عنوان</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.title}
                            </option>
                          ))}
                      </select>
                    </div> */}
                    <div className="mx-2 mt-4">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ساخت مقاله"
                      />
                      <Link
                        to={"/articles"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </section>
        </>
      )}
    </>
  );
};

export default AddArticle;
