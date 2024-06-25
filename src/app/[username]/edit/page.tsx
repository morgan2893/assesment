import Registration from "@/components/users/Registration";
import React from "react";

const page = ({ params }: any) => {
  return (
    <div>
      <Registration params={params.username} />
    </div>
  );
};

export default page;
