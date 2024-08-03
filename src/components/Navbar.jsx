

import { BACKGROUND, PURPLE } from "../helpers/colors";
import SearchArticle from "./Articles/SearchArticle";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-lg"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i className="fas fa-id-badge" style={{ color: PURPLE }} />{" "}
              وب اپلیکیشن مدیریت{"  "}
              <span style={{ color: PURPLE }}>مقالات</span>
            </div>
          </div>
          <div className="col">
            <SearchArticle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
