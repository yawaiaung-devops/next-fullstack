type IRespFormat<T> = {
  message: string;
  data: T;
};

export type IRoleResp = IRespFormat<{
  count: number;
  roles: Array<IRole>;
}>;

export type IRole = {
  id: number;
  roleName: string;
  status: boolean;
  createdAt: Date | string;
};
