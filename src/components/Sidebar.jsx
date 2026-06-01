import {
  LayoutDashboard,
  Car,
  Shield,
  Users,
  LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";

import { roles } from "../data/roles";

export default function Sidebar() {

  const role = localStorage.getItem("role");

  const permissions = roles[role] || [];

  return (
    <aside className="w-72 bg-[#032b63] text-white min-h-screen p-8 hidden lg:flex flex-col">

      {/* LOGO */}

      <div>

        <h1 className="text-4xl font-bold">
          INCyTEA
        </h1>

        <p className="text-blue-200 mt-2">
          Gestión Institucional
        </p>

      </div>

      {/* MENU */}

      <nav className="mt-12 space-y-4 flex-1">

        {/* DASHBOARD */}

        <Link to="/dashboard">

          <div className="flex items-center gap-4 bg-blue-700 p-4 rounded-2xl">

            <LayoutDashboard />

            <span>Dashboard</span>

          </div>

        </Link>

        {/* VEHICULAR */}

        {
          permissions.includes("vehicular") && (

            <Link to="/vehicular">

              <div className="flex items-center gap-4 hover:bg-blue-800 p-4 rounded-2xl transition">

                <Car />

                <span>Vehicular</span>

              </div>

            </Link>

          )
        }

        {/* CASETA */}

        {
          permissions.includes("caseta") && (

            <Link to="/caseta">

              <div className="flex items-center gap-4 hover:bg-blue-800 p-4 rounded-2xl transition">

                <Shield />

                <span>Caseta</span>

              </div>

            </Link>

          )
        }

        {/* ADMIN */}

        {
          permissions.includes("admin") && (

            <Link to="/admin">

              <div className="flex items-center gap-4 hover:bg-blue-800 p-4 rounded-2xl transition">

                <Users />

                <span>Administración</span>

              </div>

            </Link>

          )
        }

      </nav>

      {/* LOGOUT */}

      <button
        onClick={() => {
          localStorage.removeItem("role");
        }}
        className="flex items-center gap-4 bg-red-500 hover:bg-red-600 transition p-4 rounded-2xl"
      >
        <LogOut />

        Cerrar Sesión
      </button>

    </aside>
  );
}