import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import PagebreadCrumb from "@/components/share/breadCrumb";

const CoursesDetails = () => {
  return (
    <div className="bg-white rounded">
      <PagebreadCrumb
        lists={[
          { title: "Courses", href: "/courses" },
          { title: "Course details", href: "#" },
        ]}
      />
      <Link href="/courses">
        <Button variant="ghost">
          <ArrowLeft />
          Back
        </Button>
      </Link>
    </div>
  );
};

export default CoursesDetails;
