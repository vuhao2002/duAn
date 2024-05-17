import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listNews } from "../../../Redux/Actions/newsActions";
import { Link } from "react-router-dom";

const News = () => {
  const newsList = useSelector((state) => state.newsList);
  const { news } = newsList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listNews());
  }, [dispatch]);
  return (
    <>
      {news && (
        <div className="mb-[30px] mt-[60px]">
          <div className="relative h-full w-full">
            <div className="absolute w-full h-full top-0 bg-[#f66315]"></div>
            <div className="z-1 pb-[100px] pt-[50px] relative xl:px-[45px] xl:max-w-[1349px] px-[10px] w-full max-w-full mx-auto">
              <div className="flex items-center gap-2 justify-between sm:mx-auto mx-[0px]">
                <h2 className="text-[40px] font-[700] text-[#fff]">Tin tức</h2>
                <div className="border border-solid border-[#f66315] w-fit mr-6 min-w-[120px] rounded-[4rem] relative">
                  <div className="cursor-pointer relative bg-[#fff] hover:bg-[#f66315] hover:text-[#fff] hover:border hover:border-solid hover:border-[#fff] text-[#000] duration-300 mx-auto rounded-[4rem] items-center justify-center flex">
                    <Link
                      to="/tin-tuc"
                      className="py-[10px] px-[10px] flex items-center justify-center gap-[6px]"
                    >
                      <span className="text-[16px] font-[500] leading-[1.2]">
                        Xem tất cả
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="sm:mx-auto mx-[0px]">
                <div className="relative cursor-grab mx-auto overflow-hidden list-none p-0 z-1 box-border mt-[30px]">
                  <div className="transition-transform relative w-full h-full z-1 flex flex-wrap box-content justify-between">
                    {news.map((item, i) => {
                      const date = new Date(item.createdAt);
                      const newDate = `${date.getDate()} tháng ${
                        date.getMonth() + 1
                      }, ${date.getFullYear()}`;
                      return (
                        <div
                          key={i}
                          className="xl:w-[290px] lg:w-[228px] md:w-[280px] sm:w-[280px] w-[210px] mr-[20px] shrink-0 h-full relative transition-transform"
                        >
                          <div>
                            <Link
                              to={`/tin-tuc/${item._id}`}
                              className="flex overflow-hidden w-full justify-center items-center relative h-auto pb-[60%]"
                            >
                              <img
                                width="400"
                                height="400"
                                className="w-auto h-auto max-w-full max-h-full absolute top-0 bottom-0 left-0 right-0 m-auto transition-all bg-transparent border-none align-middle hover:transform hover:scale-105 "
                                src={`${item.images[0].url}`}
                                alt={`${item.title}`}
                              />
                            </Link>
                          </div>

                          <div className="grow-1 flex flex-col bg-[#fff] w-[95%] mx-auto mt-[-30px] mb-[10px] relative py-[10px] px-[15px] shadow-news rounded-[5px]">
                            <h3 className="text-[16px] my-0 pt-0 capitalize min-h-[48px] text-center font-[500px] leading-[1.4]">
                              <Link
                                to={`/tin-tuc/${item._id}`}
                                className="text-[#000] font-[500] overflow-hidden line-clamp-2 no-underline hover:text-[#f66315]"
                              >
                                {item.title}
                              </Link>
                            </h3>
                            <p className="mb-0 flex items-center justify-center relative after:absolute after:w-full after:h-[1px] after:bg-[#f66315] after:top-[50%] after:left-0 after:right-0 after:bottom-[50%]">
                              <span className="bg-[#f66315] py-0 px-[5px] border border-solid border-[#fff] rounded-[15px] text-[13px] z-1 text-[#fff]">
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
          </div>
        </div>
      )}
    </>
  );
};

export default News;
