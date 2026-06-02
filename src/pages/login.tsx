import Button from "@/components/library/Button";
import Error from "@/components/library/Error";
import Input from "@/components/library/Input";
import Link from "@/components/library/Link";
import { loginUser } from "@/services/userService";
import { FormEvent, useState } from "react";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const error = await loginUser({ email, password });
    if (error) {
      setError(error);
      return;
    }
    location.replace('/');
  };


  return (
    <form className="login" onSubmit={handleLogin}>
      <h2>Login</h2>
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        data-testid="email"
      />
      <Input
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
        data-testid="password"
      />

      <Error msg={error} />
      <div className="form__footer">
        <Button variants={['dark']} type="submit" data-testid="submit-btn">Submit</Button>
        <Link to="/register">Create Account</Link>
      </div>
    </form>
  );
}
