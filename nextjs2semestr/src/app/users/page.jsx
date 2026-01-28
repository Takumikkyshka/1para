import React from "react";
import { prisma } from "../lib/prisma";
import UsersTable from "./UsersTable";

export default async function UsersPage() {
  const data = await prisma.user.findMany({
    include: {
      photos: true,
    },
  });

  // {
  // where:{
  //     age: {
  //         // gt: 18
  //         // lt: 18
  //         lte: 17
  //     }
  // }
  // where:{
  //     AND: [
  //         {
  //             age:{
  //                 lte: 17
  //             }
  //         },
  //         {
  //             username: 'maxim'
  //         }
  //     ]
  // }
  // }
  // where AND и OR

  return (
    <div>
      <div className="mx-5 mt-5">
        <h1 className="text-center mb-5">Users List</h1>
        <UsersTable data={data} />
      </div>
    </div>
  );
}
