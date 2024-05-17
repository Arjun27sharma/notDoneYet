import { API_HEAD } from "@/lib/utils";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import useSWR from "swr";
import PostForm from "../(modals)/PostForm";
import ProfilePostCard from "@/components/client/ProfilePostCard";

const Posts = ({ userData }: { userData: any }) => {
  const [openPostForm, setOpenPostForm] = useState(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: allUserPosts,
    error,
    isLoading,
  } = useSWR(`${API_HEAD}/posts/user/${userData?._id}`, fetcher);

  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center gap-1">
          <h2 className="text-xl font-bold">Posts</h2>

          <div
            className="flex cursor-pointer justify-start w-fit bg-gray-200 rounded-full md:px-4 px-3 py-1 items-center gap-1 md:gap-2"
            onClick={() => setOpenPostForm(true)}
          >
            <FiPlus className="cursor-pointer h-5 md:h-6 w-5 md:w-6 text-gray-600" />
            <span className="md:text-sm text-xs">Add New Post</span>
          </div>
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allUserPosts?.slice(0, 2)?.map((post: any) => (
          <ProfilePostCard dashboardCard={true} currUser={userData} key={post._id} post={post}/>
        ))}
      </div>
      </div>

      {openPostForm && (
        <div className="absolute">
          <PostForm
            open={openPostForm}
            user={userData}
            setOpen={setOpenPostForm}
          />
        </div>
      )}
    </>
  );
};

export default Posts;
