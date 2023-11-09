import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import '../css/Board.css';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Pagination from '../components/Pagination';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import useToast from '../hooks/toast';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Tooltip } from '@mui/material';
// import { ref } from 'firebase/storage';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const BoardPage = () => {
  const isAdmin = useSelector((state)=>{
    return state.auth.isAdmin
  })
  const isLogin = useSelector((state)=>{
    return state.auth.isLogin;
  })
  //사용자의 정보를 user에 넣음
  const [, setUser] = useState({});
  useEffect(()=>{
      onAuthStateChanged(auth, (currentUser)=>{
          setUser(currentUser);
      })
  },[])
  // const imageListRef = ref(storage, `userProfileImg`);
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const {toast_add} = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  //총 게시글 갯수
  const [totalPost, setTotalPost] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  //게시글 넘버
  const [, setPostNum] = useState(0);
  //주소 가져오기
  const location = useLocation();
  const url = new URLSearchParams(location.search);
  const urlPage = url.get('page');
  //서치
  const [searchInput, setSearchInput] = useState('');
  //type
  const setFreeType = useRef(false);
  const setAllType= useRef(false);
  const setPrepareType = useRef(false);
  const setQnaType = useRef(false);
  const setNoticeType = useRef(false);
  const setNewType= useRef(false);



  let limit = 10
  useEffect(()=>{
    //페이지 갯수
    setNumberOfPages(Math.ceil(totalPost / limit))
    // console.log('setNumberOfPages',Math.ceil(totalPost / limit))
  },[totalPost,limit])

  const getPostHistory = (page)=>{
    history.push(`${location.pathname}?page=${page}`);
    getPost(page);
  }
  //유저정보 가져오기
  const getUser = useCallback(()=>{
    axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/user`).then((res)=>{
      if(res.data){
        setUsers(res.data);
      }
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
    axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/posts`,{
      params:{
        _page:1,
        _limit:5,
        _sort:'id',
        _order:'desc',
        category:'qna',
        publicM:true
      }
    }).then((res)=>{
      if(res.data){
        setQnaPost(res.data);
      }
    }).catch((er)=>{
      console.log(er)
    })
  }
  //prepare 게시글 가져오기
  const [preparePost, setPreparePost] = useState([]);
  const getPrepare = ()=>{
    axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/posts`,{
      params:{
        _page:1,
        _limit:5,
        _sort:'id',
        _order:'desc',
        category:'prepare',
        publicM:true
      }
    }).then((res)=>{
      if(res.data){
        setPreparePost(res.data);
      }
    }).catch((er)=>{
      console.log(er)
    })
  }
  //notice 게시글 가져오기
  const [noticePost, setNoticePost] = useState([]);
  const getNotice = ()=>{
    axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/posts`,{
      params:{
        _page:1,
        _limit:5,
        _sort:'id',
        _order:'desc',
        category:'notice',
        publicM:true
      }
    }).then((res)=>{
      if(res.data){
        setNoticePost(res.data);
      }
    }).catch((er)=>{
      console.log(er)
    })
  }
  //notice 게시글 가져오기
  const [newPost, setNewPost] = useState([]);
  const getNew = ()=>{
    axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/posts`,{
      params:{
        _page:1,
        _limit:5,
        _sort:'id',
        _order:'desc',
        category:'new',
        publicM:true
      }
    }).then((res)=>{
      if(res.data){
        setNewPost(res.data);
      }
    }).catch((er)=>{
      console.log(er)
    })
  }
  //free 게시글 가져오기
  const [freePost, setFreePost] = useState([]);
  const getFree = ()=>{
    axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/posts`,{
      params:{
        _page:1,
        _limit:5,
        _sort:'id',
        _order:'desc',
        category:'free',
        publicM:true
      }
    }).then((res)=>{
      if(res.data){
        setFreePost(res.data);
      }
    }).catch((er)=>{
      console.log(er)
    })
  }
  //전체 게시글 5개 가져오기
  const [post5, setPost5]= useState([])
  const getPost5 = ()=>{
    axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/posts`,{
      params:{
        _page:1,
        _limit:5,
        _sort:'id',
        _order:'desc',
        publicM:true
      }
    }).then((res)=>{
      if(res.data){
        setPost5(res.data);
      }
    }).catch((er)=>{
      console.log(er)
    })
  }
  //관리자 게시글 가져오기
  const [adminPost, setAdminPost]= useState([])
  const getPostAdmin = useCallback(()=>{
    //게시글정보
    axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/adminPosts`)
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
  const getPost = useCallback((page=1)=>{
    setCurrentPage(page);
    let params = {
      _page:page,
        _limit:limit,
        _sort:'id',
        _order:'desc',
        title_like:searchInput,
    }
    if(setFreeType.current){
      params = {...params, category:'free'}
    }
    // console.log('free',setFreeType.current)
    if(setPrepareType.current){
      params = {...params, category:'prepare'}
    }
    if(setQnaType.current){
      params = {...params, category:'qna'}
    }
    if(setNoticeType.current){
      params = {...params, category:'notice'}
    }
    if(setNewType.current){
      params = {...params, category:'new'}
    }
    if(!isAdmin){
      params = {...params, publicM:true};
    }
    //게시글정보
    axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/posts`,{
      params:params
    })
      .then((res)=>{
        if(res.data){
          setPost(res.data);
        }
        setTotalPost(res.headers['x-total-count'])
        // console.log('게시글 갯수 ',res.headers['x-total-count'])
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
  // const deletePost = (e,id)=>{
  //   e.stopPropagation();
  //   axios.delete(`https://moduport-8df0cce82098.herokuapp.com/api/posts/${id}`).then(()=>{
  //     getPost();
  //     toast_add({
  //       text:'성공적으로 게시글을 삭제 완료 하였습니다.',
  //       type:'success',
  //       id:uuidv4()
  //     })
  //   }).catch((er)=>{
  //     toast_add({
  //       text:`${er}`,
  //       type:'error',
  //       id:uuidv4()
  //     });
  //   })
  // }
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
      axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/user`).then((res)=>{
        setUsers(res.data);
        // console.log('유저데이터',res.data)
      }).catch((er)=>{
        console.log(er);
      });
      //게시글정보
      axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/posts`,{
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
  const [freeReplyTotal, setFreeReplyTotal] = useState([]);
  const [prepareReplyTotal, setPrepareReplyTotal] = useState([]);
  const [qnaReplyTotal, setQnaReplyTotal] = useState([]);
  const [noticeReplyTotal, setNoticeReplyTotal] = useState([]);
  const [newReplyTotal, setNewReplyTotal] = useState([]);
  const showReplyNum = useCallback( ()=>{
    axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/comments`).then((res)=>{
      if(res.data){
        const filteredReply = res.data.map((v)=>v.postId)
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
        const free = freePost.map((post)=>{
          const cnt = commentCountByPostId[post.id] || 0
          return cnt
        })
        const prepare = preparePost.map((post)=>{
          const cnt = commentCountByPostId[post.id] || 0
          return cnt
        })
        const qna = qnaPost.map((post)=>{
          const cnt = commentCountByPostId[post.id] || 0
          return cnt
        })
        const notice = noticePost.map((post)=>{
          const cnt = commentCountByPostId[post.id] || 0
          return cnt
        })
        const new1 = newPost.map((post)=>{
          const cnt = commentCountByPostId[post.id] || 0
          return cnt
        })
        setReplyTotal(postsWithCommentCounts);
        setAdminReplyTotal(adminPostReply)
        setPost5ReplyTotal(post5Reply)
        setFreeReplyTotal(free);
        setPrepareReplyTotal(prepare)
        setQnaReplyTotal(qna);
        setNoticeReplyTotal(notice);
        setNewReplyTotal(new1);

      }
      
    })
  },[post, adminPost,freePost,preparePost,qnaPost,noticePost,newPost,post5])
  useEffect(()=>{
    showReplyNum()
  },[showReplyNum])
  //type
  const allC = (e)=>{
    setPrepareType.current=false
    setQnaType.current=false;
    setNoticeType.current=false;
    setFreeType.current=false;
    setNewType.current=false;
    // setAllType.current=true;
    getPost()
    
  }
  // console.log(setAllType.current)
  const freeC = (e)=>{
    setPrepareType.current=false
    setQnaType.current=false;
    setNoticeType.current=false;
    setNewType.current=false;
    setAllType.current=false;
    setFreeType.current=true
    getPost()
    
  }
  const prepareC = (e)=>{
    setQnaType.current=false;
    setNoticeType.current=false;
    setNewType.current=false;
    setFreeType.current=false
    setAllType.current=false;
    setPrepareType.current=true
    getPost()
    
  }
  const qnaC = (e)=>{
    setPrepareType.current=false
    setNoticeType.current=false;
    setNewType.current=false;
    setAllType.current=false;
    setFreeType.current=false
    setQnaType.current=true;
    getPost();
  }
  const noticeC = (e)=>{
    setPrepareType.current=false
    setQnaType.current=false;
    setNewType.current=false;
    setAllType.current=false;
    setFreeType.current=false
    setNoticeType.current=true;
    getPost();
    
  }
  const newC = (e)=>{
    setPrepareType.current=false
    setQnaType.current=false;
    setNoticeType.current=false;
    setFreeType.current=false
    setAllType.current=false;
    setNewType.current=true;
    getPost()
    
  }
  //이벤트 칼라 지정
  const colors = ['#dde0f4','#d0fff4','#f8f8c3','#ffe3e3','#e7f5ff'];
  //스크롤 이동
  const allbtn = useRef(null);
  const scrollToAllbtn = ()=>{
    allbtn.current.scrollIntoView({behavior: 'smooth'});
  };
  return (
    <div>
      <div className='communityFont'>
        <Tooltip title="다양한 사람들과 다양한 주제로 많은 이야기를 나눠보세요." arrow>
          <h1 className=" fontW5"><span className='h1color2'>Modu</span><span className='h1color'> Community</span></h1>
        </Tooltip>
      </div>
      <div className="container chargeMain">
        {/* 이벤트 3개  */}
        <div className='boardEvent'>
          {
            adminPost.map((post, index)=>{
              return(
                <div key={post.id + post.title + post.body} className='cursor-pointer' onClick={()=>history.push(`/boardAdmin/${post.id}`)} style={{backgroundColor:colors[index % colors.length], borderRadius:'2rem', padding:'3rem', margin:'1rem'}}>
                  <p style={{color:'#757575'}}><span style={{color:'#EF5350',fontWeight:'500'}}>HOT🔥</span> 여기주목!</p>
                  <h3 className='pOver'style={{fontWeight:'500',padding:'0.5rem 0'}}>{post.title}</h3>
                  <p className='pOver1' style={{color:'#757575'}}>📢 {post.body}</p>
                  <div>
                      <span style={{ color:'#9E9E9E'}}>
                        <ThumbUpAltOutlinedIcon className='likeColor' style={{verticalAlign:'middle'}}/>{post.postUpNum}
                      </span>
                      <span  style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ChatBubbleOutlineIcon className='chatColor' style={{verticalAlign:'middle'}}/>
                        {
                          adminReplyTotal[index]
                        }
                      </span>
                    </div>
                </div>
              )
            })
          }
          
        </div>
        {/* 전체 자유 */}
        <div className='boardCategory'>
          <div style={{margin:'1rem',border:'1px solid #E0E0E0', padding:'1rem 0', borderRadius:'3rem'}}>
            <div onClick={()=>{scrollToAllbtn(); allC()}} className='d-flex cursor-pointer' style={{alignItems:'center'}}>
              <h3 style={{fontWeight:'500',padding:'0.5rem 2rem'}}>전체글</h3>
              <KeyboardDoubleArrowRightIcon style={{color:'#757575', fontSize:'26px'}}/>
            </div>
            {
              post5 ? post5.map((post, index)=>{
                return(
                  <div key={post.id + post.title + 999} onClick={()=>history.push(`/board/${post.id}`)} className='d-flex justifyB cursor-pointer miniPosts' style={{padding:'0.5rem 2rem'}}>
                    <p style={{color:'#757575', fontSize:'19px'}}>{post.title}</p>
                    <div>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ThumbUpAltOutlinedIcon className='likeColor'style={{verticalAlign:'middle'}}/>{post.postUpNum}
                      </span>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ChatBubbleOutlineIcon className='chatColor' style={{verticalAlign:'middle'}}/>
                        {
                          post5ReplyTotal[index]
                        }
                      </span>
                    </div>
                  </div>
                )
              }) :
              <div>게시글이 없습니다.</div>
            }
          </div>
          <div style={{margin:'1rem',border:'1px solid #E0E0E0', padding:'1rem 0', borderRadius:'3rem'}}>
            <div onClick={()=>{scrollToAllbtn(); freeC()}} className='d-flex cursor-pointer' style={{alignItems:'center'}}>
              <h3 style={{fontWeight:'500',padding:'0.5rem 2rem'}}>자유</h3>
              <KeyboardDoubleArrowRightIcon style={{color:'#757575', fontSize:'26px'}}/>
            </div>
            {
              freePost.length > 1 && freePost.map((post, index)=>{
                return(
                  <div key={post.id+ post.title} onClick={()=>history.push(`/board/${post.id}`)} className='d-flex justifyB cursor-pointer miniPosts' style={{padding:'0.5rem 2rem'}}>
                    <p style={{color:'#757575', fontSize:'19px'}}>{post.title}</p>
                    <div>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ThumbUpAltOutlinedIcon className='likeColor'style={{verticalAlign:'middle'}}/>{post.postUpNum}
                      </span>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ChatBubbleOutlineIcon className='chatColor'style={{verticalAlign:'middle'}}/>
                        {
                          freeReplyTotal[index]
                        }
                      </span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* prepare , qna */}
        <div className='boardCategory'>
          <div style={{margin:'1rem',border:'1px solid #E0E0E0', padding:'1rem 0', borderRadius:'3rem'}}>
            <div onClick={()=>{scrollToAllbtn(); prepareC()}} className='d-flex cursor-pointer' style={{alignItems:'center'}}>
              <h3 style={{fontWeight:'500',padding:'0.5rem 2rem'}}>취준</h3>
              <KeyboardDoubleArrowRightIcon style={{color:'#757575', fontSize:'26px'}}/>
            </div>
            {
              preparePost.length > 1 && preparePost.map((post, i)=>{
                return(
                  <div key={post.id+ post.title} onClick={()=>history.push(`/board/${post.id}`)} className='d-flex justifyB cursor-pointer miniPosts' style={{padding:'0.5rem 2rem'}}>
                    <p style={{color:'#757575', fontSize:'19px'}}>{post.title}</p>
                    <div>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ThumbUpAltOutlinedIcon className='likeColor'style={{verticalAlign:'middle'}}/>{post.postUpNum}
                      </span>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ChatBubbleOutlineIcon className='chatColor'style={{verticalAlign:'middle'}}/>
                        {
                          prepareReplyTotal[i]
                        }
                      </span>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div style={{margin:'1rem',border:'1px solid #E0E0E0', padding:'1rem 0', borderRadius:'3rem'}}>
            <div className='d-flex cursor-pointer' style={{alignItems:'center'}}>
              <h3 onClick={()=>{scrollToAllbtn(); qnaC()}} style={{fontWeight:'500',padding:'0.5rem 2rem'}}>QnA</h3>
              <KeyboardDoubleArrowRightIcon style={{color:'#757575', fontSize:'26px'}}/>
            </div>
            {
              qnaPost.length > 1 && qnaPost.map((post, i)=>{
                return(
                  <div key={post.id+ post.title} onClick={()=>history.push(`/board/${post.id}`)} className='d-flex justifyB cursor-pointer miniPosts' style={{padding:'0.5rem 2rem'}}>
                    <p style={{color:'#757575', fontSize:'19px'}}>{post.title}</p>
                    <div>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ThumbUpAltOutlinedIcon className='likeColor'style={{verticalAlign:'middle'}}/>{post.postUpNum}
                      </span>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ChatBubbleOutlineIcon className='chatColor'style={{verticalAlign:'middle'}}/>
                        {
                          qnaReplyTotal[i]
                        }
                      </span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* notice , new */}
        <div className='boardCategory'>
          <div style={{margin:'1rem',border:'1px solid #E0E0E0', padding:'1rem 0', borderRadius:'3rem'}}>
            <div onClick={()=>{scrollToAllbtn(); noticeC()}} className='d-flex cursor-pointer' style={{alignItems:'center'}}>
              <h3 style={{fontWeight:'500',padding:'0.5rem 2rem'}}>알림</h3>
              <KeyboardDoubleArrowRightIcon style={{color:'#757575', fontSize:'26px'}}/>
            </div>
            {
              noticePost.length > 1&& noticePost.map((post, i)=>{
                return(
                  <div key={post.id+ post.title} onClick={()=>history.push(`/board/${post.id}`)} className='d-flex justifyB cursor-pointer miniPosts' style={{padding:'0.5rem 2rem'}}>
                    <p style={{color:'#757575', fontSize:'19px'}}>{post.title}</p>
                    <div>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ThumbUpAltOutlinedIcon className='likeColor'style={{verticalAlign:'middle'}}/>{post.postUpNum}
                      </span>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ChatBubbleOutlineIcon className='chatColor'style={{verticalAlign:'middle'}}/>
                        {
                          noticeReplyTotal[i]
                        }
                      </span>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div style={{margin:'1rem',border:'1px solid #E0E0E0', padding:'1rem 0', borderRadius:'3rem'}}>
            <div onClick={()=>{scrollToAllbtn(); newC()}} className='d-flex cursor-pointer' style={{alignItems:'center'}}>
              <h3 style={{fontWeight:'500',padding:'0.5rem 2rem'}}>신입</h3>
              <KeyboardDoubleArrowRightIcon style={{color:'#757575', fontSize:'26px'}}/>
            </div>
            {
              newPost.length > 1 && newPost.map((post, i)=>{
                return(
                  <div key={post.id+ post.title} onClick={()=>history.push(`/board/${post.id}`)} className='d-flex justifyB cursor-pointer miniPosts' style={{padding:'0.5rem 2rem'}}>
                    <p style={{color:'#757575', fontSize:'19px'}}>{post.title}</p>
                    <div>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ThumbUpAltOutlinedIcon className='likeColor'style={{verticalAlign:'middle'}}/>{post.postUpNum}
                      </span>
                      <span style={{ marginLeft:'1rem', color:'#9E9E9E'}}>
                        <ChatBubbleOutlineIcon className='chatColor'style={{verticalAlign:'middle'}}/>
                        {
                          newReplyTotal[i]
                        }
                      </span>
                    </div>
                  </div>
                )
              })
            }
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
        <div>
          <div style={{textAlign:'center', fontSize:'18px',marginBottom:'2rem'}}>
            <div className='typeArr'>
              <div className='typeArr1'>
                <span ref={allbtn} onClick={allC} className='postType' style={{backgroundColor:'#ffd8a8'}}>전체</span>
                <span onClick={()=>freeC()}value='free' className='postType'style={{backgroundColor:'#fcc2d7'}}>자유</span>
                <span onClick={prepareC} className='postType'style={{backgroundColor:'#99e9f2'}}>취준</span>
              </div>
              <div>
                <span onClick={qnaC}className='postType'style={{backgroundColor:'#a5d8ff'}}>QnA</span>
                <span onClick={noticeC}className='postType'style={{backgroundColor:'#a9e34b'}}>알림</span>
                <span onClick={newC}className='postType'style={{backgroundColor:'#E9CFEC'}}>신입</span>
              </div>
            </div>
          </div>
        </div>
            {/* 게시판 */}
            {
              post.length > 0 ? post.map((po,i)=>{
                return(
                  <>
                  <div className="cursor-pointer boardPost d-flex justifyB" key={po.id + po.body} onClick={()=>history.push(`/board/${po.id}`)} style={{borderBottom:'1px solid #E0E0E0',padding:'1rem'}}>
                    <div style={{display:'grid',justifyItems:'center'}}>
                      <div>
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
                      </div>
                      <div style={{color:'#757575'}}>{po.email ? po.email.split('@')[0]:''}</div>
                      <div>
                        <span style={{ paddingRight:'1rem'}}>
                          <ThumbUpIcon style={{verticalAlign:'middle',color:'#1c6470'}}/>{po.postUpNum}
                        </span>
                        <span >
                          <ChatIcon className='chatColor'style={{verticalAlign:'middle'}}/>
                          {
                            replyTotal[i]
                          }
                        </span>
                      </div>
                    </div>
                    <div style={{justifyItems:'center', display:'grid', width:'55%'}}>
                      <div className='pOver' style={{fontSize:'18px',paddingTop:'1rem',color:'#757575'}}>{po.title}</div>
                      <div className='pOver' style={{fontSize:'14px' , margin:'1rem'}}>{po.body}</div>
                    </div>
                    <div>
                      <div style={{textAlign:'end',fontSize:'12px'}}>{po.id}</div>
                      <div style={{fontSize:'14px'}}>{po.date}</div>
                    </div>
                  </div>
                  </>
                );
              }) 
              : 
              <div>
                <p colSpan={3} style={{textAlign:'center'}}>게시글이 존재 하지 않습니다.</p>
              </div>
            }
          <Pagination currentPage={currentPage} numberOfPages={numberOfPages} onClick={getPostHistory}/>

      </div>
    </div>
  )
}

export default BoardPage
