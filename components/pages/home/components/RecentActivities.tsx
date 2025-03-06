import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

  export function RecentActivities() {
    return (
      <div className="divide-y-[1px] [&>div]:py-3">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Trip to Shwedagon Pagoda</p>
            <p className="text-sm text-muted-foreground">
              class 1 to 4
            </p>
          </div>
          <div className="ml-auto">
            <p className="text-muted-foreground leading-none">Total Cost</p>
            <p className="text-sm text-muted-foreground">+$1,999.00</p>
          </div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Trip to Shwedagon Pagoda</p>
            <p className="text-sm text-muted-foreground">
              class 1 to 4
            </p>
          </div>
          <div className="ml-auto">
            <p className="text-muted-foreground leading-none">Total Cost</p>
            <p className="text-sm text-muted-foreground">+$1,999.00</p>
          </div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Trip to Shwedagon Pagoda</p>
            <p className="text-sm text-muted-foreground">
              class 1 to 4
            </p>
          </div>
          <div className="ml-auto">
            <p className="text-muted-foreground leading-none">Total Cost</p>
            <p className="text-sm text-muted-foreground">+$1,999.00</p>
          </div>
        </div>
      
      </div>
    )
  }