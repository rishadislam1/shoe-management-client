import { useAppSelector } from "../Redux/hook";

export default function useAuth (){
    const auth = useAppSelector(state=>state.auth);

    if(auth?.accessToken && auth?.user){
        return true;
    }
    else{
        return false;
    }
}