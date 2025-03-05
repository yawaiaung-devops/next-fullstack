"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useLogin } from "@/lib/services/auth"
import { useRouter } from "next/navigation"
import { toast } from 'sonner'
import Link from "next/link"
import { loginFormData, loginSchema } from "../validations/auth.schema"
import { AxiosResponseHeaders } from "axios"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema)
  });
  const { mutate} = useLogin();
  const router = useRouter();

  const onSubmit: SubmitHandler<loginFormData> = (e) => {
    mutate(e, {
      onSuccess: ()=> {
        router.replace('/home')
      },
      onError:(e: unknown) => {
        toast.error((e as AxiosResponseHeaders).response.data.message)
      }
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  {...register("email")}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                 
                </div>
                <Input
                  id="password"
                  type="password" required
                  placeholder="Enter your password"
                  {...register("password")} />
              </div>
       
                <Button type="submit" className="w-full">
                  Login
                </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
