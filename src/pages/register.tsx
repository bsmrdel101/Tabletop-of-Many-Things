import Button from "@/components/library/Button";
import Error from "@/components/library/Error";
import Input from "@/components/library/Input";
import Link from "@/components/library/Link";
import { registerUser } from "@/services/userService";
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
  );
}
