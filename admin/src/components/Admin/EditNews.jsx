import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { deleteImg, imgUpload } from "../../Redux/Actions/productActions";
import Dropzone from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";
import { UPLOAD_IMG_SUCCESS } from "../../Redux/Constants/productConstants";
import { newsEdit, listNewsDetails } from "../../Redux/Actions/newsActions";

const EditNews = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const uploadImg = useSelector((state) => state.uploadImg);
  const { images } = uploadImg;
  const newsDetails = useSelector((state) => state.newsDetails);
  const { item } = newsDetails;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(item);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newsEdit(id, { title, description, images }));
    navigate("/admin/news");
  };

  useEffect(() => {
    dispatch(listNewsDetails(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (item) {
      setTitle(item?.title);
      setDescription(item?.description);
      dispatch({ type: UPLOAD_IMG_SUCCESS, payload: item?.images });
    }
  }, [item]);
  return (
    <>
      {item && (
        <div className="w-[90%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
          <h5 className="text-[30px] font-Poppins text-center">Edit News</h5>
          <form onSubmit={handleSubmit}>
            <br />
            <div>
              <label className="pb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter news title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Nội dung <span className="text-red-500">*</span>
              </label>
              <textarea
                cols="30"
                rows="8"
                type="text"
                name="content"
                className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter news content..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <br />
            <div>
              <label className="pb-2">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <div className="bg-white cursor-pointer border-2 p-5 text-center m-2">
                <Dropzone
                  onDrop={(acceptedFiles) => dispatch(imgUpload(acceptedFiles))}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div>
                          Drag 'n' drop some files here, or click to select
                          files
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              <div className="w-full flex items-center flex-wrap">
                {images &&
                  images.map((image, j) => (
                    <div className="mt-2 relative" key={j}>
                      <IoMdCloseCircle
                        onClick={() => dispatch(deleteImg(image.public_id))}
                        className="text-xl cursor-pointer absolute"
                      />

                      <img
                        src={image.url}
                        alt=""
                        className="h-[120px] w-[120px] object-cover m-2"
                      />
                    </div>
                  ))}
              </div>
              <br />
              <div>
                <input
                  type="submit"
                  value="Edit"
                  className="mt-2 mx-auto w-[50%] cursor-pointer appearance-none text-center block px-3 h-[35px] border border-[#f66315] rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:bg-[#fff] bg-[#F66315] hover:text-[#000] text-[#fff] duration-300"
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditNews;
