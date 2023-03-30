import { useState, useRef } from 'react';
import { Button } from '@mui/material';

export default function NewVideo() {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const videoRef = useRef(null);
  const thumbnailRef = useRef(null)

  const handleVideoFileSelected = (event) => {
    videoRef.current.click()
    setVideoFile(event.target.files[0]);
  };

  const handleThumbnailFileSelected = (event) => {
    thumbnailRef.current.click()
    setThumbnailFile(event.target.files[0]);
  };

  const handleFileSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);

    fetch('http://127.0.0.1:5000/newvid', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log('Files uploaded successfully');
        } else {
          throw new Error('Failed to upload files');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <center>
        <form onSubmit={handleFileSubmit}>
          <input required style={{ display: "initial" }} ref={videoRef} accept="video/mp4" type="file" onChange={handleVideoFileSelected} />
          <input required style={{ display: "initial" }} ref={thumbnailRef} accept="image/png" type="file" onChange={handleThumbnailFileSelected} />
          <Button onClick={handleVideoFileSelected}>Select Video</Button>
          <Button onClick={handleThumbnailFileSelected}>Select Thumbnail</Button>
          <br/>
          
          <br/>
          <Button variant='contained' type='submit'>Upload</Button>
        </form>
      </center>
    </div>
  );
}
