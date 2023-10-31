import Input from '@mui/joy/Input';
export default function InputForm(props){
    return(
        <Input
            type='text'
            style={{fontSize:"20px", width:"260px", backgroundColor:"#d4e6e9", borderRadius:'1rem'}}
            value={props.value}
            onChange={props.onChange}
            placeholder="입력하세요."
            variant="soft"
            sx={{
            '--Input-radius': '0px',
            borderBottom: '1px solid',
            borderColor: 'neutral.outlinedBorder',
            '&:hover': {
                borderColor: 'neutral.outlinedHoverBorder',
            },
            '&::before': {
                border: '1px solid #1c6470',
                transform: 'scaleX(0)',
                left: 10,
                right: 10,
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
