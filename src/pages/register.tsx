import Button from "@/components/Library/Button";
import Error from "@/components/Library/Error";
import Input from "@/components/Library/Input";
import Link from "@/components/Library/Link";
import { registerUser } from "@/controllers/userController";
import { FormEvent, useState } from "react";


export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const error = await registerUser({ username, password });
    if (error) {
      setError(error);
      return;
    }
    location.replace('/login');
  };


  return (
    <form className="login" onSubmit={handleRegister}>
      <h2>Register</h2>
      <Input
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
      />

      <Error msg={error} />
      <div className="form__footer">
        <Button variants={['dark']} type="submit">Submit</Button>
        <Link to="/login">Login</Link>
      </div>
    </form>
  )
}
