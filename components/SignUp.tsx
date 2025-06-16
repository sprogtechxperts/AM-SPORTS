'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Logo } from '@/components/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type User = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validate()) {
      setIsSubmitting(false);
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((user) => user.email === formData.email);

    if (userExists) {
      alert('User already exists with this email!');
      setIsSubmitting(false);
      return;
    }

    const userToSave: User = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    users.push(userToSave);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully! Redirecting to login...');
    router.push('/login');
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-white dark:bg-black px-4 py-8">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-md rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black p-6 shadow-md"
      >
        <div className="text-center">
          <Link href="/" aria-label="Go Home" className="mx-auto block w-fit">
            <Logo />
          </Link>
          <h1 className="mt-4 text-xl font-semibold text-black dark:text-white">Create Account</h1>
        </div>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstname">First Name</Label>
              <Input
                placeholder="John"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="text-black"
              />
              {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
            </div>
            <div>
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                placeholder="Doe"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="text-black"
              />
              {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="john@example.com"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="text-black"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              placeholder="9876543210"
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="text-black"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="••••••••"
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              className="text-black"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-2 top-9 text-gray-500 dark:text-gray-400"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              placeholder="••••••••"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="text-black"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Button>

          <div className="my-4 text-center text-sm text-gray-500 dark:text-gray-400">OR</div>

          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="flex w-full items-center justify-center gap-2 rounded-md border py-2 px-4 text-sm font-medium text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 262" fill="none" aria-hidden="true">
              <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
              <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
              <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" />
              <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
            </svg>
            Sign in with Google
          </button>

          <div className="mt-4 text-center text-sm text-black dark:text-white">
            Already have an account?{' '}
            <Button asChild variant="link" className="px-2">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
