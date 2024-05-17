import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { SlCalender } from "react-icons/sl";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listNewsDetails } from "../Redux/Actions/newsActions";

const NewsDetailPage = () => {
  const { id } = useParams();
  const newsDetails = useSelector((state) => state.newsDetails);
  const { loading, item } = newsDetails;
  console.log(newsDetails);
  let date;
  if (item) {
    date = new Date(item.createdAt);
    date = `${date.getDate()} tháng ${
      date.getMonth() + 1
    }, ${date.getFullYear()}`;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listNewsDetails(id));
  }, [dispatch, id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      {!loading && item ? (
        <div className="font-Roboto mt-[100px] mb-[160px]">
          <div className="xl:px-[45px] xl:max-w-[1349px] px-[10px] w-full max-w-full mx-auto lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] ">
            <div className="mb-[35px] relative text-start xl:w-8/12 mx-auto">
              <h1 className="text-[32px] uppercase font-[700] leading-[1.4] bg-[#fff] rounded-[5px] py-[10px] md:block">
                {item.title}
              </h1>
              <div className="mt-[20px]">
                <div className="flex gap-[6px] items-center font-[14px] text-[#7f8080]">
                  <SlCalender />
                  <span>{date}</span>
                </div>
              </div>
              <div className="mx-auto my-[50px]">
                <img
                  className="w-8/12 h-auto max-w-full max-h-full rounded-lg mx-auto"
                  src={item?.images[0]?.url}
                  alt={`${item.title}`}
                />
              </div>
              <div className="text-[#444545] overflow-x-auto whitespace-pre-wrap break-words">
                {item.description}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <Footer />
    </div>
  );
};

export default NewsDetailPage;
