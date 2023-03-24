import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from 'react-router-dom';

export default function Header(){

    function searchVideo(event:any){
        event.preventDefault()
        const searchQuery = document.getElementById("inputBox");
        if(searchQuery){
            fetch("http://127.0.0.1:5000",)
        }
        
    }
    
    return (
        <div>
            <div style={{display: "flex", height: 45}}>
                <div className='menuicon'>
                    <MenuIcon/>
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
            </div>
        </div>
    )
}