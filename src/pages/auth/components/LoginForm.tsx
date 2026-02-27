import { useAuth } from '@/pages/auth/hooks/useAuth';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

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
      <img src="/images/logo.png" alt="AVG Logo" className="mx-auto h-10" />

      <div className="mb-10 text-center">
        <p className="mt-3 text-lg text-slate-500">
          Access the recruitment dashboard
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="mt-2 mb-1 block px-2 py-1 text-sm font-bold tracking-wider text-slate-700 uppercase">
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
          <label className="mt-2 mb-1 block px-2 py-1 text-sm font-bold tracking-wider text-slate-700 uppercase">
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

        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="mt-4 w-full rounded-lg bg-[#2da1db] py-3 text-lg font-bold hover:bg-[#2589ba] active:scale-[0.99]"
        >
          {isPending ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
}
