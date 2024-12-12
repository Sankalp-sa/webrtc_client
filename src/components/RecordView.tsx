// import { useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder-2";

export const RecordView = () => {

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ screen: true });

  const save = async () => {
      if (mediaBlobUrl) {
          const recordedTime = new Date();
          const response = await fetch("http://localhost:8000/saved", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ mediaBlobUrl, recordedTime })
          });
          if (response.ok) {
              console.log("Video saved");
          }
      }
  }

  return (
      <div>
          <p>{status}</p>
          <button  onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          <button onClick={save}>Save</button>
          <video src={mediaBlobUrl} controls autoPlay loop />
      </div>
  );

};

