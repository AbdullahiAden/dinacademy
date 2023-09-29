import { useEffect, useState } from "react";
import "./upload.scss";
import { useNavigate, useParams } from "react-router-dom";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../../firebase";
import axios from "axios";
import { useAddVideoMutation } from "../../slices/videosApiSlice";

const Upload = ({ setOpenUpload }) => {
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [videoPerc, setVideoPerc] = useState(0);
  const [imagePerc, setImagePerc] = useState(0);

  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  //to get the function to call to  fire off login mutation
  const [addVideo, { isLoading }] = useAddVideoMutation();

  const handelInputChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    //use firebse uplad process
    const storage = getStorage(app);
    //for uniqie file name
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImagePerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},

      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    image && uploadFile(image, "imgUrl");
  }, [image]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await addVideo({
        ...inputs,
        bookId: params.id,
        tags,
      }).unwrap();
      console.log(res._id);
      setOpenUpload(false);
      res.status === 200 && navigate(`/watch/${params.id}`);
      //reload page after adding video
      window.location.reload(false);
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <div className="upload-container">
      <div className="wrapper">
        <div className="close" onClick={() => setOpenUpload(false)}>
          X
        </div>
        <h1 className="title">Upload A video</h1>
        <div className="file">
          <label htmlFor="video"> choose Video</label>
          {videoPerc > 0 ? (
            "uploading " + videoPerc + "%"
          ) : (
            <input
              type="file"
              accept="video/*"
              name=""
              id="video"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          )}
        </div>
        <div className="video-thumbnail">
          <label htmlFor="image">image</label>
          {imagePerc > 0 ? (
            "uploading" + imagePerc + "%"
          ) : (
            <input
              type="file"
              accept="image/*"
              name=""
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          )}
        </div>

        <div className="video-title">
          <label htmlFor="input-title">Titel</label>
          <input
            type="text"
            name="title"
            id="input-title"
            className="title-input"
            onChange={handelInputChange}
          />
        </div>
        <div className="video-desc">
          <label htmlFor="">description</label>
          <textarea
            name="description"
            id=""
            cols="10"
            rows="5"
            onChange={handelInputChange}
          ></textarea>
        </div>
        <div className="video-tags">
          <label htmlFor="">Tags</label>
          <input
            type="text"
            name=""
            id=""
            placeholder="separte tags with commas ,"
            onChange={handleTags}
          />
        </div>

        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
