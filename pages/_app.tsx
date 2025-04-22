import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useEffect, useState } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = window.localStorage.getItem('haze-theme');
    if (stored === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.localStorage.setItem('haze-theme', newTheme);
  };

  return (
    <div className={theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}>
      <button
        className="fixed top-4 right-4 p-2 rounded-lg border"
        onClick={toggleTheme}
        aria-label="Toggle Dark Mode"
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>
      <Component {...pageProps} />
    </div>
  );
}