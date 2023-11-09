import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useSelector } from "react-redux";
import '../css/BoardDetail.css';
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom";
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
import PaginationReply from "../components/PaginationReply";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';


const BoardDetail = (props) => {
    //boardAdmin인지 체크
    const location = useLocation();
    const isBoardAdmin = location.pathname.includes('/boardAdmin');
    const admin = localStorage.getItem('user');
    const [users, setUsers] = useState([]);
    const [replyCommentsPage, setReplyCommentsPage]=useState([]);
    const isLogin = useSelector((state)=>{
        return state.auth.isLogin;
    })
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState();
    const [userE, setUserE] =useState('');
    const [boardId, setBoardId] = useState(0);
    const [publicM, setPublicM] = useState(null);
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
    //페이징네이셔
    const [currentPage, setCurrentPage] = useState(0);
    //총 게시글 갯수
    const [totalPost, setTotalPost] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [postNum, setPostNum] = useState(0);
    //좋아요
    const [thumbUpNum,setThumbUpNum] = useState(0);
    const [thumbDownNum,setThumbDownNum] = useState(0);
    const [thumbUpCounts, setThumbUpCounts] = useState({});
    const [isThumbUp, setIsThumbUp] = useState(false);
    const [isThumbDown, setIsThumbDown] = useState(false);

    const [isPostUp, setIsPostUp] = useState(false);
    const [postUpNum, setPostUpNum] = useState(0);
    //폭죽







    useEffect(()=>{
        //페이지 갯수
        setNumberOfPages(Math.ceil(totalPost / 10))
    },[totalPost])
    // comments 댓글불러오기 가져오기
    const getDetailReply = useCallback((page=1)=>{
        setCurrentPage(page);
        axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments`,{
            params:{
                _page:page,
                _limit:10
            }
        })
        .then((res)=>{
            const filteredReply = res.data.filter(reply=>reply.postId === id)
            console.log('useE',filteredReply);
            setReplyCommentsPage(filteredReply);
            setTotalPost(res.headers['x-total-count'])
        }).catch((er)=>{
            console.log(er)
        })
    },[id])

    //게시글 한번 가져오기
    const [userServerImg, setUserServerImg] = useState('');
    const [ userEmail, setUserEmail] = useState([]);
    const [post, setPost] = useState([]);
    const getDetail = useCallback((page=1)=>{
        axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/${isBoardAdmin?'adminPosts':'posts'}/${props.match.params.id}`)
        .then((res)=>{
            setPost(res.data);
            setTitle(res.data.title);
            setBody(res.data.body);
            setDate(res.data.date);
            setCategory(res.data.category);
            setUserE(res.data.email);
            setPublicM(res.data.publicM);
            setPostUpNum(res.data.postUpNum);
            setIsPostUp(res.data.isPostUp);
            setUserServerImg(res.data.userServerImg);
            setUserEmail(res.data.userEmail);
            setBoardId(res.data.id);
        })
    },[props.match.params.id])
    //게시글 좋아용 validate
    const postUpVali = useCallback(()=>{
        axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/${isBoardAdmin?'adminPosts':'posts'}/${id}`).then((res)=>{
            const existingEmail = res.data.userEmail;
            const nowUser = localStorage.getItem('user');
            if(existingEmail){
                let filterdE = existingEmail.filter(v=>v === nowUser);
                if(filterdE[0] === nowUser){
                    setIsPostUp(true);
                }else{
                    setIsPostUp(false);
                }
            }
        })
    },[id])
    //댓글 좋아용 validate
    // const [commentUpVali, setCommentUpVali] = useState({});
    const commentUpVali = useRef({});
    const commentDownVali = useRef({});
    const replyUpVali = useCallback(()=>{
        const nowUser1 = localStorage.getItem('user');
        axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments`).then((res)=>{
            const existingReply = res.data.filter(v=>v.postId===id);
            // console.log('원레있던댓글 ',existingReply)
            let comUpVali = existingReply.map(v => v.thumbUpUserEmail.map(e=>e===nowUser1));
            let comDownVali = existingReply.map(v => v.thumbDownUserEmail.map(e=>e===nowUser1));
            // console.log(comUpVali)
            if(comUpVali){
                for(let i = 0; i < comUpVali.length; i++){
                    if(comUpVali[i].includes(true)){
                        commentUpVali.current = {...commentUpVali.current , [existingReply[i].id]:true }
                    }else{
                        commentUpVali.current = {...commentUpVali.current, [existingReply[i].id]:false }
                    }
                }
            }
            if(comDownVali){
                for(let i = 0; i < comDownVali.length; i++){
                    if(comDownVali[i].includes(true)){
                        commentDownVali.current = {...commentDownVali.current , [existingReply[i].id]:true }
                    }else{
                        commentDownVali.current = {...commentDownVali.current, [existingReply[i].id]:false }
                    }
                }
            }
        })
    },[])
    // console.log(commentUpVali.current[9])





    //게시글내용 한번 가져오기
    useEffect(()=>{
        getDetail();
        getDetailReply();
        postUpVali();
        replyUpVali()
    },[getDetailReply,postUpVali,getDetail,replyUpVali]);

    

    const local =localStorage.getItem('user');
    const postId = props.match.params.id; 
    //date
    const currentDate = new Date();
    const year = currentDate.getFullYear()%100;
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0'); 
    const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}시${minutes}분`;
    //댓글등록 btn
    const detailReply = ()=>{
        if(text===''){
            toast_add({
                text:'댓글을 입력하셔야 등록이 가능합니다.😢😢',
                type:'error',
                id:uuidv4()
            });
            return;
        }
        if(!isLogin){
            toast_add({
                text:'로그인 먼저 해주세요!!😭😭',
                type:'error',
                id:uuidv4()
            });
            return;
        }
        
        axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments`)
            .then((res) => {
                const postData = res.data;
                // postData.comments.push(comment);
                axios.post(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments`, {
                    text,
                    date: formattedDate,
                    email: user.email,
                    postId,
                    thumbUpNum,
                    thumbDownNum,
                    isThumbUp:false,
                    isThumbDown,
                    thumbUpUserEmail:[],
                    thumbDownUserEmail:[],
                }).then((res) => {
                    console.log('120',res.data)
                    const newComment = res.data;
                    // setReplyComments(postData.comments);
                    setReplyCommentsPage([...replyCommentsPage, newComment]);
                    // getDetailReply();
                    toast_add({
                        text:'댓글이 정상적으로 등록처리 되었습니다.',
                        type:'success',
                        id:uuidv4()
                    });
                }).catch((updateError) => {
                    console.error("Error updating post:", updateError);
                    toast_add({
                        text:'서버가 꺼져있는것 같아요.. 관리자에게 문의해주세요.',
                        type:'error',
                        id:uuidv4()
                    })
                });
            })
    }
    //유저정보-이미지 가져옴
    useEffect(()=>{
        axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/user`).then((res)=>{
                setUsers(res.data);
            }).catch((er)=>{
                console.log(er);
        });
    },[])

    useEffect(()=>{
        setPostNum((currentPage-1)*10 + 1);
    },[currentPage]) 

    //댓글좋아요
    const thumbUp = (e, reply)=>{
        if(localStorage.getItem('user')===null){
            toast_add({
                text:'로그인 해주세요.😓😓',
                type:'error',
                id:uuidv4()
            });
            return;
        }
        setIsThumbUp(true)
        e.stopPropagation();
        
        axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments/${reply.id}`).then((res)=>{
                const existingUpEmail = res.data.thumbUpUserEmail ? res.data.thumbUpUserEmail : '';
                const existingDownEmail = res.data.thumbDownUserEmail ? res.data.thumbDownUserEmail : '';
                const updatedThumbUpNum = res.data.thumbUpNum + 1;
                const updatedThumbDownNum = res.data.thumbDownNum;
                setIsThumbUp(true)
                axios.put(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments/${reply.id}`,{
                    text: reply.text,
                    date: reply.date,
                    email: reply.email,
                    postId,
                    thumbUpNum: updatedThumbUpNum,
                    thumbDownNum: updatedThumbDownNum,
                    id: reply.id,
                    isThumbUp : true,
                    isThumbDown : reply.isThumbDown,
                    thumbUpUserEmail:[
                        ...existingUpEmail,
                        localStorage.getItem('user')
                    ],
                    thumbDownUserEmail:[
                        ...existingDownEmail,
                    ],
                }).then((res)=>{
                    replyUpVali();
                    setThumbUpCounts({...thumbUpCounts, [reply.id]:res.data});
                    getDetailReply();
                    toast_add({
                        text:'좋아요!!🤩🤩',
                        type:'success',
                        id:uuidv4()
                    });
                }).catch((er)=>{
                    console.log(er)
                    toast_add({
                        text:`${er}`,
                        type:'success',
                        id:uuidv4()
                    });
                })
            })
    }
    //reply좋아요 취소
    const thumbUpCancel=(e, reply)=>{
            setIsThumbUp(false);
            e.stopPropagation();
            axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments/${reply.id}`).then((res)=>{
                const existingUpEmail = res.data.thumbUpUserEmail ? res.data.thumbUpUserEmail : '';
                const existingDownEmail = res.data.thumbDownUserEmail ? res.data.thumbDownUserEmail : '';
                const nowUser = localStorage.getItem('user');
                const filterdEmail = existingUpEmail.filter(v=>v !== nowUser)
                const updatedThumbUpNum = res.data.thumbUpNum - 1;
                const updatedThumbDownNum = res.data.thumbDownNum;
                axios.put(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments/${reply.id}`,{
                    text: reply.text,
                    date: reply.date,
                    email: reply.email,
                    postId,
                    thumbUpNum: updatedThumbUpNum,
                    thumbDownNum: updatedThumbDownNum,
                    id: reply.id,
                    isThumbUp: false,
                    isThumbDown : reply.isThumbDown,
                    thumbUpUserEmail:filterdEmail,
                    thumbDownUserEmail:[
                        ...existingDownEmail,
                    ],
                }).then((res)=>{
                    replyUpVali();
                    setThumbUpCounts({...thumbUpCounts, [reply.id]:res.data});
                    getDetailReply();
                }).catch((er)=>{
                    console.log(er)
                    toast_add({
                        text:`${er}`,
                        type:'success',
                        id:uuidv4()
                    });
                })
            })
    }
    //싫어요
    const thumbDown = (e, reply)=>{
        if(localStorage.getItem('user')===null){
            toast_add({
                text:'로그인 해주세요.😓😓',
                type:'error',
                id:uuidv4()
            });
            return;
        }
        setIsThumbDown(true);
        e.stopPropagation();
        axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments/${reply.id}`).then((res)=>{
            const existingUpEmail = res.data.thumbUpUserEmail ? res.data.thumbUpUserEmail : '';
            const existingDownEmail = res.data.thumbDownUserEmail ? res.data.thumbDownUserEmail : '';
            const updatedThumbUpNum = res.data.thumbUpNum;
            const updatedThumbDownNum = res.data.thumbDownNum + 1;
            axios.put(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments/${reply.id}`,{
                text: reply.text,
                date: reply.date,
                email: reply.email,
                postId,
                thumbUpNum: updatedThumbUpNum,
                thumbDownNum: updatedThumbDownNum,
                id: reply.id,
                isThumbUp:reply.isThumbUp,
                isThumbDown:true,
                thumbUpUserEmail:[
                    ...existingUpEmail,
                ],
                thumbDownUserEmail:[
                    ...existingDownEmail,
                    localStorage.getItem('user')
                ],
            }).then((res)=>{
                replyUpVali()
                setThumbUpCounts({...thumbUpCounts, [reply.id]:res.data});
                getDetailReply();
            }).catch((er)=>{
                console.log(er)
                toast_add({
                    text:`${er}`,
                    type:'success',
                    id:uuidv4()
                });
            })
        })
    }
    //싫어요 취소 isThumbDown true
    const thumbDownCancel = (e, reply)=>{
        setIsThumbDown(false);
        // e.stopPropagation();
        axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments/${reply.id}`).then((res)=>{
            const existingUpEmail = res.data.thumbUpUserEmail ? res.data.thumbUpUserEmail : '';
            const existingDownEmail = res.data.thumbDownUserEmail ? res.data.thumbDownUserEmail : '';
            const nowUser = localStorage.getItem('user');
            const filterdEmail = existingDownEmail.filter(v=>v !== nowUser)
            const updatedThumbUpNum = res.data.thumbUpNum;
            const updatedThumbDownNum = res.data.thumbDownNum - 1;
            axios.put(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments/${reply.id}`,{
                text: reply.text,
                date: reply.date,
                email: reply.email,
                postId,
                thumbUpNum: updatedThumbUpNum,
                thumbDownNum: updatedThumbDownNum,
                id: reply.id,
                isThumbUp:reply.isThumbUp,
                isThumbDown:false,
                thumbUpUserEmail:[
                    ...existingUpEmail
                ],
                thumbDownUserEmail:filterdEmail
            }).then((res)=>{
                replyUpVali()
                setThumbUpCounts({...thumbUpCounts, [reply.id]:res.data});
                getDetailReply();
            }).catch((er)=>{
                console.log(er)
                toast_add({
                    text:`${er}`,
                    type:'success',
                    id:uuidv4()
                });
            })
        })
    }
    //게시글 삭제
    const deletePost = (e,id)=>{
        e.stopPropagation();
        axios.delete(`https://moduport-09b6894bf3f7.herokuapp.com/api/${isBoardAdmin?'adminPosts':'posts'}/${id}`).then(()=>{
            toast_add({
                text:'성공적으로 게시글을 삭제 완료 하였습니다.',
                type:'success',
                id:uuidv4()
            });
            history.push('/board')
        }).catch((er)=>{
        toast_add({
            text:`${er}`,
            type:'error',
            id:uuidv4()
        });
        })
    }
    //toggle Menu
    const [openMenus, setOpenMenus] = useState({});
    const toggleMenu = (commentId) => {
        setOpenMenus((prevOpenMenus) => ({
            [commentId]: !prevOpenMenus[commentId],
        }));
        // console.log(openMenus)
    };
    //댓글 수정 들어가기 버튼
    const [replyModifyForm, setReplyModifyForm] = useState({});
    const [replyModifyText, setReplyModifyText] = useState('');
    const replyModify = (id)=>{
        setReplyModifyForm((prev)=>({[id]:!prev[id]}));
        axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments`)
        .then((res)=>{
            const re = res.data;
            const filterReply = re.filter((v)=>{
                return v.id === id
            })
            // console.log(filterReply[0].text);
            setReplyModifyText(filterReply[0].text);
        }).catch((er)=>{
            console.log(er)
        })
    }
    //수정완료버튼
    const replyModifyBtn = (v)=>{
        axios.put(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments/${v.id}`,{
                    text: replyModifyText,
                    date: formattedDate,
                    email: v.email ,
                    postId: v.postId,
                    thumbUpNum: v.thumbUpNum,
                    thumbDownNum: v.thumbDownNum,
                    id: v.id,
                    isThumbUp: v.isThumbUp,
                    isThumbDown: v.isThumbDown 
                }).then((res)=>{
                    setThumbUpCounts({...thumbUpCounts, [v.id]:res.data});
                    getDetailReply();
                    replyModify();
                    toast_add({
                        text:'댓글 수정 완료',
                        type:'success',
                        id:uuidv4()
                    });
                }).catch((er)=>{
                    console.log(er)
                    toast_add({
                        text:`${er}`,
                        type:'success',
                        id:uuidv4()
                    });
                })
    }
    //댓글삭제 버튼
    const replyDelete = (id)=>{
        console.log(id);
        axios.delete(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments/${id}`).then((res)=>{
            getDetailReply();
            toast_add({
                text:'댓글 삭제 완료',
                type:'success',
                id:uuidv4()
            });
        }).catch((er)=>{
            console.log(er)
            toast_add({
                text:`${er}`,
                type:'success',
                id:uuidv4()
            });
        })
    }
    //정렬기준
    //toggle Menu
    const [openClear, setOpenClear] = useState(false);
    const toggleClear = () => {
        setOpenClear((prev) => (!prev));
    };
    //최신순
    const replyLately = ()=>{
            setCurrentPage(1);
            axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments`,{
                params:{
                    _page:1,
                    _limit:10,
                    _sort:'date',
                    _order:'desc',
                }
            })
            .then((res)=>{
                const fi = res.data.filter(v=>v.postId===id)
                setReplyCommentsPage(fi);
                setTotalPost(res.headers['x-total-count'])
                toggleClear()
            }).catch((er)=>{
                console.log(er)
            })
    }
    //인기순
    const replyPopular=()=>{
        setCurrentPage(1);
            axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/comments`,{
                params:{
                    _page:1,
                    _limit:10,
                    _sort:'thumbUpNum',
                    _order:'desc',
                }
            })
            .then((res)=>{
                const fi = res.data.filter(v=>v.postId===id)
                setReplyCommentsPage(fi);
                setTotalPost(res.headers['x-total-count'])
                toggleClear()
            }).catch((er)=>{
                console.log(er)
            })
    }
    //
    //toggle Menu 게시글 수정삭제 토글
    const [openPost, setOpenPost] = useState(false);
    const togglePost = () => {
        setOpenPost((prev) => (!prev));
    }
    
    //post UP
    const postUp = (e,id)=>{
        if(localStorage.getItem('user')===null){
            toast_add({
                text:'로그인 해주세요.😓😓',
                type:'error',
                id:uuidv4()
            });
            return;
        }
        axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/${isBoardAdmin?'adminPosts':'posts'}/${id}`).then((res)=>{
            const existingEmail = res.data.userEmail? res.data.userEmail : '';
            const updatedThumbUpNum = postUpNum + 1;
            setIsPostUp(true)
                axios.put(`https://moduport-09b6894bf3f7.herokuapp.com/api/${isBoardAdmin?'adminPosts':'posts'}/${id}`,{
                    title,
                    body,
                    category,
                    date,
                    email: userE,
                    publicM,
                    postUpNum: updatedThumbUpNum,
                    isPostUp,
                    id,
                    userEmail:[
                        ...existingEmail,
                        localStorage.getItem('user')
                    ],
                    userServerImg
                }).then((res)=>{
                    getDetail();
                    postUpVali();
                    toast_add({
                        text:'좋아요!!🤩🤩',
                        type:'success',
                        id:uuidv4()
                    });
                }).catch((er)=>{
                    console.log(er)
                    toast_add({
                        text:`${er}`,
                        type:'error',
                        id:uuidv4()
                    });
                })
        })
    }
    //게시글좋아요 취소
    const postUpCancel=(e,id)=>{
        axios.get(`https://moduport-09b6894bf3f7.herokuapp.com/api/${isBoardAdmin?'adminPosts':'posts'}/${id}`).then((res)=>{
            const existingEmail = res.data.userEmail;
            const nowUser = localStorage.getItem('user');
            const filterdEmail = existingEmail.filter(v=>v !== nowUser)
            const updatedThumbUpNum = postUpNum - 1;
            setIsPostUp(false)
                axios.put(`https://moduport-09b6894bf3f7.herokuapp.com/api/${isBoardAdmin?'adminPosts':'posts'}/${id}`,{
                    title,
                    body,
                    date,
                    email: userE,
                    publicM,
                    postUpNum: updatedThumbUpNum,
                    isPostUp,
                    id,
                    userEmail: filterdEmail,
                    category,
                    userServerImg
                }).then((res)=>{
                    getDetail();
                    postUpVali();
                }).catch((er)=>{
                    console.log(er)
                    toast_add({
                        text:`${er}`,
                        type:'error',
                        id:uuidv4()
                    });
                })
        })
}
    //불꽃놀이
    const [fireworks, setFireworks] = useState([]);
    const createFireworks = (e) => {
        const x = e.pageX;
        const y = e.pageY;
        for (let i = 0; i < 10; i++) {
            const randomX = x + getRandomInt(-20, 20);
            const randomY = y + getRandomInt(-20, 20);
            const fireworkStyle = {
            left: `${randomX}px`,
            top: `${randomY}px`,
            backgroundColor: getRandomColor(),
            };
            setFireworks((prevFireworks) => [
            ...prevFireworks,
            <div key={i} className="firework" style={fireworkStyle}></div>,
            ]);
        }
        setTimeout(() => {
            setFireworks([]);
        }, 1000);
    }

    return (
        <>
        <div className="container boardDetailMain" style={{minHeight:'350px',marginTop:'13rem'}}>
            <div className="d-flex justi">
                <h1 className="fontW5 boardH1 detailH">{title}</h1>
                <div>
                    {
                        isLogin&&userE===local &&
                        <MoreVertIcon className="cursor-pointer menu-item2" style={{fontSize:'22px',color:'#616161'}} onClick={() => togglePost()}></MoreVertIcon>
                    }
                    {
                        openPost&&
                        <div className="clearParent">
                            <div className="clearModal3">
                                <ul style={{lineHeight:'30px'}}>
                                    <li className="cursor-pointer clearList" ><Link to={`/${isBoardAdmin?'boardAdmin':'board'}/${id}/edit`}><EditIcon style={{verticalAlign:'middle',fontSize:'18px'}}/>수정</Link></li>
                                    <li className="cursor-pointer clearList" onClick={e=>deletePost(e,postId)}><DeleteOutlinedIcon style={{verticalAlign:'middle',fontSize:'20px'}}/>삭제</li>
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="d-flex justi" style={{borderBottom:"1px solid #ced4da",padding:"1rem 0"}}>
                <div className="d-flex alignC">
                    <div>
                        {
                            users.map((u)=>{
                                if(u.email === userE){
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
                    <div style={{marginLeft:"1rem",fontWeight:'500',color:'#495057'}}>{userE ? userE.split('@')[0]: '삭제'}</div>
                </div>
                <div>{date}</div>
            </div>
            <img src={userServerImg} alt=""></img>
            <div style={{padding:'1rem 0', fontSize:'18px',color:'#757575',overflowWrap:'anywhere'}}>{body}</div>
        </div>
        <div className="" style={{margin:'2rem 0'}}>
            {/* 게시글 좋아요 */}
            {/* 폭죽 */}
            <div>{fireworks}</div>
            {
                isPostUp === false ? 
                <>
                <Tooltip title="게시글 좋아요" arrow style={{fontSize:'32px'}}>
                    <div className="d-flex justifyC ">
                        <ThumbUpAltOutlinedIcon onClick={(e)=>{postUp(e,id); createFireworks(e)}} className="cursor-pointer thumb" style={{fontSize:'50px',padding:'0.55rem',borderRadius:'100%'}}/>
                    </div>
                </Tooltip>
                <div className="d-flex justifyC">{postUpNum}</div>
                </>
                :
                <>
                <Tooltip title="좋아요 취소" arrow style={{fontSize:'32px'}}>
                    <div className="d-flex justifyC ">
                        <ThumbUpIcon onClick={(e)=>postUpCancel(e,id)} className="cursor-pointer thumb" style={{fontSize:'50px',padding:'0.55rem',borderRadius:'100%',color:'1c6470'}}/>
                    </div>
                </Tooltip>
                <div className="d-flex justifyC">{postUpNum}</div>
                </>
            }
        </div>
        {/* 댓글인풋 */}
        <div className="reply">
            <div className="textA detailText" style={{marginBottom:'5rem'}} >
                <Textarea
                style={{fontSize:'17px'}}
                value={text}
                onChange={(event) => setText(event.target.value)}
                minRows={3}
                maxRows={4}
                startDecorator={
                    <Box sx={{ display: 'flex', gap: 1.3}}>
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
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('🥺')} style={{fontSize:'25px'}}>
                            🥺
                        </IconButton>
                        <IconButton variant="outlined" color="neutral" onClick={addEmoji('😰')} style={{fontSize:'25px'}}>
                            😰
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
                <div style={{textAlign:'right',marginTop:'0.5rem'}} >
                    <button className="btnSm btn--primary" onClick={detailReply}>등록</button>
                </div>
            </div>
            <div className="d-flex cursor-pointer clearAll" style={{marginBottom:'2rem'}} onClick={toggleClear}>
                <ClearAllIcon style={{fontSize:'25px',marginRight:'0.5rem'}}/>
                <div>정렬기준</div>
            </div>
            {
                openClear&&
                <div className="clearParent">
                    <div className="clearModal">
                        <ul style={{lineHeight:'30px'}}>
                            <li className="cursor-pointer clearList" onClick={replyLately}>최신순</li>
                            <li className="cursor-pointer clearList" onClick={replyPopular}>인기순</li>
                        </ul>
                    </div>
                </div>
            }
            <div>
                {
                    replyCommentsPage.map((v,i)=>{
                        return(
                            <div key={i} className="replyForm">
                                <div className="d-flex justifyB">
                                    <div className="d-flex">
                                        {/* <div style={{display:''}}>{postNum+i-1}</div> */}
                                        {/* 프로필사진 */}
                                        <div style={{marginRight:'1rem'}}>
                                        {
                                            users.map((u)=>{
                                                if(u.email === v.email){
                                                return (
                                                    <Avatar
                                                    className='avatarReply'
                                                    style={{ border: '1px solid #dad4d4', width:'40px',height:'40px'}}
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
                                        <div>
                                            <div className="d-flex alignC">
                                                {/* 이메일 */}
                                                <div style={{fontWeight:'500', color:'#495057'}}>{v.email.split('@')[0]}</div>
                                                {/* 날짜 */}
                                                <div style={{fontSize:'12px',marginLeft:'1rem'}}>{v.date}</div>
                                            </div>
                                            {/* 내용수정 */}
                                            {
                                                replyModifyForm[v.id] && (
                                                    <div className="" >
                                                    <Textarea
                                                    style={{fontSize:'16px'}}
                                                    value={replyModifyText}
                                                    onChange={(event) => setReplyModifyText(event.target.value)}
                                                    minRows={3}
                                                    maxRows={4}
                                                    endDecorator={
                                                        <Typography level="body-lg" sx={{ ml: 'auto' }}>
                                                            {replyModifyText.length} 자
                                                        </Typography>
                                                    }
                                                    sx={{ minWidth: 200 }}
                                                    />
                                                    <div style={{textAlign:'right',marginTop:'0.5rem'}} >
                                                        <button className="btnSm btn--fix reMobtn" onClick={()=>{replyModify(v.id); toggleMenu(v.id)}}>취소</button>
                                                        <button className="btnSm btn--primary reMobtn" onClick={()=>replyModifyBtn(v)}>수정</button>
                                                    </div>
                                                </div>
                                                )
                                            }
                                            {/* 내용 */}
                                            {
                                                replyModifyForm[v.id] 
                                                ? 
                                                <p className="detailTextReply" style={{padding:'0.5rem 0 0 0', wordWrap:'break-word', width:'400px'}}></p>
                                                :
                                                <p className="detailTextReply" style={{padding:'0.5rem 0 0 0', wordWrap:'break-word', width:'400px'}}>{v.text}</p>
                                            }
                                            {/* 좋아요 */}
                                            <div className="d-flex alignC">
                                                {/* 폭죽 */}
                                                <div>{fireworks}</div>
                                                <Tooltip title="좋아요" arrow style={{fontSize:'32px'}}>
                                                    {
                                                        commentUpVali.current[v.id] ? <ThumbUpIcon onClick={(e)=>{thumbUpCancel(e, v)}} className="cursor-pointer thumb" style={{fontSize:'30px', color:'#1c6470',padding:'0.55rem',borderRadius:'100%'}}/>
                                                        : <ThumbUpAltOutlinedIcon onClick={(e)=>{thumbUp(e, v); createFireworks(e)}} className="cursor-pointer thumb" style={{fontSize:'30px', color:'#757575',padding:'0.55rem',borderRadius:'100%'}}/>

                                                    }
                                                </Tooltip>
                                                <div style={{marginRight:'1rem'}}>{v.thumbUpNum}</div>
                                                <Tooltip title="싫어요" arrow style={{fontSize:'32px'}}>
                                                    {
                                                        commentDownVali.current[v.id]
                                                         ? <ThumbDownAltOutlinedIcon onClick={(e)=>{thumbDown(e, v)}} className="cursor-pointer thumb" style={{fontSize:'30px', color:'#757575',padding:'0.55rem',borderRadius:'100%'}}/>
                                                            : <ThumbDownIcon onClick={(e)=>{thumbDownCancel(e, v)}} className="cursor-pointer thumb" style={{fontSize:'30px', color:'#757575',padding:'0.55rem',borderRadius:'100%'}}/>
                                                    }
                                                </Tooltip>
                                                {admin==='admin@admin.com'&&<div style={{marginRight:'1rem'}}>{v.thumbDownNum}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        isLogin && v.email === local ? 
                                        <div className="">
                                            <div key={v.id} className="">
                                                <MoreVertIcon className="cursor-pointer menu-item2" style={{fontSize:'22px',color:'#616161'}} onClick={() => toggleMenu(v.id)}></MoreVertIcon>
                                                {openMenus[v.id] && (
                                                    <div className="clearParent">
                                                        <div className="clearModalReply" style={{width:'72px'}}>
                                                            <ul style={{lineHeight:'30px'}}>
                                                                <li onClick={()=>replyModify(v.id)} className="cursor-pointer clearList"><EditIcon style={{verticalAlign:'middle',fontSize:'18px'}}/>수정</li>
                                                                <li onClick={()=>replyDelete(v.id)} className="cursor-pointer clearList"><DeleteOutlinedIcon style={{verticalAlign:'middle',fontSize:'20px'}}/>삭제</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}

                                                    
                                            </div>
                                        </div>
                                        :
                                        <div></div>
                                    }
                                    
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <PaginationReply currentPage={currentPage} numberOfPages={numberOfPages} onClick={getDetailReply}/>
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
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
const letters = '0123456789ABCDEF';
let color = '#';
for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
}
return color;
}
export default BoardDetail
