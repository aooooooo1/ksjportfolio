import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Footer = () => {
    const isLogin = useSelector(state=>{
        return state.auth.isLogin;
    })
    return (
        <footer class="footer">
            <div class="d-grid footer__wrapper container">
                <div class="footer__content">
                    <h3 class="footer__brand">
                        모두의<span> portfolio</span> 
                    </h3>
                    <div className="lineH">
                        <div className="footerM d-flex">
                            <p>상호명 : (주)모두의 Portfolio</p><span className="bar"></span>
                            <p>대표이사 : 김성진</p><span className="bar"></span>
                            <p>개인정보책임자 : 김성진</p>
                        </div>
                        <div className="footerM">
                            <p>사업자등록번호 : 105-01-87749</p>
                            <p>통신판매업신고번호 : 제 2023-대전동구-013445</p>
                            <p>본사 : 서울 강남구 테헤란로 101</p>
                            <p>고객지원 : 게시판</p>
                        </div>
                        <div className="footerM d-flex">
                            <p>이용약관</p><span className="bar"></span>
                            <p>개인정보처리방침</p>
                        </div>
                    </div>
                </div>
                <div class="footer__content">
                    <h4 class="footer__title">Links</h4>
                    <ul class="footer__list">
                        <li class="footer__item">
                            <Link to="/">Home</Link>
                        </li>
                        <li class="footer__item">
                            <Link to="/portfolio">Portfolio</Link>
                        </li>
                        <li class="footer__item">
                            <Link to="/board">게시판</Link>
                        </li>
                        {
                            isLogin ?
                            <li class="footer__item">
                                <Link to="/my">내정보</Link>
                            </li>
                            :
                            <li class="footer__item">
                                <Link to="/login">로그인/회원가입</Link>
                            </li>
                        }
                        
                    </ul>
                </div>
                <div class="footer__content">
                    <h4 class="footer__title">Connect to..</h4>
                    <ul class="footer__list">
                        <li class="footer__item">
                            <a href="https://github.com/aooooooo1" class="footer__link" target="_blank">
                                김성진 GitHub 바로가기
                            </a>
                        </li>
                        <li class="footer__item">
                            <a href="https://www.miricanvas.com/v/12gehq6" class="footer__link" target="_blank">
                                포트폴리오 기획서 살펴보기
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <p class="footer__copyright container">
                Copyright © Initiation and Termination 김성진 2023. All Rights Reserved
            </p>
        </footer>
    )
}

export default Footer;
