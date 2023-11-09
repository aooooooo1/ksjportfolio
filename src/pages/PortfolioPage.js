import ksjimg from '../img/ksjimg.jpeg'
import none2 from '../img/none2.png'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import '../css/Board.css'
const PortfolioPage = () => {
    return (
        <div>
            <div className='communityFont'>
                <h1 className=" fontW5"><span className='h1color2'>Modu</span><span className='h1color'> Portfolio</span></h1>
            </div>
            <div className="container chargeMain">
                <div className='grid768'>
                    <div style={{border:'1px solid #e0e0e0',margin:'1rem',borderRadius:'2rem'}}>
                        <div className='d-flex'>
                            <div className='portImg'style={{margin:'auto'}}>
                                <img style={{borderRadius:'2rem'}} src={ksjimg} alt=''></img>
                            </div>
                            <div className='portText'>
                                <p>Portfolio</p>
                                <h4 className='portH'>김성진</h4>
                                <p style={{padding:'0.5rem'}}>IT 개발자</p>
                                <p style={{padding:'0.5rem'}}>010 7613 9012</p>
                                <p style={{padding:'0.5rem'}}>pdqovvarxx@naver.com</p>
                                <Link to='/portfolio/ksj' className='btnSm btn--primary'style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>자세히</Link>
                            </div>
                        </div>
                    </div>
                    <div style={{border:'1px solid #e0e0e0',margin:'1rem',borderRadius:'2rem'}}>
                        <div className='d-flex'>
                            <div className='portImg'style={{margin:'auto'}}>
                                <img style={{borderRadius:'2rem'}} src={none2} alt=''></img>
                            </div>
                            <div className='portText'>
                                <p>Portfolio</p>
                                <h4 className='portH'>수정중</h4>
                                <p style={{padding:'0.5rem'}}>디자이너</p>
                                <p style={{padding:'0.5rem'}}>010 0000 0000</p>
                                <p style={{padding:'0.5rem'}}>none@naver.com</p>
                                <button disabled='true' className='btnSm btn--primary'>자세히</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid768'>
                    <div style={{border:'1px solid #e0e0e0',margin:'1rem',borderRadius:'2rem'}}>
                        <div className='d-flex'>
                            <div className='portImg'style={{margin:'auto'}}>
                                <img style={{borderRadius:'2rem'}} src={none2} alt=''></img>
                            </div>
                            <div className='portText'>
                                <p>Portfolio</p>
                                <h4 className='portH'>수정중</h4>
                                <p style={{padding:'0.5rem'}}>디자이너</p>
                                <p style={{padding:'0.5rem'}}>010 0000 0000</p>
                                <p style={{padding:'0.5rem'}}>none@naver.com</p>
                                <button disabled='true' className='btnSm btn--primary'>자세히</button>
                            </div>
                        </div>
                    </div>
                    <div style={{border:'1px solid #e0e0e0',margin:'1rem',borderRadius:'2rem'}}>
                        <div className='d-flex'>
                            <div className='portImg'style={{margin:'auto'}}>
                                <img style={{borderRadius:'2rem'}} src={none2} alt=''></img>
                            </div>
                            <div className='portText'>
                                <p>Portfolio</p>
                                <h4 className='portH'>수정중</h4>
                                <p style={{padding:'0.5rem'}}>디자이너</p>
                                <p style={{padding:'0.5rem'}}>010 0000 0000</p>
                                <p style={{padding:'0.5rem'}}>none@naver.com</p>
                                <button disabled='true' className='btnSm btn--primary'>자세히</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PortfolioPage;