import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [videoStream, setVideoStream] = useState(null)
  const videoRef = useRef(null)

  useEffect(() => {
    // Function to request access to the user's media devices (webcam and microphone)
    const getMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        setVideoStream(stream)
      } catch (error) {
        console.error('Error accessing media devices:', error)
      }
    }

    // Call the function to request media stream when component mounts
    getMediaStream()

    // Clean up function to stop the video stream when component unmounts
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => {
          track.stop()
        })
      }
    }
  }, [])

  // Update the video element source when the video stream changes
  useEffect(() => {
    if (videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream
    }
  }, [videoStream])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <video ref={videoRef} autoPlay className=''></video>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
