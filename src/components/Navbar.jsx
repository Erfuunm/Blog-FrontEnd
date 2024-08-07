
import { Link, useLocation } from "react-router-dom";
import { BACKGROUND, PINK, PURPLE } from "../helpers/colors";
import SearchArticle from "./Articles/SearchArticle";

const Navbar = () => {
  const location = useLocation();


   //************ FunCtions ******************/


  const logOut = (event) => {
    localStorage.clear();
    window.location.reload();
  }


  //*******************************************/

  return (
    <nav className="navbar navbar-dark navbar-expand-sm shadow-lg" style={{ backgroundColor: BACKGROUND }}>
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i className="fas fa-id-badge" style={{ color: PURPLE }} /> وب
              اپلیکیشن مدیریت{"  "}
              <span style={{ color: PURPLE }}>مقالات</span>
            </div>
          </div>


          {location.pathname === "/articles" ? (
            <div className="col">
              <SearchArticle />
            </div>
          ) : null}


          <div className="col">
            <button onClick={logOut} className="btn mx-2" style={{ backgroundColor: PINK }}>
              Log Out
              <i className="fa fa-plus-circle mx-2" />
            </button>
          </div>



          {location.pathname !== "/articles" ? (
            <div className="col">
              <Link to={"/articles"} className="btn mx-2" style={{ backgroundColor: PINK }}>
                Go Back
                <i className="fa fa-plus-circle mx-2" />
              </Link>
            </div>
          ) : null}


          {location.pathname !== "/profile" ? (
            <div className="col">
              <Link to={"/profile"} className="btn mx-2" style={{ backgroundColor: PINK }}>
                Profile
                <i className="fa fa-plus-circle mx-2" />
              </Link>
            </div>
          ) : null}



        </div>
      </div>
    </nav>
  );
};

export default Navbar;
