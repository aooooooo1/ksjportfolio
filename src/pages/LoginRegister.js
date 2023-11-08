import { useEffect, useState } from "react";
import '../css/Login.css';
import { auth } from "../firebase-config";
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword } from "firebase/auth";
import useToast from "../hooks/toast";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { login as reduxLogin , loginAdmin} from "../redux/authSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";

const LoginRegister = () => {
  const [eye, setEye] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusE, setIsFocusE] = useState(false);
  const [isFocusP, setIsFocusP] = useState(false);
  const [activeTab, setActiveTab] = useState('#signup');
  const [user, setUser] = useState({});
  const {toast_add} = useToast();
  const dispatch = useDispatch();
  const history = useHistory();
  //date
  const curDate = new Date();
  const y = curDate.getFullYear()%100;
  const m = String(curDate.getMonth()+1).padStart(2,'0');
  const d = String(curDate.getDate()).padStart(2, '0');
  const date = `${y}년 ${m}월 ${d}일`;
  //사용자의 로그인 상태 변경 감시
  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    })
  },[])
  //register
  const register = async () => {
    toast_add({
      text:'서버와 통신중입니다. 잠시만 기달려주세요..',
      type: 'error',
      id : uuidv4()
    })
    try {
        const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
        axios.post(`https://moduport-8df0cce82098.herokuapp.com/api/user`,{
          email,
          imageListS:"/broken-image.jpg" 
        }).then((res)=>{
          toast_add({
            text:`${res}`,
            type: 'success',
            id : uuidv4()
          })
        })
        toast_add({
          text:'성공적으로 회원가입이 완료되었습니다. 바로 로그인 해주세요!',
          type: 'success',
          id : uuidv4()
        })
        setActiveTab('#login');
        console.log(user);
    } catch (error) {
      if(error.message ==='Firebase: Error (auth/invalid-email).'){
        toast_add({
          text:'이메일 형식을 맞춰 주세요. 잘못됬어요.',
          type: 'error',
          id : uuidv4()
        })
      }else if(error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
        toast_add({
          text:'비밀번호는 최소 6자 이상이어야 합니다. 다시 확인해 주세요!',
          type: 'error',
          id : uuidv4()
        })
      }else if(error.message==='Firebase: Error (auth/email-already-in-use).'){
        toast_add({
          text:'중복된 이메일 입니다. 다른 이메일을 입력해 주세요.',
          type: 'error',
          id : uuidv4()
        })
      } else{
        toast_add({
          text:'뭔가 잘못됬어요. 다시 확인해 주세요.',
          type: 'error',
          id : uuidv4()
        })
      }
        console.log(error.message);
    }
  };
  //login
  const login = async (e)=>{
    try{
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      dispatch(reduxLogin());
      localStorage.removeItem('user');
      localStorage.setItem('user',user.user.email);
      const nowUser = localStorage.getItem('user')
      axios.get(`https://moduport-8df0cce82098.herokuapp.com/api/user`).then((res)=>{
          const filteredUser = res.data.filter((item)=>item.email === nowUser);
          // console.log(filteredUser[0].id)
          if(user.user.email === 'admin@admin.com'){
            dispatch(loginAdmin());
            localStorage.setItem('reloadAndRedirect', `/my/${filteredUser[0].id}`);
            // window.location.reload();
          }
          history.push(`/my/${filteredUser[0].id}`);
          // window.location.reload();
      }).catch((er)=>{
          console.log(er);
      });
      toast_add({
        text: '정상적으로 로그인을 성공하였습니다.',
        type: 'success',
        id:uuidv4()
      })
    } catch(error){
      console.log(error.message);
      toast_add({
        text: '이메일과 비밀번호를 다시 확인해 주세요.',
        type: 'error',
        id:uuidv4()
      })
    }
  }
  useEffect(() => {
    const reloadAndRedirect = localStorage.getItem('reloadAndRedirect');
    if (reloadAndRedirect) {
      localStorage.removeItem('reloadAndRedirect'); // 필요하면 저장소에서 제거
      history.push(reloadAndRedirect); // 경로 변경
      toast_add({
        text: '관리자님 안녕하세요.',
        type: 'success',
        id:uuidv4()
      })
    }
  }, [history]);

  const handleInputFocus = () => {
    setIsFocus(true);
  };
  const handleInputFocusE = () => {
    setIsFocusE(true);
  };
  const handleInputFocusP = () => {
    setIsFocusP(true);
  };

  const handleInputBlur = (e) => {
    if (e.target.value === '') {
      setIsFocus(false);
    }
  };
  const handleInputBlurE = (e) => {
    if (e.target.value === '') {
      setIsFocusE(false);
    }
  };
  const handleInputBlurP = (e) => {
    if (e.target.value === '') {
      setIsFocusP(false);
    }
  };
  const TabClick = (e, target)=>{
    e.preventDefault();
    setActiveTab(target);
  }
  //eyeOnOff
  const eyeOnOff = ()=>{
    if(eye){
      setEye(false);
    }else{
      setEye(true);
    }
    // console.log(eye)
  }
  return (
    <div className="container containerP">
    <h1 className="h1">로그인 / 회원가입</h1>
    <div className="form">
      <ul className="tab-group">
        <li className={`tab ${activeTab==='#signup'?'active':''}`}>
          <a href="#signup" onClick={e=>TabClick(e, '#signup')}>회원가입</a>
        </li>
        <li className={`tab ${activeTab==='#login'?'active':''}`}>
          <a href="#login" onClick={e=>TabClick(e, '#login')}>로그인</a>
        </li>
      </ul>
      <div className="tab-content">
        {/* 회원가입 */}
        <div id="signup" style={{display:activeTab==='#signup'?'block':'none'}}>
          <h2 className="loginT">무료로 이용하세요.</h2>
          <form>
            <div className="top-row">
              <div className="field-wrap">
                <label className={`${isFocus?'active':''}`}>별명<span className={`req`}>*</span></label>
                <input type="text" required value={nickName} 
                  onChange={e=>setNickName(e.target.value)} 
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}/>
              </div>
            </div>
              <div className="field-wrap">
                <label className={`${isFocusE?'active':''}`}>이메일<span className="req">*</span></label>
                <input type="email" required value={email} 
                  onChange={e=>setEmail(e.target.value)}
                  onFocus={handleInputFocusE}
                  onBlur={handleInputBlurE}/>
              </div>
              <div className="field-wrap">
                <label className={`${isFocusP?'active':''}`}>비밀번호<span className="req">*</span></label>
                <div className="d-flex eye">
                  <input className="eyeInput" type={eye?"password":'text'} required autoComplete="off" value={password} 
                    onChange={e=>setPassword(e.target.value)}
                    onFocus={handleInputFocusP}
                    onBlur={handleInputBlurP}
                    onKeyUp={(e)=>{if(e.key==='Enter'){register();}}}
                    />
                  <span className="cursor-pointer" onClick={eyeOnOff}>
                    {
                      eye?<VisibilityOffIcon style={{fontSize:"30px",height:'100%'}}/>
                      : <VisibilityIcon style={{fontSize:"30px",height:'100%'}}/>
                    }
                  </span>
                </div>
              </div>
              <div style={{paddingBottom:'2rem'}}>
                <h4 style={{fontWeight:'500'}}>약관</h4>
                <div className="d-flex" style={{padding:'0.3rem 0'}}>
                  <input type="checkbox" style={{width:'20px',height:'20px'}}/>
                  <h4 style={{fontWeight:'500',marginLeft:'0.5rem'}}>전체동의</h4>
                </div>
                <p>마케팅 정보 수신동의(이메일,SMS/MMS)(선택)동의를 포함합니다.</p>
                <div style={{borderBottom:'1px solid #bdbdbd',padding:'0.5rem 0'}}></div>
                <div className="d-flex" style={{padding:'0.3rem 0'}}>
                  <input type="checkbox" style={{width:'20px',height:'20px'}}/>
                  <h4 style={{fontWeight:'500',marginLeft:'0.5rem'}}>(필수) 개인회원 약관에 동의</h4>
                </div>
                <div className="d-flex" style={{padding:'0.3rem 0'}}>
                  <input type="checkbox" style={{width:'20px',height:'20px'}}/>
                  <h4 style={{fontWeight:'500',marginLeft:'0.5rem'}}>(필수) 개인정보 수집 및 이용에 동의</h4>
                </div>
                <div className="d-flex" style={{padding:'0.3rem 0'}}>
                  <input type="checkbox" style={{width:'20px',height:'20px'}}/>
                  <h4 style={{fontWeight:'400',marginLeft:'0.5rem'}}>(선택) 마케팅 정보 수신 동의 - 이메일</h4>
                </div>
                <div className="d-flex" style={{padding:'0.3rem 0'}}>
                  <input type="checkbox" style={{width:'20px',height:'20px'}}/>
                  <h4 style={{fontWeight:'400',marginLeft:'0.5rem'}}>(선택) 마케팅 정보 수신 동의 - SMS/MMS</h4>
                </div>
              </div>
              <button type="button" onClick={register} className="btnSm btn--primary">시작하기 (Enter)</button>
          </form>
        </div>
        {/* 로그인 */}
        <div id="login" style={{display:activeTab==='#login'?'block':'none'}}>
          <h2 className="loginT">Welcome Back!</h2>
          <form>
            <div className="field-wrap">
              <label className={`${isFocusE?'active':''}`}>이메일<span className="req">*</span></label>
              <input type="email" required value={loginEmail} 
                onChange={e=>setLoginEmail(e.target.value)}
                onFocus={handleInputFocusE}
                onBlur={handleInputBlurE}/>
            </div>
            <div className="field-wrap">
              <label className={`${isFocusP?'active':''}`}>비밀번호<span className="req">*</span></label>
              <div className="d-flex eye">
                <input className="eyeInput" type={eye?"password":'text'} required autoComplete="off" value={loginPassword} 
                  onChange={e=>setLoginPassword(e.target.value)}
                  onFocus={handleInputFocusP}
                  onBlur={handleInputBlurP}
                  onKeyUp={(e)=>{if(e.key==='Enter'){login();}}}
                  />
                  <span className="cursor-pointer" onClick={eyeOnOff}>
                    {
                      eye?<VisibilityOffIcon style={{fontSize:"30px",height:'100%'}}/>
                      : <VisibilityIcon style={{fontSize:"30px",height:'100%'}}/>
                    }
                  </span>
              </div>
            </div>
            <button type="button" onClick={login} className="btnSm btn--primary">로그인 (Enter)</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoginRegister;
