import '../css/Ksj.css';
import ksj from '../img/ksjimg.jpeg';
import dwmain from '../img/dwmain.png';
import dwMainVideo from '../video/dwmain.mp4'
import dwSupport from '../video/support.mp4'
import dw1 from '../img/dw1.png';
import dw2 from '../img/dw2.png';
import dw3 from '../img/dw3.png';
import dw4 from '../img/dw4.png';
import dw5 from '../img/dw5.png';
import dw6 from '../img/dw6.png';
import dw7 from '../img/dw7.png';
import dw8 from '../img/dw8.png';
import dw9 from '../img/dw9.png';
import a31 from '../img/a31.png';
import a32 from '../img/a32.png';
import a33 from '../img/a33.png';
import a34 from '../img/a34.png';
import a35 from '../img/a35.png';
import modumain from '../img/modumain.png';
import mo1 from '../img/mo1.png';
import mo2 from '../img/mo2.png';
import mo3 from '../img/mo3.png';
import mo4 from '../img/mo4.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import a3d from '../video/3dAction.mp4'

const Ksj = () => {
    return (
    <>
        <section id="home" className="home">
            <div className="d-grid home__wrapper container">
                <div className="home__content">
                    <h1 className="home__title">Initiation<span> and </span>Termination</h1>
                    <p className="home__description">
                        웹 개발에서도 항상 시작과 끝이 있습니다. 마치 코드의 시작점부터 마지막 행까지 작성하듯,
                        어떠한 프로젝트든 끝을 보는 역량을 가지고 있습니다. 시작을 하면 끝을 보는 개발자로,
                        새로운 도전에도 언제나 준비돼 있습니다. Initiation 과 Termination 의 IT정신으로 임하겠습니다.
                    </p>
                </div>
            </div>
        </section>
        <section id="about" class="about section">
            <div class="d-grid about__wrapper container">
                <div class="about__content">
                    <span class="section__subtitle">About me</span>
                    <h2 class="section__title">Profile</h2>
                    <p class="about__description">
                        이름 : 김성진 <br/>
                        출생년도 : 1996.10.18 <br/>
                        주소 : 대전광역시 동구 가오동 <br/>
                        연락처 : 010.7613.9012 <br/>
                        E-mail : pdqovvarxx@naver.com 
                    </p>
                    <span class="section__subtitle">My past</span>
                    <h2 class="section__title">Experience & Education</h2>
                    <p class="about__description">
                        2023.02 ~ 2023.08 : SW개발과정(프론트,백엔드)[DW ACADEMY]<br/>
                        2021.10 ~ 2023.01 : 수족관 영세자영업<br/>
                        2019.02 ~ 2021.09 : 대전보건대학교 치기공과 중퇴 <br/>
                        2017.02 ~ 2018.11 : 육군제17보병사단전역
                    </p>
                    <span class="section__subtitle">Used</span>
                    <h2 class="section__title">Skills</h2>
                    <p class="about__description">
                        React &nbsp;
                        Java &nbsp;
                        javaScriot &nbsp;
                        Oracle &nbsp;
                        C#
                    </p>
                </div>
                <img src={ksj} alt="" class="about__img"></img>
            </div>
        </section>
        <section id="portfolio" class="video section">

            {/* modu */}
            <div class="d-grid1 offer__wrapper container">
                <div class="offer__content">
                    <span class="offer__subtitle">Portfolio</span>
                    <p class="offer__duration">Web Aplication</p>
                    <h3 class="offer__title">모두의<span style={{color: '#1c6470'}}> Portfolio</span></h3>
                    <p class="offer__description">
                        웹앱 포트폴리오 무료 서비스 플랫폼 입니다. 커뮤니티로 사용자들과 소통할 수 있습니다.
                    </p>
                    <table class="offer__price">
                        <tr>
                            <td class="offer__price-now">개발기간</td>
                            <td class="offer__price-before">23.10 ~ 23.11(4주)</td>
                        </tr>
                        <tr>
                            <td class="offer__price-now">개발인원</td>
                            <td class="offer__price-before">1명</td>
                        </tr>
                        <tr>
                            <td class="offer__price-now">언어</td>
                            <td class="offer__price-before">JavaScript, HTML/CSS</td>
                        </tr>
                        <tr>
                            <td class="offer__price-now">라이브러리</td>
                            <td class="offer__price-before">React</td>
                        </tr>
                        <tr>
                            <td class="offer__price-now">사용기술</td>
                            <td class="offer__price-before">Redux, react-Router, MUI, Json-server, axios, uuid, firebase, heroku</td>
                        </tr>
                    </table>
                </div>
                <img src={modumain} alt="" class="offer__img"/>
            </div>
            <div class="destination__wrapper container swiper">
                <div class="swiper-wrapper">
                    <Swiper
                    pagination={true}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    >
                        <SwiperSlide >
                            <div class="destination__item swiper-slide">
                                <img src={mo1} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <div class="destination__item swiper-slide">
                                <img src={mo2} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <div class="destination__item swiper-slide">
                                <img src={mo3} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide >
                        <SwiperSlide>
                            <div class="destination__item swiper-slide">
                                <img src={mo4} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div class="section__header1">
                <span class="offer__subtitle1">역할과 구현내용</span>   
            </div>
            <div class="wrapper container" style={{marginBottom:'15rem'}}>
                <Tabs
                variant="outlined"
                aria-label="Pricing plan"
                defaultValue={0}
                sx={{
                    width: '100%',
                    borderRadius: 'lg',
                    boxShadow: 'sm',
                    overflow: 'auto',
                    margin:'auto'
                }}
                >
                <TabList
                    disableUnderline
                    tabFlex={1}
                    sx={{
                    [`& .${tabClasses.root}`]: {
                        fontSize: '20px',
                        fontWeight: 'md',
                        [`&[aria-selected="true"]`]: {
                        color: '#757575',
                        bgcolor: 'background.surface',
                        },
                        [`&.${tabClasses.focusVisible}`]: {
                        outlineOffset: '-4px',
                        },
                    },
                    }}
                >
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    주요역할
                    </Tab>
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    플랫폼 설명
                    </Tab>
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    총평
                    </Tab>  
                </TabList>
                <TabPanel value={0} style={{fontSize:'18px'}}>
                    <Typography level="inherit" style={{padding:'2rem'}}>
                        react를 이용하여 프로젝트를 준비하였습니다. 웹 제작 사이트를 참고하여 레이아웃을 잡았습니다. firebase로 회원가입/로그인/로그아웃과 사진을 업로드하고 사진의 URL을 다운로드하여 JsonServer db에 저장하였습니다.
                    </Typography>
                </TabPanel>
                <TabPanel value={1} style={{fontSize:'18px'}}>
                    <Typography level="inherit" style={{padding:'2rem',lineHeight:'1.6'}}>
                        <div style={{color:'#757575',fontSize:'20px',textAlign:'center',padding:'1rem'}}>좋아요</div>
                        사용자는 회원가입을 통해서 커뮤니티 서비스를 이용할 수 있습니다. 게시글 좋아요 클릭시 해당 게시글 정보를 불러와 좋아요 컬럼의 기존에 좋아요를 누른 유저의 이메일과 해당 유저의 이메일이 스프레드배열로 저장되고 다시 서버로 put요청을 보넵니다. 좋아요 Number는 +1 이 됩니다. 중복은 불가합니다. 한번더 클릭시 반복요청 get,put작업으로 저장된 이메일이 사라지면서 해당 유저이메일이 삭제됩니다.
                        로그인 하지 않은 유저는 리턴되며 하단 박스로 알림설정 됩니다. 댓글 좋아요/싫어요 기능도 같은 로직입니다. 유저는 싫어요 숫자를 볼수 없지만 관리자는 볼수 있습니다.
                        <div style={{color:'#757575',fontSize:'20px',textAlign:'center',padding:'1rem'}}>댓글 '더보기 버튼'/수정</div>
                        댓글 더보기 버튼은 해당 댓글 작성자만 볼수 있습니다. 해당 댓글을 클릭시 해당 댓글인걸 인지하는 코드는 toggleMenu()함수에 댓글의 고유 id값을 값이 보넵니다.
                        그리고 useState(&#123;&#125;) 훅스에 받은id를 이용해 prev =&gt; [id] = !prev[id] 라는 조건을 걸면 토글될때마다 참,거짓이 반복되며 해당 댓글 id가 객체배열에 저장됩니다. <br/>
                        useState의 결과값이 참이면 미리 준비해 두었던 부모영향 아래의 position = absolute 인 박스를 보여지게 합니다.<br/>
                        &nbsp;&nbsp; 위 로직으로 댓글수정버튼 클릭시 해당 댓글을 true값으로 만들고 Textarea가 보여지게 합니다. 동시에 서버에 요청을 보네 댓글의 정보를 받아옵니다.<br/>
                        이후 filter()함수로 해당댓글 id와 같은 것만 남깁니다. 댓글은 데이터베이스에 배열로 담겨져 있기 때문에 남은댓글[0].text 를 state에 넣고 Textarea의 value값으로 지정해 줍니다.<br/>
                        <div style={{color:'#757575',fontSize:'20px',textAlign:'center',padding:'1rem'}}>댓글 수</div>
                        커뮤니티 게시판 좋아요수는 게시글테이블에 있어서 바로 쓸수있지만 댓글은 다른 테이블이기에 게시글의 id와 연관지어야 합니다. 먼저 서버에 모든 댓글 get요청 후 받은 데이터의 map()함수를 이용해 리턴값을 게시글의 id로 해줍니다. <br/>
                        게시글 id가 있는 배열이 만들어지면 <span style={{color:'#c92a2a'}}>빈 객체</span> 생성후 이 배열을 forEach로 객체접근방식인 객체[값] 을 이용해 '값'에 게시글 id인 배열 인덱스를 넣습니다.(댓글이 있는 게시글 id) <br/>
                        &nbsp;&nbsp;조건을 걸어 만약 객체[게시글 id] 가 없으면 1을 넣고 있으면 += 1 을 해주면 게시글 id 가 5개 즉 댓글이 5개가 있으면 그 게시글id에 해당하는 댓글이 5개로 만들어집니다.<br/>
                        1번 게시글에 댓글이 5개가 있고 2번에는 0개가 있으면 댓글 배열에는 ['1','1','1','1','1'] 가 나오고 이 배열에 forEach로를 돌리며 조건으로 빈 객체[value] 1이 있으면 + 1 없으면 1, 결국 1 : 5 가 나오게 됩니다.<br/>
                        그리고 댓글 수 를 적용시키고 싶은 게시글배열에 "방금만든객체[불러온게시글.id] || 0 "을 해주면 게시글id의 값이 있으면 댓글수 도 함께 나오게 됩니다. 그 값을 state배열에 저장하고 jsx에서 map(value, index)함수 게시글을 사용하고 있는 리턴 값에 ex) ReplyTotal[index]
                        의 값이 나옵니다. <br/>
                        &nbsp;&nbsp;이 댓글 수 함수는 useEffect()의 영향을 받고 있으며 페이징네이션 함수가 실행되면 같이 실행되서 새로운 페이지에서도 새로 받아온 게시글 배열에 적용됩니다.
                    </Typography>
                </TabPanel>
                <TabPanel value={2}style={{fontSize:'18px'}}>
                    <Typography level="inherit"style={{padding:'2rem'}}>
                    React 프로젝트를 통해 react에 대한 지식과 경험을 습득할 수 있어서 좋았습니다. <br/>
                    애플리케이션이 앱처럼 구동되어 매우 만족했고 무엇보다 버그를 잡고 막힌 부분을 스스로 파악하며 문제해결능력을 키울 수 있었습니다.<br/>
                    사용자의 입장에서 UI를 어떻게 잡을지 고민하며 다른 서비스플랫폼들을 참고하며 사용하기 쉽게 만들수 있었습니다.
                    </Typography>
                </TabPanel>
                </Tabs>
            </div>

            <div class="d-grid offer__wrapper container">
                <div class="offer__content">
                    <span class="offer__subtitle">Portfolio</span>
                    <p class="offer__duration">영화예매 서비스 플랫폼</p>
                    <h3 class="offer__title"><span style={{color: "#1c6470"}}>DW</span> cinema</h3>
                    <p class="offer__description">
                        최신영화를 업로드하고 예매율과 정보들을 제공하고 관리합니다.
                    </p>
                    <table class="offer__price">
                        <tr>
                            <td class="offer__price-now">개발기간</td>
                            <td class="offer__price-before">23.07 ~ 23.08(6주)</td>
                        </tr>
                        <tr>
                            <td class="offer__price-now">개발인원</td>
                            <td class="offer__price-before">4명</td>
                        </tr>
                        <tr>
                            <td class="offer__price-now">언어</td>
                            <td class="offer__price-before">Java, HTML/CSS, JavaScript</td>
                        </tr>
                        <tr>
                            <td class="offer__price-now">서버</td>
                            <td class="offer__price-before">Apache Tomcat 8.5</td>
                        </tr>
                        <tr>
                            <td class="offer__price-now">프레임워크</td>
                            <td class="offer__price-before">Spring Framework, MyBatis</td>
                        </tr>
                        <tr>
                            <td class="offer__price-now">데이터베이스</td>
                            <td class="offer__price-before">Oracle</td>
                        </tr>
                    </table>
                    
                </div>
                <img alt={dwmain} src={dwmain}  class="offer__img"/>
            </div>
            <div class="d-grid video__wrapper container">
                <div class="video__content">
                    <video controls id="video-tour" class="video__tour">
                        <source  src={dwMainVideo} type="video/mp4"/>
                    </video>
                    <div class="video__info">
                        <button id="video-btn" class="video__btn">
                            <i id="video-icon" class="ri-play-fill"></i>
                        </button>
                        <div class="video__info-wrapper">
                            <span class="video__info-title">
                                Recent Tour
                            </span>
                            <p class="video__info-description">
                                Watch Video
                            </p>
                        </div>
                    </div>
                </div>
                <div class="video__content">
                    <video controls id="video-tour" class="video__tour">
                        <source  src={dwSupport} type="video/mp4"/>
                    </video>
                    <div class="video__info">
                        <button id="video-btn" class="video__btn">
                            <i id="video-icon" class="ri-play-fill"></i>
                        </button>
                        <div class="video__info-wrapper">
                            <span class="video__info-title">
                                Recent Tour
                            </span>
                            <p class="video__info-description">
                                Watch Video
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="destination__wrapper container swiper">
                <div class="swiper-wrapper">
                    <Swiper
                    pagination={true}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    >
                        <SwiperSlide >
                            <div class="destination__item swiper-slide">
                                <img src={dw1} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <div class="destination__item swiper-slide">
                                <img src={dw2} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <div class="destination__item swiper-slide">
                                <img src={dw3} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide >
                        <SwiperSlide>
                            <div class="destination__item swiper-slide">
                                <img src={dw4} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="destination__item swiper-slide">
                                <img src={dw5} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="destination__item swiper-slide">
                                <img src={dw6} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="destination__item swiper-slide">
                                <img src={dw7} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="destination__item swiper-slide">
                                <img src={dw8} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div class="destination__item swiper-slide">
                                <img src={dw9} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div class="section__header1">
                <span class="offer__subtitle1">역할과 구현내용</span>   
            </div>
            <div class="wrapper container">
                <Tabs
                variant="outlined"
                aria-label="Pricing plan"
                defaultValue={0}
                sx={{
                    width: '100%',
                    borderRadius: 'lg',
                    boxShadow: 'sm',
                    overflow: 'auto',
                    margin:'auto'
                }}
                >
                <TabList
                    disableUnderline
                    tabFlex={1}
                    sx={{
                    [`& .${tabClasses.root}`]: {
                        fontSize: '20px',
                        fontWeight: 'md',
                        [`&[aria-selected="true"]`]: {
                        color: '#757575',
                        bgcolor: 'background.surface',
                        },
                        [`&.${tabClasses.focusVisible}`]: {
                        outlineOffset: '-4px',
                        },
                    },
                    }}
                >
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    주요역할
                    </Tab>
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    Slider
                    </Tab>
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    SideNav
                    </Tab>  
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    총평
                    </Tab>  
                </TabList>
                <TabPanel value={0} style={{fontSize:'18px'}}>
                    <Typography level="inherit" style={{padding:'2rem'}}>
                    DW cinema 메인 홈,<br/> 고객센터,<br/> 마이페이지,<br/> 관리자페이지 Front작업 하였습니다. 간단한 Back작업으로 영화, 이벤트, 상품을 가져와 연결 하였습니다.
                    </Typography>
                </TabPanel>
                <TabPanel value={1}style={{fontSize:'18px'}}>
                    <Typography level="inherit"style={{padding:'2rem'}}>
                    슬라이더시 중앙에 위치하게 되는 영화정보는 input type hidden 으로 value값에 영화제목, 등급 ,상영시간 등을 숨겨 놓았습니다. swiper의 기능인 transitionStart을 활용해서 영화의 메인 순서가 슬라이드 될때마다 해당영화의 숨겨진 value값을 javascript에서 변수로 받아 미리 만들어 놓은 html에 넣어 주었습니다
                    </Typography>
                </TabPanel>
                <TabPanel value={2} style={{fontSize:'18px'}}>
                    <Typography level="inherit" style={{padding:'2rem'}}>
                    사이드 메뉴의 top을 변수로 지정하고 스크롤시 상단에서 280px미만이면 위치를 고정시키고 그 이상 스크롤시 top의 변수와 스크롤한 top의 값이 더해져서 사이드 메뉴는 그만큼의 높이에서 고정됩니다.
                    </Typography>
                </TabPanel>
                <TabPanel value={3} style={{fontSize:'18px'}}>
                    <Typography level="inherit" style={{padding:'2rem'}}>
                    이번 프로젝트를 진행하면서 가장 크게 느꼈던 점은 학습과 성장 기회부분에서 많은것을 느꼈습니다.<br/>
                        구체적으로 팀프로젝트를 통해 기술적인 역량 뿐만 아니라 커뮤니케이션, 문제 해결, 팀워크 등 다양한 스킬을 향상시킬 수 있는 기회가 되어 가장 보람찼습니다.<br/>
                        팀워크적인 부분에서는 gitHub로 각 팀원들이 맞은 임무진행도를 공유하며 완성되어 가는 페이지를 보면서 뿌듯함을 느꼈습니다.<br/>
                        그렇게 공유되어 각 팀원들의 시선에서 바라보는 점에서 피드백을 수용해여 보다 나은 서비스를 제공 하고자 하였습니다.<br/>
                        중간에 팀원이 이탈하는 상황이 발생하였고 모두가 맡은 임무에서 플러스되어 일정부분에 대해서 차질이 생겼습니다.<br/>
                        이탈한 팀원의 작업 범위를 파악했고 긍적적인 태도로 오히려 남은 팀원끼리 끈끈하게 뭉쳐서 프로젝트를 종료시킬수 있었습니다.<br/>
                        앞으로는 이런 상황에서 미리 대비할 수 있는 계획을 세우는것도 중요하다고 느꼈습니다.
                    </Typography>
                </TabPanel>
                </Tabs>
            </div>
            {/* 3d */}
            <div class="d-grid1 offer__wrapper container">
                <div class="offer__content">
                    <span class="offer__subtitle">Portfolio</span>
                    <p class="offer__duration">game</p>
                    <h3 class="offer__title"><span style={{color: '#1c6470'}}>3D</span> Action</h3>
                    <p class="offer__description">
                        간단하게 즐기는 케쥬얼 게임입니다.
                    </p>
                    <table class="offer__price">
                        <tr>
                            <td class="offer__price-now">개발기간</td>
                            <td class="offer__price-before">23.09 ~ 23.09(3주)</td>
                        </tr>
                        <tr>
                            <td class="offer__price-now">개발인원</td>
                            <td class="offer__price-before">1명</td>
                        </tr>
                        <tr>
                            <td class="offer__price-now">언어</td>
                            <td class="offer__price-before">C#</td>
                        </tr>
                        <tr>
                            <td class="offer__price-now">프레임워크</td>
                            <td class="offer__price-before">unity, Visual Studio</td>
                        </tr>
                    </table>
                </div>
                <img src={a35} alt="" class="offer__img"/>
            </div>
            <div class="d-grid video__wrapper1 container">
                <div class="video__content">
                    <video controls id="video-tour" class="video__tour">
                        <source  src={a3d} type="video/mp4"/>
                    </video>
                    <div class="video__info">
                        <button id="video-btn" class="video__btn">
                            <i id="video-icon" class="ri-play-fill"></i>
                        </button>
                        <div class="video__info-wrapper">
                            <span class="video__info-title">
                                Recent Tour
                            </span>
                            <p class="video__info-description">
                                Watch Video
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="destination__wrapper container swiper">
                <div class="swiper-wrapper">
                    <Swiper
                    pagination={true}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    >
                        <SwiperSlide >
                            <div class="destination__item swiper-slide">
                                <img src={a31} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <div class="destination__item swiper-slide">
                                <img src={a32} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <div class="destination__item swiper-slide">
                                <img src={a33} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide >
                        <SwiperSlide>
                            <div class="destination__item swiper-slide">
                                <img src={a34} alt="" class="destination__img"/>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div class="section__header1">
                <span class="offer__subtitle1">역할과 구현내용</span>   
            </div>
            <div class="wrapper container">
                <Tabs
                variant="outlined"
                aria-label="Pricing plan"
                defaultValue={0}
                sx={{
                    width: '100%',
                    borderRadius: 'lg',
                    boxShadow: 'sm',
                    overflow: 'auto',
                    margin:'auto'
                }}
                >
                <TabList
                    disableUnderline
                    tabFlex={1}
                    sx={{
                    [`& .${tabClasses.root}`]: {
                        fontSize: '20px',
                        fontWeight: 'md',
                        [`&[aria-selected="true"]`]: {
                        color: '#757575',
                        bgcolor: 'background.surface',
                        },
                        [`&.${tabClasses.focusVisible}`]: {
                        outlineOffset: '-4px',
                        },
                    },
                    }}
                >
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    주요역할
                    </Tab>
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                    총평
                    </Tab>  
                </TabList>
                <TabPanel value={0} style={{fontSize:'18px'}}>
                    <Typography level="inherit" style={{padding:'2rem'}}>
                    처음으로 개인 프로젝트를 진행하였습니다. 간단하게 즐길수 있는 게임을 만들어 보았습니다. 유니티를 활용했으며 java와 비슷한 c#으로 사고능력을 향상시킬 수 있었습니다.
                    </Typography>
                </TabPanel>
                <TabPanel value={1}style={{fontSize:'18px'}}>
                    <Typography level="inherit"style={{padding:'2rem'}}>
                    개인 프로젝트를 통해서 문제해결능력과 프로젝트 관리 경험, 자기 주도적인 학습을 통해서 새로운 기술과 도구를 습득하는 능력을 향상 시킬 수 있었습니다.
                    </Typography>
                </TabPanel>
                </Tabs>
            </div>
            
        </section>
        <section className='section'>
            <div className='section__header'>
                <h2 className='section__title'>Contact</h2>
            </div>
            <div className='d-grid newsletter__wrapper container'>
                <div className='newletter__content'>
                    <h2 className='newsletter__title' style={{fontWeight:'500'}}>김성진</h2>
                    <p className='newsletter__description'>
                        pdqovvarxx@naver.com <br/>
                        010-7613-9012
                    </p>
                </div>
                <form className='newsletter__form'>
                    <div className='form__group'>
                        <div className='btn btn--primary'>
                            <a href='http://github.com/aooooooo1' className='alink' target='_blank' rel='noopener noreferrer'>
                                김성진 github 바로가기
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </>
    )
}

export default Ksj;
