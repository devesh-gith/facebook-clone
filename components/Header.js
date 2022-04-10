import React from "react";
import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { signIn, signOut, useSession } from "next-auth/react";
function Header() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex items-center p-2 shadow-md">
      {/* left */}
      <div className="flex items-center ">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />
        <div className="flex items-center p-2 ml-2 rounded-full bg-gray-100  ">
          <SearchIcon className="h-5 text-gray-600" />
          <input
            type="text"
            className=" hidden md:inline-flex ml-2 bg-transparent outline-none placeholder-gray-500"
            placeholder="Search Facebook"
          />
        </div>
      </div>
      {/* center */}
      <div className="flex  justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-1">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/* right */}
      {session ? (
        <>
          <div className="flex items-center sm:space-x-2 justify-end  ">
            <Image
              onClick={signOut}
              src={session.user.image}
              width={40}
              height={40}
              objectFit="contain"
              className="cursor-pointer rounded-full"
            />

            <p className="hidden lg:inline-flex font-semibold pr-3 whitespace-nowrap">
              {session.user.name}
            </p>
            <ViewGridIcon className="icon" />
            <ChatIcon className="icon" />
            <BellIcon className="icon" />
            <ChevronDownIcon className="icon" />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center sm:space-x-2 justify-end pr-4">
            <ViewGridIcon className="icon" />
            <ChatIcon className="icon" />
            <BellIcon className="icon" />
            <ChevronDownIcon className="icon" />
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
