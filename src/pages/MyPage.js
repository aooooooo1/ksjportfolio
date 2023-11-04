import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar } from '@mui/material';
import { auth, storage } from '../firebase-config';
import { ref, uploadBytes , listAll,list ,getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import useToast from '../hooks/toast';
import InputForm from '../components/InputForm';
import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Table from '@mui/joy/Table';
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination1 from '../components/Pagination';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import axios from 'axios';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { v4 as uuidv4 } from 'uuid';
import '../css/My.css';
import '../css/Board.css';
import { logout as reduxLogout } from "../redux/authSlice";
import { useDispatch } from 'react-redux';

const MyPage = () => {
    const [post, setPost] = useState([]);
    const [users, setUsers] = useState([]);
    const [usersId, setUsersId] = useState(0);
    const history = useHistory();
    const inputRef = useRef(null);
    const [userImg, setUserImg] = useState(null);
    // const [imageList, setImageList] = useState([]);
    const [imageListS, setImageListS] = useState('');
    const {toast_add} = useToast();
    const userEmail = localStorage.getItem('user');
    // const imageListRef = ref(storage, `${userEmail}`);
    const imageListRef = ref(storage, `userProfileImg`);
    //주소 가져오기
    const location = useLocation();
    const url = new URLSearchParams(location.search);
    const urlPage = url.get('page');
    //페이징네이션
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPost, setTotalPost] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    //서치
    const [searchInput, setSearchInput] = useState('');
    //사용자의 정보를 user에 넣음
    const [user, setUser] = useState({});
    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        })
    },[])
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
            email:user.email
        }
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
    },[limit,searchInput,user.email])
    //좋아요 한 게시글 가져오는 함수
    // const [postUp, setPostUp] = useState([]);
    const postUp = useRef(new Set());
    const getPostLike = useCallback((page)=>{
        let params = {
        _page:page,
            _limit:limit,
            _sort:'id',
            _order:'desc',
            title_like:searchInput,
        }
        axios.get(`http://localhost:3002/posts`,{
        params:params
        })
        .then((res)=>{
            const nowUser = localStorage.getItem('user')
            const likePost = res.data
            const likedPosts = new Set();
            for(let i = 0; i < likePost.length; i++){
                let forLike = likePost[i].userEmail;
                for(let j = 0; j < forLike.length; j++){
                    let forEmail = forLike[j];
                    let likePostBool = forEmail === nowUser
                    if(likePostBool){
                        likedPosts.add(likePost[i]);
                    }
                }
            }
            postUp.current = [...likedPosts];
            console.log(postUp.current)
        }).catch((er)=>{
        toast_add({
            text:`${er}`,
            type:'error',
            id:uuidv4()
        })
        })
    },[limit,searchInput,toast_add])

    //페이지주소가 바뀔때 마다 실행
    useEffect(()=>{
        getPost(parseInt(urlPage)||1)
        getPostLike(1)
    },[urlPage,getPost,getPostLike])


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
    //이미지 박스 설정
    function refBox(){
        inputRef.current.click();
    }
    //이미지 수시로 변경
    function imgChange(e){
        if(e.target.files[0]){
            setUserImg(e.target.files[0]);
        }
    };



    //서버에서 사진경로 가져오기
    //유저정보
    useEffect(()=>{
        axios.get(`http://localhost:3002/user`).then((res)=>{
            setUsers(res.data);
        }).catch((er)=>{
            console.log(er);
        });
    },[])
    const userEmails = users.map(u => u.email);
    // console.log(userEmails);
    // console.log(userEmails.includes(userEmail))

    //업로드 버튼
    function uploadServerImg(){
        if(userImg === null){
            toast_add({
                text:'이미지를 올려주세요.',
                type:'error',
                id:v4()
            })
            return;
        }
        const imageRef = ref(storage, `userProfileImg/${userImg.name + v4()}`);
        uploadBytes(imageRef, userImg).then((res)=>{
            toast_add({
                text:'이미지 업로드중입니다. 잠시만 기달려 주세요.',
                type:'error',
                id:v4()
            })
            getDownloadURL(res.ref).then((res)=>{
                setImageListS(res);
                if(userEmails.includes(userEmail)){
                    console.log('로그인유저와 유저데이터에 유저이메일이 같은게 있다')
                    const matchingId = users.filter((u)=>u.email === userEmail).map((v)=>v.id);
                    console.log(matchingId)
                    axios.put(`http://localhost:3002/user/${matchingId}`,{
                        imageListS : res,
                        email:userEmail
                    }).then(() => {
                        console.log('데이터 업데이트 완료');
                        window.location.reload();
                    })
                    .catch((er) => {
                        toast_add({
                            text:'서버가 꺼져있는거 같아요. 관리자에게 문의해주세요',
                            type:'error',
                            id:uuidv4()
                        })
                        console.log(er);
                    });
                }else{
                    console.log('이 사용자는 프사를 처음 등록합니다.')
                    axios.post(`http://localhost:3002/user`,{
                        imageListS: res,
                        email:userEmail
                    }).then(() => {
                        console.log('데이터 업데이트 완료');
                        window.location.reload();
                    })
                    .catch((er) => {
                        toast_add({
                            text:'서버가 꺼져있는거 같아요. 관리자에게 문의해주세요',
                            type:'error',
                            id:uuidv4()
                        })
                        console.log(er);
                    });
                }
            });
        }).then((res)=>{
            console.log('서버에 데이터 전송됨');
        }).catch((er)=>{
            console.log(er.message);
        })
    }
    

    //logout
    const dispatch = useDispatch();
    const logout = async ()=>{
        if(localStorage.getItem('user')==='admin@admin.com'){
            await signOut(auth);
            dispatch(reduxLogout());
            history.push('/');
            setTimeout(()=>{
                window.location.reload();
            },500)
        }else{
            await signOut(auth);
            dispatch(reduxLogout());
            console.log('로그아웃 정상완료')
        }
        history.push('/');
        toast_add({
            text:'로그아웃 되었습니다. 안녕히가세요.',
            type: 'success',
            id : uuidv4()
        });
    }


    return (
        <div className='container chargeMain'>
            <h1 className="textA fontW5" style={{marginBottom:'2rem'}}>내정보</h1>
            <div className='myImgDiv'>
                <div>
                    <div>
                        <div onClick={refBox} style={{border:'1px solid #adb5bd', padding:'1rem',width:'100px',height:'100px',position:'relative',borderRadius:'50%'}} className='container cursor-pointer' >
                            <UploadFileIcon style={{fontSize:"40px", position:'absolute',right:'0',bottom:'0',color:'grey'}}/>
                            <input accept='image/*' onChange={imgChange} type="file" ref={inputRef} style={{display:'none'}}/>
                            {userImg?<img style={{width:'150px'}} src={URL.createObjectURL(userImg)} alt=''></img>:''}
                        </div>
                    </div>
                    <div className='textA' style={{padding:'3rem'}}>
                        <button onClick={uploadServerImg} className='btnSm btn--primary'>업로드</button>
                    </div>
                </div>
                <div className=''>
                    {
                        users.map((u)=>{
                            if(u.email === userEmail){
                            return (
                                <Avatar
                                style={{ border: '1px solid #dad4d4',margin:'0 auto'}}
                                key={u.imageListS}
                                alt=""
                                src={u.imageListS}
                                sx={{ width: 100, height: 100 }}
                                />
                            )
                            }
                            return null;
                        })
                    }
                    <div className='' style={{padding:'3rem', fontSize:'18px'}}>
                        <p style={{textAlign:'center'}}>이메일 : {userEmail}</p>
                    </div>
                </div>
            </div>
            <div className='logoutBtn'>
                <div onClick={logout} className="btnSm btn--fix cursor-pointer ">로그아웃</div>
            </div>
            <h3 className='fontW5' style={{marginTop:'3rem'}}><span className="barMy"></span>내가 쓴 게시글</h3>
            {/* 게시판 */}
            <div className="py-3 d-flex justify-content-between">
                <InputForm onChange={(e)=>setSearchInput(e.target.value)} onClick={search}/>
                    <Link to="/board/create" className="postAdd">
                        <PostAddIcon fontSize="large" style={{fontSize:"35px",verticalAlign:'middle'}}/>
                    </Link>
            </div>
            <Table aria-label="basic table" style={{fontSize:"16px"}}>
                <thead>
                <tr>
                    <th style={{ width: '10%', textAlign:"center" }}>번호</th>
                    <th style={{textAlign:"center"}}>제목</th>
                    <th className='boardDate' style={{ width: '20%', textAlign:"center"}}>날짜</th>
                    <th className='writerMy' style={{width:'1%'}}></th>
                    <th className='writerMy' style={{ width: '15%', textAlign:"center"}}>글쓴이</th>
                    <th className='myD'  style={{ textAlign:"center"}}>삭제</th>
                    <th className='myD'  style={{ textAlign:"center"}}>공개</th>
                </tr>
                </thead>
                <tbody>
                {
                    post.length > 0 ? post.map((po,i)=>{
                    return(
                        <tr key={po.id} onClick={()=>history.push(`/board/${po.id}`)} className="cursor-pointer">
                            <td style={{textAlign:"center"}}>{i+1}</td>
                            <td style={{textAlign:"center"}} className="line-limit">{po.title}</td>
                            <td className='boardDate' style={{textAlign:"center"}}>{po.date}</td>
                            <td className='media768'>
                                {
                                    users.map((u)=>{
                                        if(u.email === userEmail){
                                        return (
                                            <Avatar
                                            className='avatar writerMy'
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
                            <td className='writerMy' style={{textAlign:'center'}}>
                                {po.email ? po.email.split('@')[0]:''}
                            </td>
                            {/* 딜리트 아이콘 */}
                            {(user.email===po.email)?<td onClick={e=>deletePost(e,po.id)} style={{textAlign:"center", color:"darkred",cursor:"pointer"}}><DeleteIcon fontSize="large" style={{verticalAlign:'middle'}}/></td>:<td></td>}
                            {/* 공개여부 */}
                            <td style={{textAlign:"center"}}>{po.publicM?'공개':<DoNotDisturbIcon style={{fontSize:'large', color:'#B71C1C',verticalAlign:'middle'}}/>}</td>
                        </tr>
                    );
                    }) : <tr>
                            <td colSpan={3} style={{textAlign:'center'}}>게시글이 존재 하지 않습니다.</td>
                        </tr>
                }
                </tbody>
            </Table>
            <Pagination1 currentPage={currentPage} numberOfPages={numberOfPages} onClick={getPostHistory}/>
            {/* 좋아요 게시글 */}
            <h3 className='fontW5' style={{marginTop:'3rem'}}><span className="barMy"></span>좋아요 누른 게시글</h3>
            <Table aria-label="basic table" style={{fontSize:"16px"}}>
                <thead>
                <tr>
                    <th style={{ width: '10%', textAlign:"center" }}>번호</th>
                    <th style={{textAlign:"center"}}>제목</th>
                    <th className='boardDate' style={{ width: '20%', textAlign:"center"}}>날짜</th>
                    <th className='writerMy' style={{width:'1%'}}></th>
                    <th className='writerMy' style={{ width: '15%', textAlign:"center"}}>글쓴이</th>
                </tr>
                </thead>
                <tbody>
                {
                    postUp.current.length > 0 ? postUp.current.map((post,i)=>{
                    return(
                        <tr key={i+1} onClick={()=>history.push(`/board/${post.id}`)} className="cursor-pointer">
                            <td style={{textAlign:"center"}}>{i+1}</td>
                            <td style={{textAlign:"center"}} className="line-limit">{post.title}</td>
                            <td className='boardDate' style={{textAlign:"center"}}>{post.date}</td>
                            <td className='media768'>
                                {
                                    users.map((u)=>{
                                        if(u.email === post.email){
                                        return (
                                            <Avatar
                                            className='avatar writerMy'
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
                            <td className='writerMy' style={{textAlign:'center'}}>
                                {post.email ? post.email.split('@')[0]:''}
                            </td>
                        </tr>
                    );
                    }) : <tr>
                            <td colSpan={3} style={{textAlign:'center'}}>게시글이 존재 하지 않습니다.</td>
                        </tr>
                }
                </tbody>
            </Table>
        </div>
    )
}  

export default MyPage
