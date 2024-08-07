
import { useLocation } from "react-router-dom";

import { BACKGROUND, PINK, PURPLE } from "../helpers/colors";
import SearchArticle from "./Articles/SearchArticle";

const Navbar = () => {


  const logOut = (event) =>{
    localStorage.clear();
    window.location.reload();
  }

  const location = useLocation();

  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-lg"
      style={{ backgroundColor: BACKGROUND }}
    >
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
              <div className="col" >

<button onClick={logOut} className="btn mx-2" style={{ backgroundColor: PINK }}>
         Log Out
         <i className="fa fa-plus-circle mx-2" />
       </button>

</div>
      
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
