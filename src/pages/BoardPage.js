import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import '../css/Board.css';
import Table from '@mui/joy/Table';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Pagination from '../components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, storage } from '../firebase-config';
import useToast from '../hooks/toast';
import { v4 as uuidv4 } from 'uuid';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { Avatar, Tooltip } from '@mui/material';
import { ref } from 'firebase/storage';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
const BoardPage = () => {
  const isAdmin = useSelector((state)=>{
    return state.auth.isAdmin
  })
  const isLogin = useSelector((state)=>{
    return state.auth.isLogin;
  })
  //사용자의 정보를 user에 넣음
  const [user, setUser] = useState({});
  useEffect(()=>{
      onAuthStateChanged(auth, (currentUser)=>{
          setUser(currentUser);
      })
  },[])
  const imageListRef = ref(storage, `userProfileImg`);
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const {toast_add} = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  //총 게시글 갯수
  const [totalPost, setTotalPost] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  //게시글 넘버
  const [postNum, setPostNum] = useState(0);
  //주소 가져오기
  const location = useLocation();
  const url = new URLSearchParams(location.search);
  const urlPage = url.get('page');
  //서치
  const [searchInput, setSearchInput] = useState('');




  let limit = 10
  useEffect(()=>{
    //페이지 갯수
    setNumberOfPages(Math.ceil(totalPost / limit))
  },[totalPost,limit])

  const getPostHistory = (page)=>{
    history.push(`${location.pathname}?page=${page}`);
    getPost(page);
  }
  //유저정보 가져오기
  const getUser = useCallback(()=>{
    axios.get(`http://localhost:3002/user`).then((res)=>{
      setUsers(res.data);
    }).catch((er)=>{
      toast_add({
        text:`${er}`,
        type:'success',
        id:uuidv4()
    })
    });
  },[])
  //qna게시글 가져오기
  const [qnaPost, setQnaPost] = useState([]);
  const getQna = ()=>{
    axios.get(`http://localhost:3002/posts`,{
      params:{
        _page:1,
        _limit:5,
        _sort:'id',
        _order:'desc',
        category:'qna',
        publicM:true
      }
    }).then((res)=>{
      setQnaPost(res.data);
    }).catch((er)=>{
      console.log(er)
    })
  }
  //prepare 게시글 가져오기
  const [preparePost, setPreparePost] = useState([]);
  const getPrepare = ()=>{
    axios.get(`http://localhost:3002/posts`,{
      params:{
        _page:1,
        _limit:5,
        _sort:'id',
        _order:'desc',
        category:'prepare',
        publicM:true
      }
    }).then((res)=>{
      setPreparePost(res.data);
    }).catch((er)=>{
      console.log(er)
    })
  }
  //notice 게시글 가져오기
  const [noticePost, setNoticePost] = useState([]);
  const getNotice = ()=>{
    axios.get(`http://localhost:3002/posts`,{
      params:{
        _page:1,
        _limit:5,
        _sort:'id',
        _order:'desc',
        category:'notice',
        publicM:true
      }
    }).then((res)=>{
      setNoticePost(res.data);
    }).catch((er)=>{
      console.log(er)
    })
  }
  //notice 게시글 가져오기
  const [newPost, setNewPost] = useState([]);
  const getNew = ()=>{
    axios.get(`http://localhost:3002/posts`,{
      params:{
        _page:1,
        _limit:5,
        _sort:'id',
        _order:'desc',
        category:'new',
        publicM:true
      }
    }).then((res)=>{
      setNewPost(res.data);
    }).catch((er)=>{
      console.log(er)
    })
  }
  //free 게시글 가져오기
  const [freePost, setFreePost] = useState([]);
  const getFree = ()=>{
    axios.get(`http://localhost:3002/posts`,{
      params:{
        _page:1,
        _limit:5,
        _sort:'id',
        _order:'desc',
        category:'free',
        publicM:true
      }
    }).then((res)=>{
      setFreePost(res.data);
    }).catch((er)=>{
      console.log(er)
    })
  }
  //전체 게시글 5개 가져오기
  const [post5, setPost5]= useState([])
  const getPost5 = ()=>{
    axios.get(`http://localhost:3002/posts`,{
      params:{
        _page:1,
        _limit:5,
        _sort:'id',
        _order:'desc',
        publicM:true
      }
    }).then((res)=>{
      setPost5(res.data);
    }).catch((er)=>{
      console.log(er)
    })
  }
  //관리자 게시글 가져오기
  const [adminPost, setAdminPost]= useState([])
  const getPostAdmin = useCallback(()=>{
    //게시글정보
    axios.get(`http://localhost:3002/adminPosts`)
      .then((res)=>{
        setAdminPost(res.data);
    }).catch((er)=>{
      toast_add({
        text:`${er}`,
        type:'success',
        id:uuidv4()
    })
    })
  },[])
  useEffect(()=>{
    getPost5()
    getFree()
    getNew()
    getNotice()
    getPrepare()
    getQna()
    getPostAdmin()
  },[getPostAdmin])
  //게시글 가져오는 함수
  const getPost = useCallback((page)=>{
    setCurrentPage(page);
    let params = {
      _page:page,
        _limit:limit,
        _sort:'id',
        _order:'desc',
        title_like:searchInput,
    }
    if(!isAdmin){
      params = {...params, publicM:true};
    }
    //게시글정보
    axios.get(`http://localhost:3002/posts`,{
      params:params
    })
      .then((res)=>{
        setPost(res.data);
        setTotalPost(res.headers['x-total-count'])
    }).catch(()=>{
      toast_add({
        text:'서버가 꺼져있습니다. 관리자에게 문의해 주세요.',
        type:'success',
        id:uuidv4()
    })
    })
  },[limit,isAdmin,searchInput])
  //페이지주소가 바뀔때 마다 실행
  useEffect(()=>{
    getUser()
    getPost(parseInt(urlPage)||1)
  },[urlPage,getPost,getUser])


  //게시글 삭제
  const deletePost = (e,id)=>{
    e.stopPropagation();
    axios.delete(`http://localhost:3002/posts/${id}`).then(()=>{
      getPost();
      toast_add({
        text:'성공적으로 게시글을 삭제 완료 하였습니다.',
        type:'success',
        id:uuidv4()
      })
    }).catch((er)=>{
      toast_add({
        text:`${er}`,
        type:'error',
        id:uuidv4()
      });
    })
  }
  //서치함수
  const search = ()=>{
    getPost(1)
  }
  useEffect(()=>{
    setPostNum((currentPage-1)*limit + 1);
  },[currentPage,limit]) 
  //toggle Menu
  const [openClear, setOpenClear] = useState(false);
  const toggleClear = () => {
      setOpenClear((prev) => (!prev));
  };
  //boardLately
  const boardLately = ()=>{
    getPost(1);
  }
  //boardPopular
  const boardPopular = ()=>{
    const getPostPopular = (page=1)=>{
      setCurrentPage(page);
      let params = {
        _page:page,
          _limit:limit,
          _sort:'postUpNum',
          _order:'desc',
          title_like:searchInput,
      }
      if(!isAdmin){
        params = {...params, publicM:true};
      }
      //유저정보
      axios.get(`http://localhost:3002/user`).then((res)=>{
        setUsers(res.data);
        // console.log('유저데이터',res.data)
      }).catch((er)=>{
        console.log(er);
      });
      //게시글정보
      axios.get(`http://localhost:3002/posts`,{
        params:params
      })
        .then((res)=>{
          setPost(res.data);
          setTotalPost(res.headers['x-total-count'])
      }).catch(()=>{
        toast_add({
          text:'서버가 꺼져있습니다. 관리자에게 문의해 주세요.',
          type:'success',
          id:uuidv4()
      })
      })
    }
    getPostPopular();
  }
  //제목에 댓글 수 넣기
  const [replyTotal, setReplyTotal] = useState([]);
  const [adminReplyTotal, setAdminReplyTotal] = useState([]);
  const [post5ReplyTotal, setPost5ReplyTotal] = useState([]);
  const showReplyNum = useCallback( ()=>{
    axios.get(`http://localhost:3002/comments`).then((res)=>{
      
      const filteredReply = res.data.map(v=>v.postId)
      const postNumber = post.map(post=>post.id)
      
      const commentCountByPostId = {};
      filteredReply.forEach((comment)=>{
        if (commentCountByPostId[comment]) {
          commentCountByPostId[comment] += 1;
        } else {
          commentCountByPostId[comment] = 1;
        }
      });
      const postsWithCommentCounts = post.map((post) => {
        const commentCount = commentCountByPostId[post.id] || 0;
        return commentCount;
      });
      const adminPostReply = adminPost.map((post)=>{
        const cnt = commentCountByPostId[post.id] || 0
        return cnt
      })
      const post5Reply = post5.map((post)=>{
        const cnt = commentCountByPostId[post.id] || 0
        return cnt
      })
      setReplyTotal(postsWithCommentCounts);
      setAdminReplyTotal(adminPostReply)
      setPost5ReplyTotal(post5Reply)

    })
  },[post, adminPost])
  useEffect(()=>{
    showReplyNum()
  },[showReplyNum])
  return (
    <>
      <div className='communityFont'>
        <Tooltip title="다양한 사람들과 다양한 주제로 많은 이야기를 나눠보세요." arrow>
          <h1 className=" fontW5"><span className='h1color2'>Modu</span><span className='h1color'> Community</span></h1>
        </Tooltip>
      </div>
    <div className="container chargeMain">
      <div className='boardEvent'>
        <div style={{backgroundColor:'#dde0f4', borderRadius:'2rem', padding:'3rem', margin:'1rem'}}>
          <p style={{color:'#757575'}}><span style={{color:'#EF5350'}}>HOT🔥</span> 여기주목!</p>
          <h3 style={{fontWeight:'500',padding:'0.5rem 0'}}>현직자와 대화할 사람!</h3>
          <p style={{color:'#757575'}}>📢 1:1 현직자 상담 무료 프로모션! 1,800여명의 주요 기업 멘토와 1:1로 커리어 관련 고민을 나눌 수 있는 멘토링매치 서비스에서 프로모션 진행 중이에요.</p>
        </div>
        <div style={{backgroundColor:'#d0fff4', borderRadius:'2rem', padding:'3rem', margin:'1rem'}}>
          <p style={{color:'#757575'}}><span style={{color:'#EF5350'}}>HOT🔥</span> 여기주목!</p>
          <h3 style={{fontWeight:'500',padding:'0.5rem 0'}}>현직자와 대화할 사람!</h3>
          <p style={{color:'#757575'}}>📢 1:1 현직자 상담 무료 프로모션! 1,800여명의 주요 기업 멘토와 </p>
        </div>
        <div style={{backgroundColor:'#f8f8c3', borderRadius:'2rem', padding:'3rem', margin:'1rem'}}>
          <p style={{color:'#757575'}}><span style={{color:'#EF5350'}}>HOT🔥</span> 여기주목!</p>
          <h3 style={{fontWeight:'500',padding:'0.5rem 0'}}>현직자와 대화할 사람!</h3>
          <p style={{color:'#757575'}}>📢 1:1 현직자 상담 무료 .</p>
        </div>
      </div>
      <div className='boardCategory'>
        <div style={{margin:'1rem',border:'1px solid #E0E0E0', padding:'1rem 0', borderRadius:'3rem'}}>
          <div className='d-flex' style={{alignItems:'center'}}>
            <h3 style={{fontWeight:'500',padding:'0.5rem 0'}}>전체글</h3>
            <KeyboardDoubleArrowRightIcon style={{color:'#757575', fontSize:'26px'}}/>
          </div>
          {
            post5.map((post, i)=>{
              return(
                <div className='d-flex justifyB cursor-pointer miniPosts' style={{marginBottom:'0.5rem'}}>
                  <p style={{color:'#757575', fontSize:'19px'}}>{post.title}</p>
                  <div>
                    <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                      <ThumbUpAltOutlinedIcon style={{verticalAlign:'middle'}}/>{post.postUpNum}
                    </span>
                    <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                      <ChatBubbleOutlineIcon style={{verticalAlign:'middle'}}/>
                      {
                        post5ReplyTotal[i]
                      }
                    </span>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div style={{margin:'1rem',border:'1px solid #E0E0E0', padding:'1rem', borderRadius:'3rem'}}>
          <div className='d-flex' style={{alignItems:'center'}}>
            <h3 style={{fontWeight:'500',padding:'0.5rem 0'}}>전체글</h3>
            <KeyboardDoubleArrowRightIcon style={{color:'#757575', fontSize:'26px'}}/>
          </div>
          <div className='d-flex justifyB' style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
        </div>
      </div>
      <div className='boardCategory'>
        <div style={{margin:'1rem',border:'1px solid #E0E0E0', padding:'1rem', borderRadius:'3rem'}}>
          <div className='d-flex' style={{alignItems:'center'}}>
            <h3 style={{fontWeight:'500',padding:'0.5rem 0'}}>전체글</h3>
            <KeyboardDoubleArrowRightIcon style={{color:'#757575', fontSize:'26px'}}/>
          </div>
          <div className='d-flex justifyB' style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
        </div>
        <div style={{margin:'1rem',border:'1px solid #E0E0E0', padding:'1rem', borderRadius:'3rem'}}>
          <div className='d-flex' style={{alignItems:'center'}}>
            <h3 style={{fontWeight:'500',padding:'0.5rem 0'}}>전체글</h3>
            <KeyboardDoubleArrowRightIcon style={{color:'#757575', fontSize:'26px'}}/>
          </div>
          <div className='d-flex justifyB' style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
        </div>
      </div>
      <div className='boardCategory'>
        <div style={{margin:'1rem',border:'1px solid #E0E0E0', padding:'1rem', borderRadius:'3rem'}}>
          <div className='d-flex' style={{alignItems:'center'}}>
            <h3 style={{fontWeight:'500',padding:'0.5rem 0'}}>전체글</h3>
            <KeyboardDoubleArrowRightIcon style={{color:'#757575', fontSize:'26px'}}/>
          </div>
          <div className='d-flex justifyB' style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
        </div>
        <div style={{margin:'1rem',border:'1px solid #E0E0E0', padding:'1rem', borderRadius:'3rem'}}>
          <div className='d-flex' style={{alignItems:'center'}}>
            <h3 style={{fontWeight:'500',padding:'0.5rem 0'}}>전체글</h3>
            <KeyboardDoubleArrowRightIcon style={{color:'#757575', fontSize:'26px'}}/>
          </div>
          <div className='d-flex justifyB' style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
          <div className='d-flex justifyB'style={{marginBottom:'1rem'}}>
            <p style={{color:'#757575', fontSize:'19px'}}>asdfasdfasdfasdf</p>
            <span>like, reply</span>
          </div>
        </div>
      </div>
      <div className="py-3 d-flex justify-content-between">
          <div className='inputBox'>
            <span style={{height:'100%'}}><SearchIcon className='postSearch' style={{verticalAlign:'middle',fontSize:'35px'}}/></span>
            <input style={{border:'hidden', padding:'5px', color:'#757575'}} onChange={(e)=>setSearchInput(e.target.value)} onClick={search}/>
          </div>
          {
            isLogin ? 
              <Link to="/board/create" className="postAdd">
                  <PostAddIcon fontSize="large" style={{fontSize:"35px",verticalAlign:'middle'}}/>
              </Link>
            :
            <Link to="/login" className="postAdd">
              <PostAddIcon fontSize="large" style={{fontSize:"35px",verticalAlign:'middle'}}/>
            </Link>
          }
      </div>
      <div className="d-flex cursor-pointer clearAll" style={{marginBottom:'2rem'}} onClick={toggleClear}>
        <ClearAllIcon style={{fontSize:'25px',marginRight:'0.5rem'}}/>
      <div>정렬기준</div>
      {
          openClear&&
          <div className="clearParent">
              <div className="clearModalBoard" style={{width:'80px'}}>
                  <ul style={{lineHeight:'30px', textAlign:'center'}}>
                      <li className="cursor-pointer clearList" onClick={boardLately}>최신순</li>
                      <li className="cursor-pointer clearList" onClick={boardPopular}>인기순</li>
                  </ul>
              </div>
          </div>
      }
      </div>
      <Table aria-label="basic table" style={{fontSize:"16px"}}>
        {/* <thead>
          <tr>
            <th style={{width:'6%'}}></th>
            <th style={{textAlign:"center"}}>제목</th>
            <th className='boardDate' style={{ width: '10%', textAlign:"center"}}>날짜</th>
            <th className='writer' style={{ textAlign:"center"}}>글쓴이</th>
            {isAdmin&&<th className='media768' style={{ width: '10%', textAlign:"center"}}>삭제</th>}
            {isAdmin&&<th className='media768' style={{ width: '10%', textAlign:"center"}}>공개</th>}
          </tr>
        </thead> */}
        <tbody>
          {/* 관리자공지사항 */}
          {
            adminPost.map((po,i)=>{
              if(po.email === 'admin@admin.com' && po.publicM === true){
                return(
                  <tr key={po.id} onClick={()=>history.push(`/boardAdmin/${po.id}`)} className="cursor-pointer adminPost">
                    <td style={{textAlign:"center", width:'10%'}}>
                      {
                        users.map((u)=>{
                          if(u.email === po.email){
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
                    </td>
                    {/* <td style={{textAlign:"center",color:'#B71C1C'}}><CampaignIcon style={{fontSize:'30px',verticalAlign:'middle'}}/></td> */}
                    <td style={{textAlign:"center"}} className="line-limit">{po.title}
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ThumbUpAltOutlinedIcon style={{verticalAlign:'middle'}}/>{po.postUpNum}
                      </span>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ChatBubbleOutlineIcon style={{verticalAlign:'middle'}}/>
                      {
                        adminReplyTotal[i]
                      }
                      </span>
                    </td>
                    <td style={{textAlign:"center",color:'#9E9E9E',fontSize:'14px',width:'10%'}} className='boardDate'>{po.date}</td>
                    
                    <td style={{textAlign:"center", width:'20%'}}>{po.email.split('@')[0]}</td>
                    {isAdmin&&<td className='media768' onClick={e=>deletePost(e,po.id)} style={{textAlign:"center", color:"darkred",cursor:"pointer"}}><DeleteIcon fontSize="large" style={{verticalAlign:'middle'}} /></td>}
                    {isAdmin&&<td className='media768'></td>}
                  </tr>
                )
              }
              return null;
            })
          }
          {/* 게시판 */}
          {
            post.length > 0 ? post.map((po,i)=>{
              return(
                <tr key={po.id} onClick={()=>history.push(`/board/${po.id}`)} className="cursor-pointer">
                  {/* 프로필 사진*/}
                  <td style={{width:'10%'}}> 
                    {
                      users.map((u)=>{
                        if(u.email === po.email){
                          return (
                            <Avatar
                              className='avatar'
                              style={{ border: '1px solid #dad4d4'}}
                              key={u.imageListS}
                              alt=""
                              src={u.imageListS}
                            />
                          )
                        }
                        return null;
                      })
                    }
                  </td>
                    {/* 제목 */}
                    <td style={{textAlign:"center",color:'#616161'}} className="line-limit">
                      {po.title}
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ThumbUpAltOutlinedIcon style={{verticalAlign:'middle'}}/>{po.postUpNum}
                      </span>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ChatBubbleOutlineIcon style={{verticalAlign:'middle'}}/>
                      {
                        replyTotal[i]
                      }
                      </span>
                    </td>
                    {/* 날짜 */}
                    <td className='boardDate' style={{textAlign:"center", color:'#9E9E9E',fontSize:'14px',width:'10%'}}>{po.date}</td>
                    
                    {/* 닉네임 */}
                    <td style={{textAlign:'center', fontWeight:'500',color:'#757575', width:'20%'}}>
                      {po.email ? po.email.split('@')[0]:''}
                    </td>
                    {/* 삭제 */}
                    {isAdmin&&<td className='media768' onClick={e=>deletePost(e,po.id)} style={{textAlign:"center", color:"darkred",cursor:"pointer"}}><DeleteIcon fontSize="large" style={{verticalAlign:'middle'}} /></td>}
                    {/* 공개 */}
                    {isAdmin&&<td className='media768' style={{textAlign:"center"}}>{po.publicM?'공개':<DoNotDisturbIcon style={{fontSize:'large', color:'#B71C1C',verticalAlign:'middle'}}/>}</td>}
                </tr>
              );
            }) : <tr>
                    <td colSpan={3} style={{textAlign:'center'}}>게시글이 존재 하지 않습니다.</td>
                </tr>
          }
        </tbody>
      </Table>
      
        <Pagination currentPage={currentPage} numberOfPages={numberOfPages} onClick={getPostHistory}/>
      
    </div>
    </>
  )
}

export default BoardPage
