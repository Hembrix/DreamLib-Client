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
import Reader from './components/reader/Reader';



ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}> 
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/catalog" element={<CatalogPage/>}/>
          <Route path='/comics/:titleSlug' element={<ComicsPage/>}/>
          <Route path="/reader/:chapterId" element={<Reader/>} />
        </Routes>
        <Footer/>
      </Router>
    </Provider>
)
