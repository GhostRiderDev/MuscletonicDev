import Header from "@/components/Header";
import { Routes, Route } from "react-router";
import { GrUserSettings } from "react-icons/gr";
import { useSelector } from "react-redux";
import IUser from "@/interfaces/IUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MusclesUser from "@/components/MusclesUser";
import RoutineForm from "@/components/RoutineForm";

const Dashboard = () => {
  const user = useSelector((state: { user: IUser }) => state.user);
  return (
    <div className="flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<MusclesUser />} />
        <Route path="routines/add" element={<RoutineForm />} />
      </Routes>
      {user && (
        <div className="fixed bottom-0 left-0 rounded-md bg-slate-900 ml-4 mb-4 p-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <GrUserSettings size={40} className="text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
