import React from "react";
import { AiFillWarning } from "react-icons/ai";
import { BiHappyBeaming } from "react-icons/bi";
import { FcBusinessContact, FcLineChart, FcViewDetails } from "react-icons/fc";
import { MdOutlineMoodBad } from "react-icons/md";
import { RiFunctionLine } from "react-icons/ri";
function PopUpFeedback({ handleOpenFeedback, body, tag, date }) {
  return (
    <div>
      <div
        className="flex w-screen h-screen font-Kanit bg-transparent  z-40 
        top-0 right-0 left-0 bottom-0 m-auto fixed"
      >
        <div
          className="flex w-max h-max max-h-96 max-w-7xl overflow-auto font-Kanit bg-white border-2 border-solid rounded-lg drop-shadow-xl p-5 z-20 
    top-0 right-0 left-0 bottom-0 m-auto fixed"
        >
          <div className=" w-80 flex flex-col justify-center items-center ">
            <div className="text-xl font-semibold text-[#2C7CD1] flex gap-2">
              <span>{tag}</span>
              {tag === "ข้อผิดพลาด" && (
                <div className="text-xl text-red-500 flex items-center justify-start">
                  <AiFillWarning />
                </div>
              )}

              {tag === "ขอฟังชั่นเพิ่ม" && (
                <div className="text-xl text-blue-400 flex items-center justify-start">
                  <RiFunctionLine />
                </div>
              )}

              {tag === "ร้องเรียน" && (
                <div className="text-xl text-orange-400 flex items-center justify-start">
                  <MdOutlineMoodBad />
                </div>
              )}

              {(tag === "ให้กำลังใจ   " || tag === "ให้กำลังใจ") && (
                <div className="text-xl text-green-500 flex items-center justify-start">
                  <BiHappyBeaming />
                </div>
              )}
            </div>
            <div
              className="text-md font-Kanit break-words  w-full  group-hover:text-white"
              dangerouslySetInnerHTML={{ __html: body }}
            />
            <div className="flex justify-end w-full text-slate-300">
              <span>{date}</span>
            </div>
            <button
              onClick={() => {
                document.body.style.overflow = "auto";
                handleOpenFeedback(false);
              }}
              className="w-full  h-9 mt-2 rounded-full bg-[#2C7CD1] text-white font-sans font-bold
          text-md cursor-pointer hover: active:border-2  active:border-gray-300
           active:border-solid  focus:border-2 
          focus:border-solid"
            >
              close
            </button>
          </div>
        </div>
        <div
          onClick={() => {
            document.body.style.overflow = "auto";
            handleOpenFeedback(false);
          }}
          className="w-screen h-screen fixed right-0 left-0 top-0 bottom-0 m-auto -z-10 bg-black/30 "
        ></div>
      </div>
    </div>
  );
}

export default PopUpFeedback;
