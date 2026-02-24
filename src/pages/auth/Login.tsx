import LoginForm from './components/LoginForm';
import { Navigate } from 'react-router-dom';
import { useAuthQuery } from '@/hooks/useAuthQuery';

export const LoginPage = () => {
  const { data, isLoading } = useAuthQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data?.id) {
    return <Navigate to="dashboard/" replace />;
  }
  return (
    <div className="flex min-h-screen w-full bg-white font-sans">
      <div className="relative hidden items-center justify-center overflow-hidden bg-[#1a4a5e] lg:flex lg:w-1/2">
        <img
          src="/images/vet-bg.avif"
          alt="Veterinary Professional"
          className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-overlay"
        />

        <div className="relative z-10 px-16 text-white xl:px-24">
          <div className="mb-12 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 shadow-xl backdrop-blur-lg">
              <span className="text-xs font-black tracking-tighter">AVG</span>
            </div>
            <div className="h-px w-8 bg-white/30"></div>
            <span className="text-sm font-bold tracking-[0.2em] text-blue-100/80 uppercase">
              Recruitment
            </span>
          </div>

          <h1 className="max-w-xl text-5xl leading-[1.1] font-bold xl:text-7xl">
            Veterinary <br />
            <span className="text-blue-300">Recruitment</span> Portal
          </h1>

          <p className="mt-8 max-w-md text-xl leading-relaxed text-blue-50/70">
            A centralized platform for managing talent across the American
            Veterinary Group network.
          </p>

          <div className="mt-12 flex gap-2">
            <div className="h-1.5 w-12 rounded-full bg-[#2da1db]"></div>
            <div className="h-1.5 w-4 rounded-full bg-white/20"></div>
            <div className="h-1.5 w-4 rounded-full bg-white/20"></div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-slate-50/30 px-6 md:px-16 lg:w-1/2">
        <div className="mb-12 flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a4a5e] text-[10px] font-bold text-white">
            AVG
          </div>
          <span className="font-bold tracking-wider text-[#1a4a5e] uppercase">
            AVG Portal
          </span>
        </div>

        <LoginForm />

        <p className="mt-12 text-xs text-slate-400">
          &copy; 2026 American Veterinary Group. All rights reserved.
        </p>
      </div>
    </div>
  );
};
