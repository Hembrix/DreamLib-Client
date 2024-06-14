import ReactDOM from 'react-dom/client'
import  './styles/reset.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}> 
      <Router>
        <Header/>
        <Routes>
        
          <Route path="/" element={<HomePage/>}/>
          <Route path="/top" element={<ComicsTopPage/>}/>
          <Route path="/catalog" element={<CatalogPage/>}/>
          <Route path="/comics/:titleSlug" element={<ComicsPage/>}/>
          <Route path="/comics/:titleSlug/:chapter_number" element={<Reader/>} />
          <Route path="/add-title" element={<AddTitle/>} />
          <Route path='/edit-title' element={<EditTitle/>}/>
        </Routes>
        <Footer/>
      </Router>
    </Provider>
)
