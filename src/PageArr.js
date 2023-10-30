import HomePage from './pages/HomePage';
import ChargePage from './pages/ChargePage';
import Portfolio from './pages/PortfolioPage';
import BoardPage from './pages/BoardPage';
import LoginRegister from './pages/LoginRegister';
import My from './pages/MyPage';
import CreateBlogPage from './pages/CreateBlogPage';
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
        path:'/board/create',
        component:CreateBlogPage,
    },
    {
        path:'/login',
        component:LoginRegister,
    },
    {
        path:'/my',
        component:My,
    },
]

export default PageArr
