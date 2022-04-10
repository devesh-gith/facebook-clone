import InputFeed from "./InputFeed";
import Posts from "./Posts";
import Stories from "./Stories";

function Feed() {
  return (
    <div className="flex justify-center h-screen p-44 pt-6 mr-4 xl:mr-40 overflow-y-auto overflow-x-hidden scrollbar-hide">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl ">
        <Stories />
        <InputFeed />
        <Posts />
      </div>
    </div>
  );
}

export default Feed;
