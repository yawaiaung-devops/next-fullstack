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
import { useRegister } from "@/lib/services/auth"
import { useRouter } from "next/navigation"
import { toast } from 'sonner'
import Link from "next/link"
import { createUserFormData, createUserSchema } from "../validations/auth.schema"
import { AxiosResponseHeaders } from "axios"

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { register, handleSubmit, formState: { errors } } = useForm<createUserFormData>({
        resolver: zodResolver(createUserSchema)
    });
    const { mutate } = useRegister();
    const router = useRouter();

    const onSubmit: SubmitHandler<createUserFormData> = (e) => {
        mutate({ ...e, createdBy: "admin" }, {
            onSuccess: () => {
                router.replace('/home')
            },
            onError: (e: unknown) => {
                toast.error((e as AxiosResponseHeaders).response.data.message)
            }
        })
    }


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up account</CardTitle>
                    <CardDescription>
                        Enter your email below to singin to account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter username"
                                    required
                                    {...register("userName")}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    {...register("email")}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>

                                <div>
                                    <Input
                                        id="password"
                                        type="password" required
                                        placeholder="Enter Confirm Password"
                                        {...register("password")} />

                                    <p className="text-sm text-red-500">{errors.password?.message}</p>
                                </div>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password">Confirm Password</Label>

                                <div>
                                    <Input
                                        id="password"
                                        type="password" required
                                        placeholder="Enter Confirm Password"
                                        {...register("confirmPassword")} />

                                    <p className="text-sm text-red-500">{errors.confirmPassword?.message}</p>
                                </div>
                            </div>

                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            have an account?{" "}
                            <Link href="/login" className="underline underline-offset-4">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
