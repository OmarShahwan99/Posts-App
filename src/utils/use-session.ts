import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function useSession() {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const isAuth = !!token;

  return {
    token,
    user,
    isAuth,
  };
}
