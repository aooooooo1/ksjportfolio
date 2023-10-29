import { Route, BrowserRouter as Router, Switch } from 'react-router-dom/cjs/react-router-dom';
import './css/App.css';
import NavBar from './components/NavBar';
import PageArr from './PageArr';
import Footer from './components/Footer';
import {useState, useEffect} from 'react';
function App() {
  //스크롤 헤더 
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(()=>{
    const handleScroll = ()=>{
      if(window.scrollY > 80){
        setIsScrolled(true);
      }else{
        setIsScrolled(false);
      }
    }
    window.addEventListener('scroll',handleScroll);
  },[]);
  
  return (
    <Router>
      <NavBar isScrolled={isScrolled}/>
      <Switch>
        {PageArr.map(page=>{
          return(
            <Route path={page.path} component={page.component} key={page.path} exact/>
          )
        })}
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
