import {
  ShieldCheck,
  Car,
  Building2,
  ClipboardList,
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("direccion");
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    {
      id: "admin",
      title: "Administrador",
      icon: <ShieldCheck size={22} />,
    },
    {
      id: "direccion",
      title: "Dirección/\nSecretaría",
      icon: <ClipboardList size={22} />,
    },
    {
      id: "vehicular",
      title: "Control Vehicular",
      icon: <Car size={22} />,
    },
    {
      id: "caseta",
      title: "Caseta",
      icon: <Building2 size={22} />,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(15px, -10px) rotate(2deg); }
          66% { transform: translate(-10px, -20px) rotate(-1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-shimmer {
          background-size: 200% 200%;
          animation: shimmer 8s ease infinite;
        }
        .animate-drift {
          animation: drift 12s ease-in-out infinite;
        }
      `}</style>

      {/* Animated background */}
      <div className="absolute inset-0 animate-shimmer" style={{ background: "linear-gradient(135deg, rgba(3,43,99,0.02) 0%, rgba(255,255,255,0) 30%, rgba(3,43,99,0.03) 60%, rgba(255,255,255,0) 100%)" }} />
      <div className="absolute w-28 h-28 rounded-full bg-emerald-400/10 animate-drift" style={{ top: "5%", left: "5%", animationDelay: "0s", animationDuration: "15s" }} />
      <div className="absolute w-16 h-16 rounded-full bg-sky-400/15 animate-drift" style={{ top: "10%", right: "15%", animationDelay: "-3s", animationDuration: "13s" }} />
      <div className="absolute w-12 h-12 rounded-full bg-pink-400/15 animate-drift" style={{ top: "30%", left: "20%", animationDelay: "-6s", animationDuration: "11s" }} />
      <div className="absolute w-36 h-36 rounded-full bg-amber-400/8 animate-drift" style={{ top: "40%", right: "8%", animationDelay: "-1s", animationDuration: "18s" }} />
      <div className="absolute w-20 h-20 rounded-full bg-emerald-400/12 animate-drift" style={{ top: "55%", left: "8%", animationDelay: "-5s", animationDuration: "14s" }} />
      <div className="absolute w-10 h-10 rounded-full bg-pink-400/12 animate-drift" style={{ top: "65%", right: "20%", animationDelay: "-2s", animationDuration: "10s" }} />
      <div className="absolute w-24 h-24 rounded-full bg-sky-400/10 animate-drift" style={{ top: "75%", left: "25%", animationDelay: "-7s", animationDuration: "16s" }} />
      <div className="absolute w-14 h-14 rounded-full bg-amber-400/12 animate-drift" style={{ top: "85%", right: "10%", animationDelay: "-4s", animationDuration: "12s" }} />
      <div className="absolute w-8 h-8 rounded-full bg-sky-400/20 animate-drift" style={{ top: "50%", left: "40%", animationDelay: "-1.5s", animationDuration: "9s" }} />

      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-100/80 p-6 sm:p-8 flex flex-col gap-6">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-[#032b63] p-4 rounded-2xl shadow-md text-white inline-flex items-center justify-center">
            <Building2 className="text-white" size={32} />
          </div>

          <h1 className="text-3xl font-extrabold text-[#032b63] tracking-tight mt-4">
            INCyTEA
          </h1>

          <p className="text-sm text-gray-500 font-medium mt-1">
            Sistema de Gestión Institucional
          </p>
        </div>

        {/* ROLES */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 tracking-widest text-center uppercase mb-3.5">
            Seleccione su Rol
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`relative overflow-hidden border rounded-2xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#032b63]/10
                ${
                  selectedRole === role.id
                    ? "border-[#032b63] bg-blue-50/40 shadow-sm ring-1 ring-[#032b63]/30"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50/50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200
                  ${
                    selectedRole === role.id
                      ? "bg-[#032b63] text-white shadow-md shadow-blue-900/10"
                      : "bg-gray-100 text-[#032b63]"
                  }`}
                >
                  {role.icon}
                </div>

                <h3 className="text-xs font-bold text-gray-700 leading-tight mt-2 whitespace-pre-line">
                  {role.title}
                </h3>
              </button>
            ))}
          </div>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-4 mt-2">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Usuario
            </label>

            <div className="mt-1.5 relative flex items-center border border-gray-200 rounded-xl h-12 px-4 bg-gray-50/50 focus-within:border-[#032b63] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#032b63]/10 transition-all duration-200">
              <User className="text-gray-400 mr-2.5 flex-shrink-0" size={18} />

              <input
                type="text"
                placeholder="Nombre de usuario"
                className="w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Contraseña
            </label>

            <div className="mt-1.5 relative flex items-center border border-gray-200 rounded-xl h-12 px-4 bg-gray-50/50 focus-within:border-[#032b63] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#032b63]/10 transition-all duration-200">
              <Lock className="text-gray-400 mr-2.5 flex-shrink-0" size={18} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-base text-gray-800 placeholder-gray-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none flex-shrink-0 ml-2.5 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-1 flex-wrap gap-2 text-xs sm:text-sm">
            <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#032b63] focus:ring-[#032b63] cursor-pointer"
              />
              Recordarme
            </label>

            <button className="text-[#032b63] font-semibold hover:underline transition-colors focus:outline-none cursor-pointer">
              ¿Olvidó su contraseña?
            </button>
          </div>

          <Link to="/dashboard" className="w-full">
            <button
              onClick={() => {
                localStorage.setItem("role", selectedRole);
              }}
              className="w-full h-12 bg-[#032b63] hover:bg-[#021d45] active:scale-[0.99] transition-all rounded-xl text-white font-bold text-base mt-4 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
            >
              Ingresar al Sistema
              <LogIn size={18} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}