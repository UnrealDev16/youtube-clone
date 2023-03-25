import './Sidebar.css'
import SComponent from './SidebarComponent'
import HomeIcon from '@mui/icons-material/Home';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';

export default function Sidebar(){
    return(
        <div>
            <div className='mainList'>
                <SComponent icon={"HomeIcon"} name="Home" to="/"/>
            </div>
        </div>
    )
}