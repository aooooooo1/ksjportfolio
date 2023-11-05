import '../css/Board.css';
import propTypes from 'prop-types';
const Pagination2 = ({likeCurPage, likeNumberOfPages, onClick, showPage}) => {
    const currentSet = Math.ceil(likeCurPage/showPage);
    const lastSet = Math.ceil(likeNumberOfPages/showPage);
    const startPage = showPage*(currentSet-1) + 1
    const numberOfPagesSet = currentSet === lastSet ? likeNumberOfPages%showPage : showPage;

    return (
        <div className="pagination p1">
            <ul>
                {startPage>1&&<li><div onClick={()=>{onClick(startPage-showPage)}} className='pagebtn cursor-pointer'>{'<'}</div></li>}
                {Array(numberOfPagesSet).fill(startPage).map((value, index)=>value+index)
                    .map((value)=>{
                        return (
                            <li key={value}>
                                <div onClick={()=>{onClick(value)}} className={`pagebtn cursor-pointer ${likeCurPage === value?'is-active':''}`}>{value}</div>
                            </li>
                        )
                    })}
                {currentSet===lastSet?null:<li><div onClick={()=>{onClick(startPage+showPage)}} className='pagebtn cursor-pointer'>{'>'}</div></li>}
            </ul>
        </div>
    )
}
Pagination2.propTypes={
    // 현제페이지 넘버
    likeCurPage: propTypes.number,
    // 페이징네이션의 갯수
    likeNumberOfPages: propTypes.number,
    // 페이징클릭시 그 페이지에 해당하는 getPost() 함수 호출
    onClick: propTypes.func.isRequired,
    showPage: propTypes.number
}
Pagination2.defaultProps={
    likeCurPage:1,
    showPage:5
}
export default Pagination2;
