const button = document.getElementById('button');
const videoElement = document.getElementById('video');

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = async () => {
            videoElement.play();
            // Once the video is loaded, we activate the Picture-in-Picture mode.
            if (typeof videoElement.requestPictureInPicture === 'function') {
                await videoElement.requestPictureInPicture();
            } else {
                console.warn('Picture-in-Picture is not supported in this browser.');
                videoElement.hidden = false;
            }
        }
    } catch (error) {
        console.log('whoops, error here:', error);
    }
}

button.addEventListener('click', selectMediaStream);