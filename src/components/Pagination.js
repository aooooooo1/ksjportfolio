import '../css/Board.css';
import propTypes from 'prop-types';
const Pagination1 = ({currentPage, numberOfPages, onClick, showPage}) => {
    const currentSet = Math.ceil(currentPage/showPage);
    const lastSet = Math.ceil(numberOfPages/showPage);
    const startPage = showPage*(currentSet-1) + 1
    const numberOfPagesSet = currentSet === lastSet ? numberOfPages%showPage : showPage;

    return (
        <div className="pagination p1">
            <ul>
                {startPage>1&&<li><div onClick={()=>{onClick(startPage-showPage)}} className='pagebtn cursor-pointer'>{'<'}</div></li>}
                {Array(numberOfPagesSet).fill(startPage).map((value, index)=>value+index)
                    .map((value)=>{
                        return (
                            <li key={value}>
                                <div onClick={()=>{onClick(value)}} className={`pagebtn cursor-pointer ${currentPage === value?'is-active':''}`}>{value}</div>
                            </li>
                        )
                    })}
                {currentSet===lastSet?null:<li><div onClick={()=>{onClick(startPage+showPage)}} className='pagebtn cursor-pointer'>{'>'}</div></li>}
            </ul>
        </div>
    )
}
Pagination1.propTypes={
    // 현제페이지 넘버
    currentPage: propTypes.number,
    // 페이징네이션의 갯수
    numberOfPages: propTypes.number,
    // 페이징클릭시 그 페이지에 해당하는 getPost() 함수 호출
    onClick: propTypes.func.isRequired,
    showPage: propTypes.number
}
Pagination1.defaultProps={
    currentPage:1,
    showPage:5
}
export default Pagination1;
