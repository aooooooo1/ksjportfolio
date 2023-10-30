import { useDispatch } from "react-redux";
import { addToast, removeToast } from "../redux/toastSlice";

export default function useToast(){
    const dispatch = useDispatch();

    //toast add
    const toast_add = (e)=>{
        dispatch(addToast(e));
        setTimeout(()=>{
            toast_del(e.id)
        },4000);
    }
    //toast delete
    const toast_del = (id)=>{
        dispatch(removeToast(id));
    }
    return{toast_add, toast_del}
}