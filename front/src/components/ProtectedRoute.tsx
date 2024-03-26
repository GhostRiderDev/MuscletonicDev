import IUser from "@/interfaces/IUser";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

type props = {
  children: ReactNode;
};

function ProtectedRoute({ children }: props): ReactNode {
  const user = useSelector((state: { user: IUser }) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return user ? children : null;
}

export default ProtectedRoute;
