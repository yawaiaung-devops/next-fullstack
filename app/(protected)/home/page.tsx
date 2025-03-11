import { Overview, RecentActivities } from "@/components/pages/home";
import PagebreadCrumb from "@/components/share/breadCrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, School, Users } from "lucide-react";

export default function Page() {
  return (
    <>
      <PagebreadCrumb
        lists={[
          { title: "dashboard", href: "/home" },
          { title: "overview", href: "/home" },
        ]}
      />

      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total User</CardTitle>
              <Users />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">150</div>
              <p className="text-xs text-muted-foreground">
                +3 users from last 24 hour
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Teacher
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+10</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Student
              </CardTitle>
              <GraduationCap />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+140</div>
              <p className="text-xs text-muted-foreground">
                +19% from last year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Class</CardTitle>
              <School />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+10</div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                You made 2 activities this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivities />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Courses</CardTitle>
            </CardHeader>
            <CardContent className="[&_div]:border-0 grid gap-2 text-white">
              <Card className="py-0 bg-purple-500 text-white">
                <CardContent>
                  <div className="flex h-20 items-center gap-4">
                    <div className="w-12 border-r text-center text-2xl font-semibold">
                      01
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h6>UI/UX Beginner Class</h6>
                        <p className="text-sm">10AM - 12 PM</p>
                      </div>

                      <div className="flex justify-between items-center text-gray-100">
                        <p className="text-sm">duration - 3 months</p>
                        <p className="text-sm">20 Chapters </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="py-0 bg-blue-500 text-white">
                <CardContent>
                  <div className="flex h-20 items-center gap-4">
                    <div className="w-12 border-r text-center text-2xl font-semibold">
                      01
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h6>UI/UX Beginner Class</h6>
                        <p>10AM - 12 PM</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <h6>UI/UX Beginner Class</h6>
                        <p>20 Chapters </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
