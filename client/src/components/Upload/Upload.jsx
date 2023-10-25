import { useEffect, useState } from "react";
import "./upload.scss";
import { useNavigate, useParams } from "react-router-dom";

import { useAddVideoMutation } from "../../slices/videosApiSlice";
import { useAddBookMutation } from "../../slices/booksApiSlice";

import Loader from "../Loader";
import { toast } from "react-toastify";

const Upload = ({ setOpenUpload }) => {
  const [inputs, setInputs] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  //to get the function to call to  fire off login mutation
  const [addVideo, { isLoading }] = useAddVideoMutation();
  const [addBook, { isUploading }] = useAddBookMutation();

  const handelInputChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();

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
  const handleBookUpload = async (e) => {
    e.preventDefault();

    try {
      const res = await addBook({
        ...inputs,
      }).unwrap();

      setOpenUpload(false);
      //reload page after adding book
      window.location.reload(false);
    } catch (err) {
      console.log(err?.data?.message || err.error);
      toast(err?.data?.message || err.error);
    }
  };

  return (
    <div className="upload-container">
      {params.id ? (
        // upload video
        <div className="wrapper">
          <div className="close" onClick={() => setOpenUpload(false)}>
            X
          </div>
          <h1 className="title">Upload A video</h1>
          {isLoading && <Loader />}

          <div className="video-title">
            <label htmlFor="input-url">Video Url</label>
            <input
              type="url"
              required
              pattern="https://.*"
              size="30"
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

          <button
            type="submit"
            className="upload-btn"
            onClick={handleVideoUpload}
          >
            Upload
          </button>
        </div>
      ) : (
        // upload Book
        <div className="wrapper">
          <div className="close" onClick={() => setOpenUpload(false)}>
            X
          </div>
          <h1 className="title">Upload Book</h1>
          {isLoading && <Loader />}

          <div className="video-title">
            <label htmlFor="input-url">book image</label>
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

          <button
            type="submit"
            className="upload-btn"
            onClick={handleBookUpload}
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
