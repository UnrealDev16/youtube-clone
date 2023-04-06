import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate()
    if(Cookies.get("email")){
        navigate("/")
    }
    return(
        <div>
            <div className="loginDiv">
                <h1>Hello World</h1>
            </div>
        </div>
    )
}