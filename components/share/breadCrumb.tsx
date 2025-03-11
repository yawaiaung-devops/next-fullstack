import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { cn } from "@/lib/utils";

const PagebreadCrumb = ({
  lists,
}: {
  lists: Array<{
    title: string;
    href: string;
  }>;
}) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {lists.map((list, idx) => (
              <div
                key={list.title}
                className="flex items-center gap-4 capitalize"
              >
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={list.href}>{list.title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  className={cn(
                    "hidden md:block",
                    idx === lists.length - 1 && "opacity-0"
                  )}
                />
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default PagebreadCrumb;
