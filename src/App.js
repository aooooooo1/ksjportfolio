import { Route, BrowserRouter as Router, Switch } from 'react-router-dom/cjs/react-router-dom';
import './css/App.css';
import NavBar from './components/NavBar';
import PageArr from './PageArr';
import Footer from './components/Footer';
import {useState, useEffect} from 'react';
import Toast from './components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import useToast from './hooks/toast';
import { login } from './redux/authSlice';
function App() {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
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
  //토스트 배열 추가 
  const toast = useSelector(state=>{
    return state.toast.toast;
  })
  //토스트 삭제
  const {toast_del} = useToast();

  //새로고침시 로그인 해제 방지
  useEffect(()=>{
    if(localStorage.getItem('user')){
      dispatch(login());
    }
    setLoad(false);
  },[])
  if(load){
    return <div>wait...</div>
  }

  
  return (
    <Router>
      <Toast toast={toast} toast_del={toast_del}/>
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
