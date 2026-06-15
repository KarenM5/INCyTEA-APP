import { Link } from "react-router-dom";
import { LogIn, ChevronRight } from "lucide-react";
import homeBg from "../images/home.jpg";
import logo from "../../Logo-removebg-preview.png";

export default function Landing() {
  return (
    <div className="flex min-h-screen bg-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-20px) scale(1.05); opacity: 0.25; }
        }
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

      {/* LEFT — Image with diagonal cut */}
      <div className="w-[55%] relative overflow-hidden hidden md:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${homeBg})`, clipPath: "polygon(0 0, 100% 0, 82% 100%, 0 100%)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20" />
        </div>
      </div>

      {/* RIGHT — Content */}
      <div className="flex-1 relative flex items-center justify-center p-8 md:p-16 bg-white overflow-hidden">
        {/* Water-like animated gradient overlay */}
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background: "linear-gradient(135deg, rgba(3,43,99,0.02) 0%, rgba(255,255,255,0) 30%, rgba(3,43,99,0.03) 60%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* Floating bubbles */}
        <div className="absolute w-28 h-28 rounded-full bg-emerald-400/10 animate-drift" style={{ top: "8%", left: "8%", animationDelay: "0s", animationDuration: "15s" }} />
        <div className="absolute w-16 h-16 rounded-full bg-sky-400/15 animate-drift" style={{ top: "12%", right: "18%", animationDelay: "-3s", animationDuration: "13s" }} />
        <div className="absolute w-12 h-12 rounded-full bg-pink-400/15 animate-drift" style={{ top: "25%", left: "25%", animationDelay: "-6s", animationDuration: "11s" }} />
        <div className="absolute w-36 h-36 rounded-full bg-amber-400/8 animate-drift" style={{ top: "40%", right: "10%", animationDelay: "-1s", animationDuration: "18s" }} />
        <div className="absolute w-20 h-20 rounded-full bg-emerald-400/12 animate-drift" style={{ top: "55%", left: "12%", animationDelay: "-5s", animationDuration: "14s" }} />
        <div className="absolute w-10 h-10 rounded-full bg-pink-400/12 animate-drift" style={{ top: "60%", right: "22%", animationDelay: "-2s", animationDuration: "10s" }} />
        <div className="absolute w-24 h-24 rounded-full bg-sky-400/10 animate-drift" style={{ top: "70%", left: "30%", animationDelay: "-7s", animationDuration: "16s" }} />
        <div className="absolute w-14 h-14 rounded-full bg-amber-400/12 animate-drift" style={{ top: "82%", right: "12%", animationDelay: "-4s", animationDuration: "12s" }} />
        <div className="absolute w-32 h-32 rounded-full bg-emerald-400/8 animate-drift" style={{ top: "85%", left: "5%", animationDelay: "-9s", animationDuration: "17s" }} />
        <div className="absolute w-8 h-8 rounded-full bg-sky-400/20 animate-drift" style={{ top: "45%", left: "40%", animationDelay: "-1.5s", animationDuration: "9s" }} />

        {/* Content */}
        <div className="relative z-10 text-center max-w-md">
          <img src={logo} alt="INCyTEAPP" className="h-20 md:h-24 mx-auto mb-8 object-contain" />

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#032b63] tracking-tight leading-tight">
            INCyTEAPP
          </h1>

          <div className="mt-10 flex flex-col items-center">
            <Link to="/login" className="w-full max-w-xs">
              <button className="w-full bg-[#032b63] hover:bg-[#021d45] text-white text-base md:text-lg font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer active:scale-[0.98] group">
                <LogIn size={20} />
                Ingresar
                <ChevronRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}