import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listNews } from "../Redux/Actions/newsActions";
const NewsPage = () => {
  const newsList = useSelector((state) => state.newsList);
  const { news } = newsList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listNews());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      {news && (
        <div className="font-Roboto my-[100px]">
          <div className="xl:px-[45px] xl:max-w-[1349px] px-[10px] w-full max-w-full mx-auto lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px]">
            <div className="mb-[35px] relative text-start ">
              <h1 className="text-[32px] uppercase font-[700] leading-[1.4] bg-[#fff] rounded-[5px] p-[10px] md:block">
                Thông tin tổng hợp cầu lông
              </h1>
            </div>

            <div className="relative cursor-grab mx-auto overflow-hidden list-none p-0 z-1 box-border">
              <div className="transition-transform relative w-full h-full flex flex-wrap justify-between">
                {news.map((item, i) => {
                  const date = new Date(item.createdAt);
                  const newDate = `${date.getDate()} tháng ${
                    date.getMonth() + 1
                  }, ${date.getFullYear()}`;
                  return (
                    <div className=" w-[299px]  shrink-0 grow-0 basis-[25%] max-w-[23%] h-full relative transition-transform mb-8">
                      <div>
                        <Link
                          to={`/tin-tuc/${item._id}`}
                          className="flex overflow-hidden w-full justify-center items-center relative h-auto pb-[60%]"
                        >
                          <img
                            width="400"
                            height="400"
                            className="w-auto h-auto max-w-full max-h-full absolute top-0 bottom-0 left-0 right-0 m-auto transition-all bg-transparent border-none align-middle hover:transform hover:scale-105 object-cover"
                            src={`${item.images[0].url}`}
                            alt={`${item.title}`}
                          />
                        </Link>
                      </div>

                      <div className="grow-1 flex flex-col bg-[#fff] w-[95%] mx-auto mt-[-30px] mb-[10px] relative py-[10px] px-[15px] shadow-news rounded-[5px]">
                        <h3 className="text-[16px] my-0 pt-0 capitalize min-h-[48px] text-center font-[500px] leading-[1.4]">
                          <Link
                            to={`/tin-tuc/${item._id}`}
                            className="text-[#000] font-[500] line-clamp-2 no-underline hover:text-[#e95221]"
                          >
                            {item.title}
                          </Link>
                        </h3>
                        <p className="mb-0 flex items-center justify-center relative after:absolute after:w-full after:h-[1px] after:bg-[#e95221] after:top-[50%] after:left-0 after:right-0 after:bottom-[50%]">
                          <span className="bg-[#e95221] py-0 px-[5px] border border-solid border-[#fff] rounded-[15px] text-[13px] z-1 text-[#fff]">
                            {newDate}
                          </span>
                        </p>
                        <p className="text-[14px] text-[#333] font-[400] text-center mb-0 line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default NewsPage;
