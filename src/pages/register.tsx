import Layout from "@/components/Layout";
import Button from "@/components/library/Button";
import Input from "@/components/library/Input";
import Link from "@/components/library/Link";
import { getUser, registerUser } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";


export default function Register() {
  const [displayName, setDisplayName] = useState('');
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

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    await registerUser({ email, password, displayName });
    location.replace('/login');
  };


  return (
    <Layout>
      <form className="login" onSubmit={handleRegister}>
        <h2>Register</h2>
        <Input
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <Input
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        
        <div className="form__footer">
          <Button variants={['dark']} type="submit">Submit</Button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </Layout>
  );
}
