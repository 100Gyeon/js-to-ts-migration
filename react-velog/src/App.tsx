import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'components/common/GlobalStyle';
import Home from './pages/Home';
import Write from './pages/Write';
import Article from './pages/Article';
import ArticlesContainer from 'components/home/ArticlesContainer';
import SeriesCategory from 'components/home/SeriesCategory';
import ScrollToTop from 'components/common/ScrollToTop';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/write" element={<Write />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/article/edit/:id" element={<Write />} />
          <Route path="/*" element={<Home />}>
            <Route path="" element={<ArticlesContainer />} />
            <Route path="series" element={<SeriesCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
