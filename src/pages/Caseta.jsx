import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { 
  ArrowRightLeft, 
  Clock, 
  CarFront, 
  Search, 
  CheckCircle,
  AlertTriangle,
  History,
  LogOut,
  LogIn,
  ChevronRight,
  FileSearch
} from "lucide-react";

export default function Caseta() {
  const [activePasses, setActivePasses] = useState([
    { id: "8841", vehicle: "CAMIÓN-09 (HILUX)", plates: "XPZ-992-K", outTime: "06:15 AM", auth: "AUTH-INST-0041", initialKm: 44210, fuel: "75%" },
    { id: "8840", vehicle: "VAN-02 (TRANSIT)", plates: "ABC-123-D", outTime: "09:30 AM", auth: "AUTH-INST-0042", initialKm: 120500, fuel: "100%" },
  ]);

  const [history, setHistory] = useState([
    { id: "8839", vehicle: "SEDÁN-01 (AVEO)", plates: "XYZ-123-A", outTime: "07:00 AM", inTime: "11:30 AM", initialKm: 55000, finalKm: 55030, status: "Completado" },
    { id: "8838", vehicle: "PICKUP-05 (RANGER)", plates: "LMN-456-B", outTime: "08:15 AM", inTime: "01:45 PM", initialKm: 88200, finalKm: 88255, status: "Completado" }
  ]);

  // Mock pending approved passes
  const [pendingPasses] = useState([
    { auth: "AUTH-0050", vehicle: "CAMIÓN-12 (F350)", plates: "TYU-881-M", initialKm: 152000, fuel: "100%" },
    { auth: "AUTH-0051", vehicle: "SEDÁN-05 (VERSA)", plates: "HJK-992-L", initialKm: 34500, fuel: "50%" },
    { auth: "AUTH-0052", vehicle: "PICKUP-02 (NP300)", plates: "BNM-112-X", initialKm: 89000, fuel: "75%" },
  ]);

  const [selectedPass, setSelectedPass] = useState(null);
  const [returnKm, setReturnKm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const [newDeparture, setNewDeparture] = useState({
    vehicle: "",
    plates: "",
    auth: "",
    initialKm: "",
    fuel: "100%",
    found: false
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectPass = (pass) => {
    setSelectedPass(pass);
    setReturnKm("");
  };

  const handleRegisterReturn = () => {
    if (!selectedPass) return;
    if (!returnKm) {
      alert("Por favor ingrese el kilometraje final.");
      return;
    }
    
    const newHistoryEntry = {
      ...selectedPass,
      inTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      finalKm: returnKm,
      status: "Completado"
    };

    setHistory([newHistoryEntry, ...history]);
    setActivePasses(activePasses.filter(p => p.id !== selectedPass.id));
    setSelectedPass(null);
    setReturnKm("");
  };

  const handleSearchAuth = () => {
    if (!newDeparture.auth.trim()) return;
    const found = pendingPasses.find(p => p.auth.toUpperCase() === newDeparture.auth.toUpperCase());
    
    if (found) {
      setNewDeparture({
        ...newDeparture,
        auth: found.auth,
        vehicle: found.vehicle,
        plates: found.plates,
        initialKm: found.initialKm,
        fuel: found.fuel,
        found: true
      });
    } else {
      alert("Permiso no encontrado o ya fue utilizado. Pruebe con AUTH-0050, AUTH-0051, o AUTH-0052.");
      setNewDeparture({
        ...newDeparture,
        vehicle: "",
        plates: "",
        initialKm: "",
        fuel: "100%",
        found: false
      });
    }
  };

  const handleRegisterDeparture = () => {
    if (!newDeparture.found) {
      alert("Por favor busque un folio de permiso válido primero.");
      return;
    }
    const newPass = {
      id: Math.floor(Math.random() * 10000).toString(),
      vehicle: newDeparture.vehicle,
      plates: newDeparture.plates,
      auth: newDeparture.auth,
      initialKm: newDeparture.initialKm,
      fuel: newDeparture.fuel,
      outTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setActivePasses([newPass, ...activePasses]);
    setNewDeparture({ vehicle: "", plates: "", auth: "", initialKm: "", fuel: "100%", found: false });
  };

  return (
    <div className="flex min-h-screen bg-[#eef2f6]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#032b63] tracking-tight">Centro de Control de Caseta</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Buscar vehículo o folio..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Movimientos Activos</p>
              <h2 className="text-4xl font-bold text-[#032b63]">{activePasses.length * 2}</h2>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <ArrowRightLeft className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center border-l-4 border-l-red-500">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Retornos Pendientes</p>
              <h2 className="text-4xl font-bold text-red-600">{activePasses.length}</h2>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-[#032b63] p-6 rounded-xl shadow-sm border border-[#032b63] flex justify-between items-center text-white">
            <div>
              <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">Hora Actual</p>
              <h2 className="text-4xl font-bold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <Clock className="w-8 h-8 text-blue-200" />
            </div>
          </div>
        </div>

        {/* Middle Section: Form & Active List */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          
          {/* Left: Entry/Exit Form */}
          <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h2 className="text-lg font-bold text-[#032b63] uppercase tracking-wide">Registro de Entrada/Salida</h2>
                {selectedPass && <p className="text-sm text-gray-500 mt-1">RETORNO • FOLIO: GATE-2023-{selectedPass.id}</p>}
                {!selectedPass && <p className="text-sm text-blue-600 font-medium mt-1">NUEVA SALIDA</p>}
              </div>
              <div className="text-right">
                <span className={`font-bold ${selectedPass ? 'text-green-600' : 'text-blue-600'}`}>
                  {selectedPass ? 'PROCESANDO RETORNO' : 'PROCESANDO SALIDA'}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1">
              {/* Search Auth (Only for new departure) */}
              {!selectedPass && (
                <div className="mb-6 bg-blue-50/50 p-5 rounded-xl border border-blue-100 flex items-end gap-4 shadow-sm">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-[#032b63] uppercase mb-2">Pase de Autorización (Folio del Permiso)</label>
                    <div className="relative">
                      <FileSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                      <input 
                        type="text" 
                        value={newDeparture.auth}
                        onChange={(e) => setNewDeparture({...newDeparture, auth: e.target.value.toUpperCase()})}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearchAuth()}
                        className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-gray-800"
                        placeholder="Ej. AUTH-0050"
                      />
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2 ml-1">Mock test folios: AUTH-0050, AUTH-0051, AUTH-0052</p>
                  </div>
                  <button 
                    onClick={handleSearchAuth}
                    className="bg-[#032b63] hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md h-[50px] flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" /> Buscar Permiso
                  </button>
                </div>
              )}

              {/* Vehicle & Auth Info */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Vehículo Asignado</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={selectedPass ? selectedPass.vehicle : (newDeparture.vehicle || "---")}
                      readOnly
                      className="w-full p-3 pl-10 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none cursor-not-allowed font-medium"
                    />
                    <CarFront className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Placa / Identificador</label>
                  <input 
                    type="text" 
                    value={selectedPass ? selectedPass.plates : (newDeparture.plates || "---")}
                    readOnly
                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none cursor-not-allowed font-medium"
                  />
                </div>
              </div>

              {/* Departure Data */}
              <div className={`border rounded-lg p-5 mb-6 relative transition-colors ${!selectedPass ? 'border-blue-200 bg-blue-50/20' : 'border-gray-200 opacity-60'}`}>
                <div className={`absolute -top-3 left-4 bg-white px-2 text-xs font-bold uppercase ${!selectedPass ? 'text-blue-600' : 'text-gray-400'}`}>Datos de Salida Generados</div>
                <div className="grid grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Hora de Salida</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={selectedPass ? selectedPass.outTime : (newDeparture.found ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "---")}
                        readOnly
                        className="w-full p-2 pl-3 pr-8 border border-gray-200 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                      />
                      <Clock className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Kilometraje Inicial</label>
                    <input 
                      type="text" 
                      value={selectedPass ? selectedPass.initialKm : (newDeparture.initialKm || "---")}
                      readOnly
                      className="w-full p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Nivel de Combustible</label>
                    <input 
                      type="text" 
                      value={selectedPass ? selectedPass.fuel : (newDeparture.fuel || "---")}
                      readOnly
                      className="w-full p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed font-medium"
                    />
                  </div>
                </div>
                {!selectedPass && (
                  <div className="mt-5 pt-4 border-t border-blue-100 flex justify-end">
                    <button 
                      onClick={handleRegisterDeparture}
                      disabled={!newDeparture.found}
                      className={`font-medium py-2.5 px-8 rounded-lg transition-all flex items-center gap-2 shadow-sm ${newDeparture.found ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                      <LogOut className="w-5 h-5" /> Registrar Salida Oficial
                    </button>
                  </div>
                )}
              </div>

              {/* Return Data (Only active if a pass is selected) */}
              <div className={`border ${selectedPass ? 'border-green-300 bg-green-50/50 shadow-sm' : 'border-gray-200 opacity-50'} rounded-lg p-5 relative transition-all`}>
                <div className={`absolute -top-3 left-4 bg-white px-2 text-xs font-bold uppercase transition-colors ${selectedPass ? 'text-green-700' : 'text-gray-400'}`}>Datos de Retorno (Requeridos)</div>
                <div className="grid grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Hora de Retorno</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={selectedPass ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}
                        readOnly
                        className="w-full p-2 pl-3 pr-8 border border-gray-200 rounded-md bg-white text-gray-600 cursor-not-allowed"
                      />
                      <Clock className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Kilometraje Final *</label>
                    <input 
                      type="number" 
                      value={returnKm}
                      onChange={(e) => setReturnKm(e.target.value)}
                      disabled={!selectedPass}
                      placeholder={selectedPass ? `Mayor a ${selectedPass.initialKm}` : ""}
                      className={`w-full p-2 border-2 rounded-md bg-white focus:outline-none transition-colors ${selectedPass ? 'border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20' : 'border-gray-200'}`}
                    />
                  </div>
                  <div>
                    <button 
                      onClick={handleRegisterReturn}
                      disabled={!selectedPass || !returnKm}
                      className={`w-full py-2.5 px-4 rounded-md font-bold transition-all flex items-center justify-center gap-2 ${selectedPass && returnKm ? 'bg-green-600 hover:bg-green-700 text-white shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                      <LogIn className="w-5 h-5" /> Confirmar Retorno
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Active Passes & CCTV */}
          <div className="flex flex-col gap-6">
            
            {/* Active Passes List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-sm font-bold text-gray-700 uppercase">Actualmente Fuera de Sitio</h3>
                <span className="bg-[#032b63] text-white text-xs font-bold px-2 py-1 rounded-full">{activePasses.length} Unidades</span>
              </div>
              <div className="p-3 space-y-2 flex-1 overflow-y-auto min-h-[300px]">
                {activePasses.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                    <CheckCircle className="w-10 h-10 mb-3 text-green-400 opacity-80" />
                    <p className="text-sm font-medium">Todos los vehículos en sitio</p>
                  </div>
                ) : (
                  activePasses.map((pass) => (
                    <div 
                      key={pass.id}
                      onClick={() => handleSelectPass(pass)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all flex items-center justify-between group ${selectedPass?.id === pass.id ? 'border-green-500 bg-green-50/50 ring-1 ring-green-500 shadow-sm' : 'border-gray-100 hover:border-green-300 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${selectedPass?.id === pass.id ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                          <CarFront className="w-5 h-5" />
                        </div>
                        <div>
                          <p className={`font-bold text-sm ${selectedPass?.id === pass.id ? 'text-green-800' : 'text-gray-800'}`}>
                            {pass.plates}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            Salida: {pass.outTime} • Auth: {pass.auth}
                          </p>
                        </div>
                      </div>
                      {selectedPass?.id === pass.id ? (
                        <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded mr-1 uppercase flex items-center gap-1"><LogIn className="w-3 h-3"/> Retornando</span>
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors" />
                      )}
                    </div>
                  ))
                )}
                
                {/* Deselect / New button */}
                <div 
                  onClick={() => handleSelectPass(null)}
                  className={`mt-4 p-3 border border-dashed rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2 ${!selectedPass ? 'border-blue-400 bg-blue-50 text-blue-600 font-bold' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 text-gray-500 font-medium'}`}
                >
                  <LogOut className="w-4 h-4" /> Nueva Salida
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom: History Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-10">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-bold text-[#032b63]">Historial de Movimientos</h3>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors border border-blue-200 px-3 py-1.5 rounded-md hover:bg-blue-50">Descargar Excel</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4 font-bold">Folio de Permiso</th>
                  <th className="p-4 font-bold">Vehículo / Placa</th>
                  <th className="p-4 font-bold">Hora Salida</th>
                  <th className="p-4 font-bold">Hora Retorno</th>
                  <th className="p-4 font-bold">Km Recorrido</th>
                  <th className="p-4 font-bold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-sm font-bold text-[#032b63] bg-blue-50 px-2 py-1 rounded border border-blue-100">{item.auth || 'AUTH-0000'}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                          <CarFront className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{item.vehicle || 'Vehículo'}</p>
                          <p className="text-xs text-gray-500">{item.plates}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                        <LogOut className="w-3.5 h-3.5 text-blue-500" /> {item.outTime}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                        <LogIn className="w-3.5 h-3.5 text-green-500" /> {item.inTime}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-bold text-[#032b63]">
                        {item.finalKm !== "N/A" && item.initialKm ? `${Math.max(0, item.finalKm - item.initialKm)} km` : "N/A"}
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium mt-0.5">
                        {item.initialKm} &rarr; {item.finalKm}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full border border-green-200">
                        <CheckCircle className="w-3 h-3" /> {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      No hay historial de movimientos recientes.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}