import Profile from "@/components/users/Profile";
import React from "react";

const page = ({ params }: any) => {
  console.log(params.username);

  return (
    <div>
      <Profile username={params.username} />
    </div>
  );
};

export default page;
