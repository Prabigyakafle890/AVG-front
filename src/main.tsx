import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export const queryClient = new QueryClient();

const container = document.getElementById('root')!;
let root: Root;

if (!(window as any)._reactRoot) {
  root = createRoot(container);
  (window as any)._reactRoot = root;
} else {
  root = (window as any)._reactRoot;
}

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
