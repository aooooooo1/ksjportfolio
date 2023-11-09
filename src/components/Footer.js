import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

const Footer = () => {
    const history = useHistory();

    const isLogin = useSelector(state=>{
        return state.auth.isLogin;
    })
    //마이페이지 이동
    const [, setUsers] = useState([]);
    const goToMy = ()=>{
        const nowUser = localStorage.getItem('user')
        axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/user`).then((res)=>{
                setUsers(res.data);
                const filteredUser = res.data.filter((item)=>item.email === nowUser);
                const myId = filteredUser[0].id
                history.push(`/my/${myId}`)
            }).catch((er)=>{
                console.log(er);
            });
    }
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
                                <div className="cursor-pointer" onClick={goToMy}>내정보</div>
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
                            <Link to="/">모두의 Portfolio</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <p class="footer__copyright container">
                Copyright © Initiation and Termination 모두의 Portfolio 2023. All Rights Reserved
            </p>
        </footer>
    )
}

export default Footer;
