import React, { useEffect, useRef, useState } from "react";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImg,
  imgUpload,
  listProductDetails,
  productEdit,
} from "../../Redux/Actions/productActions";
import Dropzone from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../../LoadingError/Error";
import Loading from "../../LoadingError/Loading";
import { UPLOAD_IMG_SUCCESS } from "../../Redux/Constants/productConstants";

let schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.number().required("Category is Required"),
  originalPrice: yup.string().required("Original Price is Required"),
  discountPrice: yup.string().required("Discount Price is Required"),
  stock: yup.number().required("Stock is Required"),
});

const categoriesData = [
  {
    id: 1,
    title: "Vợt cầu lông",
    value: "vot",
  },
  {
    id: 2,
    title: "Giày cầu lông",
    value: "giay",
  },
  {
    id: 3,
    title: "Balo cầu lông",
    value: "balo",
  },
  {
    id: 4,
    title: "Phụ kiện cầu lông",
    value: "phukien",
  },
];
const EditProduct = () => {
  const { id } = useParams();

  const uploadImg = useSelector((state) => state.uploadImg);
  const { images } = uploadImg;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      originalPrice: "",
      discountPrice: "",
      stock: 0,
      colors: [],
      size: [],
      images: [],
      weight: "",
      length: "",
      balancedPoint: "",
      shopId: "65f98c54c7688ba7b4d16aec",
    },
    validationSchema: schema,
  });

  //   color
  const [query, setQuery] = useState("");
  //   size
  const [sizeQuery, setSizeQuery] = useState("");
  const [colorSelected, setColorSelected] = useState([]);
  const [sizeSelected, setSizeSelected] = useState([]);
  const colorInputRef = useRef(null);
  const sizeInputRef = useRef(null);
  const isDisable =
    !query?.trim() ||
    colorSelected.filter(
      (item) =>
        item?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
    )?.length;

  const isDisableSize =
    !sizeQuery?.trim() ||
    sizeSelected.filter(
      (item) =>
        item?.toLocaleLowerCase()?.trim() ===
        sizeQuery?.toLocaleLowerCase()?.trim()
    )?.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(productEdit(id, formik.values));
    navigate("/admin/products");
  };

  let img = [];
  if (images && images.length > 0) {
    img = [...images];
  }

  useEffect(() => {
    formik.values.images = img;
  }, [dispatch, images, img]);

  useEffect(() => {
    formik.values.colors = colorSelected;
    formik.values.size = sizeSelected;
  }, [colorSelected, sizeSelected]);
  console.log(img, images);

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      formik.values.name = product.name;
      formik.values.description = product.description;
      formik.values.category = product.category;
      formik.values.originalPrice = product.originalPrice;
      formik.values.discountPrice = product.discountPrice;
      formik.values.stock = product.stock;
      formik.values.weight = product.weight;
      formik.values.length = product.length;
      formik.values.balancedPoint = product.balancedPoint;
      setColorSelected(product.colors);
      setSizeSelected(product.size);
      dispatch({ type: UPLOAD_IMG_SUCCESS, payload: product?.images });
    }
  }, [product]);

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Edit Product</h5>
      {loading ? (
        <div className="mt-3 mb-3">
          <Loading />
        </div>
      ) : product ? (
        <form onSubmit={handleSubmit}>
          <br />
          <div>
            <label className="pb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your product name..."
              value={formik.values.name}
              onChange={formik.handleChange("name")}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              cols="30"
              required
              rows="8"
              type="text"
              name="description"
              className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your product description..."
              value={formik.values.description}
              onChange={formik.handleChange("description")}
            ></textarea>
          </div>
          <br />
          <div>
            <label className="pb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              onChange={formik.handleChange("category")}
              value={formik.values.category}
            >
              <option value="Choose a category">Choose a category</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option value={i.value} key={i.title}>
                    {i.title}
                  </option>
                ))}
            </select>
          </div>

          <br />
          <div>
            <label className="pb-2">Original Price</label>
            <input
              type="number"
              name="price"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your product price..."
              value={formik.values.originalPrice}
              onChange={formik.handleChange("originalPrice")}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Price (With Discount) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your product price with discount..."
              value={formik.values.discountPrice}
              onChange={formik.handleChange("discountPrice")}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Product Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your product stock..."
              value={formik.values.stock}
              onChange={formik.handleChange("stock")}
            />
          </div>
          <br />
          {/* color */}
          <div>
            <label className="pb-2">
              Color <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full h-full text-sm">
              {colorSelected?.length ? (
                <div className="bg-white w-full relative text-xs flex flex-wrap gap-1 p-2">
                  {colorSelected.map((tag) => {
                    return (
                      <div
                        key={tag}
                        className="rounded-full w-fit py-1.5 px-3 border border-gray-400 bg-gray-50 text-gray-500
                  flex items-center gap-2"
                      >
                        {tag}
                        <div
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() =>
                            setColorSelected(
                              colorSelected.filter((i) => i !== tag)
                            )
                          }
                        >
                          <IoMdClose className="cursor-pointer" />
                        </div>
                      </div>
                    );
                  })}
                  <div className="w-full text-right">
                    <span
                      className="text-[#cf4545] cursor-pointer"
                      onClick={() => {
                        setColorSelected([]);
                        colorInputRef.current?.focus();
                      }}
                    >
                      Clear all
                    </span>
                  </div>
                </div>
              ) : null}
              <div className="card flex items-center justify-between p-3 pt-1 w-full gap-2.5">
                <input
                  ref={colorInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value.trimStart())}
                  placeholder=" Enter product color..."
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  className="text-[16px] min-w-[50px] font-[600] disabled:text-gray-300 text-rose-500 disabled:cursor-not-allowed"
                  disabled={isDisable}
                  onClick={() => {
                    if (isDisable) {
                      return;
                    }
                    setColorSelected((prev) => [...prev, query]);
                    setQuery("");
                    colorInputRef.current?.focus();
                  }}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
          <br />
          {/* size */}
          <div>
            <label className="pb-2">Size</label>
            <div className="relative w-full h-full text-sm">
              {sizeSelected?.length ? (
                <div className="bg-white w-full relative text-xs flex flex-wrap gap-1 p-2">
                  {sizeSelected.map((tag) => {
                    return (
                      <div
                        key={tag}
                        className="rounded-full w-fit py-1.5 px-3 border border-gray-400 bg-gray-50 text-gray-500
                  flex items-center gap-2"
                      >
                        {tag}
                        <div
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() =>
                            setSizeSelected(
                              sizeSelected.filter((i) => i !== tag)
                            )
                          }
                        >
                          <IoMdClose className="cursor-pointer" />
                        </div>
                      </div>
                    );
                  })}
                  <div className="w-full text-right">
                    <span
                      className="text-[#cf4545] cursor-pointer"
                      onClick={() => {
                        setSizeSelected([]);
                        sizeInputRef.current?.focus();
                      }}
                    >
                      Clear all
                    </span>
                  </div>
                </div>
              ) : null}
              <div className="card flex items-center justify-between p-3 pt-1 w-full gap-2.5">
                <input
                  ref={sizeInputRef}
                  type="text"
                  value={sizeQuery}
                  onChange={(e) => setSizeQuery(e.target.value.trimStart())}
                  placeholder=" Enter product sizes..."
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  className="text-[16px] min-w-[50px] font-[600] disabled:text-gray-300 text-rose-500 disabled:cursor-not-allowed"
                  disabled={isDisableSize}
                  onClick={() => {
                    if (isDisableSize) {
                      return;
                    }
                    setSizeSelected((prev) => [...prev, sizeQuery]);
                    setSizeQuery("");
                    sizeInputRef.current?.focus();
                  }}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
          <br />
          <label className="pb-2">Danh mục dành cho vợt cầu lông</label>
          <div>
            <label className="pb-2">
              Weight <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="weight"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your product weight..."
              value={formik.values.weight}
              onChange={formik.handleChange("weight")}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Length <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="length"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your product length..."
              value={formik.values.length}
              onChange={formik.handleChange("length")}
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Balanced Point <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="balancedPoint"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your product balancedPoint..."
              value={formik.values.balancedPoint}
              onChange={formik.handleChange("balancedPoint")}
            />
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
                        Drag 'n' drop some files here, or click to select files
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
            <br />
            <div>
              <button
                type="submit"
                className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-[#f66315] rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:bg-[#fff] bg-[#F66315] hover:text-[#000] text-[#fff] duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      ) : (
        <Message variant="alert-danger">{error}</Message>
      )}
    </div>
  );
};

export default EditProduct;
