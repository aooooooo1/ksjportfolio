import axios from "axios";
import { useCallback, useEffect, useState } from "react";
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
import PaginationReply from "../components/PaginationReply";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const BoardDetail = (props) => {
    const admin = localStorage.getItem('user');
    const [users, setUsers] = useState([]);
    const [replyComments, setReplyComments]=useState([]);
    const [replyCommentsPage, setReplyCommentsPage]=useState([]);
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
    const [thumbDownCounts, setThumbDownCounts] = useState({});
    const [isThumbUp, setIsThumbUp] = useState(false);
    const [isThumbDown, setIsThumbDown] = useState(false);
    //폭죽

  





    useEffect(()=>{
        //페이지 갯수
        setNumberOfPages(Math.ceil(totalPost / 10))
    },[totalPost])
    // comments 댓글 가져오기
    const getDetailReply = useCallback((page=1)=>{
        setCurrentPage(page);
        axios.get(`http://localhost:3002/posts/${props.match.params.id}/comments`,{
            params:{
                _page:page,
                _limit:10
            }
        })
        .then((res)=>{
            // console.log('useE',res.data);
            setReplyCommentsPage(res.data);
            setTotalPost(res.headers['x-total-count'])
        }).catch((er)=>{
            console.log(er)
        })
    },[props.match.params.id])



    //게시글내용 한번 가져오기
    useEffect(()=>{
        const getDetail = (page=1)=>{
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
        getDetailReply();
    },[props.match.params.id,getDetailReply]);

    

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

        axios.get(`http://localhost:3002/comments`)
            .then((res) => {
                const postData = res.data;
                // postData.comments.push(comment);
                axios.post(`http://localhost:3002/comments`, {
                    text,
                    date: formattedDate,
                    email: user.email,
                    postId,
                    thumbUpNum,
                    thumbDownNum,
                    isThumbUp:false,
                    isThumbDown
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
    //유저정보
    useEffect(()=>{
        axios.get(`http://localhost:3002/user`).then((res)=>{
                setUsers(res.data);
                console.log('유저데이터',res.data)
            }).catch((er)=>{
                console.log(er);
        });
    },[])

    useEffect(()=>{
        setPostNum((currentPage-1)*10 + 1);
    },[currentPage]) 

    //좋아요
    const thumbUp = (e, reply)=>{
        setIsThumbUp(true)
        e.stopPropagation();
            axios.get(`http://localhost:3002/comments`).then((res)=>{
                const updatedThumbUpNum = res.data[reply.id - 1].thumbUpNum + 1;
                const updatedThumbDownNum = res.data[reply.id - 1].thumbDownNum;
                setIsThumbUp(true)
                axios.put(`http://localhost:3002/comments/${reply.id}`,{
                    text: reply.text,
                    date: reply.date,
                    email: reply.email,
                    postId,
                    thumbUpNum: updatedThumbUpNum,
                    thumbDownNum: updatedThumbDownNum,
                    id: reply.id,
                    isThumbUp : true,
                    isThumbDown : reply.isThumbDown
                }).then((res)=>{
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
    //좋아요 취소
    const thumbUpCancel=(e, reply)=>{
            setIsThumbUp(false);
            e.stopPropagation();
            axios.get(`http://localhost:3002/comments`).then((res)=>{
                const updatedThumbUpNum = res.data[reply.id - 1].thumbUpNum - 1;
                const updatedThumbDownNum = res.data[reply.id - 1].thumbDownNum;
                axios.put(`http://localhost:3002/comments/${reply.id}`,{
                    text: reply.text,
                    date: reply.date,
                    email: reply.email,
                    postId,
                    thumbUpNum: updatedThumbUpNum,
                    thumbDownNum: updatedThumbDownNum,
                    id: reply.id,
                    isThumbUp: false,
                    isThumbDown : reply.isThumbDown
                }).then((res)=>{
                    setThumbUpCounts({...thumbUpCounts, [reply.id]:res.data});
                    getDetailReply();
                    toast_add({
                        text:'좋아요를 취소하였습니다.🥺',
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
    //싫어요
    const thumbDown = (e, reply)=>{
        setIsThumbDown(true);
        e.stopPropagation();
        axios.get(`http://localhost:3002/comments`).then((res)=>{
            const updatedThumbUpNum = res.data[reply.id - 1].thumbUpNum;
            const updatedThumbDownNum = res.data[reply.id - 1].thumbDownNum + 1;
            axios.put(`http://localhost:3002/comments/${reply.id}`,{
                text: reply.text,
                date: reply.date,
                email: reply.email,
                postId,
                thumbUpNum: updatedThumbUpNum,
                thumbDownNum: updatedThumbDownNum,
                id: reply.id,
                isThumbUp:reply.isThumbUp,
                isThumbDown:true
            }).then((res)=>{
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
        axios.get(`http://localhost:3002/comments`).then((res)=>{
            const updatedThumbUpNum = res.data[reply.id - 1].thumbUpNum;
            const updatedThumbDownNum = res.data[reply.id - 1].thumbDownNum - 1;
            axios.put(`http://localhost:3002/comments/${reply.id}`,{
                text: reply.text,
                date: reply.date,
                email: reply.email,
                postId,
                thumbUpNum: updatedThumbUpNum,
                thumbDownNum: updatedThumbDownNum,
                id: reply.id,
                isThumbUp:reply.isThumbUp,
                isThumbDown:false
            }).then((res)=>{
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
        axios.delete(`http://localhost:3002/posts/${id}`).then(()=>{
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
        console.log(openMenus)
    };
    //댓글 수정 들어가기 버튼
    const [replyModifyForm, setReplyModifyForm] = useState({});
    const [replyModifyText, setReplyModifyText] = useState('');
    const replyModify = (id)=>{
        setReplyModifyForm((prev)=>({[id]:!prev[id]}));
        axios.get(`http://localhost:3002/posts/${props.match.params.id}/comments`)
        .then((res)=>{
            const re = res.data;
            const filterReply = re.filter((v)=>{
                return v.id === id
            })
            console.log(filterReply[0].text);
            setReplyModifyText(filterReply[0].text);
        }).catch((er)=>{
            console.log(er)
        })
    }
    //수정완료버튼
    const replyModifyBtn = (v)=>{
        axios.put(`http://localhost:3002/comments/${v.id}`,{
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
    //삭제 버튼
    const replyDelete = (id)=>{
        console.log(id);
        axios.delete(`http://localhost:3002/comments/${id}`).then((res)=>{
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


    return (
        <>
        <div className="container boardDetailMain" style={{minHeight:'300px',marginTop:'13rem'}}>
            <div className="d-flex justi">
                <h1 className="fontW5 boardH1 detailH">{title}</h1>
                <div>
                    {isLogin&&userE===local?<Link to={`/board/${id}/edit`} className="btnSm btn--fix">수정</Link>:null}
                    {isLogin&&userE===local?<button onClick={e=>deletePost(e,postId)} className="btnSm btn--fix" style={{color:'#c92a2a'}}>삭제</button>:null}
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
            <div style={{padding:'1rem 0', fontSize:'18px',color:'#757575'}}>{body}</div>
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
                                                        <button className="btnSm btn--fix reMobtn" onClick={()=>replyModify(v.id)}>취소</button>
                                                        <button className="btnSm btn--primary reMobtn" onClick={()=>replyModifyBtn(v)}>수정</button>
                                                    </div>
                                                </div>
                                                )
                                            }
                                            {/* 내용 */}
                                            {
                                                replyModifyForm[v.id] 
                                                ? 
                                                <p className="detailTextReply" style={{padding:'0.5rem 0 0 0', wordWrap:'break-word', width:'450px'}}></p>
                                                :
                                                <p className="detailTextReply" style={{padding:'0.5rem 0 0 0', wordWrap:'break-word', width:'450px'}}>{v.text}</p>
                                            }
                                            {/* 좋아요 */}
                                            <div className="d-flex alignC">
                                                {
                                                    v.isThumbUp===false ? <ThumbUpAltOutlinedIcon onClick={(e)=>{thumbUp(e, v)}} className="cursor-pointer thumb" style={{fontSize:'30px', color:'#757575',padding:'0.55rem',borderRadius:'100%'}}/>
                                                        : <ThumbUpIcon onClick={(e)=>{thumbUpCancel(e, v)}} className="cursor-pointer thumb" style={{fontSize:'30px', color:'#1c6470',padding:'0.55rem',borderRadius:'100%'}}/>
                                                }
                                                
                                                <div style={{marginRight:'1rem'}}>{v.thumbUpNum}</div>
                                                {
                                                    v.isThumbDown ===false ? <ThumbDownAltOutlinedIcon onClick={(e)=>{thumbDown(e, v)}} className="cursor-pointer thumb" style={{fontSize:'30px', color:'#757575',padding:'0.55rem',borderRadius:'100%'}}/>
                                                        : <ThumbDownIcon onClick={(e)=>{thumbDownCancel(e, v)}} className="cursor-pointer thumb" style={{fontSize:'30px', color:'#757575',padding:'0.55rem',borderRadius:'100%'}}/>
                                                }
                                                {admin==='admin@admin.com'&&<div style={{marginRight:'1rem'}}>{v.thumbDownNum}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reM1">
                                        <div key={v.id} className="reM2">
                                            <MoreVertIcon className="cursor-pointer menu-item2" style={{fontSize:'22px',color:'#616161'}} onClick={() => toggleMenu(v.id)}></MoreVertIcon>
                                            {openMenus[v.id] && (
                                                <div className="menu">
                                                    <div onClick={()=>replyModify(v.id)} className="menu-item cursor-pointer">수정</div>
                                                    <div onClick={()=>replyDelete(v.id)} className="menu-item cursor-pointer">삭제</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
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

export default BoardDetail
