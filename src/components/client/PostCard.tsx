"use client";

import { addComment, toggleLike } from "@/actions/posts";
import { timeAgo } from "@/lib/utils";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
import { FiMessageCircle, FiShare } from "react-icons/fi";
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";
import { toast } from "sonner";
import PostCardMore from "./PostCardMore";
import PostImageSection from "./PostImageSection";
import UserCommentCard from "./UserCommentCard";

const PostCard = ({ postData, currUser }: any) => {
  const [openCommentInput, setOpenCommentInput]: [boolean, any] =
    useState(false);
  const [commentText, setCommentText]: [string, any] = useState("");
  const [openLikes, setOpenLikes]: [boolean, any] = useState(false);

  const handlePostLike = async () => {
    try {
      console.log("clicked on like");

      const res: any = await toggleLike(postData?._id, currUser._id);
      toast.success(res.message);
    } catch (err) {
      console.log(err);
      toast.error("Failed to like post");
    }
  };

  const handlePostComment = async () => {
    try {
      if (!commentText) {
        toast.error("Comment cannot be empty");
        return;
      }

      await addComment(currUser._id, postData?._id, null, commentText);
      setCommentText("");

      toast.success("Comment posted successfully");

      // You might also want to update the postData's comments array here
    } catch (error) {
      console.error(error);
      toast.error("Failed to post comment");
    }
  };

  return (
    <div className="flex border flex-col rounded-md px-2 py-2 gap-2 max-w-[650px]">
      <div className="flex items-center justify-between gap-4 border-b pb-2">
        <div className="flex items-center gap-2">
          <Link href={`/${postData?.user?.role}/${postData?.user?.userName}`}>
            <Image
              src={postData?.user?.image}
              alt=""
              width={48}
              height={48}
              referrerPolicy="no-referrer"
              className="rounded-full w-12 h-12"
            />
          </Link>
          <div>
            <div className="text-base flex items-center gap-2">
              <Link
                href={`/${postData?.user?.role}/${postData?.user?.userName}`}
              >
                {postData?.user?.name}
              </Link>
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <span className="text-xs text-gray-500">
                {timeAgo(postData?.createdAt)}
              </span>
            </div>
            <p className="text-xs">{postData?.user?.bio}</p>
          </div>
        </div>

        <PostCardMore postData={postData} currUser={currUser} />
      </div>

      <div className="w-full flex flex-col gap-4 px-2 py-2">
        <p className="text-sm text-start">{postData?.description}</p>
        {postData?.images.length > 0 && (
          <PostImageSection images={postData?.images} />
        )}
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center text-sm justify-between w-full gap-2">
          <span>{postData?.likes?.length} Likes</span>
          <span
            onClick={() => setOpenCommentInput(!openCommentInput)}
            className="cursor-pointer"
          >
            {postData?.comments?.length} Comments
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center border-t pt-3 justify-between w-full px-6 gap-2">
          {postData?.likes?.some((like: any) => like._id === currUser?._id) ? (
            <div
              className="flex items-center text-pink-500 cursor-pointer gap-2"
              onClick={handlePostLike}
            >
              <RiHeart2Fill className="w-5 h-5" /> <span>Liked</span>
            </div>
          ) : (
            <div
              className="flex items-center cursor-pointer gap-2"
              onClick={handlePostLike}
            >
              <RiHeart2Line className="w-5 h-5" /> <span>Like</span>
            </div>
          )}
          <div
            className={`flex items-center gap-2 cursor-pointer ${
              openCommentInput ? "text-orange-500" : ""
            }`}
            onClick={() => setOpenCommentInput(!openCommentInput)}
          >
            <FiMessageCircle className="w-5 h-5" /> <span>Comment</span>
          </div>
          <div className="flex items-center gap-2">
            <FiShare className="w-5 h-5" /> <span>Share</span>
          </div>
        </div>
      </div>

      {openCommentInput && (
        <div className="flex flex-col w-full px-4">
          <div className="w-full border-b py-3 flex items-start gap-2">
            <Image
              src={currUser.image}
              alt="profile"
              width={36}
              height={36}
              className=" rounded-full object-cover"
              referrerPolicy="no-referrer"
            />

            <div className="flex flex-col justify-end items-end w-full">
              <div className=" w-full ">
                <textarea
                  className="w-full text-sm border rounded-md px-2 py-2 outline-none bg-transparent"
                  placeholder="Add a comment..."
                  value={commentText}
                  rows={2}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </div>

              <button
                className="text-base w-fit bg-primary rounded-md text-white px-6 py-1"
                onClick={handlePostComment}
              >
                Post
              </button>
            </div>
          </div>
          <div>
            {postData?.comments?.map((comment: any) => (
              <UserCommentCard key={comment._id} comment={comment} />
            ))}
          </div>
        </div>
      )}

      {openLikes && (
        <div className="flex flex-col w-full px-4">
          <div className="w-full border-b py-3 flex items-start gap-2">
            {postData?.likes?.map((like: any) => (
              <div
                key={like._id}
                className="w-10 h-10 rounded-full overflow-hidden"
              >
                <Image
                  src={like.profileImg}
                  alt="profile"
                  width={40}
                  height={40}
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
