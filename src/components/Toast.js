import MuiAlert from '@mui/material/Alert';
import propTypes from 'prop-types';

export default function Toast({toast, toast_del}){
    return(
        <div className='toast'>
            {
                toast.map((v)=>{
                    return(
                        <MuiAlert 
                            key={v.id}
                            onClick={()=>{toast_del(v.id)}}
                            severity={`${v.type==='success'?'success':'error'}`}
                            className={`${v.type==='success'?'success toastS':'error toastR'}`}
                        >
                            {v.text}
                        </MuiAlert>
                    )
                })
            }
        </div>
    )
}
Toast.propTypes={
    toast:propTypes.arrayOf(propTypes.shape({
        text:propTypes.string,
        type:propTypes.string
    })).isRequired
}
Toast.defaultTypes = {
    toast:[]
}
