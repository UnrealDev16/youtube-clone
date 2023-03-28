import VideoCard from "./VideoCard";
import { useState,useEffect } from "react";
import { BACKEND } from "../App";

export default function Home(props: any) {
    return (
      <div style={{ marginLeft: 10, display: "flex", flexWrap: "wrap" }}>
        {props.data.map((video: any) => (
          <VideoCard
            key={video.id}
            thumbnail={video.thumbnail}
            to={video.video}
            duration={video.duration}
            title={video.title}
            author={video.author}
          />
        ))}
      </div>
    );
  }
  