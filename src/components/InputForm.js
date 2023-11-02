import Input from '@mui/joy/Input';
export default function InputForm(props){
    return(
        <Input
            type='text'
            style={{fontSize:"20px", width:"260px", backgroundColor:"#1c6470", borderRadius:'1rem',color:'white',fontSize:"16px"}}
            value={props.value}
            onChange={props.onChange}
            placeholder="검색.."
            variant="soft"
            sx={{
            '--Input-radius': '0px',
            borderBottom: '1px solid',
            borderColor: 'neutral.outlinedBorder',
            '&:hover': {
                borderColor: 'neutral.outlinedHoverBorder',
            },
            '&::before': {
                border: '0px solid #1c6470',
                transform: 'scaleX(0)',
                left: 5,
                right: 5,
                bottom: '-2px',
                top: 'unset',
                transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                borderRadius: 0,
            },
            '&:focus-within::before': {
                transform: 'scaleX(1)',
            },
            }}
        />
    )
}
