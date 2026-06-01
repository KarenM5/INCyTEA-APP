import {
  ShieldCheck,
  Car,
  Building2,
  ClipboardList,
  User,
  Lock,
  Eye,
  LogIn,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {

  const [selectedRole, setSelectedRole] =
    useState("direccion");

  const roles = [
    {
      id: "admin",
      title: "Administrador",
      icon: <ShieldCheck size={30} />,
    },
    {
      id: "direccion",
      title: "Dirección/\nSecretaría",
      icon: <ClipboardList size={30} />,
    },
    {
      id: "vehicular",
      title: "Control Vehicular",
      icon: <Car size={30} />,
    },
    {
      id: "caseta",
      title: "Caseta",
      icon: <Building2 size={30} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#eef2f6] py-10 px-4">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        {/* HEADER */}

        <div className="flex flex-col items-center">

          <div className="bg-[#032b63] p-5 rounded-2xl shadow-lg">
            <Building2 className="text-white" size={40} />
          </div>

          <h1 className="text-5xl font-bold text-[#032b63] mt-5">
            INCyTEA
          </h1>

          <p className="text-gray-500 mt-2">
            Sistema de Gestión Institucional
          </p>

        </div>

        {/* ROLES */}

        <div className="mt-12">

          <h2 className="text-gray-500 font-semibold mb-5">
            SELECCIONE SU ROL
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {roles.map((role) => (

              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`border-2 rounded-2xl p-8 min-h-47.5 transition-all duration-300
                ${
                  selectedRole === role.id
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >

                <div
                  className={`w-20 h-20 rounded-2xl mx-auto flex items-center justify-center transition-all
                  ${
                    selectedRole === role.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-blue-600"
                  }`}
                >
                  {role.icon}
                </div>

                <h3 className="text-lg font-semibold mt-5 whitespace-pre-line">
                  {role.title}
                </h3>

              </button>

            ))}

          </div>

        </div>

        {/* FORM */}

        <div className="max-w-3xl mx-auto mt-14 border border-gray-200 rounded-3xl p-8">

          <div>

            <label className="text-gray-600 font-medium">
              Usuario
            </label>

            <div className="mt-3 border border-gray-300 rounded-xl h-16 flex items-center px-4">

              <User className="text-gray-400" />

              <input
                type="text"
                placeholder="Nombre de usuario"
                className="w-full outline-none px-4 text-lg"
              />

            </div>

          </div>

          <div className="mt-6">

            <label className="text-gray-600 font-medium">
              Contraseña
            </label>

            <div className="mt-3 border border-gray-300 rounded-xl h-16 flex items-center px-4">

              <Lock className="text-gray-400" />

              <input
                type="password"
                placeholder="••••••••"
                className="w-full outline-none px-4 text-lg"
              />

              <Eye className="text-gray-400" />

            </div>

          </div>

          <div className="flex justify-between items-center mt-6 flex-wrap gap-4">

            <label className="flex items-center gap-2 text-gray-500">
              <input type="checkbox" />
              Recordarme
            </label>

            <button className="text-blue-700 hover:underline">
              ¿Olvidó su contraseña?
            </button>

          </div>

          <Link to="/dashboard">

            <button
              onClick={() => {
                localStorage.setItem("role", selectedRole);
              }}
              className="w-full h-16 bg-[#032b63] hover:bg-[#021d45] transition rounded-2xl text-white font-bold text-xl mt-8 flex items-center justify-center gap-3 shadow-lg"
            >
              Ingresar al Sistema
              <LogIn />
            </button>

          </Link>

        </div>

      </div>

    </div>
  );
}