import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  ThumbUpIcon,
  ShareIcon,
  ChatAltIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { ThumbUpIcon as ThumbUpIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function Post({ name, id, email, image, profileImage, message, timestamp }) {
  const [open, setOpen] = useState(false);
  const [openField, setOpenField] = useState(false);
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  console.log(profileImage);

  const commentBox = () => {
    if (open) return;
    if (openField) return;

    setOpen(true);
    setOpenField(true);
  };

  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts", id, "comment")), (snapshot) =>
        setComments(snapshot.docs)
      ),
    [db, id]
  );
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  const likePosts = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session.user.uid) !== -1
      ),
    [likes]
  );

  const sendComments = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comment"), {
      username: name,
      comment: commentToSend,
      userImg: profileImage,
      timestamp: serverTimestamp(),
    });
  };
  console.log(comments);
  return (
    <div className="flex flex-col ">
      <div className="p-4 bg-white mt-5 rounded-2xl shadow-md  ">
        <div className="flex items-center space-x-3">
          <Image
            src={profileImage}
            width={50}
            height={50}
            objectFit="contain"
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="font-bold ">{name}</p>
            <p className="text-sm text-gray-500">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        </div>

        <p className="p-2 font-medium">{message}</p>
        {image && (
          <div className="relative h-56 md:h-96 ">
            <Image src={image} objectFit="cover" layout="fill" />
          </div>
        )}

        <div className="p-3 flex items-center justify-between">
          <div>
            {likes.length > 0 && (
              <p className="font-bold ">{likes.length} likes</p>
            )}
          </div>
          <div>
            {comments.length > 0 && (
              <p className="font-bold ">{comments.length} comments</p>
            )}
          </div>
        </div>

        <div className="flex justify-around items-center text-gray-500  border-t rounded-b-2xl bg-white p-2">
          {hasLiked ? (
            <div onClick={likePosts} className="inputarea text-blue-500 ">
              <ThumbUpIconFilled className="h-6" />
              <p>Like</p>
            </div>
          ) : (
            <div onClick={likePosts} className="inputarea  ">
              <ThumbUpIcon className="h-6" />
              <p>Like</p>
            </div>
          )}
          <div onClick={commentBox} className="inputarea">
            <ChatAltIcon className="h-6" />
            <p>Comment</p>
          </div>
          <div className="inputarea">
            <ShareIcon className="h-6" />
            <p>Share</p>
          </div>
        </div>

        <div className="border-t pt-2">
          {openField && (
            <div>
              {comments.length > 0 && (
                <div className="ml-6 h-20 overflow-y-scroll scrollbar-hide">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-center space-x-2 mb-3 "
                    >
                      <img
                        src={comment.data().userImg}
                        alt=""
                        className="rounded-full h-8"
                      />
                      <p className="font-bold text-sm">{name}</p>
                      <p className="text-sm text-gray-600">
                        {comment.data().comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {open && (
            <div className="flex flex-1 items-center space-x-3 ">
              {/* <div className="bg-green-800 h-3 w-3 absolute rounded-full bottom-1 left-7 z-5" /> */}
              <Image
                src={profileImage}
                width={40}
                height={40}
                objectFit="contain"
                className="rounded-full "
              />
              <div className="flex flex-1 items-center space-x-1 bg-gray-100 px-2 py-1 rounded-2xl  ">
                <EmojiHappyIcon className="h-8" />
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 outline-none bg-transparent border-none focus:ring-0 placeholder-gray-400 p-1"
                  placeholder="Add a comment..."
                />
              </div>
              <button
                onClick={sendComments}
                disabled={!comment.trim()}
                className="text-blue-500"
              >
                Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
