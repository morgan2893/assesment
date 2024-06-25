"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      id="docs-sidebar"
      className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700"
    >
      <div className="px-6">
        <Link
          className="flex-none text-xl font-semibold dark:text-white"
          href="/"
          aria-label="Brand"
        >
          Assessment
        </Link>
      </div>
      <nav
        className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
        data-hs-accordion-always-open=""
      >
        <ul className="space-y-1.5">
          <li>
            <Link
              className={`flex items-center gap-x-3.5 py-2 px-2.5  rounded-lg hover:bg-gray-600  ${
                pathname === "/"
                  ? "bg-gray-500 text-sm text-gray-200"
                  : "dark:bg-neutral-700 dark:text-white"
              }`}
              href="/"
            >
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Dashboard
            </Link>
          </li>
          <li className="hs-accordion" id="users-accordion">
            <Link
              href="/profile"
              type="button"
              className={`flex items-center gap-x-3.5 py-2 px-2.5  rounded-lg hover:bg-gray-600  ${
                pathname === "/profile"
                  ? "bg-gray-500 text-sm text-gray-200"
                  : "dark:bg-neutral-700 dark:text-white"
              }`}
            >
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx={9} cy={7} r={4} />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Profile
            </Link>
          </li>

          <li className="hs-accordion cursor-pointer" id="users-accordion">
            <div
              onClick={() => {
                localStorage.removeItem("currUser");
                router.push("/login");
              }}
              className={`flex items-center gap-x-3.5 py-2 px-2.5  rounded-lg hover:bg-gray-600  ${
                pathname === "/login"
                  ? "bg-gray-500 text-sm text-gray-200"
                  : "dark:bg-neutral-700 dark:text-white"
              }`}
            >
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx={9} cy={7} r={4} />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Logout
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
