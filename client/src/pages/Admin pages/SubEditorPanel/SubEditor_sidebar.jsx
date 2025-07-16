"use client";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardCheck,
  MessageSquare,
  Clock,
  Menu,
  LogOut,
} from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const subEditorLinks = [
  { path: "", label: "Dashboard", icon: LayoutDashboard },
  { path: "review", label: "Reviews", icon: ClipboardCheck },
  { path: "under_review", label:"Under Review", icon:Clock},
  { path: "history", label: "History", icon: Clock },
];

const SidebarLink = ({ path, label, Icon, isActive, onClick }) => (
  <Link
    to={`/sub-editor/${path}`}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    <Icon className="w-4 h-4" /> {label}
  </Link>
);

export default function SubEditorSidebar() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) => {
    if (path === "") return location.pathname === "/sub-editor";
    return location.pathname.includes(`/sub-editor/${path}`);
  };

  const renderSidebar = (onLinkClick = () => {}) => (
    <div className="w-full min-h-[550px] md:min-h-screen bg-white p-4 font-sans flex flex-col justify-between">
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
            Sub Editor Panel
          </h1>
          <p className="text-xs text-gray-500 mt-1">Manage submissions and peer reviews</p>
        </div>

        <nav className="space-y-1">
          {subEditorLinks.map(({ path, label, icon }) => (
            <SidebarLink
              key={path}
              path={path}
              label={label}
              Icon={icon}
              isActive={isActive(path)}
              onClick={() => {
                onLinkClick();
                setDrawerOpen(false);
              }}
            />
          ))}
        </nav>
      </div>

      <div className="pt-6 border-t mt-6">
        <button
          onClick={() => console.log("Logout...")}
          className="flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 px-4 py-2 rounded-md transition-all"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header + Drawer */}
      <div className="md:hidden p-4 border-b flex items-center justify-between bg-white z-50">
        <h2 className="text-lg font-semibold text-blue-700">Sub Editor Panel</h2>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent side="left" className="p-0">
            {renderSidebar()}
            <DrawerClose className="absolute top-4 right-4" />
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">{renderSidebar()}</div>
    </>
  );
}
