import { createContext } from "react";

export const ArticleContext = createContext({
  loading: false,
  setLoading: () => {},
  article: {},
  setArticles: () => {},
  setFilteredArticles: () => {},
  articles: [],
  filteredArticles: [],
  articleQuery: {},
  groups: [],
  onArticleChange: () => {},
  deleteArticle: () => {},
  updateArticle: () => {},
  createArticle: () => {},
  articleSearch: () => {},
});
