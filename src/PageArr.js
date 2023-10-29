import HomePage from './pages/HomePage';
import ChargePage from './pages/ChargePage';
import Portfolio from './pages/PortfolioPage';
import BoardPage from './pages/BoardPage';
import LoginRegister from './pages/LoginRegister';

const PageArr = [
    {
        path:'/',
        component:HomePage,
    },
    {
        path:'/charge',
        component:ChargePage,
    },
    {
        path:'/portfolio',
        component:Portfolio,
    },
    {
        path:'/board',
        component:BoardPage,
    },
    {
        path:'/login',
        component:LoginRegister,
    },
]

export default PageArr
