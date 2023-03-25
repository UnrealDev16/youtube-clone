import { Link, useResolvedPath } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';

export default function SComponent(props: any) {
  return (
    <div style={{backgroundColor: "#242424",width: 225,height: 60,borderRadius: 15}}>
      <div style={{ position: "relative", marginLeft: 35, width: "fit-content", bottom: 0}}>
        {props.icon === "HomeIcon" &&
            <HomeIcon style={{position: "relative",top: 10,right: 28}} fontSize="large"/>
        }
        <Link style={{ textDecoration: "none", color: "white",marginLeft: 0 }} to={props.to}>
          <span style={{ fontWeight: 500 }}>{props.name}</span>
        </Link>
      </div>
    </div>
  )
}
