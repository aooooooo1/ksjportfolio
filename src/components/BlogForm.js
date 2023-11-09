import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom";
import {onAuthStateChanged} from "firebase/auth";
import { auth, storage } from "../firebase-config";
import useToast from "../hooks/toast";
import { v4 as uuidv4, v4 } from 'uuid';
import { bool } from "prop-types";
import '../css/CreateBlog.css';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";

const BlogForm = ({edit}) => {
    const location = useLocation();
    const isBoardAdmin = location.pathname.includes('/boardAdmin');
    //관리자 모드
    const isAdmin = useSelector((state)=>{
        return state.auth.isAdmin
    })
    const [publicM , setPublicM] = useState(false);
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState('');
    const [madeEmail, setMadeEmail] = useState('');
    const [ postUpNum , setPostUpNum] = useState(0);
    const [ userEmail, setUserEmail] = useState([]);
    const [userImg, setUserImg] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isFocusB, setIsFocusB] = useState(false);
    const [showError, setShowError] = useState(false);
    const history = useHistory();
    const [user, setUser] = useState({});
    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        })
    },[])
    const {toast_add} = useToast();
    const handleInputFocus = () => {
        setIsFocus(true);
    };
    const handleInputBlur = (e) => {
        if (e.target.value === '') {
        setIsFocus(false);
        }
    };
    const handleInputFocusB = () => {
        setIsFocusB(true);
    };
    const handleInputBlurB = (e) => {
        if (e.target.value === '') {
        setIsFocusB(false);
        }
    };
    
    //유효성검사
    const validate = ()=>{
        let vali;
        if(title === ''){
            vali = false
            toast_add({
                text:'제목을 입력해주세요',
                type:'error',
                id:uuidv4()
            })
        }
        if(body === ''){
            vali = false
            toast_add({
                text:'내용을 입력해주세요',
                type:'error',
                id:uuidv4()
            })
        }
        if(title !=='' && body !==''){
            vali = true
        }
        // console.log(vali)
        return vali
    }

    //onsubmit
    const [userServerImg, setUserServerImg] = useState('');
    const onSubmit = ()=>{
        //date
        const currentDate = new Date();
        const year = currentDate.getFullYear()%100;
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}. ${month}. ${day}`;
        //유효성 통과시 실행    
        if(validate()===true){
            if(userImg){
                const imageRef = ref(storage, `userImg/${userImg.name + v4()}`);
                uploadBytes(imageRef, userImg).then((res)=>{
                    getDownloadURL(res.ref).then((res)=>{
                        // console.log(res)
                        setUserServerImg(res);
                        if(edit){
                            axios.put(`https://moduportfolio-09b6894bf3f7.herokuapp.com/api/${isAdmin? 'adminPosts':'posts'}/${id}`,{
                                title,
                                body,
                                category,
                                date: formattedDate,
                                email:user.email,
                                publicM,
                                postUpNum,
                                isPostUp:false,
                                userServerImg:res,
                                userEmail,
                            }).then(()=>{
                                history.push(`/${isBoardAdmin?'boardAdmin':'board'}/${id}`);
                            }).catch(()=>{
                                toast_add({
                                    text:'서버가 꺼져있습니다. 관리자에게 문의해 주세요.',
                                    type:'error',
                                    id:uuidv4()
                                })
                            })
                            return
                        }
                        const comments = [];
                        //데이터 post
                        axios.post(`https://moduportfolio-09b6894bf3f7.herokuapp.com/api/${isBoardAdmin? 'adminPosts':'posts'}`,{
                            title,
                            body,
                            category,
                            date: formattedDate,
                            email:user.email,
                            publicM,
                            comments,
                            postUpNum:0,
                            isPostUp:false,
                            userServerImg: res,
                            userEmail,
                        }).then(()=>{
                            history.push(`/${isBoardAdmin?'boardAdmin':'board'}`);
                            toast_add({
                                text:'성공적으로 글작성이 완료되었습니다.',
                                type:'success',
                                id:uuidv4()
                            })
                        }).catch(()=>{
                            toast_add({
                                text:'서버가 꺼져있습니다. 관리자에게 문의해 주세요.',
                                type:'error',
                                id:uuidv4()
                            })
                        })
                        
                    });
                }).catch((er)=>{
                    console.log(er.message);
                })
                return;
            }else
            console.log(userServerImg)
            //수정일때
            if(edit){
                axios.put(`https://moduportfolio-09b6894bf3f7.herokuapp.com/api/${isAdmin? 'adminPosts':'posts'}/${id}`,{
                    title,
                    body,
                    category,
                    date: formattedDate,
                    email:user.email,
                    publicM,
                    postUpNum,
                    isPostUp:false,
                    userServerImg,
                    userEmail,
                }).then(()=>{
                    history.push(`/${isBoardAdmin?'boardAdmin':'board'}/${id}`);
                }).catch(()=>{
                    toast_add({
                        text:'서버가 꺼져있습니다. 관리자에게 문의해 주세요.',
                        type:'error',
                        id:uuidv4()
                    })
                })
                return
            }
            const comments = [];
            //데이터 post
            axios.post(`https://moduportfolio-09b6894bf3f7.herokuapp.com/api/${isAdmin? 'adminPosts':'posts'}`,{
                title,
                body,
                category,
                date: formattedDate,
                email:user.email,
                publicM,
                comments,
                postUpNum:0,
                isPostUp:false,
                userServerImg,
                userEmail,
            }).then(()=>{
                history.push(`/${isBoardAdmin?'boardAdmin':'board'}`);
                toast_add({
                    text:'성공적으로 글작성이 완료되었습니다.',
                    type:'success',
                    id:uuidv4()
                })
            }).catch(()=>{
                toast_add({
                    text:'서버가 꺼져있습니다. 관리자에게 문의해 주세요.',
                    type:'error',
                    id:uuidv4()
                })
            })
        }
    }
    //edit
    
    useEffect(()=>{
        if(edit){
            axios.get(`https://moduportfolio-09b6894bf3f7.herokuapp.com/api/${isBoardAdmin?'adminPosts':'posts'}/${id}`).then((res)=>{
                setTitle(res.data.title);
                setBody(res.data.body);
                setDate(res.data.date);
                setMadeEmail(res.data.email);
                setPublicM(res.data.publicM);
                setPostUpNum(res.data.postUpNum)
                setUserImg(res.data.userImg);
                setUserEmail(res.data.userEmail);
                setCategory(res.data.category)
                if(localStorage.getItem('user') !== res.data.email){
                    console.log('local',localStorage.getItem('user'))
                    console.log('madeEmail',res.data.email)
                    setShowError(true);
                    toast_add({
                        text:'잘못된 접근입니다.',
                        type:'error',
                        id:uuidv4()
                    })
                }
            }).catch((error)=>{
                console.log(error);
            });
        }
    },[id,edit,setShowError]);

    const goBack= ()=>{
        if(edit){
            history.push(`/${isBoardAdmin?'boardAdmin':'board'}/${id}`);
        }else{
            history.push(`/${isBoardAdmin?'boardAdmin':'board'}`);
        }
    }
    //category
    const [category, setCategory] = useState('free');
    const categoryChange = (e)=>{
        setCategory(e.target.value);
    }
    //이미지 업로드
    const imgRef = useRef(null);
    const imgBox = ()=>{
        imgRef.current.click();
    }
    //이미지 수시로 변경
    function imgChange(e){
        if(e.target.files[0]){
            setUserImg(e.target.files[0]);
        }
    };
    return (
        <>
        {showError?<h1 className="textA">지금은 수정 페이지입니다. 다른사람의 글을 수정할수 없습니다.</h1>:
        <>
        <div className="container containerP gridC">
            <h1 className="h1">{edit?'게시글 수정':'게시글 작성'}</h1>
            {edit&&
                <div className="d-flex justify" style={{paddingBottom:"1rem"}}>
                    <div>{date}</div>
                    <div>작성자 : {madeEmail}</div>
                </div>
            }
            <div className="d-flex" style={{paddingBottom:'1rem'}}>
                <p>카테고리</p>
                <select onChange={categoryChange} className="postSelet">
                    <option value="free">잡담</option>
                    <option value="prepare">취준</option>
                    <option value="notice">채용공고</option>
                    <option value="new">신입</option>
                    <option value="qna">QnA</option>
                </select>
            </div>
            <div className="field-wrap">
                <label className={`${isFocus?'active':''}`}>제목<span className={`req`}>*</span></label>
                <input type="text" required value={title} 
                    onChange={e=>setTitle(e.target.value)} 
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur} className="inputW"/>
            </div>
            <div className="field-wrap2">
                <label className={`${isFocusB?'activeB':''}`}>내용<span className={`req`}>*</span></label>
                <textarea type="text" required value={body} 
                    onChange={e=>setBody(e.target.value)} 
                    onFocus={handleInputFocusB}
                    onBlur={handleInputBlurB} rows={8} className="inputW createTextArea"/>
            </div>
            {/* 이미지 아이콘 */}
            <div onClick={imgBox} style={{}} className="cursor-pointer d-flex">
                <UploadFileIcon style={{fontSize:"40px",color:'grey',position:'absolute'}}/>
                <input accept='image/*' onChange={imgChange} ref={imgRef} type="file" style={{display:'none'}}/>
                <div style={{margin:'0 auto'}}>
                    {userImg?<img style={{width:'250px'}} src={URL.createObjectURL(userImg)} alt=''></img>:''}
                </div>
            </div>
            <div className="d-flex" style={{margin:'40px 0 0 3px'}}>
                <input checked={publicM} onChange={e=>setPublicM(e.target.checked)} className="cursor-pointer" type="checkbox" style={{width:"20px"}}/><div style={{marginTop:'5px'}}>공개</div>
            </div>
        </div>
        <div className="d-flex justify-content-center" style={{marginBottom:"5rem"}}>
            <button type="button" className="btn btn--primary "  onClick={onSubmit}>{edit?'수정':'등록'}</button>
            <button type="button" className="btn cencle" onClick={goBack}>취소</button>
        </div></>
        }
        </>
    )
}
BlogForm.propTypes ={
    edit:bool,
}
BlogForm.defaultProps={
    //부모로부터 반은 프롭edit이 true면 edit모드 아니면 생성모드
    edit:false,
}
export default BlogForm;

