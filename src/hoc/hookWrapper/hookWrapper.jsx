import {useNavigate,useLocation,Navigate} from "react-router-dom";
function hookWrapper(Component){
    return (props)=>{
        const navigate = useNavigate();
        const location = useLocation()
        return <Component {...props} navigate={navigate} location={location} Navigate={Navigate}/>
    }
}
export default hookWrapper;