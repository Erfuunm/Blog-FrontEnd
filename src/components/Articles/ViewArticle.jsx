import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { useApi } from '../../Context/ApiProvider';
import { Spinner } from "../";
import { CURRENTLINE, CYAN, PURPLE } from "../../helpers/colors";


const ViewArticle = () => {

  const api = useApi();

  const { articleId } = useParams();

  const [viewArticle, setViewArticle] = useState({});

  const [loading, setLoading] = useState();

  //***** Fetch Data  *****/


  const getdata = () => {
    (async () => {
      const response = await api.get('/Article/' + articleId);
      setViewArticle(response.ok ? response.body : null);
    })();
  }

  useEffect(() => {
    getdata();
  }, [getdata])

  //***** Fetch Data  *****/

  return (
    <>
      <section className="view-contact-intro p3 mt-5">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: CYAN }}>
              اطلاعات مقاله
            </p>
          </div>
        </div>
      </section>

      <hr style={{ backgroundColor: CYAN }} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(viewArticle).length > 0 && (
            <section className="view-contact mt-e mt-5 pt-5">
              <div
                className="container p-2 pt-4"
                style={{ borderRadius: "1em", backgroundColor: CURRENTLINE }}
              >
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src="https://via.placeholder.com/200"
                      alt=""
                      className="img-fluid rounded"
                      style={{ border: `1px solid ${PURPLE}` }}
                    />
                  </div>
                  <div className="col-md-9">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-dark">
                        نام مقاله:{" "}
                        <span className="fw-bold">{viewArticle.title}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        توضیحات : <span className="fw-bold">{viewArticle.description}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شغل : <span className="fw-bold">{viewArticle.author}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        عنوان : <span className="fw-bold">{viewArticle.category}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <Link
                      to={"/articles"}
                      className="btn"
                      style={{ backgroundColor: PURPLE }}
                    >
                      برگشت به صفحه اصلی
                    </Link>
                  </div>
                </div>
              </div>

              <div className="text-center mt-3">
                <img
                  src={require("../../assets/man-taking-note.png")}
                  height="300px"
                  style={{ opacity: "60%" }}
                />
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewArticle;
