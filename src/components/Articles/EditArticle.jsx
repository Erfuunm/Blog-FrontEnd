
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { useApi } from '../../Context/ApiProvider';


const EditArticle = () => {

  const { articleId } = useParams();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({});
  const api = useApi();

  const navigate = useNavigate();

  //************************ Fetch Data  ************************/


  const getdata = () => {
    (async () => {
      const response = await api.get('/Article/' + articleId);
      setArticle(response.ok ? response.body : null);
      console.log(response);
    })();
  }

  useEffect(() => {
    getdata();
  }, [])

  //*******************************************************************/


  //********** Functions ***********/

  const onArticleChange = (event) => {
    setArticle({
      ...article,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (event) => {

    event.preventDefault();
    try {


      const { data } = await api.put('/Article/' + articleId, article);


      if (data !== null) {
        const allArticles = [...articles, data];
        setArticles(allArticles);
        setArticle({});
        navigate("/articles");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      navigate("/articles");
      window.location.reload();
    }
  };


  //******************************************************/


  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مقاله
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <form onSubmit={submitForm}>


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


                    {/* <div className="mb-2">
                      <select
                        name="group"
                        value={contact.group}
                        onChange={onContactChange}
                        required={true}
                        className="form-control"
                      >
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div> */}


                    <div className="mb-2">
                      <input
                        type="text"
                        name="category"
                        value={article.title}
                        onChange={onArticleChange}
                        className="form-control"
                        required={true}
                        placeholder="عنوان"
                      />
                    </div>


                    <div className="mb-2">

                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ویرایش مقاله"
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

                <div className="col-md-4">
                  <img
                    src="https://via.placeholder.com/200"
                    alt=""
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>

              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditArticle;
