"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [u, setU] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const u: any = localStorage.getItem("users");
    setUsers(JSON.parse(u));
  }, []);

  useEffect(() => {
    const user: any = localStorage.getItem("currUser");
    if (user) {
      setU(JSON.parse(user));
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUser = (username: any) => {
    if (u.username === username) {
      alert("You cannot delete current login user");
    } else {
      const u: any = localStorage.getItem("users");
      const users = JSON.parse(u);
      const i = users.findIndex((e: any) => e.username === username);
      users.splice(i, 1);
      localStorage.removeItem("users");
      localStorage.setItem("users", JSON.stringify(users));
      setUsers(users);
    }
  };
  return (
    <>
      <div
        className="relative overflow-x-auto shadow-md sm:rounded-lg"
        style={{ width: "85%", marginLeft: "18%" }}
      >
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              {u && u.isAdmin && (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((e: any, index: any) => {
                return (
                  <tr
                    className="odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-200 border-b dark:border-gray-700 dark:text-black"
                    key={index}
                  >
                    <td className="px-6 py-4 ">
                      <Link href={`/${e.username}`}>{e.email}</Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/${e.username}`}>{e.first_name}</Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/${e.username}`}>{e.last_name}</Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/${e.username}`}>{e.phone}</Link>
                    </td>

                    {u && u.isAdmin && (
                      <td className="px-6 py-4">
                        <Link
                          href={`/${e.username}/edit`}
                          className="text-blue-900"
                        >
                          Edit
                        </Link>
                        <span
                          onClick={() => deleteUser(e.username)}
                          className="text-blue-900 ml-3 cursor-pointer"
                        >
                          Delete
                        </span>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
