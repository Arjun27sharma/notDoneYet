import { auth } from "@/auth";
import axios from "axios";
import { API_HEAD } from "@/lib/utils";
import Profile from "./Profile";

const Page = async ({ params }: { params: { userRole: string, userId: string } }) => {
  const session = await auth();
  const userID = params.userId;
  const userRole = params.userRole

  const userData = await axios
    .get(`${API_HEAD}/user/${userID}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));

  return (
    <div className="relative flex items-center justify-center w-full px-2">
      <div className="md:w-[95%] flex md:flex-row md:gap-10 flex-col items-start mt-5">
        <div className="w-full flex flex-col gap-5 md:flex-[8]">
          {userData && <Profile userData={userData} />}
        </div>
        <div className="w-full flex flex-col md:flex-[3]"></div>
      </div>
    </div>
  );
};

export default Page;
