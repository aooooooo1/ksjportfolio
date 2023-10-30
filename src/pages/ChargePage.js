import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const ChargePage = () => {
    const history = useHistory();

    const goPort = ()=>{
        history.push('/portfolio');
    }
    const goLogin = ()=>{
        history.push('/login');
    }

    const isLogin = useSelector((state)=>{
        return state.auth.isLogin;
    })
    return (
        <div className='chargeMain container'>
            <div className='textAlign py-3 textKo cardH'>
                <h1 className='h1'>모두의 <span className='primaryC'>Portfolio</span> 요금</h1>
            </div>
            <div className='d-flex justify-content-center '>
            <Card size="lg" variant="outlined" className="cardW">
                <Chip size="lg" variant="outlined" color="neutral" style={{fontSize:"14px",backgroundColor:"#1c6470",color:"#fff",padding:"4px 12px"}}>
                기본
                </Chip>
                <Typography level="h2" style={{fontSize:"33px"}}> Free</Typography>
                <Divider inset="none" />
                <List size="lg" style={{fontSize:"16px"}}>
                    <ListItem >
                        <ListItemDecorator>
                        <Check />
                        </ListItemDecorator>
                        100% 무료
                    </ListItem>
                    <ListItem>
                        <ListItemDecorator>
                        <Check />
                        </ListItemDecorator>
                        디자인 모드
                    </ListItem>
                    <ListItem>
                        <ListItemDecorator>
                        <Check />
                        </ListItemDecorator>
                        검색엔진 최적화
                    </ListItem>
                    <ListItem>
                        <ListItemDecorator>
                        <Check />
                        </ListItemDecorator>
                        페이지 무제한
                    </ListItem>
                </List>
                <Divider inset="none" />
                <CardActions>
                    <Typography level="title-lg" style={{fontSize:"20px"}}>
                        0원{' '}
                        <Typography style={{fontSize:"20px"}} textColor="text.tertiary">
                        / month
                        </Typography>
                    </Typography>
                    {
                        isLogin?
                        <button onClick={goPort} className='btnSm btn--primary'>
                            Start now
                        </button>
                        :    
                        <button onClick={goLogin} className='btnSm btn--primary'>
                            Start now
                        </button>
                    }
                </CardActions>
            </Card>
            </div>
        </div>
    )
}

export default ChargePage
