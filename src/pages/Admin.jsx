import { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Bell,
  Settings,
  User,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  Car,
  Building2,
  ClipboardList,
  Pencil,
  Trash2,
} from "lucide-react";

export default function Admin() {
  // Mock initial personnel accounts list
  const [personnelList, setPersonnelList] = useState([
    {
      id: "1",
      name: "Carlos Ruiz",
      role: "admin",
      phone: "+52 (555) 123-4567",
      email: "carlos.ruiz@institucion.edu",
      password: "password12345",
    },
    {
      id: "2",
      name: "Lucía Fernández",
      role: "direccion",
      direccion: "Secretaría Académica",
      phone: "+52 (555) 987-6543",
      email: "lucia.f@institucion.edu",
      password: "password12345",
    },
    {
      id: "3",
      name: "Miguel Herrera",
      role: "vehicular",
      phone: "+52 (555) 456-7890",
      email: "miguel.h@institucion.edu",
      password: "password12345",
    },
    {
      id: "4",
      name: "Sofía Gómez",
      role: "caseta",
      phone: "+52 (555) 789-0123",
      email: "sofia.g@institucion.edu",
      password: "password12345",
    },
  ]);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("direccion");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Role details mapping for colors, labels and icons
  const roleDetails = {
    admin: {
      label: "Administrador",
      badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
      avatarClass: "bg-purple-600",
      icon: <ShieldCheck size={14} className="text-purple-600" />,
      initials: "AD",
    },
    direccion: {
      label: "Dirección/Secretaría",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      avatarClass: "bg-blue-600",
      icon: <ClipboardList size={14} className="text-blue-600" />,
      initials: "DS",
    },
    vehicular: {
      label: "Control Vehicular",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
      avatarClass: "bg-amber-500",
      icon: <Car size={14} className="text-amber-600" />,
      initials: "CV",
    },
    caseta: {
      label: "Caseta",
      badgeClass: "bg-gray-100 text-gray-700 border-gray-300",
      avatarClass: "bg-gray-500",
      icon: <Building2 size={14} className="text-gray-600" />,
      initials: "CA",
    },
  };

  // Helper to extract initials from name
  const getInitials = (fullName) => {
    if (!fullName) return "P";
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const resetForm = () => {
    setName("");
    setRole("direccion");
    setDireccion("");
    setPhone("");
    setEmail("");
    setPassword("");
    setEditingId(null);
    setShowPassword(false);
  };

  const handleEdit = (member) => {
    setName(member.name);
    setRole(member.role);
    setDireccion(member.direccion || "");
    setPhone(member.phone);
    setEmail(member.email);
    setPassword(member.password);
    setEditingId(member.id);
    setShowPassword(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta cuenta de personal?")) {
      setPersonnelList((prev) => prev.filter((member) => member.id !== id));
      if (editingId === id) {
        resetForm();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role || !phone || !email || !password) {
      alert("Por favor complete todos los campos obligatorios.");
      return;
    }
    if (role === "direccion" && !direccion) {
      alert("Por favor especifique el nombre de la dirección.");
      return;
    }

    if (editingId) {
      // Update existing
      setPersonnelList((prev) =>
        prev.map((member) =>
          member.id === editingId
            ? { ...member, name, role, direccion: direccion || null, phone, email, password }
            : member
        )
      );
      resetForm();
    } else {
      // Create new
      const newMember = {
        id: Date.now().toString(),
        name,
        role,
        direccion: direccion || null,
        phone,
        email,
        password,
      };
      setPersonnelList((prev) => [...prev, newMember]);
      resetForm();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#eef2f6]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* HEADER BAR (No search bar) */}
        <header className="h-16 bg-white border-b border-gray-200/60 flex items-center justify-between px-6 sm:px-8">
          <div>
            <span className="text-sm font-semibold text-gray-500 hidden sm:inline-block">
              Panel de Control
            </span>
          </div>

          <div className="flex items-center gap-5">
            {/* Notifications */}
            <button className="relative p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Settings */}
            <button className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition cursor-pointer">
              <Settings size={20} />
            </button>

            {/* Admin User Info */}
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
        <main className="flex-1 p-6 sm:p-8 md:p-10 max-w-6xl w-full mx-auto flex flex-col gap-10">
          
          {/* TITLE SECTION */}
          <div>
            <h1 className="text-3xl font-extrabold text-[#032b63] tracking-tight">
              Registro de Personal
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Agregue nuevos miembros institucionales a la base de datos de gestión del sistema.
            </p>
          </div>

          {/* FORM CARD */}
          <div className="bg-white rounded-3xl shadow-xl border-t-4 border-[#032b63] p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* IDENTITY DETAILS SECTION */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Detalles de Identidad
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                    Nombre legal y requisitos del rol institucional.
                  </p>
                </div>

                <div className="md:col-span-2 flex flex-col gap-4">
                  {/* Name field */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Nombre (Name)
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nombre Completo"
                      className="w-full border border-gray-200 bg-gray-50/50 rounded-xl h-11 px-4 mt-1.5 focus:outline-none focus:border-[#032b63] focus:bg-white focus:ring-4 focus:ring-blue-100/50 transition-all text-sm text-gray-800 placeholder-gray-400"
                    />
                  </div>

                  {/* Role Selection dropdown */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Rol (Role)
                    </label>
                    <select
                      value={role}
                      onChange={(e) => { setRole(e.target.value); if (e.target.value !== "direccion") setDireccion(""); }}
                      className="w-full border border-gray-200 bg-gray-50/50 rounded-xl h-11 px-4 mt-1.5 focus:outline-none focus:border-[#032b63] focus:bg-white focus:ring-4 focus:ring-blue-100/50 transition-all text-sm text-gray-800 cursor-pointer"
                    >
                      <option value="direccion">Dirección/Secretaría</option>
                      <option value="admin">Administrador</option>
                      <option value="vehicular">Control Vehicular</option>
                      <option value="caseta">Caseta</option>
                    </select>
                  </div>

                  {/* Direccion field — only shown when role is "direccion" */}
                  {role === "direccion" && (
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Dirección (Directorate)
                      </label>
                      <input
                        type="text"
                        required
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        placeholder="Ej. Secretaría Académica, Dirección de Administración..."
                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl h-11 px-4 mt-1.5 focus:outline-none focus:border-[#032b63] focus:bg-white focus:ring-4 focus:ring-blue-100/50 transition-all text-sm text-gray-800 placeholder-gray-400"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* DIVIDER */}
              <hr className="border-gray-100" />

              {/* CONTACT & SECURITY SECTION */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Contacto y Seguridad
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                    Credenciales de acceso al sistema y líneas de comunicación.
                  </p>
                </div>

                <div className="md:col-span-2 flex flex-col gap-4">
                  {/* Grid of Phone and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Teléfono (Phone)
                      </label>
                      <div className="mt-1.5 relative flex items-center border border-gray-200 bg-gray-50/50 rounded-xl h-11 px-3.5 focus-within:border-[#032b63] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100/50 transition-all">
                        <Phone size={16} className="text-gray-400 mr-2.5 flex-shrink-0" />
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+52 (000) 000-0000"
                          className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Correo (Email)
                      </label>
                      <div className="mt-1.5 relative flex items-center border border-gray-200 bg-gray-50/50 rounded-xl h-11 px-3.5 focus-within:border-[#032b63] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100/50 transition-all">
                        <Mail size={16} className="text-gray-400 mr-2.5 flex-shrink-0" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="usuario@institucion.edu"
                          className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Contraseña (Password)
                    </label>
                    <div className="mt-1.5 relative flex items-center border border-gray-200 bg-gray-50/50 rounded-xl h-11 px-3.5 focus-within:border-[#032b63] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100/50 transition-all">
                      <Lock size={16} className="text-gray-400 mr-2.5 flex-shrink-0" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none flex-shrink-0 cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <span className="text-[11px] text-gray-400 block mt-1 leading-tight">
                      El sistema exige una política de seguridad institucional de mínimo 12 caracteres.
                    </span>
                  </div>
                </div>
              </div>

              {/* BUTTONS ROW */}
              <div className="flex justify-end items-center gap-3 mt-4 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 h-11 border border-gray-300 text-[#032b63] hover:bg-blue-50/50 hover:border-blue-200 transition-all font-semibold rounded-xl text-sm flex items-center justify-center cursor-pointer active:scale-[0.98]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 h-11 bg-[#032b63] hover:bg-[#021d45] text-white font-semibold rounded-xl text-sm flex items-center justify-center shadow-md shadow-[#032b63]/10 hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
                >
                  {editingId ? "Guardar Cambios" : "Registrar Miembro"}
                </button>
              </div>

            </form>
          </div>

          {/* PERSONNEL LIST TABLE SECTION */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#032b63]">
                Cuentas del Personal Registradas
              </h2>
              <span className="bg-blue-50 text-[#032b63] text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                {personnelList.length} Miembros
              </span>
            </div>

            {/* TABLE CONTAINER */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Nombre</th>
                      <th className="px-6 py-4">Rol</th>
                      <th className="px-6 py-4">Contacto</th>
                      <th className="px-6 py-4 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-700 text-sm">
                    {personnelList.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-10 text-center text-gray-400 font-medium">
                          No hay personal registrado en el sistema.
                        </td>
                      </tr>
                    ) : (
                      personnelList.map((member) => {
                        const details = roleDetails[member.role] || {
                          label: member.role,
                          badgeClass: "bg-gray-50 text-gray-600 border-gray-200",
                          avatarClass: "bg-gray-600",
                          icon: null,
                          initials: "P",
                        };

                        return (
                          <tr
                            key={member.id}
                            className={`hover:bg-gray-50/50 transition-colors ${
                              editingId === member.id ? "bg-blue-50/30" : ""
                            }`}
                          >
                            {/* Name and Avatar */}
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-sm ${details.avatarClass}`}
                                >
                                  {getInitials(member.name)}
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-800">{member.name}</p>
                                  {member.direccion && (
                                    <p className="text-xs text-gray-400">{member.direccion}</p>
                                  )}
                                  <p className="text-xs text-gray-400">ID: {member.id}</p>
                                </div>
                              </div>
                            </td>

                            {/* Role badge */}
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${details.badgeClass}`}
                              >
                                {details.icon}
                                {details.label}
                              </span>
                            </td>

                            {/* Contact info */}
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-gray-600 flex items-center gap-1.5 text-xs sm:text-sm">
                                  <Mail size={13} className="text-gray-400 flex-shrink-0" />
                                  {member.email}
                                </span>
                                <span className="text-gray-400 flex items-center gap-1.5 text-xs">
                                  <Phone size={12} className="text-gray-400 flex-shrink-0" />
                                  {member.phone}
                                </span>
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleEdit(member)}
                                  title="Editar Cuenta"
                                  className="p-2 text-[#032b63] hover:bg-blue-50 hover:text-[#021d45] rounded-xl transition-all cursor-pointer active:scale-95"
                                >
                                  <Pencil size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(member.id)}
                                  title="Eliminar Cuenta"
                                  className="p-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all cursor-pointer active:scale-95"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}