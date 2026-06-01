import Sidebar from "../components/Sidebar";

import {
  Car,
  Users,
  ShieldCheck,
  Bell,
  Search,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#eef2f6]">

      {/* SIDEBAR */}

      <Sidebar />

      {/* CONTENT */}

      <main className="flex-1 p-6 md:p-10">

        {/* TOPBAR */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>
            <h1 className="text-4xl font-bold text-[#032b63]">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Bienvenido al sistema institucional
            </p>
          </div>

          {/* SEARCH */}

          <div className="flex items-center gap-4">

            <div className="bg-white rounded-2xl h-14 px-5 flex items-center shadow-md w-full md:w-[320px]">

              <Search className="text-gray-400" />

              <input
                type="text"
                placeholder="Buscar..."
                className="w-full outline-none px-4"
              />

            </div>

            <button className="bg-white w-14 h-14 rounded-2xl shadow-md flex items-center justify-center">
              <Bell className="text-[#032b63]" />
            </button>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

          {/* CARD 1 */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Vehículos Registrados
                </p>

                <h2 className="text-5xl font-bold text-[#032b63] mt-4">
                  124
                </h2>

              </div>

              <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Car size={40} className="text-blue-600" />
              </div>

            </div>

          </div>

          {/* CARD 2 */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Usuarios Activos
                </p>

                <h2 className="text-5xl font-bold text-[#032b63] mt-4">
                  58
                </h2>

              </div>

              <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center">
                <Users size={40} className="text-green-600" />
              </div>

            </div>

          </div>

          {/* CARD 3 */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Accesos Hoy
                </p>

                <h2 className="text-5xl font-bold text-[#032b63] mt-4">
                  210
                </h2>

              </div>

              <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center">
                <ShieldCheck
                  size={40}
                  className="text-orange-600"
                />
              </div>

            </div>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl shadow-xl mt-10 p-8 overflow-auto">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold text-[#032b63]">
              Actividad Reciente
            </h2>

            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl">
              Ver Todo
            </button>

          </div>

          <table className="w-full mt-8">

            <thead>

              <tr className="border-b text-left">

                <th className="pb-4">Usuario</th>
                <th className="pb-4">Vehículo</th>
                <th className="pb-4">Hora</th>
                <th className="pb-4">Estado</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="py-5">Juan Pérez</td>
                <td>Sentra</td>
                <td>09:30 AM</td>

                <td>
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm">
                    Entrada
                  </span>
                </td>

              </tr>

              <tr className="border-b">

                <td className="py-5">María López</td>
                <td>Civic</td>
                <td>10:15 AM</td>

                <td>
                  <span className="bg-red-100 text-red-700 px-4 py-2 rounded-xl text-sm">
                    Salida
                  </span>
                </td>

              </tr>

              <tr>

                <td className="py-5">Carlos Ruiz</td>
                <td>Jetta</td>
                <td>11:00 AM</td>

                <td>
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm">
                    Entrada
                  </span>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}