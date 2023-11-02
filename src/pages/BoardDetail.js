import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useSelector } from "react-redux";
import '../css/BoardDetail.css';
import { Link } from "react-router-dom/cjs/react-router-dom";
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import useToast from "../hooks/toast";
import { v4 as uuidv4 } from 'uuid';
import { Avatar } from '@mui/material';

const BoardDetail = (props) => {
    const [users, setUsers] = useState([]);

    const [replyComments, setReplyComments]=useState([]);
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
    const [text, setText] = useState('');
    const addEmoji = (emoji) => () => setText(`${text}${emoji}`);
    const [user, setUser] = useState({});
    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        })
    },[])
    const {toast_add} = useToast();

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
                setReplyComments(res.data.comments);
            })
        }
        getDetail();
    },[props.match.params.id])

    const local =localStorage.getItem('user');
    const postId = props.match.params.id; 
    //reply btn
    const detailReply = ()=>{
        //date
        const currentDate = new Date();
        const year = currentDate.getFullYear()%100;
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0'); 
        const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}시${minutes}분`;
        const comment = {
            date: formattedDate,
            email: user.email,
            text
        };
        axios.get(`http://localhost:3002/posts/${postId}`)
            .then((response) => {
                const postData = response.data;
                postData.comments.push(comment);
                axios.put(`http://localhost:3002/posts/${postId}`, postData)
                .then((updateResponse) => {
                    // Handle success
                    console.log("Comment added:", comment);
                    setReplyComments(postData.comments)
                })
                .catch((updateError) => {
                    // Handle update error
                    console.error("Error updating post:", updateError);
                });
            })
    }
    //유저정보
    useEffect(()=>{
        axios.get(`http://localhost:3002/user`).then((res)=>{
                setUsers(res.data);
                console.log('유저데이터',res.data)
            }).catch((er)=>{
                console.log(er);
        });
    },[])
    return (
        <>
        <div className="container boardDetailMain" style={{minHeight:'400px',marginTop:'13rem'}}>
            <div className="d-flex justi">
                <h1 className="fontW5 boardH1 detailH">{title}</h1>
                {isLogin&&userE===local?<Link to={`/board/${id}/edit`} className="btnSm btn--fix">수정</Link>:null}
            </div>
            <div className="d-flex justi" style={{borderBottom:"1px solid #ced4da",padding:"1rem 0"}}>
                <div>작성자 : {userE ? userE.split('@')[0]: '삭제'}</div>
                <div>{date}</div>
            </div>
            <div style={{padding:'1rem 0', fontSize:'18px'}}>{body}</div>
        </div>
        <div className="reply">
            <div className="textA detailText" style={{marginBottom:'5rem'}} >
                <Textarea
                style={{fontSize:'20px'}}
                value={text}
                onChange={(event) => setText(event.target.value)}
                minRows={3}
                maxRows={4}
                startDecorator={
                    <Box sx={{ display: 'flex', gap: 1}}>
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')} style={{fontSize:'25px'}}>
                            👍
                        </IconButton>
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')} style={{fontSize:'25px'}}>
                            🏖
                        </IconButton>
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')} style={{fontSize:'25px'}}>
                            😍
                        </IconButton>
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('😀')} style={{fontSize:'25px'}}>
                            😀
                        </IconButton>
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('🩷')} style={{fontSize:'25px'}}>
                            🩷
                        </IconButton>
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('🔥')} style={{fontSize:'25px'}}>
                            🔥
                        </IconButton>
                    </Box>
                }
                endDecorator={
                    <Typography level="body-lg" sx={{ ml: 'auto' }}>
                        {text.length} 자
                    </Typography>
                }
                sx={{ minWidth: 300 }}
                />
                <div style={{textAlign:'right',marginTop:'0.5rem'}} onClick={detailReply}>
                    <button className="btnSm btn--primary">등록</button>
                </div>
            </div>
            <div>
                {
                    replyComments.map((v,i)=>{
                        return(
                            <div key={i} className="replyForm">
                                <div>{i+1}번 댓글</div>
                                <div>{v.text}</div>
                                <div>{v.date}</div>
                                <div>{v.email}</div>
                                <div>
                                {
                                    users.map((u)=>{
                                        if(u.email === v.email){
                                        return (
                                            <Avatar
                                            className='avatar'
                                            style={{ border: '1px solid gray'}}
                                            key={u.imageListS}
                                            alt=""
                                            src={u.imageListS}
                                            />
                                        )
                                        }
                                        return null;
                                    })
                                }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        {/* 뒤로가기버튼 */}
        <div className="textA" style={{marginBottom:'5rem'}}>
            <Link to='/board' className="btnSm btn--primary">
                <KeyboardBackspaceIcon style={{fontSize:'30px',verticalAlign:'middle'}}/>
            </Link>
        </div>
        </>
    )
}

export default BoardDetail
