import Head from "next/head";
import Image from "next/image";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useQuery } from "@tanstack/react-query";
import { GetFeedbacks } from "../service/feedbacks";
import { AiFillWarning } from "react-icons/ai";
import { RiFunctionLine } from "react-icons/ri";
import { MdOutlineMoodBad } from "react-icons/md";
import Pagination from "@mui/material/Pagination";

import { BiHappyBeaming } from "react-icons/bi";
import { useState } from "react";
import { Skeleton } from "@mui/material";
import PopUpFeedback from "@/components/feedback/pop-up-feedback";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://tatugacamp.com/classroom">
        tatuga class
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const loadingSketion = () => {
  return (
    <div className="grid grid-cols-3 w-full  gap-6 place-items-center mb-10">
      <Skeleton variant="rounded" width={400} height={112} />
      <Skeleton variant="rounded" width={400} height={112} />
      <Skeleton variant="rounded" width={400} height={112} />
      <Skeleton variant="rounded" width={400} height={112} />
      <Skeleton variant="rounded" width={400} height={112} />
      <Skeleton variant="rounded" width={400} height={112} />
      <Skeleton variant="rounded" width={400} height={112} />
      <Skeleton variant="rounded" width={400} height={112} />
      <Skeleton variant="rounded" width={400} height={112} />
      <Skeleton variant="rounded" width={400} height={112} />
      <Skeleton variant="rounded" width={400} height={112} />
      <Skeleton variant="rounded" width={400} height={112} />
    </div>
  );
};

export default function Home() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState();
  const feedbacks = useQuery(
    ["feedbacks", page],
    () => GetFeedbacks({ page: page }),
    { keepPreviousData: true }
  );

  const handleOpenFeedback = (trigger) => {
    setOpen(() => trigger);
  };
  return (
    <div className="bg-gradient-to-b from-blue-400 to-orange-200">
      <Head>
        <title>feedback - tatuga class</title>
        <link
          rel="icon"
          href="https://tatugacamp.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Ftatugacamp.com%2Flogo%2520%2Ftatugacamp%2520facebook.jpg&w=256&q=100"
        />
      </Head>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            <span className="text-sky-50 drop-shadow-lg uppercase    font-Poppins font-semibold">
              feedbacks
            </span>
          </Typography>
        </Container>
        {open && (
          <PopUpFeedback
            handleOpenFeedback={handleOpenFeedback}
            body={activeFeedback?.body}
            date={activeFeedback?.date}
            tag={activeFeedback?.tag}
          />
        )}
        {feedbacks.isLoading ? (
          loadingSketion()
        ) : (
          <main className="grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3  gap-6 place-items-center mb-10">
            {feedbacks?.data?.feedbacks?.map((feedback) => {
              const date = new Date(feedback.createAt);
              const formattedDate = date.toLocaleDateString("th-TH", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              return (
                <button
                  key={feedback.id}
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    setActiveFeedback(() => {
                      return {
                        body: feedback.body,
                        tag: feedback.tag,
                        date: formattedDate,
                      };
                    });
                    handleOpenFeedback(true);
                  }}
                  className="lg:w-96 md:w-80 w-72   duration-150 active:ring-2 hover:scale-110 transition group hover:bg-slate-600 cursor-pointer
               bg-white h-28 rounded-2xl shadow-lg p-7 pb-2 font-Kanit flex flex-col justify-between items-start "
                >
                  <div className="flex gap-2">
                    <h2 className="text-blue-600 font-semibold text-xl group-hover:text-white">
                      {feedback.tag}
                    </h2>
                    {feedback.tag === "ข้อผิดพลาด" && (
                      <div className="text-xl text-red-500 flex items-center justify-start">
                        <AiFillWarning />
                      </div>
                    )}

                    {feedback.tag === "ขอฟังชั่นเพิ่ม" && (
                      <div className="text-xl text-blue-400 flex items-center justify-start">
                        <RiFunctionLine />
                      </div>
                    )}

                    {feedback.tag === "ร้องเรียน" && (
                      <div className="text-xl text-orange-400 flex items-center justify-start">
                        <MdOutlineMoodBad />
                      </div>
                    )}

                    {(feedback.tag === "ให้กำลังใจ   " ||
                      feedback.tag === "ให้กำลังใจ") && (
                      <div className="text-xl text-green-500 flex items-center justify-start">
                        <BiHappyBeaming />
                      </div>
                    )}
                  </div>

                  <div
                    className="text-md font-Kanit break-words h-20 w-full overflow-hidden group-hover:text-white"
                    dangerouslySetInnerHTML={{ __html: feedback.body }}
                  />
                  <div className="w-full flex justify-end ">
                    <span className="font-normal font-Poppins group-hover:text-white">
                      {formattedDate}
                    </span>
                  </div>
                </button>
              );
            })}
          </main>
        )}

        <footer className="w-full mb-2 flex items-center justify-center">
          <Pagination
            count={feedbacks?.data?.totalPages}
            onChange={(e, page) => setPage(page)}
          />
        </footer>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Copyright />
          </Container>
        </Box>
      </Box>
    </div>
  );
}
