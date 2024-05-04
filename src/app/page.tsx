import { auth } from "@/auth";
import RecommendedPosts from "@/components/client/RecommendedPosts";
import UserInfoCard from "@/components/client/UserInfoCard";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  let userData = {};

  if(user){
    userData = await axios.get(`${BASE_URL}/api/user/${user?._id}`).then((res) => res.data).catch((err) => console.error("Error", err));
  }


  return (
    <div className="flex justify-center gap-5 w-full">
      { user ?
        <div className="w-[95%] flex gap-10 md:flex-row flex-col items-start mt-5">
        <div className="flex-[3]">
        <UserInfoCard userData={userData} />
        </div>
        <div className="flex-[6]">
          <RecommendedPosts currUser={userData} />
        </div>
        <div className="flex-[3]"></div>
        </div>

        :
        <div>
          <p>Please Login</p>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
}
    </div>
  );
}
