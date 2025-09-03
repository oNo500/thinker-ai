'use client';

import Link from 'next/link';
import ReactIcon from '@repo/icons/react.svg';
import { Button } from '@repo/ui/components/button';
import AppleIcon from '@repo/icons/apple.svg';
import GoogleIcon from '@repo/icons/google.svg';
import { useRouter } from 'next/navigation';

import { paths } from '@/config/paths';
import LoginForm from '@/features/auth/components/login-form';

const LoginPage = () => {
  const router = useRouter();

  const onSuccess = async () => {
    router.push(paths.home.getHref());
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Link href={paths.home.getHref()} className="flex flex-col items-center gap-2 font-medium">
            <div className="flex items-center justify-center rounded-md text-6xl">
              <ReactIcon />
            </div>
            <span className="sr-only">React Boilerplate</span>
          </Link>
          <h1 className="text-xl font-bold">Welcome to React Boilerplate</h1>
          <div className="text-secondary-foreground text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href={paths.auth.register.getHref()} className="hover:text-primary underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
        <LoginForm onSuccess={onSuccess} />
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">Or</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Button variant="outline" className="w-full" type="button">
            <AppleIcon />
            Continue with Apple
          </Button>
          <Button variant="outline" className="w-full" type="button">
            <GoogleIcon />
            Continue with Google
          </Button>
        </div>
        <div className="text-muted-foreground hover:[&_a]:text-primary text-balance text-center text-xs [&_a]:underline [&_a]:underline-offset-4">
          By clicking continue, you agree to our <Link href="#">Terms of Service</Link> and{' '}
          <Link href="#">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
