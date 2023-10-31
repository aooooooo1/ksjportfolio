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
import { auth } from '../firebase-config';
import useToast from '../hooks/toast';
import { v4 as uuidv4 } from 'uuid';


const BoardPage = () => {
  const isLogin = useSelector((state)=>{
    return state.auth.isLogin;
  })
  const [user, setUser] = useState({});

  useEffect(()=>{
      onAuthStateChanged(auth, (currentUser)=>{
          setUser(currentUser);
      })
  },[])

  const [post, setPost] = useState([]);
  const history = useHistory();
  const {toast_add} = useToast();
  //게시글 가져오는 함수
  const getPost = useCallback((page)=>{
    axios.get(`http://localhost:3002/posts`)
      .then((res)=>{
        setPost(res.data);
    }).catch(()=>{
      toast_add({
        text:'서버가 꺼져있습니다. 관리자에게 문의해 주세요.',
        type:'success',
        id:uuidv4()
    })
    })
  },[])
  //로딩후Getpoast실행
  useEffect(()=>{
    getPost();
  },[getPost])

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

  return (
    <div className="container chargeMain">
      <h1 className="textA fontW5">게시판</h1>
      <div className="py-3 d-flex justify-content-between">
          <InputForm/>
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
            <th style={{ width: '20%', textAlign:"center"}}>글쓴이</th>
            {isLogin?<th style={{ width: '10%', textAlign:"center"}}>삭제</th>:<th style={{width:'1%'}}></th>}
          </tr>
        </thead>
        <tbody>
          {
            post.length > 0 ? post.map((po,i)=>{
              return(
                <tr key={po.id} onClick={()=>history.push(`/board/${po.id}`)} className="cursor-pointer">
                    <td style={{textAlign:"center"}}>{i+1}</td>
                    <td style={{textAlign:"center"}} className="overText">{po.title}</td>
                    <td className='boardDate' style={{textAlign:"center"}}>{po.date}</td>
                    {/* <td style={{textAlign:"center"}}>{po.publicM?'공개':'비공개'}</td> */}
                    <td style={{textAlign:"center"}}>{po.email ? po.email.split('@')[0]:''}</td>
                    {isLogin&&user.email===po.email?<td onClick={e=>deletePost(e,po.id)} style={{textAlign:"center", color:"darkred",cursor:"pointer"}}><DeleteIcon fontSize="large" /></td>:<td></td>}
                </tr>
              );
            }) : <tr>
                    <td colSpan={3} style={{textAlign:'center'}}>게시글이 존재 하지 않습니다. 게시글을 작성해 주세요!</td>
                </tr>
          }
        </tbody>
      </Table>
      {
        post.length > 0 && <Pagination/>
      }
    </div>
  )
}

export default BoardPage
