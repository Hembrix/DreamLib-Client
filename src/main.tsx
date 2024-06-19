import ReactDOM from 'react-dom';
import './styles/reset.css';
import  './index.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Header } from './components/header/Header';
import { HomePage } from './components/page/HomePage';
import { CatalogPage } from './components/page/CatalogPage';
import { Footer } from './components/footer/Footer';
import { ComicsPage } from './components/page/ComicsPage';
import { Reader } from './components/reader/Reader';
import { ComicsTopPage } from './components/page/ComicsTopPage';
import { AddTitle } from './components/TitleManagement/addTitle';
import { EditTitle } from './components/TitleManagement/editTitle';
import {AddChapter} from './components/TitleManagement/addChapter';
import {EditChapter} from './components/TitleManagement/editChapter';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/top" element={<ComicsTopPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/comics/:titleSlug" element={<ComicsPage />} />
        <Route path="/comics/:titleSlug/:chapter_number" element={<Reader />} />
        <Route path="/add-title" element={<AddTitle />} />
        <Route path="/edit-title" element={<EditTitle />} />
        <Route path="/edit-title/:titleSlug" element={<EditTitle />} />
        <Route path="/add-chapter" element={<AddChapter/>} />
        <Route path="/delete-chapter" element={<EditChapter/>} />
      </Routes>
      <Footer/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
