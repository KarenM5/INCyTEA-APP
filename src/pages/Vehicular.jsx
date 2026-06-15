import { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Bell,
  Settings,
  User,
  Search,
  Filter,
  Car,
  Truck,
  Bus,
  MapPin,
  Clock,
  Calendar,
  Fuel,
  Activity,
  UserCheck,
  CheckCircle,
  FileText,
  Image as ImageIcon,
  Plus,
  X
} from "lucide-react";

export default function Vehicular() {
  const [activeTab, setActiveTab] = useState("permisos"); // 'permisos' or 'inventario'
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data
  const [vehiculos, setVehiculos] = useState([
    { id: 1, placa: "ABC-1234", modelo: "Toyota Hilux 2023", status: "DISPONIBLE", type: "pickup", fuel: 75, odometro: 12450, proxServicio: 2550, activoId: "INC-V-088", combustibleTipo: "Alto Octanaje", custodio: "Ing. Mario Domínguez", ultimaInsp: "Oct 24, 2024", foto: null },
    { id: 2, placa: "XYZ-9876", modelo: "Ford Ranger 2022", status: "EN USO", type: "pickup", fuel: 40, odometro: 45000, proxServicio: 1000, activoId: "INC-V-045", combustibleTipo: "Diésel", custodio: "Arq. Laura Torres", ultimaInsp: "Sep 10, 2024", foto: null },
    { id: 3, placa: "EVO-001X", modelo: "Nissan Leaf 2024", status: "DISPONIBLE", type: "car", fuel: 100, odometro: 5000, proxServicio: 5000, activoId: "INC-V-102", combustibleTipo: "Eléctrico", custodio: "Lic. Carlos Ruiz", ultimaInsp: "Nov 01, 2024", foto: null },
    { id: 4, placa: "BUS-4420", modelo: "Mercedes Sprinter", status: "EN USO", type: "bus", fuel: 20, odometro: 120000, proxServicio: 500, activoId: "INC-V-012", combustibleTipo: "Diésel", custodio: "Roberto Gómez", ultimaInsp: "Ago 15, 2024", foto: null },
  ]);

  const [solicitudes, setSolicitudes] = useState([
    { id: 101, solicitante: "Juan Pérez", depto: "Sistemas", destino: "Centro de Datos, Sucursal Centro", fecha: "2026-06-04", horaSalida: "10:00", folio: "2026-0089", status: "PENDIENTE" },
    { id: 102, solicitante: "Ana Gómez", depto: "Recursos Humanos", destino: "Feria de Empleo, Expo", fecha: "2026-06-04", horaSalida: "11:30", folio: "2026-0090", status: "PENDIENTE" }
  ]);

  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [selectedSolicitud, setSelectedSolicitud] = useState(solicitudes[0]);
  const [vehiculoToAssign, setVehiculoToAssign] = useState(""); // vehiculo id

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVehiculo, setNewVehiculo] = useState({
    placa: "",
    modelo: "",
    type: "car",
    combustibleTipo: "Gasolina",
    odometro: "",
    custodio: "",
    foto: ""
  });
  
  const handleAddVehicle = (e) => {
    e.preventDefault();
    const newId = vehiculos.length > 0 ? Math.max(...vehiculos.map(v => v.id)) + 1 : 1;
      const { foto, ...rest } = newVehiculo;
      setVehiculos([...vehiculos, {
        ...rest,
        foto: foto || null,
        id: newId,
      status: "DISPONIBLE",
      fuel: 100,
      odometro: parseInt(newVehiculo.odometro) || 0,
      proxServicio: 5000,
      activoId: `INC-V-${newId.toString().padStart(3, '0')}`,
      ultimaInsp: new Date().toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })
    }]);
    setIsAddModalOpen(false);
    setNewVehiculo({ placa: "", modelo: "", type: "car", combustibleTipo: "Gasolina", odometro: "", custodio: "", foto: "" });
  };

  const handleConfirmExit = () => {
    if (!vehiculoToAssign) {
      alert("Por favor seleccione un vehículo para asignar.");
      return;
    }

    // Update vehicle status
    setVehiculos(vehiculos.map(v =>
      v.id === parseInt(vehiculoToAssign) ? { ...v, status: "EN USO", custodio: selectedSolicitud.solicitante } : v
    ));

    // Update solicitud status
    setSolicitudes(solicitudes.map(s =>
      s.id === selectedSolicitud.id ? { ...s, status: "APROBADO" } : s
    ));

    alert(`Salida confirmada. Vehículo asignado a ${selectedSolicitud.solicitante} y marcado como EN USO.`);
    setVehiculoToAssign("");
    setSelectedSolicitud(null);
  };

  const availableVehicles = vehiculos.filter(v => v.status === "DISPONIBLE");

  // Render vehicle icon based on type
  const getIcon = (type) => {
    switch (type) {
      case 'pickup': return <Truck className="text-gray-500" size={24} />;
      case 'bus': return <Bus className="text-gray-500" size={24} />;
      default: return <Car className="text-gray-500" size={24} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#eef2f6]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* HEADER BAR */}
        <header className="h-16 bg-white border-b border-gray-200/60 flex items-center justify-between px-6 sm:px-8 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#032b63] font-bold tracking-widest text-sm">INCYTEA</span>
            <span className="text-gray-300 mx-2">|</span>
            <span className="text-sm font-semibold text-gray-800">
              Control Vehicular
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition cursor-pointer">
              <Settings size={20} />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">Usuario Administrador</p>
                <p className="text-xs text-gray-400">Encargada de Flota</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-100 text-[#032b63] flex items-center justify-center font-bold">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex p-6 gap-6 overflow-hidden h-[calc(100vh-64px)]">

          {/* LEFT SIDEBAR - TABS & LIST */}
          <div className="w-[380px] bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden shrink-0">
            {/* TABS */}
            <div className="flex border-b border-gray-200 bg-gray-50/50">
              <button
                onClick={() => { setActiveTab("permisos"); setSelectedVehiculo(null); }}
                className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 cursor-pointer ${activeTab === "permisos" ? "border-[#032b63] text-[#032b63] bg-white" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
                  }`}
              >
                <FileText size={16} />
                Permisos
                {solicitudes.filter(s => s.status === "PENDIENTE").length > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    {solicitudes.filter(s => s.status === "PENDIENTE").length}
                  </span>
                )}
              </button>
              <button
                onClick={() => { setActiveTab("inventario"); setSelectedSolicitud(null); }}
                className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 cursor-pointer ${activeTab === "inventario" ? "border-[#032b63] text-[#032b63] bg-white" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
                  }`}
              >
                <Car size={16} />
                Inventario
              </button>
            </div>

            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 className="text-sm font-bold text-gray-800">
                {activeTab === "inventario" ? "Inventario Activo" : "Permisos Pendientes"}
              </h2>
              <div className="flex gap-2">
                {activeTab === "inventario" && (
                  <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="text-gray-400 hover:text-[#032b63] transition cursor-pointer"
                    title="Agregar Vehículo"
                  >
                    <Plus size={18} />
                  </button>
                )}
                <button className="text-gray-400 hover:text-gray-600 transition cursor-pointer">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            {activeTab === "inventario" && (
              <div className="px-4 pb-4 bg-white">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Buscar placas o modelo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#032b63] transition"
                  />
                </div>
              </div>
            )}

            {/* LIST AREA */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
              {activeTab === "inventario" ? (
                vehiculos.filter(v => v.placa.toLowerCase().includes(searchTerm.toLowerCase()) || v.modelo.toLowerCase().includes(searchTerm.toLowerCase())).map((vehiculo) => (
                  <div
                    key={vehiculo.id}
                    onClick={() => setSelectedVehiculo(vehiculo)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${selectedVehiculo?.id === vehiculo.id
                        ? "border-[#032b63] bg-blue-50/30"
                        : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        {getIcon(vehiculo.type)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm">{vehiculo.placa}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{vehiculo.modelo}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase ${vehiculo.status === "DISPONIBLE" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }`}>
                        {vehiculo.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                solicitudes.filter(s => s.status === "PENDIENTE").length > 0 ? (
                  solicitudes.filter(s => s.status === "PENDIENTE").map((sol) => (
                    <div
                      key={sol.id}
                      onClick={() => setSelectedSolicitud(sol)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedSolicitud?.id === sol.id
                          ? "border-[#032b63] bg-blue-50/30"
                          : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-gray-400">FOLIO: {sol.folio}</span>
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md uppercase">Nuevo</span>
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm">{sol.solicitante}</h3>
                      <p className="text-xs text-gray-500 mt-1 flex items-start gap-1.5"><MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" /> <span className="line-clamp-2">{sol.destino}</span></p>
                      <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1.5"><Clock size={12} className="text-gray-400" /> Salida: {sol.horaSalida} ({sol.fecha})</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <CheckCircle className="mx-auto mb-2 opacity-50" size={32} />
                    <p className="text-sm font-semibold">No hay permisos pendientes</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT PANEL - DETAILS */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            {activeTab === "inventario" && selectedVehiculo ? (
              // VEHICLE DETAILS VIEW
              <div className="p-8 overflow-y-auto flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#032b63]">{selectedVehiculo.modelo}</h2>
                    <p className="text-sm font-semibold text-gray-500 uppercase mt-1 tracking-wider">ID DE ACTIVO: {selectedVehiculo.activoId}</p>
                  </div>
                  <button className="bg-[#032b63] hover:bg-[#021d45] text-white px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer">
                    <Settings size={16} />
                    Actualizar
                  </button>
                </div>

                <div className="flex flex-col xl:flex-row gap-8">
                  {/* VEHICLE PHOTO */}
                  <div className="xl:w-1/2 relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl aspect-[4/3] flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-200 group">
                    <div className="absolute top-4 left-4 bg-[#032b63] text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-md z-10">
                      {selectedVehiculo.placa}
                    </div>
                    {selectedVehiculo.foto ? (
                      <img src={selectedVehiculo.foto} alt={selectedVehiculo.placa} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-gray-400 flex flex-col items-center">
                        <ImageIcon className="mb-3 opacity-30" size={64} />
                        <p className="font-semibold text-gray-500">Espacio para Foto</p>
                        <p className="text-xs mt-1">({selectedVehiculo.modelo})</p>
                      </div>
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className="xl:w-1/2 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-gray-500 uppercase">Nivel Combustible</span>
                          <span className="text-sm font-bold text-[#032b63]">{selectedVehiculo.fuel}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                          <div className="bg-[#032b63] h-2 rounded-full" style={{ width: `${selectedVehiculo.fuel}%` }}></div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                          <Fuel size={14} className="text-gray-400" />
                          {selectedVehiculo.combustibleTipo}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-gray-500 uppercase">Odómetro</span>
                          <Activity size={14} className="text-gray-400" />
                        </div>
                        <div className="text-2xl font-bold text-gray-800 my-1">
                          {selectedVehiculo.odometro.toLocaleString()} <span className="text-sm font-semibold text-gray-500">KM</span>
                        </div>
                        <div className="text-[10px] text-gray-500 italic mt-1">
                          Próximo servicio en {selectedVehiculo.proxServicio.toLocaleString()} KM
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-auto">
                      <div className="bg-white border border-gray-200 p-4 rounded-xl">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Custodio Actual</span>
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                          <UserCheck size={16} className="text-[#032b63]" />
                          {selectedVehiculo.custodio}
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 p-4 rounded-xl">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Última Inspección</span>
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                          <Calendar size={16} className="text-[#032b63]" />
                          {selectedVehiculo.ultimaInsp}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === "permisos" && selectedSolicitud ? (
              // PERMIT REVIEW & ASSIGNMENT VIEW
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200 bg-gray-50/50 shrink-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-[#032b63]">Asignar Vehículo a Solicitud</h2>
                      <p className="text-sm font-semibold text-gray-500 mt-1">Folio: {selectedSolicitud.folio}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider">Permiso Nuevo</span>
                  </div>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                  {/* Solicitud Details */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8 shadow-sm">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Detalles del Permiso de Salida</h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Solicitante</span>
                        <p className="text-sm font-bold text-gray-800">{selectedSolicitud.solicitante}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Departamento</span>
                        <p className="text-sm font-semibold text-gray-700">{selectedSolicitud.depto}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Destino / Asunto</span>
                        <p className="text-sm font-semibold text-gray-700 bg-gray-50 p-3 rounded-lg mt-1 border border-gray-100">{selectedSolicitud.destino}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Fecha programada</span>
                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mt-1"><Calendar size={14} className="text-[#032b63]" /> {selectedSolicitud.fecha}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Hora de salida</span>
                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mt-1"><Clock size={14} className="text-[#032b63]" /> {selectedSolicitud.horaSalida}</p>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Assignment */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Car size={18} className="text-[#032b63]" />
                      Seleccionar Vehículo Disponible
                    </h3>

                    {availableVehicles.length === 0 ? (
                      <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold border border-red-100 flex items-center gap-2">
                        No hay vehículos disponibles en el inventario.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availableVehicles.map(vehiculo => (
                          <div
                            key={vehiculo.id}
                            onClick={() => setVehiculoToAssign(vehiculo.id.toString())}
                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${vehiculoToAssign === vehiculo.id.toString()
                                ? "border-[#032b63] bg-blue-50/50 shadow-md"
                                : "border-gray-200 hover:border-blue-300"
                              }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-gray-800">{vehiculo.placa}</span>
                              {vehiculoToAssign === vehiculo.id.toString() && (
                                <CheckCircle size={18} className="text-[#032b63]" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mb-3">{vehiculo.modelo}</p>
                            <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase bg-white p-2 rounded-lg border border-gray-100">
                              <span className="flex items-center gap-1"><Fuel size={12} className="text-gray-400" /> {vehiculo.fuel}%</span>
                              <span className="flex items-center gap-1"><Activity size={12} className="text-gray-400" /> {vehiculo.combustibleTipo}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-gray-200 bg-white flex justify-end shrink-0">
                  <button
                    onClick={handleConfirmExit}
                    disabled={!vehiculoToAssign}
                    className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 ${vehiculoToAssign
                        ? "bg-[#032b63] hover:bg-[#021d45] text-white cursor-pointer active:scale-95"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    <CheckCircle size={18} />
                    Confirmar Salida y Marcar Vehículo
                  </button>
                </div>
              </div>
            ) : (
              // EMPTY STATE
              <div className="h-full flex flex-col items-center justify-center text-gray-400 p-10 text-center">
                <Car size={64} className="mb-4 opacity-20" />
                <h3 className="text-lg font-bold text-gray-600">Ningún elemento seleccionado</h3>
                <p className="text-sm mt-2 max-w-sm">Seleccione un permiso para asignar un vehículo, o seleccione un vehículo del inventario para ver sus detalles.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ADD VEHICLE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-[#032b63] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Car size={18} />
                Agregar Nuevo Vehículo
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-blue-100 hover:text-white transition cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddVehicle} className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Placa</label>
                <input required type="text" value={newVehiculo.placa} onChange={e => setNewVehiculo({...newVehiculo, placa: e.target.value})} className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-[#032b63] outline-none" placeholder="Ej. AAA-1111" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Modelo y Año</label>
                <input required type="text" value={newVehiculo.modelo} onChange={e => setNewVehiculo({...newVehiculo, modelo: e.target.value})} className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-[#032b63] outline-none" placeholder="Ej. Nissan Sentra 2024" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tipo</label>
                  <select value={newVehiculo.type} onChange={e => setNewVehiculo({...newVehiculo, type: e.target.value})} className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-[#032b63] outline-none">
                    <option value="car">Automóvil</option>
                    <option value="pickup">Camioneta</option>
                    <option value="bus">Autobús / Van</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Combustible</label>
                  <select value={newVehiculo.combustibleTipo} onChange={e => setNewVehiculo({...newVehiculo, combustibleTipo: e.target.value})} className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-[#032b63] outline-none">
                    <option value="Gasolina">Gasolina</option>
                    <option value="Alto Octanaje">Alto Octanaje</option>
                    <option value="Diésel">Diésel</option>
                    <option value="Eléctrico">Eléctrico</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Odómetro Inicial</label>
                  <input required type="number" value={newVehiculo.odometro} onChange={e => setNewVehiculo({...newVehiculo, odometro: e.target.value})} className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-[#032b63] outline-none" placeholder="Ej. 1000" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Custodio</label>
                  <input required type="text" value={newVehiculo.custodio} onChange={e => setNewVehiculo({...newVehiculo, custodio: e.target.value})} className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-[#032b63] outline-none" placeholder="Nombre..." />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Foto del Vehículo</label>
                <div className="mt-1 flex items-center gap-4">
                  <label className="flex-1 flex items-center gap-2 border border-dashed border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-500 hover:border-[#032b63] hover:text-[#032b63] cursor-pointer transition">
                    <ImageIcon size={18} />
                    {newVehiculo.foto ? "Cambiar imagen..." : "Seleccionar imagen..."}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => setNewVehiculo({...newVehiculo, foto: ev.target.result});
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  {newVehiculo.foto && (
                    <div className="relative shrink-0">
                      <img src={newVehiculo.foto} alt="Preview" className="w-16 h-16 object-cover rounded-xl border border-gray-200" />
                      <button type="button" onClick={() => setNewVehiculo({...newVehiculo, foto: ""})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow cursor-pointer hover:bg-red-600" title="Quitar foto">
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-500 font-bold text-xs hover:bg-gray-100 rounded-xl transition cursor-pointer">Cancelar</button>
                <button type="submit" className="px-5 py-2 bg-[#032b63] text-white font-bold text-xs hover:bg-[#021d45] rounded-xl transition cursor-pointer">Registrar Vehículo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}