import { useAuth } from '@/pages/auth/hooks/useAuth';
import React, { useState } from 'react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // use npm i react-hook-form and yup validation

  const { login, isPending } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-slate-800">
          Sign In
        </h2>
        <p className="mt-3 text-lg text-slate-500">
          Access the recruitment dashboard
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-bold tracking-wider text-slate-700 uppercase">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 transition-all outline-none placeholder:text-gray-300 focus:border-transparent focus:ring-2 focus:ring-[#2da1db]"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold tracking-wider text-slate-700 uppercase">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 transition-all outline-none placeholder:text-gray-300 focus:border-transparent focus:ring-2 focus:ring-[#2da1db]"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-4 w-full rounded-lg bg-[#2da1db] py-4 text-lg font-bold text-white transition-all hover:bg-[#2589ba] active:scale-[0.99] disabled:opacity-50"
        >
          {isPending ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm font-semibold text-[#2da1db] hover:underline"
          >
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
}
