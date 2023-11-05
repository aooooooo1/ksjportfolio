import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import {onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase-config";
import useToast from "../hooks/toast";
import { v4 as uuidv4 } from 'uuid';
import { bool } from "prop-types";
import '../css/CreateBlog.css'
const BlogForm = ({edit}) => {
    const [publicM , setPublicM] = useState(false);
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState('');
    const [madeEmail, setMadeEmail] = useState('');
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
        console.log(vali)
        return vali
    }

    //onsubmit
    const onSubmit = ()=>{
        //date
        const currentDate = new Date();
        const year = currentDate.getFullYear()%100;
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}년 ${month}월 ${day}일`;
        //유효성 통과시 실행    
        if(validate()===true){
            //수정일때
            if(edit){
                axios.put(`http://localhost:3002/posts/${id}`,{
                    title,
                    body,
                    date: formattedDate,
                    email:user.email,
                    publicM,
                    postUpNum:0,
                    isPostUp:false,
                    userEmail: []
                }).then(()=>{
                    history.push(`/board/${id}`);
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
            axios.post("http://localhost:3002/posts",{
                title,
                body,
                date: formattedDate,
                email:user.email,
                publicM,
                comments,
                postUpNum:0,
                isPostUp:false,
                userEmail: []
            }).then(()=>{
                history.push('/board');
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
            axios.get(`http://localhost:3002/posts/${id}`).then((res)=>{
                setTitle(res.data.title);
                setBody(res.data.body);
                setDate(res.data.date);
                setPublicM(res.data.publicM);
                setMadeEmail(res.data.email);
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
            history.push(`/board/${id}`);
        }else{
            history.push('/board');
        }
    }
    
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
            <div className="field-wrap">
                <label className={`${isFocus?'active':''}`}>제목<span className={`req`}>*</span></label>
                <input type="text" required value={title} 
                    onChange={e=>setTitle(e.target.value)} 
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur} className="inputW"/>
            </div>
            <div className="field-wrap">
                <label className={`${isFocusB?'activeB':''}`}>내용<span className={`req`}>*</span></label>
                <textarea type="text" required value={body} 
                    onChange={e=>setBody(e.target.value)} 
                    onFocus={handleInputFocusB}
                    onBlur={handleInputBlurB} rows={8} className="inputW createTextArea"/>
            </div>
            <div className="d-flex" >
                <input checked={publicM} onChange={e=>setPublicM(e.target.checked)} className="cursor-pointer" type="checkbox" style={{width:"20px"}}/><div style={{marginTop:'5px'}}>공개</div>
            </div>
        </div>
        <div className="d-flex justify-content-center" style={{marginBottom:"5rem"}}>
            <button type="button" className="btn btn--primary " style={{margin:"1rem"}} onClick={onSubmit}>{edit?'수정하기':'작성완료'}</button>
            <button type="button" className="btn cencle" style={{margin:"1rem"}} onClick={goBack}>취소</button>
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

