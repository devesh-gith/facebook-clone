import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { VideoCameraIcon, DotsHorizontalIcon } from "@heroicons/react/solid";
import ListName from "./ListName";

const contact = [
  {
    name: "Elon musk",
    img: "https://links.papareact.com/kxk",
  },
  {
    name: "Bill Gates",
    img: "https://links.papareact.com/zvy",
  },
  {
    name: "Mark Zuckerberg",
    img: "https://links.papareact.com/snf",
  },
  {
    name: "Harry Potter",
    img: "https://links.papareact.com/d0c",
  },
  {
    name: "The Queen",
    img: "https://links.papareact.com/6gg",
  },
  {
    name: "James Bond",
    img: "https://links.papareact.com/r57",
  },
];
function Widgets() {
  return (
    <div className="hidden lg:inline-flex flex-col p-4">
      <div className="flex items-center text-gray-500 space-x-3 p-4">
        <p className="text-lg">Contacts</p>
        <VideoCameraIcon className="h-6" />
        <SearchIcon className="h-6" />
        <DotsHorizontalIcon className="h-6" />
      </div>
      <div className="space-y-4">
        {contact.map((cont) => (
          <ListName name={cont.name} key={cont.name} image={cont.img} />
        ))}
      </div>
    </div>
  );
}

export default Widgets;
