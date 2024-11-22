import React from 'react'
import Search from './search'
import Users from './users'
import Logout from './logout'

function Left() {
  return (
    <div className="w-[35%]   bg-black text-gray-300">

      <div
        className=" flex-1  overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <Users />
      </div>
      <Logout />
    </div>
  );
}

export default Left;