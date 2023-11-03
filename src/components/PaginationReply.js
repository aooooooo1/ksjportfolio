import '../css/Board.css';
import propTypes from 'prop-types';

const PaginationReply = ({currentPage, numberOfPages, onClick ,showPage}) => {
    const currentSet = Math.ceil(currentPage/showPage);
    const lastSet = Math.ceil(numberOfPages/showPage);
    const startPage = showPage*(currentSet-1) + 1
    const numberOfPagesSet = currentSet === lastSet ? numberOfPages%showPage : showPage;

    return (
        <div className="pagination p1">
            <ul>
                {startPage > 1 && <li><div onClick={onClick(startPage-showPage)} className='pagebtn cursor-pointer'>{'<'}</div></li>}
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

PaginationReply.propTypes = {
    showPage: propTypes.number
}
PaginationReply.defaultProps = {
    showPage : 5
}

export default PaginationReply
