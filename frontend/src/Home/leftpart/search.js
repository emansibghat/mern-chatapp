import React from 'react'
import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <div className='h-[10vh]'>
      <div className='px-6 py-4'>
    <form action="">
    <div className='flex space-x-4'>
    <label className="border-[1px] rounded-lg pd-3 border-gray-700 bg-slate-900 flex items-center gap-2 w-[80%]">
  <input type="text" className="grow outline-none bg-transparent text-white" placeholder="Search " />
</label>
   <button>
   <FaSearch className='text-4xl hover:bg-gray-700 rounded-full duration-300'/>
   </button>
    </div>
    </form>
    </div>
    </div>
  )
}
