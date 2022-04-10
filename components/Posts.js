import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

function Posts() {
  const [post, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div className="my-8 pb-20 space-y-4">
      {post.map((post) => (
        <Post
          id={post.id}
          key={post.id}
          name={post.data().username}
          email={post.data().email}
          image={post.data().image}
          profileImage={post.data().profileImage}
          timestamp={post.data().timestamp}
          message={post.data().message}
        />
      ))}
    </div>
  );
}

export default Posts;
