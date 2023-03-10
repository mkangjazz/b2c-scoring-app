import React, { useRef } from 'react';
import Webcam from 'react-webcam';

function WebcamView(props) {
    const videoElement = useRef(null);
    
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
    }

    const windowDimensions = getWindowDimensions()

    const videoConstraints = {
        width: windowDimensions.width,
        height: windowDimensions.height,
        facingMode: "user"
    }

    const capture = React.useCallback(
        (props) => {
          const imageSrc = videoElement.current.getScreenshot();
          const splitImg = imageSrc.split(",");
          props.handleCameraClick(splitImg[1]);
          stopCam();
          props.toggleWebcam(false)
        },
        [videoElement]
      );

    const stopCam = () => {
        let stream = videoElement.current.stream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }

    return (
        <div className='modal-wrapper'>
            <div className='webcam'>
                <Webcam
                    screenshotQuality={0.5}
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