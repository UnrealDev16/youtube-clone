import './Sidebar.css'
import SComponent from './SidebarComponent'
import HomeIcon from '@mui/icons-material/Home';


export default function Sidebar(){
    return(
        <div className='sidebar'>
            <div className='mainList'>
                <SComponent icon={"HomeIcon"} name="Home" to="/"/>
                <SComponent icon={"Shorts"} name="Shorts" to="/shorts"/>
                <SComponent icon={"Subs"} name="Subscriptions" to="/subscriptions"/>
            </div>
            <hr style={{width: 240,float: "left",borderColor: "gray"}}/>
            <div className='secSideBar'>
                <SComponent icon={"Library"} name="Library" to="/library"/>
                <SComponent icon={"History"} name="History" to="/history"/>
                <SComponent icon={"UrVid"} name="Your videos" to="/channel"/>
                <SComponent icon={"WatchLater"} name="Watch Later" to="/playlist"/>
                <SComponent icon={"Liked"} name="Liked videos" to="/liked"/>
            </div>
        </div>
    )
}