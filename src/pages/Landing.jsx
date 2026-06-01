import { Link } from "react-router-dom";

import {
  ShieldCheck,
  LogIn,
  ChevronRight,
  Car,
  Users,
 Building2,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#eef2f6]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-linear-to-r from-[#032b63] to-[#0d4ea6] text-white">

        {/* BACKGROUND */}

        <div className="absolute inset-0 opacity-10">

          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />

        </div>

        {/* CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-3 rounded-2xl mb-8">

                <ShieldCheck size={18} />

                <span className="text-sm tracking-wide">
                  SISTEMA OFICIAL DE GESTIÓN
                </span>

              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">

                Gestión
                <br />

                Institucional
                <br />

                <span className="text-blue-300">
                  INCyTEA App
                </span>

              </h1>

              <p className="mt-8 text-lg text-blue-100 leading-relaxed max-w-xl">

                Plataforma centralizada para la administración
                de personal, control vehicular y acceso
                institucional con herramientas modernas
                y seguras.

              </p>

              {/* BUTTONS */}

              <div className="flex flex-wrap gap-5 mt-10">

                <Link to="/login">

                  <button className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 shadow-xl">

                    INGRESAR AL SISTEMA

                    <LogIn />

                  </button>

                </Link>

                <button className="border border-white/30 hover:bg-white/10 transition px-8 py-4 rounded-2xl font-semibold flex items-center gap-2">

                  Conocer Más

                  <ChevronRight />

                </button>

              </div>

            </div>

            {/* RIGHT */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* CARD */}

              <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8">

                <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center">

                  <Car size={32} />

                </div>

                <h2 className="text-2xl font-bold mt-6">
                  Vehicular
                </h2>

                <p className="text-blue-100 mt-3">
                  Gestión y monitoreo de vehículos
                  institucionales.
                </p>

              </div>

              {/* CARD */}

              <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8">

                <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center">

                  <Users size={32} />

                </div>

                <h2 className="text-2xl font-bold mt-6">
                  Usuarios
                </h2>

                <p className="text-blue-100 mt-3">
                  Administración de personal y roles
                  del sistema.
                </p>

              </div>

              {/* CARD */}

              <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:col-span-2">

                <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center">

                  <Building2 size={32} />

                </div>

                <h2 className="text-2xl font-bold mt-6">
                  Control Institucional
                </h2>

                <p className="text-blue-100 mt-3">
                  Sistema moderno diseñado para mejorar
                  la seguridad, accesos y administración
                  institucional en tiempo real.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* INFO SECTION */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          <h2 className="text-5xl font-bold text-[#032b63]">
            ¿Qué ofrece INCyTEA?
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
            Plataforma desarrollada para optimizar
            procesos administrativos y operativos.
          </p>

        </div>

        {/* FEATURES */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <h3 className="text-2xl font-bold text-[#032b63]">
              Seguridad
            </h3>

            <p className="text-gray-500 mt-4">
              Acceso controlado y gestión institucional
              moderna.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <h3 className="text-2xl font-bold text-[#032b63]">
              Administración
            </h3>

            <p className="text-gray-500 mt-4">
              Gestión de usuarios, permisos y recursos.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <h3 className="text-2xl font-bold text-[#032b63]">
              Monitoreo
            </h3>

            <p className="text-gray-500 mt-4">
              Visualización en tiempo real de actividad
              institucional.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}