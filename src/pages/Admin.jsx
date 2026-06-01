import Sidebar from "../components/Sidebar";

export default function Admin() {
  return (
    <div className="flex min-h-screen bg-[#eef2f6]">

      <Sidebar />

      <main className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-[#032b63]">
          Administración
        </h1>

      </main>

    </div>
  );
}