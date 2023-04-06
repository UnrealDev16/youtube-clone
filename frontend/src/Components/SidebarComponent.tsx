import { Link, useResolvedPath } from "react-router-dom"

import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import HistoryIcon from '@mui/icons-material/History';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import { fontWeight } from "@mui/system";
import './Sidebar.css'
import { useLocation } from "react-router-dom";

export default function SComponent(props: any) {
  const location:any = useLocation()
  console.log(location.pathname)

  return (
    <div style={{ 
      width: 255
      }}>

      <div className="homeBtn" style={{width: 225,borderRadius: 15,backgroundColor: location.pathname === "/" ? "#242424" : "initial"}}>
        {props.icon === "HomeIcon" &&
        <div style={{marginLeft: 16}}>
          <HomeIcon style={{position: "relative",top: 2}} fontSize="large"/>
          <Link style={{position: "relative",bottom: 10,left: 30,textDecoration: "none",color: "white"}} to={props.to}>
            <span>{props.name}</span>
          </Link>
        </div>
        }
      </div>

      <div className="shortsBtn" style={{width: 225,borderRadius: 15,backgroundColor: location.pathname === "/shorts" ? "#242424" : "initial"}}>
        {props.icon === "Shorts" &&
        <div style={{marginLeft: 16}}>
          <img src="../assets/shorts.png" width={25} style={{position: "relative",left: 5,top: 2}}/>
          <Link style={{position: "relative",bottom: 8,left: 40,textDecoration: "none",color: "white"}} to={props.to}>
            <span>{props.name}</span>
          </Link>
        </div>
        }
      </div>

      <div className="subsBtn" style={{width: 225,borderRadius: 15,backgroundColor: location.pathname === "/subscriptions" ? "#242424" : "initial"}}>
        {props.icon === "Subs" &&
        <div style={{marginLeft: 16}}>
          <SubscriptionsIcon fontSize="large" style={{position: "relative",top: 2}}/>
          <Link style={{position: "relative",bottom: 8,left: 30,textDecoration: "none",color: "white"}} to={props.to}>
            <span>{props.name}</span>
          </Link>
        </div>
        }
      </div>

      <div className="libBtn" style={{width: 225,borderRadius: 15,backgroundColor: location.pathname === "/library" ? "#242424" : "initial"}}>
        {props.icon === "Library" &&
        <div style={{marginLeft: 16,marginTop: 20}}>
          <VideoLibraryIcon htmlColor="red" fontSize="large" style={{position: "relative",top: 2}}/>
          <Link style={{position: "relative",bottom: 8,left: 30,textDecoration: "none",color: "white"}} to={props.to}>
            <span>{props.name}</span>
          </Link>
        </div>
        }
      </div>

      <div className="hisBtn" style={{width: 225,borderRadius: 15,backgroundColor: location.pathname === "/history" ? "#242424" : "initial"}}>
        {props.icon === "History" &&
        <div style={{marginLeft: 16}}>
          <HistoryIcon fontSize="large" style={{position: "relative",top: 2}}/>
          <Link style={{position: "relative",bottom: 8,left: 30,textDecoration: "none",color: "white"}} to={props.to}>
            <span>{props.name}</span>
          </Link>
        </div>
        }
      </div>

      <div className="urVidBtn" style={{width: 225,borderRadius: 15,backgroundColor: location.pathname === "/channel" ? "#242424" : "initial"}}>
        {props.icon === "UrVid" &&
        <div style={{marginLeft: 16}}>
          <SlideshowIcon htmlColor="red" fontSize="large" style={{position: "relative",top: 2}}/>
          <Link style={{position: "relative",bottom: 8,left: 30,textDecoration: "none",color: "white"}} to={props.to}>
            <span>{props.name}</span>
          </Link>
        </div>
        }
      </div>

      <div className="watchLaterBtn" style={{width: 225,borderRadius: 15,backgroundColor: location.pathname === "/playlist" ? "#242424" : "initial"}}>
        {props.icon === "WatchLater" &&
        <div style={{marginLeft: 16}}>
          <AccessTimeIcon fontSize="large" style={{position: "relative",top: 2}}/>
          <Link style={{position: "relative",bottom: 8,left: 30,textDecoration: "none",color: "white"}} to={props.to}>
            <span>{props.name}</span>
          </Link>
        </div>
        }
      </div>

      <div className="likedBtn" style={{width: 225,borderRadius: 15,backgroundColor: location.pathname === "/liked" ? "#242424" : "initial"}}>
        {props.icon === "Liked" &&
        <div style={{marginLeft: 16}}>
          <ThumbUpOffAltIcon htmlColor="red" fontSize="large" style={{position: "relative",top: 2}}/>
          <Link style={{position: "relative",bottom: 8,left: 30,textDecoration: "none",color: "white"}} to={props.to}>
            <span>{props.name}</span>
          </Link>
        </div>
        }
      </div>

    </div>
  )
}
