"use client";
import { useUser } from "@/app/provider";
import React from "react";
import { Bell } from "lucide-react";
import Image from "next/image";
function Welcome() {
  const { user } = useUser();
  return (
     <div className="bg-white p-4 rounded-xl flex items-center justify-between ml-3.5 mr-3.5">
        <div>
          <h2 className="text-lg font-bold">Welcome Back, {user?.name ?? "User"}</h2>
          <h2 className="text-gray-500">AI based Interview</h2>
        </div>
        <div className="flex items-center">
        <Bell className="mr-5 w-6 h-6 text-gray-600" />
        {user && <Image src={user?.profile_photo} alt="Profile"  width={40}  height={40} className="rounded-full"/>}
      </div>
    </div>
  );
}

export default Welcome;
// "use client";
// import { useUser } from "@/app/provider";
// import React from "react";
// import { Bell } from "lucide-react";
// import Image from "next/image";

// function Welcome() {
//   const { user } = useUser();

//   return (
//     <div>
//       <div className="bg-white p-4 rounded-xl flex items-center justify-between">
//         <div>
//           <h2 className="text-lg font-bold">
//             Welcome Back, {user?.name ?? "User"}
//           </h2>
//           <h2 className="text-gray-500">AI based Interview</h2>
//         </div>
//         <div className="flex items-center gap-4">
//           <Bell className="w-6 h-6 text-gray-600" />
//           {user && <Image src={user?.profile_photo} alt="Profile"  width={40}  height={40} className="rounded-full"/>}

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Welcome;
