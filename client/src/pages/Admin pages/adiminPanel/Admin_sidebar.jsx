"use client";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CircleCheckBig,
  CloudUpload,
  FileText,
  Users,
  ClipboardCheck,
  CircleX,
  LifeBuoy,
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

const adminLinks = [
  { path: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "published", label: "Published", icon: CloudUpload},
  { path: "thesis_article_management", label: "Thesis & Article", icon: FileText },
  { path: "review_assignment", label: "Review Assignment", icon: ClipboardCheck },
  { path: "accepted" , label : "Accepted", icon:CircleCheckBig},
  { path: "rejected", label: "Rejected", icon: CircleX },
  { path: "user_management", label: "User Management", icon: Users },
  { path: "supports", label: "Support", icon: LifeBuoy },
];

const SidebarLink = ({ path, label, Icon, isActive, onClick }) => (
  <Link
    to={`/admin/${path}`}
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

export default function AdminSidebar() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) => location.pathname.includes(path);

  const renderSidebar = (onLinkClick = () => {}) => (
    <div className="w-full min-h-[550px] md:min-h-screen bg-white p-4 font-sans flex flex-col justify-between">
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
            Admin Panel
          </h1>
          <p className="text-xs text-gray-500 mt-1">Manage journal system efficiently</p>
        </div>

        <nav className="space-y-1">
          {adminLinks.map(({ path, label, icon }) => (
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
      {/* Mobile Drawer Button */}
      <div className="md:hidden p-4 border-b flex items-center justify-between bg-white z-50">
        <h2 className="text-lg font-semibold text-blue-700">Admin Panel</h2>
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
