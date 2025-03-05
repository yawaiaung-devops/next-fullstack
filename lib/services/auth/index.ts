import { QueryClient, useMutation } from '@tanstack/react-query'
import { appAxios } from '../axios'
import { Prisma } from '@prisma/client';

const queryClient = new QueryClient();

export const useLogin = () => useMutation({
    mutationFn: (value:{
        email:string,
        password:string
    }) => appAxios.post("/api/auth/login",value)
}, queryClient)


export const useRegister= () => useMutation({
    mutationFn: (value:Prisma.UserCreateInput) => appAxios.post("/api/auth",value)
}, queryClient)