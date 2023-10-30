import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase-config";
import useToast from "../hooks/toast";
import { v4 as uuidv4 } from 'uuid';
const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [isFocusB, setIsFocusB] = useState(false);
    const history = useHistory();
    const [user, setUser] = useState({});
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
    const goBack= ()=>{
        history.push('/board');
    }
    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        })
    },[])

    //onsubmit
    const onSubmit = ()=>{
        //date
        const currentDate = new Date();
        const year = currentDate.getFullYear()%100;
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}년 ${month}월 ${day}일`;
        //데이터 post
        axios.post("http://localhost:3002/posts",{
            title,
            body,
            date: formattedDate,
            email:user.email
        }).then(()=>{
            history.push('/board');
            toast_add({
                text:'성공적으로 글작성이 완료되었습니다.',
                type:'success',
                id:uuidv4()
            })
        })
    }
    return (
        <>
        <div className="container containerP gridC">
            <h1 className="h1">게시글 작성</h1>
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
                    onBlur={handleInputBlurB} rows={8} className="inputW"/>
            </div>
        </div>
        <div className="d-flex justify-content-center" style={{marginBottom:"5rem"}}>
            <button type="button" className="btn btn--primary " style={{margin:"1rem"}} onClick={onSubmit}>작성완료</button>
            <button type="button" className="btn cencle" style={{margin:"1rem"}} onClick={goBack}>취소</button>
        </div>
        </>
    )
}

export default BlogForm;

