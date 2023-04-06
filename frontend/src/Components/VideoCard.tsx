import '../Components/VideoCard.css'
import { Link } from 'react-router-dom'

export default function VideoCard(props:any){
    return(
        <div>
            <Link style={{textDecoration: "none",color: "white"}} to={`video/${props.to}`}>
                <div style={{padding: "0px 10px",width: "330px"}}>
                    <img className="thumbnailImg" src={props.thumbnail} width={340}/>
                    <div className='videoTimeDiv'>
                        <p className='videoTime'>{props.duration}</p>
                    </div>
                    <h3 style={{marginTop: -60, fontWeight: 600, wordWrap: "break-word", cursor: "pointer"}}>{props.title}</h3>
                    <Link to={`/user/${props.link}`} style={{textDecoration: "none"}}><p className='authorText'>{props.author}</p></Link>
                </div>
            </Link>
        </div>
    )
}