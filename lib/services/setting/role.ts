import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { IRoleResp } from "@/types";
import { appAxios } from "../axios";

export const useGetRole = (): UseQueryResult<IRoleResp> =>
  useQuery({
    queryKey: ["role"],
    queryFn: () => fetcher("/setting/role"),
  });

export const useToggleStatus = () =>
  useMutation({
    mutationFn: (id: number) => appAxios.patch(`/setting/role/${id}`),
  });

export const useCreateRole = () =>
  useMutation({
    mutationFn: (data: { roleName: string }) =>
      appAxios.post("/setting/role", data),
  });

export const useDeleteRole = () =>
  useMutation({
    mutationFn: (id: number) => appAxios.delete(`/setting/role/${id}`),
  });
