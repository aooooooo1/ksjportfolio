import { useCallback, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom"
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { logout as reduxLogout } from "../redux/authSlice";
import useToast from "../hooks/toast";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { Avatar } from "@mui/material";

const NavBar = ({isScrolled}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const curPath = location.pathname;
    const dispatch = useDispatch();
    const {toast_add} = useToast();
    const history = useHistory();
    const isLogin = useSelector((state)=>{
        return state.auth.isLogin;
    })


    //마이페이지 이동
    const [users, setUsers] = useState([]);
    const goToMy = ()=>{
        const nowUser = localStorage.getItem('user')
        axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/user`).then((res)=>{
                setUsers(res.data);
                const filteredUser = res.data.filter((item)=>item.email === nowUser);
                const myId = filteredUser[0].id
                history.push(`/my/${myId}`)
            }).catch((er)=>{
                console.log(er);
            });
    }


    //유저정보-이미지 가져옴
    useEffect(()=>{
        axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/user`).then((res)=>{
                setUsers(res.data);
            }).catch((er)=>{
                console.log(er);
            });
    },[])
    //admin
    const [adminMode, setAdminMode]=useState(false);
    useEffect(()=>{
        const isAdmin = localStorage.getItem('user');
        if('admin@admin.com'===isAdmin){
            setAdminMode(true);
        }
    },[adminMode])
    //메뉴 열기
    const openMenu = ()=>{
        setIsMenuOpen(true);
    }
    //메뉴 닫기
    const closeMenu = ()=>{
        setIsMenuOpen(false);
    }

    const [userP, setUserP]=useState(false);
    const matchingUser =useCallback(()=>{
        let userImg = users.map(user => user.email === localStorage.getItem('user'));
        if(userImg.includes(true)){
            setUserP(true)
            // console.log(userP)
        }else{
            setUserP(false)
        }
    },[users] )
    useEffect(()=>{
        matchingUser()
    },[matchingUser])


    return (
        <header id="header" className={`header ${isScrolled?'header--scroll':''}`}>
            <nav className="nav container">
                <Link to='/' className='nav__brand'>
                    모두의<span> Portfolio</span>
                </Link>
                <div className={`nav__menu ${isMenuOpen ? 'nav__menu--open':''}`} id="nav--menu">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <Link to="/charge" onClick={()=>{closeMenu();}} className={`nav__link ${curPath ==='/charge' ? 'nav__link--active':''}`}>요금</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/portfolio" onClick={closeMenu} className={`nav__link ${curPath.includes('/portfolio') ? 'nav__link--active':''}`}>Portfolio</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/board" onClick={closeMenu} className={`nav__link ${curPath.includes('/board') ? 'nav__link--active':''}`}>{adminMode?'관리자 게시판':'커뮤니티'}</Link>
                        </li>
                        {
                            isLogin ? 
                            <>
                            <li className="nav__item">
                                <div onClick={()=>{closeMenu(); goToMy()}}  className={`cursor-pointer nav__link ${curPath.includes(`/my/`) ? 'nav__link--active':''}`}>
                                <div>
                                    {
                                        users.map((u)=>{
                                            if(u.email === localStorage.getItem('user')){
                                                return(
                                                    <Avatar 
                                                    className='avatar'
                                                    style={{ border: '1px solid gray'}}
                                                    key={u.imageListS}
                                                    alt=""
                                                    src={u.imageListS}
                                                    />
                                                )
                                            }
                                            return null
                                        })
                                    }
                                </div>
                                {
                                    userP ? null :
                                    <Avatar
                                        className='avatar'
                                        style={{ border: '1px solid gray' }}
                                        src="/broken-image.jpg"
                                    />
                                }
                                </div>
                            </li>
                            {/* <li className="nav__item">
                                <div onClick={logout} className="nav__link cursor-pointer">로그아웃</div>
                            </li> */}
                            </>
                            : 
                            <li className="nav__item">
                                <Link to="/login" onClick={closeMenu} className={`nav__link ${curPath ==='/login' ? 'nav__link--active':''}`}>로그인/회원가입</Link>
                            </li>
                        }
                        
                    </ul>
                    <span className="nav__close" onClick={closeMenu}>
                        <i id="nav-close" className="ri-close-line"></i>
                    </span>
                </div>
                <span className='nav__open' onClick={openMenu}>
                    <i id="nav-open" className="ri-menu-5-line"></i>
                </span>
            </nav>
        </header>
    )
}

export default NavBar
