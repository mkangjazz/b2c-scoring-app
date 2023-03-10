import React, { useRef } from 'react';
import Webcam from 'react-webcam';

function WebcamView(props) {
    const videoElement = useRef(null);

    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: "user"
    }

    const capture = React.useCallback(
        (params) => {
          const imageSrc = videoElement.current.getScreenshot();
          console.log(imageSrc)
          stopCam();
          params.toggleWebcam(false)
        },
        [videoElement]
      );

    const stopCam = () => {
        let stream = videoElement.current.stream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }

    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
    }
    const windowDimensions = getWindowDimensions()

    return (
        <div className='modal-wrapper'>
            <div className='webcam'>
                <Webcam
                    audio={false}
                    height={windowDimensions.height}
                    ref={videoElement}
                    screenshotFormat="image/jpeg"
                    width={windowDimensions.width}
                    videoConstraints={videoConstraints}
                />
                <div className='city-buttons'>
                    <button type="button" onClick={() => capture(props)}>Capture Photo</button>
                </div>
            </div>
        </div>
    );
};

export default WebcamView;