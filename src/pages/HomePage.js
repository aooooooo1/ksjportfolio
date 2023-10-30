import { Link } from 'react-router-dom/cjs/react-router-dom';
import homeimg from '../img/homeimg.jpg';
import paper from '../img/paper-plane.png';
import cloud from '../img/cloud.png';
import database from '../img/database.png';
import port1 from '../img/port1.webp';
import port2 from '../img/port2.webp';
import port3 from '../img/port3.webp';
import port4 from '../img/port4.webp';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const isLogin = useSelector((state)=>{
        return state.auth.isLogin;
    })
    return (
        <>
            <div className="homeMainImg" style={{backgroundImage:`url(${homeimg})`}}>
                <h1 className='homeStart'>
                    <span>Start</span> Your Portfolio!
                </h1>
                <div className='homeStartP'>
                    다양한 플랫폼을 이용해서 자신만의 포트폴리오를 만들어 보세요!
                </div>
                {isLogin ? 
                    <div className='homeBtn'>
                        <Link to='/portfolio' className="btn btn--primary">포트폴리오 바로가기</Link>
                    </div>
                :
                    <div className='homeBtn'>
                        <Link to='/login' className="btn btn--primary">바로 시작하기</Link>
                    </div>
                }
            </div>
            <div className='home2 container'>
                <div className='nav__brand py-1'>
                    모두의<span> Portfolio</span>
                </div>
                <h1>나를 <span className='color-primary'>표현</span>하는 가장 쉬운 방법</h1>
                <p className='py-1'>최대한 쉽게 모든것을 활용 하세요.</p>
                <div className='d-grid homeimg py-3'>
                    <div>
                        <div className='imgS'>
                            <img src={database} alt='tech'/>
                        </div>
                        <div className='home-margin-auto'>
                            <p>코드를 몰라도 걱정하지 마세요.</p>
                        </div>
                    </div>
                    <div>
                        <div className='imgS'>
                            <img src={paper} alt='tech'/>
                        </div>
                        <div className='home-margin-auto'>
                            <p>세밀하게 신경쓰지 않아도 원하는 결과물을 낼 수 있도록 합니다.</p>
                        </div>
                    </div>
                    <div>
                        <div className='imgS'>
                            <img src={cloud} alt='tech'/>
                        </div>
                        <div className='home-margin-auto'>
                            <p>디자인 감각이 없어도 훌륭한 반응형 포트폴리오를 만들 수 있습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* 제작 사례 */}
            <div className='home2 container'>
                <h1><span className='color-primary'>제작</span> 사례</h1>
                <p className='py-1'>모두의 Portfolio를 이용하여 무궁무진하게 사용 가능합니다.</p>
                <div className='d-flex-make'>
                    <div className='p-3 imgMake'>
                            <img src={port1} alt='tech'/>
                    </div>
                    <div className='p-3 imgMake'>
                            <img src={port2} alt='tech'/>
                    </div>
                    <div className='p-3 imgMake'>
                            <img src={port3} alt='tech'/>
                    </div>
                    <div className='p-3 imgMake'>
                            <img src={port4} alt='tech'/>
                    </div>
                </div>
                {isLogin ? 
                    <div className='homeBtn'>
                        <Link to='/portfolio' className="btn btn--primary">포트폴리오 바로가기</Link>
                    </div>
                :
                    <div className='homeBtn'>
                        <Link to='/login' className="btn btn--primary">더보기</Link>
                    </div>
                }
            </div>
        </>
    )
}

export default HomePage
