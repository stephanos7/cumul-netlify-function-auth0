import { LoginButton } from "../components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/LogoutButton";

const Login = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
          {isAuthenticated ? (
            <div>
            <h1>Welcome</h1>
            <p>{user.email}</p>
            <LogoutButton />
            </div>
          ):(
            <div>
      <h1>Login</h1>
      <LoginButton />
            </div>

          )}
    </div>
  );
};

export default Login;
