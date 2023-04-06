import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Link, Navigate} from 'react-router-dom';
import Cookies from 'js-cookie'
import FileUploadIcon from '@mui/icons-material/FileUpload';


export default function Header(props:any){

    function searchVideo(event:any){
        event.preventDefault()
        const searchQuery = document.getElementById("inputBox");
        if(searchQuery){
            fetch("http://127.0.0.1:5000",)
        }
        
    }
    
    return (
        <div>
            <div className='headerDiv' style={{display: "flex", height: 50}}>
                <div className='menuicon'>
                    <MenuIcon onClick={props.toggleMenu}/>
                </div>
                <div className='yticon'>
                    <Link to={"/"}><img src='../assets/youtube.png' width={110}/></Link>
                </div>
                <div className='inputDiv'>
                        <form style={{display: "flex"}}>
                            <input id='inputBox' type="text" placeholder='Search'/>
                            <button type="submit" className='searchIconDiv'>
                                <SearchIcon style={{position: "relative", right: 2, top:2}}/>
                            </button>
                        </form>
                </div>
                {!Cookies.get("email") &&
                    <div className="signInBtnDiv">
                        <Link to="/login"><button className='signInBtn'>Sign in</button></Link>
                    </div>
                }
                {Cookies.get("email") &&
                    <div className='videoUploadDiv'>
                        <Link to={"/newvid"}><FileUploadIcon style={{position: "relative",top: 2.5, left: 2.5}}/></Link>
                    </div>
                }
            </div>
        </div>
    )
}