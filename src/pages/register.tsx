import Button from "@/components/library/Button";
import Error from "@/components/library/Error";
import Input from "@/components/library/Input";
import Link from "@/components/library/Link";
import { registerUser } from "@/services/userService";
import { FormEvent, useState } from "react";


export default function Register() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const error = await registerUser({ email, password, displayName });
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

      <Error msg={error} />
      <div className="form__footer">
        <Button variants={['dark']} type="submit">Submit</Button>
        <Link to="/login">Login</Link>
      </div>
    </form>
  );
}
