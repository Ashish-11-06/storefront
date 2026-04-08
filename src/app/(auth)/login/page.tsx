import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Login | Rajesh Flowers",
  description: "Log in to your Rajesh Flowers account to track orders and manage subscriptions.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans selection:bg-[#F59E0B] selection:text-white">
      {/* Left side - Image & Branding */}
      <div className="hidden md:flex md:w-1/2 lg:w-[55%] relative flex-col justify-between p-12 overflow-hidden bg-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20000ms] hover:scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&q=80&w=1600')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to store
          </Link>
        </div>

        <div className="relative z-10 max-w-lg mt-auto">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF9933] to-[#F59E0B] flex items-center justify-center font-black text-white text-xl shadow-[0_0_30px_rgba(245,158,11,0.4)] mb-6 border border-white/20">
            RF
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            Devotion Delivered <span className="text-[#F59E0B]">Daily.</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Sign in to manage your daily puja box subscriptions, track ceremonial orders, and access exclusive premium arrangements.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16 relative">
        {/* Mobile Back Button */}
        <div className="absolute top-8 left-8 md:hidden">
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center md:text-left">
            <div className="md:hidden w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF9933] to-[#F59E0B] flex items-center justify-center font-black text-white text-xl shadow-[0_0_30px_rgba(245,158,11,0.4)] mx-auto mb-6 border border-amber-200">
              RF
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Welcome back</h1>
            <p className="text-gray-500 text-sm">Please enter your details to sign in.</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 tracking-wide" htmlFor="email">Email</label>
              <input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#F59E0B]/30 focus:border-[#F59E0B] focus:bg-white transition-all shadow-sm"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700 tracking-wide" htmlFor="password">Password</label>
                <Link href="#" className="text-sm font-semibold text-[#F59E0B] hover:text-[#FF9933] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#F59E0B]/30 focus:border-[#F59E0B] focus:bg-white transition-all shadow-sm"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-gray-900 text-white hover:bg-[#F59E0B] font-bold py-4 rounded-xl transition-all duration-300 active:scale-[0.98] shadow-lg shadow-gray-900/10 hover:shadow-[#F59E0B]/30 flex items-center justify-center gap-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Or continue with</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center py-3.5 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm font-semibold text-sm text-gray-700 active:scale-[0.98]">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center py-3.5 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm font-semibold text-sm text-gray-700 active:scale-[0.98]">
              <svg className="w-5 h-5 mr-2 text-[#000000]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.09 2.31-.86 3.59-.8 1.55.05 2.88.72 3.66 1.83-3.26 1.94-2.73 6.2 0.38 7.42-.76 1.82-1.74 3.66-2.71 3.72zm-2.88-14c-.03-1.89 1.46-3.54 3.26-3.72.31 2.08-1.54 3.76-3.26 3.72z" />
              </svg>
              Apple
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500 font-medium">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-gray-900 hover:text-[#F59E0B] transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
