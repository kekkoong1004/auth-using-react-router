import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URLSearchParams(document.location.search);
  const authMode = searchParams.get('mode');
  let url = `http://localhost:8080/${
    authMode === 'register' ? 'signup' : 'login'
  }`;

  const formData = await request.formData();

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
  };

  if (authMode === 'register' && data.password !== data.confirmPassword) {
    return {
      errors: { password: 'Password is not the same with Confirm Password' },
      message: 'Password error',
    };
  }

  if (authMode !== 'login' && authMode !== 'register') {
    throw json({ message: 'wrong auth mode.' }, { status: 400 });
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Something went wrong' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('auth-duration', expiration.getTime());

  return redirect('/');
}
