import axios from "axios";
import Error from "next/error";

export async function GetFeedbacks({ page }) {
  try {
    const feedbacks = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/feedback/get-feedbacks`,
      {
        params: {
          page: page,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return feedbacks.data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
