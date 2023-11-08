import '../css/Board.css';
import propTypes from 'prop-types';
const Pagination = ({currentPage, numberOfPages, onClick, showPage}) => {
    let currentSet = Math.ceil(currentPage/showPage);
    const lastSet = Math.ceil(numberOfPages/5);
    const startPage = showPage*(currentSet-1) + 1
    let arrPage = numberOfPages%showPage;
    if(arrPage === 0){
        arrPage = numberOfPages
    }
    const numberOfPagesSet = currentSet === lastSet ? arrPage : 5
    

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
Pagination.propTypes={
    // 현제페이지 넘버
    currentPage: propTypes.number,
    // 페이징네이션의 갯수
    numberOfPages: propTypes.number,
    // 페이징클릭시 그 페이지에 해당하는 getPost() 함수 호출
    onClick: propTypes.func.isRequired,
    showPage: propTypes.number
}
Pagination.defaultProps={
    currentPage:1,
    showPage:5
}
export default Pagination;
