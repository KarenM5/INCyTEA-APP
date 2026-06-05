import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Sidebar from "../components/Sidebar";
import {
  Bell,
  Settings,
  User,
  Download,
  FileCheck,
  Calendar,
  Clock,
  Pencil,
  X,
} from "lucide-react";

export default function DirySec() {
  // Form State
  const [fecha, setFecha] = useState("2026-06-01");
  const [departamento, setDepartamento] = useState("");
  const [nombreSolicitante, setNombreSolicitante] = useState("");
  const [asunto, setAsunto] = useState("Laboral");
  const [tiempoEstimado, setTiempoEstimado] = useState("");
  const [destino, setDestino] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [horaRetorno, setHoraRetorno] = useState("");
  const [folio, setFolio] = useState("2026-0089");
  
  // Authorizer
  const [nombreAutoriza, setNombreAutoriza] = useState("");
  
  // Signatures
  const [signatures, setSignatures] = useState({ salida: null, regreso: null, autorizacion: null });
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [activeSignatureType, setActiveSignatureType] = useState("salida");
  
  // UI states
  const [showToast, setShowToast] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  // Setup canvas size and touch listeners on modal open
  useEffect(() => {
    if (isSignatureModalOpen) {
      const timer = setTimeout(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          canvas.width = rect.width;
          canvas.height = rect.height;
          
          const ctx = canvas.getContext("2d");
          ctx.strokeStyle = "#032b63";
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // Manual touch listeners to prevent default gesture scrolling on mobile/tablets
          const handleTouchStart = (e) => {
            e.preventDefault();
            startDrawing(e);
          };
          const handleTouchMove = (e) => {
            e.preventDefault();
            draw(e);
          };
          const handleTouchEnd = (e) => {
            e.preventDefault();
            stopDrawing();
          };

          canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
          canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
          canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

          return () => {
            canvas.removeEventListener("touchstart", handleTouchStart);
            canvas.removeEventListener("touchmove", handleTouchMove);
            canvas.removeEventListener("touchend", handleTouchEnd);
          };
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [isSignatureModalOpen]);

  // Drawing pad handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#032b63";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const { x, y } = getEventCoords(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawingRef.current = true;
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { x, y } = getEventCoords(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    setIsDrawing(false);
  };

  const getEventCoords = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches?.[0] || e.changedTouches?.[0];
    const clientX = touch ? touch.clientX : e.clientX;
    const clientY = touch ? touch.clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      setSignatures((prev) => ({
        ...prev,
        [activeSignatureType]: dataUrl,
      }));
      closeSignatureModal();
    }
  };

  const openSignatureModal = (type) => {
    setActiveSignatureType(type);
    setIsSignatureModalOpen(true);
  };

  const closeSignatureModal = () => {
    setIsSignatureModalOpen(false);
    setIsDrawing(false);
    isDrawingRef.current = false;
  };

  const handleSaveRecord = (e) => {
    e.preventDefault();
    if (!nombreSolicitante || !departamento) {
      alert("Por favor complete al menos el nombre y departamento.");
      return;
    }
    
    // Simulate save
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <>
    <div className="flex min-h-screen bg-[#eef2f6]">
      <style>{`
        @media print {
          body {
            background: white !important;
          }
          aside, header, .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-card {
            border: none !important;
            box-shadow: none !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>

      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* HEADER BAR */}
        <header className="h-16 bg-white border-b border-gray-200/60 flex items-center justify-between px-6 sm:px-8 no-print">
          <div>
            <span className="text-sm font-semibold text-gray-500 hidden sm:inline-block">
              Dirección y Secretaría
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

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-400">Superuser</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#032b63] text-white flex items-center justify-center shadow-md font-bold cursor-pointer">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTAINER */}
        <main className="flex-1 p-6 sm:p-8 md:p-10 max-w-5xl w-full mx-auto flex flex-col gap-8">
          
          {/* TOAST ALERT */}
          {showToast && (
            <div className="fixed top-5 right-5 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-50 animate-in slide-in-from-top-5 duration-300">
              <FileCheck size={20} />
              <span className="text-sm font-semibold">Registro guardado exitosamente (Local)</span>
            </div>
          )}

          {/* PAGE HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
            <div>
              <h1 className="text-3xl font-extrabold text-[#032b63] tracking-tight">
                Gestión de Pases de Salida
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Control institucional de salidas y retornos de personal.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="px-5 h-11 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-all font-semibold rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm"
              >
                <Download size={16} />
                Descargar
              </button>
              <button
                onClick={handleSaveRecord}
                className="px-5 h-11 bg-[#032b63] hover:bg-[#021d45] text-white transition-all font-semibold rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md shadow-[#032b63]/10"
              >
                <FileCheck size={16} />
                Guardar Registro
              </button>
            </div>
          </div>

          {/* TICKET FORM CARD */}
          <div className="bg-white rounded-3xl shadow-xl border-t-4 border-[#032b63] p-6 sm:p-8 md:p-10 print-card max-w-3xl w-full mx-auto animate-in fade-in slide-in-from-bottom-3 duration-300">
            
            {/* VOUCHER HEADER */}
            <div className="text-center border-b border-gray-200 pb-5 mb-6 flex flex-col items-center">
              <h2 className="text-3xl font-extrabold text-[#032b63] tracking-wider uppercase">
                Pase de Salida
              </h2>
              <span className="text-red-600 font-mono font-bold text-lg mt-1 block">
                FOLIO: {folio}
              </span>
            </div>

            {/* FORM BODY */}
            <form onSubmit={handleSaveRecord}>
              
              {/* TABLE GRID SYSTEM */}
              <div className="border border-gray-300 rounded-2xl overflow-hidden bg-white shadow-sm">
                
                {/* ROW 1: FECHA & DEPARTAMENTO */}
                <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-300">
                  <div className="p-4 border-b md:border-b-0 border-r-0 md:border-r border-gray-300 bg-white focus-within:bg-blue-50/10 transition-colors">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Calendar size={12} />
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      className="w-full mt-1.5 bg-transparent border-0 outline-none text-base font-semibold text-gray-800 p-0 focus:ring-0"
                    />
                  </div>

                  <div className="p-4 bg-white focus-within:bg-blue-50/10 transition-colors">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Departamento / Área
                    </label>
                    <input
                      type="text"
                      value={departamento}
                      onChange={(e) => setDepartamento(e.target.value)}
                      placeholder="Ej. Recursos Humanos"
                      className="w-full mt-1.5 bg-transparent border-0 outline-none text-base font-semibold text-gray-800 p-0 focus:ring-0 placeholder-gray-300"
                    />
                  </div>
                </div>

                {/* ROW 2: SOLICITANTE */}
                <div className="p-4 border-b border-gray-300 bg-white focus-within:bg-blue-50/10 transition-colors">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Nombre del Solicitante
                  </label>
                  <input
                    type="text"
                    value={nombreSolicitante}
                    onChange={(e) => setNombreSolicitante(e.target.value)}
                    placeholder="Escriba el nombre completo..."
                    className="w-full mt-1.5 bg-transparent border-0 outline-none text-base font-semibold text-gray-800 p-0 focus:ring-0 placeholder-gray-300"
                  />
                </div>

                {/* ROW 3: ASUNTO & TIEMPO ESTIMADO */}
                <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-300">
                  <div className="p-4 border-b md:border-b-0 border-r-0 md:border-r border-gray-300 bg-white">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Asunto
                    </label>
                    <div className="flex gap-6 mt-2.5">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer select-none">
                        <input
                          type="radio"
                          name="asunto"
                          checked={asunto === "Laboral"}
                          onChange={() => setAsunto("Laboral")}
                          className="w-4 h-4 text-[#032b63] border-gray-300 focus:ring-[#032b63] cursor-pointer"
                        />
                        Laboral
                      </label>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer select-none">
                        <input
                          type="radio"
                          name="asunto"
                          checked={asunto === "Personal"}
                          onChange={() => setAsunto("Personal")}
                          className="w-4 h-4 text-[#032b63] border-gray-300 focus:ring-[#032b63] cursor-pointer"
                        />
                        Personal
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-white focus-within:bg-blue-50/10 transition-colors">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Tiempo Estimado (Hrs)
                    </label>
                    <input
                      type="text"
                      value={tiempoEstimado}
                      onChange={(e) => setTiempoEstimado(e.target.value)}
                      placeholder="Ej. 2 horas"
                      className="w-full mt-1.5 bg-transparent border-0 outline-none text-base font-semibold text-gray-800 p-0 focus:ring-0 placeholder-gray-300"
                    />
                  </div>
                </div>

                {/* ROW 4: DESTINO / OBSERVACIONES */}
                <div className="p-4 border-b border-gray-300 bg-white focus-within:bg-blue-50/10 transition-colors">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Destino / Observaciones
                  </label>
                  <textarea
                    rows={2}
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    placeholder="Indique el lugar de destino o motivo de la salida..."
                    className="w-full mt-1.5 bg-transparent border-0 outline-none text-base font-semibold text-gray-800 p-0 focus:ring-0 placeholder-gray-300 resize-none"
                  />
                </div>

                {/* ROW 5: HORA SALIDA & HORA RETORNO */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-4 border-b md:border-b-0 border-r-0 md:border-r border-gray-300 bg-white focus-within:bg-blue-50/10 transition-colors">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Clock size={12} />
                      Hora de Salida
                    </label>
                    <input
                      type="time"
                      value={horaSalida}
                      onChange={(e) => setHoraSalida(e.target.value)}
                      className="w-full mt-1.5 bg-transparent border-0 outline-none text-base font-semibold text-gray-800 p-0 focus:ring-0"
                    />
                  </div>

                  <div className="p-4 bg-white focus-within:bg-blue-50/10 transition-colors">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Clock size={12} />
                      Hora de Retorno
                    </label>
                    <input
                      type="time"
                      value={horaRetorno}
                      onChange={(e) => setHoraRetorno(e.target.value)}
                      className="w-full mt-1.5 bg-transparent border-0 outline-none text-base font-semibold text-gray-800 p-0 focus:ring-0"
                    />
                  </div>
                </div>

              </div>

              {/* SIGNATURES SECTION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                
                {/* APPLICANT SIGNATURE CONTAINER */}
                <div className="border border-gray-300 rounded-2xl p-5 bg-white flex flex-col justify-between h-56 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                    Área de Firma del Solicitante
                  </span>
                  
                  {/* Two Signatures row */}
                  <div className="grid grid-cols-2 gap-4 flex-1 items-center mt-3">
                    
                    {/* Departure signature click area */}
                    <div
                      onClick={() => openSignatureModal("salida")}
                      className="border-2 border-dashed border-gray-200 hover:border-[#032b63] hover:bg-blue-50/20 transition-all rounded-xl h-24 flex flex-col items-center justify-center cursor-pointer p-2 overflow-hidden"
                    >
                      {signatures.salida ? (
                        <img src={signatures.salida} alt="Firma de Salida" className="h-full object-contain" />
                      ) : (
                        <div className="text-center">
                          <Pencil size={18} className="mx-auto mb-1 text-gray-300" />
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Salida</span>
                          <span className="text-[8px] text-gray-300 block">Clic para firmar</span>
                        </div>
                      )}
                    </div>

                    {/* Return signature click area */}
                    <div
                      onClick={() => openSignatureModal("regreso")}
                      className="border-2 border-dashed border-gray-200 hover:border-[#032b63] hover:bg-blue-50/20 transition-all rounded-xl h-24 flex flex-col items-center justify-center cursor-pointer p-2 overflow-hidden"
                    >
                      {signatures.regreso ? (
                        <img src={signatures.regreso} alt="Firma de Regreso" className="h-full object-contain" />
                      ) : (
                        <div className="text-center">
                          <Pencil size={18} className="mx-auto mb-1 text-gray-300" />
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Regreso</span>
                          <span className="text-[8px] text-gray-300 block">Clic para firmar</span>
                        </div>
                      )}
                    </div>

                  </div>

                  <div className="border-t border-gray-100 mt-3 pt-2.5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Firma del Personal
                  </div>
                </div>

                {/* DIRECTORIAL AUTHORIZATION CONTAINER */}
                <div className="border border-gray-300 rounded-2xl p-5 bg-white flex flex-col justify-between h-56 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                    Autorización (Dirección)
                  </span>
                  
                  <div className="flex flex-col gap-3 mt-3 flex-1 justify-center">
                    {/* Input for authorizer's name */}
                    <div className="w-full">
                      <input
                        type="text"
                        value={nombreAutoriza}
                        onChange={(e) => setNombreAutoriza(e.target.value)}
                        placeholder="Nombre de quien autoriza..."
                        className="w-full text-center bg-transparent border-b border-gray-200 outline-none text-xs font-semibold text-gray-700 py-1 focus:border-[#032b63] transition-colors focus:ring-0 placeholder-gray-300"
                      />
                    </div>
                    
                    {/* Authorizer Signature Box */}
                    <div
                      onClick={() => openSignatureModal("autorizacion")}
                      className="border-2 border-dashed border-gray-200 hover:border-[#032b63] hover:bg-blue-50/20 transition-all rounded-xl h-20 flex flex-col items-center justify-center cursor-pointer p-2 overflow-hidden mx-auto w-full max-w-[200px]"
                    >
                      {signatures.autorizacion ? (
                        <img src={signatures.autorizacion} alt="Firma de Autorización" className="h-full object-contain" />
                      ) : (
                        <div className="text-center">
                          <Pencil size={14} className="mx-auto mb-1 text-gray-300" />
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">Firma Autorizada</span>
                          <span className="text-[7px] text-gray-300 block">Clic para firmar</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 mt-3 pt-2.5 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Nombre y Firma Autorizada
                  </div>
                </div>

              </div>

              {/* TICKET FOOTER REMARK */}
              <p className="text-[9px] text-gray-400 mt-8 text-justify leading-relaxed border-t border-gray-100 pt-4">
                Este documento es oficial y debe presentarse en el área de vigilancia al momento de su salida y regreso. El mal uso de este pase de salida conlleva sanciones administrativas según el reglamento interno institucional vigente.
              </p>

            </form>

          </div>

        </main>
      </div>

    </div>

      {/* INTERACTIVE SIGNATURE POPUP MODAL — outside flex container so fixed positioning works as a true overlay */}
      {isSignatureModalOpen && createPortal(
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#032b63] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Pencil size={18} />
                Lienzo de Firma Digital - {activeSignatureType === "salida" ? "Salida" : activeSignatureType === "regreso" ? "Regreso" : "Autorización"}
              </h3>
              <button
                onClick={closeSignatureModal}
                className="text-blue-100 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Canvas Area */}
            <div className="p-6 flex flex-col gap-4">
              <p className="text-xs text-gray-500">
                Utilice su cursor o dedo sobre el lienzo para estampar la firma. Procure centrar su trazo.
              </p>
              
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 w-full h-60 cursor-crosshair shadow-inner focus:outline-none"
              />
            </div>
            
            {/* Modal Actions */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100">
              <button
                onClick={clearCanvas}
                className="px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-100 transition rounded-xl text-xs font-bold cursor-pointer"
              >
                Limpiar
              </button>
              <div className="flex gap-2">
                <button
                  onClick={closeSignatureModal}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 transition font-bold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveSignature}
                  className="px-5 py-2 bg-[#032b63] hover:bg-[#021d45] text-white transition rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Guardar Firma
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
