import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import '../css/Board.css';
import Table from '@mui/joy/Table';
import PostAddIcon from '@mui/icons-material/PostAdd';
import InputForm from "../components/InputForm";
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
import { Avatar } from '@mui/material';
import { list ,getDownloadURL, ref, listAll } from 'firebase/storage';
import CampaignIcon from '@mui/icons-material/Campaign';

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
  const userEmail = localStorage.getItem('user');
  const imageListRef = ref(storage, `userProfileImg`);
    const [imageList, setImageList] = useState([]);

  // const [imageListS, setImageListS] = useState();

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



  const [imgUserEmail, setImgUserEmail] = useState([]);




  let limit = 5
  useEffect(()=>{
    //페이지 갯수
    setNumberOfPages(Math.ceil(totalPost / limit))
  },[totalPost,limit])

  const getPostHistory = (page)=>{
    history.push(`${location.pathname}?page=${page}`);
    getPost(page);
  }
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
    //유저정보
    axios.get(`http://localhost:3002/user`).then((res)=>{
      setUsers(res.data);
      console.log('유저데이터',res.data)
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
  },[limit,isAdmin,searchInput])
  //페이지주소가 바뀔때 마다 실행
  useEffect(()=>{
    getPost(parseInt(urlPage)||1)
  },[urlPage,getPost])


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
    setPostNum((currentPage-1)*5 + 1);
  },[currentPage]) 


  return (
    <div className="container chargeMain">
      <h1 className="textA fontW5">{isAdmin?'관리자 게시판':'게시판'}</h1>
      <div className="py-3 d-flex justify-content-between">
          <InputForm onChange={(e)=>setSearchInput(e.target.value)} onClick={search}/>
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
      <Table aria-label="basic table" style={{fontSize:"16px"}}>
        <thead>
          <tr>
            <th style={{ width: '10%', textAlign:"center" }}>번호</th>
            <th style={{textAlign:"center"}}>제목</th>
            <th className='boardDate' style={{ width: '20%', textAlign:"center"}}>날짜</th>
            <th style={{width:'6%'}}></th>
            <th className='writer' style={{ textAlign:"center"}}>글쓴이</th>
            {isLogin?<th className='media768' style={{ width: '10%', textAlign:"center"}}>삭제</th>:<th style={{width:'1%'}}></th>}
            {isAdmin&&<th className='media768' style={{ width: '10%', textAlign:"center"}}>공개</th>}
          </tr>
        </thead>
        <tbody>
          {/* 관리자공지사항 */}
          {
            post.map((po)=>{
              if(po.email === 'admin@admin.com' && po.publicM === true){
                return(
                  <tr style={{backgroundColor:'rgb(255 240 240)'}} key={po.id} onClick={()=>history.push(`/board/${po.id}`)} className="cursor-pointer">
                    <td style={{textAlign:"center",color:'#B71C1C'}}><CampaignIcon style={{fontSize:'30px',verticalAlign:'middle'}}/></td>
                    <td style={{textAlign:"center"}} className="line-limit">{po.title}</td>
                    <td style={{textAlign:"center"}} className='boardDate'>{po.date}</td>
                    <td style={{textAlign:"center"}}>
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
                    <td style={{textAlign:"center"}}>{po.email.split('@')[0]}</td>
                    <td className='media768' onClick={e=>deletePost(e,po.id)} style={{textAlign:"center", color:"darkred",cursor:"pointer"}}><DeleteIcon fontSize="large" style={{verticalAlign:'middle'}} /></td>
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
                    {/* 번호 */}
                    <td style={{textAlign:"center"}}>{postNum + i}</td>
                    {/* 제목 */}
                    <td style={{textAlign:"center"}} className="line-limit">{po.title}</td>
                    {/* 날짜 */}
                    <td className='boardDate' style={{textAlign:"center"}}>{po.date}</td>
                    {/* 프로필 사진*/}
                    <td> 
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
                    {/* 닉네임 */}
                    <td style={{textAlign:'center'}}>
                      {po.email ? po.email.split('@')[0]:''}
                    </td>
                    {/* 삭제 */}
                    {isLogin&&(user.email===po.email||isAdmin)&&<td className='media768' onClick={e=>deletePost(e,po.id)} style={{textAlign:"center", color:"darkred",cursor:"pointer"}}><DeleteIcon fontSize="large" style={{verticalAlign:'middle'}} /></td>}
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
  )
}

export default BoardPage
