import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'components/common/GlobalStyle';
import Home from './pages/Home';
import Write from './pages/Write';
import ArticlesContainer from 'components/home/ArticlesContainer';
import SeriesCategory from 'components/home/SeriesCategory';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/write" element={<Write />} />
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
