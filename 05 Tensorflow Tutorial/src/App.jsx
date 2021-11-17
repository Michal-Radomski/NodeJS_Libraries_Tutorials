import React from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import "./App.scss";

function App() {
  const [isModelLoading, setIsModelLoading] = React.useState(false);
  const [model, setModel] = React.useState(null);
  const [imageURL, setImageURL] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [history, setHistory] = React.useState([]);

  // console.log("mobilenet, tf:", mobilenet, tf);

  const imageRef = React.useRef();
  const textInputRef = React.useRef();
  const fileInputRef = React.useRef();

  // Loading the Model
  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      if (model) {
        // console.log("model:", model);
      } else {
        console.log("model not loaded");
      }
      setModel(model);
      // console.log("model:", model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  // Uploading the Image
  const uploadImage = (event) => {
    const {files} = event.target;
    // console.log("files:", files);
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      // console.log("url:", url);
      setImageURL(url);
    } else {
      setImageURL("");
    }
  };

  // Identification
  const identify = async () => {
    textInputRef.current.value = "";
    const results = await model.classify(imageRef.current, 4);
    // console.log("results:", results);
    setResults(results);
  };

  // Setting up the State from Input type="text"
  const handleOnChange = (event) => {
    // console.log("event, event.target.value:", event, event.target.value);
    setImageURL(event.target.value);
    setResults([]);
  };

  // Adding functionality of input type="file"
  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  // loadModel() is fired only when app is loaded
  React.useEffect(() => {
    tf.ready().then(() => {
      loadModel();
    });

    // loadModel();
    // console.log("Model is loading");
  }, []);

  // Creating history of images
  React.useEffect(() => {
    if (imageURL) {
      setHistory([imageURL, ...history]);
      // console.log("imageURL;", imageURL);
      // console.log("history:", history);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageURL]);

  // Loading model info
  if (isModelLoading) {
    return <h2>Model Loading...</h2>;
  }

  return (
    <div className="App">
      <h1 className="header">Image Identification</h1>
      <div className="inputHolder">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="uploadInput"
          onChange={uploadImage}
          ref={fileInputRef}
        />
        <button className="uploadImage" onClick={triggerUpload}>
          Upload Image
        </button>
        <span className="or">or</span>
        <input type="text" placeholder="Paste image URL..." ref={textInputRef} onChange={handleOnChange} />
      </div>
      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder">
            {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
          </div>
          {results.length > 0 && (
            <div className="resultsHolder">
              {results.map((result, index) => {
                return (
                  <div className="result" key={result.className}>
                    <span className="name">{result.className}</span>
                    <span className="confidence">
                      Confidence level: {(result.probability * 100).toFixed(2)}%{" "}
                      {index === 0 && <span className="bestGuess">Best Guess</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {imageURL && (
          <button className="button" onClick={identify}>
            Identify Image
          </button>
        )}
      </div>
      {history.length > 0 && (
        <div className="recentPredictions">
          <h2>Recent Images</h2>
          <div className="recentImages">
            {history.map((image, index) => {
              return (
                <div className="recentPrediction" key={`${image}${index}`}>
                  <img src={image} alt="Recent Prediction" onClick={() => setImageURL(image)} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
