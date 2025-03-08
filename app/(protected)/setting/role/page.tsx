import { Role } from "@/components/pages/settings/role";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

const RolePage = () => {
  return (
    <div className="pt-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Role />
    </div>
  );
};

export default RolePage;
