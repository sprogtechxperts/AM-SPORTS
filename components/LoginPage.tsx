'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Logo } from '@/components/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type User = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleManualLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = (users as User[]).find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        toast.error('Invalid email or password!');
      } else {
        toast.success('Login successful!');
        router.push('/');
      }
    } catch {
      toast.error('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <section className="flex min-h-screen bg-white dark:bg-black px-4 py-6">
      <form
        onSubmit={handleManualLogin}
        className="m-auto w-full max-w-sm rounded-lg border border-gray-300 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-black"
      >
        <div className="text-center">
          <Link href="/" className="mx-auto block w-fit">
            <Logo />
          </Link>
          <h1 className="mt-4 text-xl font-semibold text-black dark:text-white">Log In</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Sign in to continue
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 text-black"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              id="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 text-black"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </div>

        <div className="my-6 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-600">
          <hr className="flex-grow border-dashed border-gray-300 dark:border-gray-700" />
          <span>or continue with</span>
          <hr className="flex-grow border-dashed border-gray-300 dark:border-gray-700" />
        </div>

        <Button
          type="button"
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-gray-600 text-black dark:border-gray-400 dark:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 262"
            fill="none"
          >
            <path
              fill="#4285f4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            />
            <path
              fill="#34a853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            />
            <path
              fill="#fbbc05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
            />
            <path
              fill="#eb4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            />
          </svg>
          Google
        </Button>

        <div className="mt-6 text-center text-sm text-black dark:text-white">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Create account
          </Link>
        </div>
      </form>
    </section>
  );
}
