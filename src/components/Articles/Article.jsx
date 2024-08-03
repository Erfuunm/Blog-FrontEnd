import { CURRENTLINE, CYAN, ORANGE, PURPLE, RED } from "../../helpers/colors";
import { Link } from "react-router-dom";

const Article = ({article , deleteArticle}) => {
    return (
        <div className="col-md-6">
          <div style={{ backgroundColor: CURRENTLINE }} className="card my-3 mx-2">
            <div className="card-body">
              <div className="row align-items-center d-flex justify-content-around">
                <div className="col-md-4 col-sm-4">
                <img
                src="https://via.placeholder.com/200"
                alt=""
                style={{ border: `1px solid ${PURPLE}` }}
                className="img-fluid rounded"
              />

                </div>
                <div className="col-md-7 col-sm-7">
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-dark">
                      نام مقاله :{"  "}
                      <span className="fw-bold">{article.title}</span>
                    </li>
    
                    <li className="list-group-item list-group-item-dark">
                       توضیحات :{"  "}
                      <span className="fw-bold">{article.description}</span>
                    </li>
    
                    <li className="list-group-item list-group-item-dark">
                       نویسنده :{"  "}
                      <span className="fw-bold">{article.author}</span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
                <Link
                to={`/articles/${article.id}`}
                className="btn my-1"
                style={{ backgroundColor: ORANGE }}
              >
                <i className="fa fa-eye" />
              </Link>

              <Link
                to={`/articles/edit/${article.id}`}
                className="btn my-1"
                style={{ backgroundColor: CYAN }}
              >
                <i className="fa fa-pen" />
              </Link>
              <button
                onClick={deleteArticle}
                className="btn my-1"
                style={{ backgroundColor: RED }}
              >
                <i className="fa fa-trash" />
              </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default Article;
