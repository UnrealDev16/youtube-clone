import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { BACKEND } from '../App';
import './Video.css';
import Cookies from 'js-cookie';
import Plyr from 'plyr';

export default function Video(props: any) {

  const player = new Plyr('#player',{
    settings: ['quality', 'speed', 'loop'],
    controls: [
        'play-large', // The large play button in the center
        'restart', // Restart playback
        'rewind', // Rewind by the seek time (default 10 seconds)
        'play', // Play/pause playback
        'fast-forward', // Fast forward by the seek time (default 10 seconds)
        'progress', // The progress bar and scrubber for playback and buffering
        'current-time', // The current time of playback
        'duration', // The full duration of the media
        'mute', // Toggle mute
        'volume', // Volume control
        'captions', // Toggle captions
        'settings', // Settings menu
        'pip', // Picture-in-picture (currently Safari only)
        'airplay', // Airplay (currently Safari only)
        'fullscreen', // Toggle fullscreen
        'loop'
      ],
      
    tooltips: { controls: false, seek: true },
    quality: { default: 576, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] }
  });

  const playerRef = useRef(null);
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);
  const [vidIndex, setVidIndex] = useState(null);
  const [data, setData] = useState([]);

  async function fetchData(event: any) {
    event.preventDefault();
    const response = await fetch(`${BACKEND}/videoinfo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: Cookies.get('email') ? Cookies.get('email') : '',
        videoName: id,
      }),
    });
    const data = await response.json();
    setData(data);
    setVidIndex(data.findIndex((obj: any) => obj.video === id));
  }

  useEffect(() => {
    fetchData(event);
  }, [vidIndex]);

  if (data.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ overflowX: 'hidden' }}>
      <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
      {notFound ? (
        <p>Video not found</p>
      ) : (
        <div>
          <video id="player" autoPlay controls style={{ outline: 'none', overflow: 'hidden', marginLeft: -10, width: '100dvw', height: '90dvh' }}>
            <source type="video/mp4" src={`${BACKEND}/video/${id}`} onError={() => setNotFound(true)} />
          </video>
          <h3 style={{ position: 'relative', bottom: 15, fontWeight: 500, left: 25, fontFamily: 'Segoe UI' }}>{data?.title}</h3>
          <ChannelBar data={data} index={vidIndex} />
        </div>
      )}
    </div>
  );
}

function ChannelBar(props: any) {
  return (
    <div className="channelDiv">
      <Link to={`/user/${props?.data?.link}`} style={{ display: 'flex', textDecoration: 'none', color: 'white' }}>
        <img className="pfp" src={props?.data?.pfp} width={45} height={45} />
        <h4 style={{ position: 'relative', fontWeight: 500, fontFamily: 'Segoe UI', top: 25, left: 20 }}>{props?.data?.author}</h4>
        <p style={{ position: 'relative', fontSize: 12, fontFamily: 'Segoe UI', width: 'fit-content', top: 55, right: 30 }}>{`${props?.data?.subscribers} subscribers`}</p>
      </Link>
      <button className="subBtn">Subscribe</button>
      <div className="RightSideBtns"></div>
    </div>
  );
}
