import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useRef } from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";

import { db, storage } from "../firebase";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { async } from "@firebase/util";

function InputFeed() {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.name,
      profileImage: session.user.image,
      message: inputRef.current.value,
      timestamp: serverTimestamp(),
      email: session.user.email,
    });

    console.log("New doc added with ID", docRef.id);

    const imgRef = ref(storage, `posts/${docRef.id}/image`);
    console.log("the reference id is :", imgRef);

    await uploadString(imgRef, imageToPost, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imgRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    removeImage();
    setImageToPost(null);
    inputRef.current.value = " ";
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6 ">
      <div className="flex space-x-4 p-4 items-center">
        {session?.user?.image && (
          <Image
            className="rounded-full"
            src={session?.user?.image}
            width={40}
            height={40}
            layout="fixed"
          />
        )}

        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind, ${session?.user?.name}`}
          />
          <button type="submit" hidden onClick={sendPost}></button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter brightness-105 transition transform duration-100 hover:scale-105 cursor-pointer"
          >
            <img src={imageToPost} className="h-10 object-contain" alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly space-x-4 p-3 border-t">
        <div className="inputarea">
          <VideoCameraIcon className="h-7 text-red-500 " />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => filepickerRef.current.click()}
          className="inputarea"
        >
          <CameraIcon className="h-7 text-yellow-500 " />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Videos</p>
          <input
            type="file"
            hidden
            ref={filepickerRef}
            onChange={addImageToPost}
          />
        </div>
        <div className="inputarea">
          <EmojiHappyIcon className="h-7 text-blue-500 " />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputFeed;
