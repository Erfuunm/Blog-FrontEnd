import { createContext } from "react";

export const ArticleContext = createContext({
  loading: false,
  setLoading: () => {},
  article: {},
  setArticle: () => {},
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
