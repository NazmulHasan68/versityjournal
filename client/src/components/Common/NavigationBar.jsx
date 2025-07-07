import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, LogOut } from "lucide-react";
import Logo from "@/assets/graduate.png";
import { motion } from "framer-motion";
import { useCheckAuthQuery, useLogoutUserMutation } from "@/redux/ApiController/authApi";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavigationBar() {
  // const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading } = useCheckAuthQuery();
  const [logoutUser] = useLogoutUserMutation();

  // const searchHandler = (e) => {
  //   e.preventDefault();
  //   navigate(`/search?query=${searchQuery}`);
  //   setSearchQuery("");
  // };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logout successful!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const profileImage = data?.user?.photoUrl || "https://ui-avatars.com/api/?name=User";

  

  return (
    <>
      <nav className="py-1 fixed shadow-lg top-0 left-0 w-full bg-slate-50 z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold flex items-center">
            <img src={Logo} className="h-14 md:h-16 object-cover" alt="BD Educators Logo" />
            <p className="text-sky-600 text-xl font-bold md:text-lg lg:text-2xl">Journal</p>
          </Link>

          {/* Search Bar (Hidden on Mobile) */}
          {/* <form
            onSubmit={searchHandler}
            className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1"
          >
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search..."
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 outline-none text-textThird bg-transparent md:w-40 lg:w-64"
            />
          </form> */}

          {/* Desktop Navigation */}
          <div className="hidden text-xl md:text-sm lg:text-xl md:flex space-x-6 items-center">
            <Link to="/about" className="hover:text-rose-600 text-cyan-800 ">About</Link>
            <Link to="/journal" className="hover:text-rose-600 text-cyan-800 ">Journals</Link>
            <Link to="/archive" className="hover:text-rose-600 text-cyan-800 ">Archives</Link>
            <Link to="/contact" className="hover:text-rose-600 text-cyan-800 ">Contact</Link>

            {isLoading ? (
              <p className="text-cyan-800 font-medium">Loading...</p>
            ) : !data?.user ? (
              <>
                <Link to="/auth/login" className="hover:text-rose-500 text-rose-600 ">Login</Link>
                <Link to="/auth/signup" className="hover:text-rose-500 text-rose-600 ">Signup</Link>
              </>
            ) : (
              <div className="flex gap-4 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <img
                      src={profileImage}
                      className="w-10 h-10 rounded-full border hover:border-rose-500"
                      alt="User Profile"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 bg-sky-50">
                    <DropdownMenuLabel className="text-sky-600 font-bold bg-slate-100 rounded-md">
                      {data?.user?.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                      {data?.user?.role === "researcher" && (
                      <DropdownMenuItem>
                        <Link to="/researcher" className="text-sky-700 hover:text-rose-500">
                          Reviewer Dashboard
                        </Link>
                      </DropdownMenuItem>
                      )}
                      {data?.user?.role === "admin" && (
                          <DropdownMenuItem>
                            <Link to="/admin" className="text-sky-700 hover:text-rose-500">
                              Admin Dashboard
                            </Link>
                          </DropdownMenuItem>
                      )}
                      {data?.user?.role === "editor" && (
                        <DropdownMenuItem>
                          <Link to="/editor" className="text-sky-700 hover:text-rose-500">
                            Editor Dashboard
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {data?.user?.role === "sub_editor" && (
                        <DropdownMenuItem>
                          <Link to="/sub-editor" className="text-sky-700 hover:text-rose-500">
                            Sub Editor Dashboard
                          </Link>
                        </DropdownMenuItem>
                      )}
                      {data?.user?.role === "reviewer" && (
                        <DropdownMenuItem>
                          <Link to="/reviewer" className="text-sky-700 hover:text-rose-500">
                            Reviewer Dashboard
                          </Link>
                        </DropdownMenuItem>
                      )}
                    <DropdownMenuItem>
                        <Link to="/profile" className="text-sky-700 hover:text-rose-500">
                          Profile
                        </Link>
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>

                <button onClick={handleLogout}>
                  <LogOut className="text-cyan-800 hover:text-rose-500 cursor-pointer" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 md:hidden">
            {data?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <img
                    src={profileImage}
                    className="w-10 h-10 rounded-full border hover:border-rose-500"
                    alt="User"
                  />
                </DropdownMenuTrigger>
                 <DropdownMenuContent className="mt-2">
                    <DropdownMenuLabel className="text-sky-600 font-bold bg-slate-100 rounded-md">
                      {data?.user?.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {data?.user?.role === "researcher" && (
                      <DropdownMenuItem>
                        <Link to="/researcher" className="text-sky-700 hover:text-rose-500">
                          Reviewer Dashboard
                        </Link>
                      </DropdownMenuItem>
                      )}
                    {data?.user?.role === "admin" && (
                        <DropdownMenuItem>
                          <Link to="/admin" className="text-sky-700 hover:text-rose-500">
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                    )}
                    {data?.user?.role === "editor" && (
                      <DropdownMenuItem>
                        <Link to="/editor" className="text-sky-700 hover:text-rose-500">
                          Editor Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {data?.user?.role === "sub_editor" && (
                      <DropdownMenuItem>
                        <Link to="/sub-editor" className="text-sky-700 hover:text-rose-500">
                          Sub Editor Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {data?.user?.role === "reviewer" && (
                      <DropdownMenuItem>
                        <Link to="/reviewer" className="text-sky-700 hover:text-rose-500">
                          Reviewer Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                   <DropdownMenuItem>
                      <Link to="/profile" className="text-sky-700 hover:text-rose-500">
                        Profile
                      </Link>
                   </DropdownMenuItem>

                  </DropdownMenuContent>
              </DropdownMenu>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="font-bold text-rose-600" size={30} />
              ) : (
                <Menu className="font-bold" size={30} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className="md:hidden fixed top-14 left-0 w-full z-50 bg-slate-50 shadow-md p-4 flex flex-col items-center mt-4 space-y-4"
        >
          <Link to="/about" className="hover:text-rose-500 text-cyan-800 " onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/journal" className="hover:text-rose-500 text-cyan-800 " onClick={() => setIsOpen(false)}>Journals</Link>
          <Link to="/archive" className="hover:text-rose-500 text-cyan-800 " onClick={() => setIsOpen(false)}>Archives</Link>
          <Link to="/contact" className="hover:text-rose-500 text-cyan-800 " onClick={() => setIsOpen(false)}>Contact</Link>

          {isLoading ? (
            <p className="text-cyan-800 font-medium">Loading...</p>
          ) : !data?.user ? (
            <>
              <Link to="/auth/login" className="hover:text-rose-500 text-rose-600 " onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/auth/signup" className="hover:text-rose-500 text-rose-600 " onClick={() => setIsOpen(false)}>Signup</Link>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button onClick={handleLogout} className="flex items-center gap-2 font-medium text-cyan-800 hover:text-rose-500">
                <p>Logout</p>
                <LogOut />
              </button>
            </div>
          )}

          {/* <form
            onSubmit={searchHandler}
            className="flex items-center border border-gray-300 rounded-full px-3 py-1"
          >
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 outline-none bg-transparent w-52 md:w-48 lg:w-72"
            />
          </form> */}
        </motion.nav>
      )}
    </>
  );
}
