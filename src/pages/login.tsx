import Layout from "@/components/Layout";
import Button from "@/components/library/Button";
import Input from "@/components/library/Input";
import Link from "@/components/library/Link";
import { getUser, loginUser } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser();
      if (res) location.replace('/');
      return res;
    }
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await loginUser({ email, password });
    location.replace('/');
  };


  return (
    <Layout>
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

        <div className="form__footer">
          <Button variants={['dark']} type="submit" data-testid="submit-btn">Submit</Button>
          <Link to="/register">Create Account</Link>
        </div>
      </form>
    </Layout>
  );
}
