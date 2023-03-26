import VideoCard from "./VideoCard";

export default function Home(){

    return(
        <div style={{marginLeft:10,display:"flex",flexWrap: 'wrap'}}>
            <VideoCard thumbnail="https://i.ytimg.com/vi/TJ2ifmkGGus/maxresdefault.jpg" duration="10:23" title="Idk lol" author="MrBeast"/>
            <VideoCard thumbnail="https://i.ytimg.com/vi/TJ2ifmkGGus/maxresdefault.jpg" duration="10:23" title="Idk lol" author="MrBeast"/>
        </div>
    )
}