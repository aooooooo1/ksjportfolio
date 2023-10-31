import '../css/Board.css';

const Pagination1 = () => {
    return (
        <div className="pagination p1">
            <ul>
                <li><a href="#">{'<'}</a></li>
                <li><a className="is-active" href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">6</a></li>
                <li><a href="#">{'>'}</a></li>
            </ul>
        </div>
    )
}

export default Pagination1;
