import { useEffect, useState } from "react";
import "./upload.scss";
import { useNavigate, useParams } from "react-router-dom";

import { useAddVideoMutation } from "../../slices/videosApiSlice";
import Loader from "../Loader";
import { toast } from "react-toastify";

const Upload = ({ setOpenUpload }) => {
  const [inputs, setInputs] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  //to get the function to call to  fire off login mutation
  const [addVideo, { isLoading }] = useAddVideoMutation();

  const handelInputChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(inputs);

    try {
      const res = await addVideo({
        ...inputs,
        bookId: params.id,
      }).unwrap();

      setOpenUpload(false);
      res.status === 200 && navigate(`/watch/${params.id}`);
      //reload page after adding video
      window.location.reload(false);
    } catch (err) {
      console.log(err?.data?.message || err.error);
      toast(err?.data?.message || err.error);
    }
  };

  return (
    <div className="upload-container">
      <div className="wrapper">
        <div className="close" onClick={() => setOpenUpload(false)}>
          X
        </div>
        <h1 className="title">Upload A video</h1>
        {isLoading && <Loader />}
        {/* <div className="file">
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
        </div> */}
        {/* <div className="video-thumbnail">
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
        </div> */}

        <div className="video-title">
          <label htmlFor="input-url">Video Url</label>
          <input
            type="url"
            required
            name="videoUrl"
            id="input-url"
            className="title-input"
            onChange={handelInputChange}
          />
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

        <button type="submit" className="upload-btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
