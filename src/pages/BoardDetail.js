import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useSelector } from "react-redux";
import '../css/BoardDetail.css';
import { Link } from "react-router-dom/cjs/react-router-dom";

const BoardDetail = (props) => {
    const isLogin = useSelector((state)=>{
        return state.auth.isLogin;
    })
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState();
    const [userE, setUserE] =useState('');
    const [boardId, setBoardId] = useState(0);
    const history = useHistory();

    //게시글내용 한번 가져오기
    useEffect(()=>{
        const getDetail = ()=>{
            axios.get(`http://localhost:3002/posts/${props.match.params.id}`)
            .then((res)=>{
                setTitle(res.data.title);
                setBody(res.data.body);
                setDate(res.data.date);
                setUserE(res.data.email);
                setBoardId(res.data.id);
            })
        }
        getDetail();
    },[props.match.params.id])
    const local =localStorage.getItem('user');
    return (
        <>
        <div className="container boardDetailMain" style={{minHeight:'400px',marginTop:'13rem'}}>
            <div className="d-flex justi">
                <h1 className="fontW5 boardH1">{title}</h1>
                {isLogin&&userE===local?<Link to={`/board/${id}/edit`} className="btnSm btn--primary">수정</Link>:null}
            </div>
            <div className="d-flex justi" style={{borderBottom:"1px solid #ced4da",padding:"1rem 0"}}>
                <div>작성자 : {userE ? userE.split('@')[0]: '삭제'}</div>
                <div>{date}</div>
            </div>
            <div style={{padding:'1rem 0', fontSize:'18px'}}>{body}</div>
        </div>
        <div className="textA" style={{marginBottom:'5rem'}}>
            <Link to='/board' className="btnSm btn--primary">목록</Link>
        </div>
        </>
    )
}

export default BoardDetail
