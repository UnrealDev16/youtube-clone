import '../Components/NewVideo.css'
import { useRef } from 'react';
import Button from '@mui/material/Button';

export default function NewVideo(){
    const fileInputRef:any = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileSelected = (event:any) => {
    const selectedFile = event.target.files[0];
    fetch("http://127.0.0.1:5000/newvid",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            file: selectedFile
        }
    })
    
  };

    return(
        <div>
            <div>
                <form>
                    <div className='fileInput'>
                        <Button variant='contained' style={{color: "black",borderRadius:"1.5px",backgroundColor: "#3ea6ff",width: 135,letterSpacing: "0.01em",fontWeight: 500,fontFamily: "sans-serif", fontSmooth: "antialiased", fontSize: 14}} onClick={handleButtonClick}>Select Files</Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileSelected}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}