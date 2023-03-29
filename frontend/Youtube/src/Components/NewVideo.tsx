import '../Components/NewVideo.css'
import { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'

export default function NewVideo() {
    const fileInputRef = useRef(null);
  
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileSelected = (event) => {
      event.preventDefault();
      const selectedFile = event.target.files[0];
      const formData = new FormData();
      formData.append("file", selectedFile);
      fetch("http://127.0.0.1:5000/newvid", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("File uploaded successfully");
          } else {
            throw new Error("Failed to upload file");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    return (
      <div>
          <form>
            <center>
            <div className="fileInput">
              <Button
                variant="contained"
                style={{
                  color: "black",
                  borderRadius: "1.5px",
                  backgroundColor: "#3ea6ff",
                  width: 135,
                  letterSpacing: "0.01em",
                  fontWeight: 500,
                  fontFamily: "sans-serif",
                  fontSmooth: "antialiased",
                  fontSize: 14,
                }}
                onClick={handleButtonClick}
              >
                Select Files
              </Button>
              <form onSubmit={handleFileSelected}>
                <br/>
              <div>
                <input className='input-box' type="text" placeholder="Title" required />
              </div>
              <br/>
              <div>
                <textarea className='input-box' placeholder="Description" required />
              </div>
                <input type="file" accept="video/mp4" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileSelected} />
                <Button variant='contained' style={{
                  color: "black",
                  borderRadius: "1.5px",
                  backgroundColor: "#3ea6ff",
                  width: 135,
                  height:35,
                  letterSpacing: "0.01em",
                  fontWeight: 500,
                  fontFamily: "sans-serif",
                  fontSmooth: "antialiased",
                  fontSize: 16,
                }} type={"submit"}>Publish</Button>
              </form>
            </div>
            </center>
          </form>
      </div>
    );
  }