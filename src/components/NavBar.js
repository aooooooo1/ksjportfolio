import { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom"
import { useLocation } from 'react-router-dom';

const NavBar = ({isScrolled}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const curPath = location.pathname;
    //메뉴 열기
    const openMenu = ()=>{
        setIsMenuOpen(true);
    }
    //메뉴 닫기
    const closeMenu = ()=>{
        setIsMenuOpen(false);
    }
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
                            <Link to="/portfolio" onClick={closeMenu} className={`nav__link ${curPath ==='/portfolio' ? 'nav__link--active':''}`}>Portfolio</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/board" onClick={closeMenu} className={`nav__link ${curPath ==='/board' ? 'nav__link--active':''}`}>게시판</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/login" onClick={closeMenu} className={`nav__link ${curPath ==='/login' ? 'nav__link--active':''}`}>로그인/회원가입</Link>
                        </li>
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
