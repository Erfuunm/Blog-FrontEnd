import { useContext } from "react";
import { ArticleContext } from "../../Context/ArticleContext";
import { PURPLE } from "../../helpers/colors";

const SearchArticle = () => {
  const { articleQuery , articleSearch } = useContext(ArticleContext);

  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: PURPLE }}
      >
        <i className="fas fa-search" />
      </span>
      <input
        dir="rtl"
        type="text"
        value={articleQuery.text}
        onChange={articleSearch}
        className="form-control"
        placeholder="جستجوی مقاله"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};

export default SearchArticle;