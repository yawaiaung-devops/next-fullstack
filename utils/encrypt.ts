import bcrypt from "bcryptjs";

const encryptData = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

const isMatched =async (password: string, hash: string):Promise<boolean> =>
  bcrypt.compareSync(password, hash);

export { encryptData, isMatched };
