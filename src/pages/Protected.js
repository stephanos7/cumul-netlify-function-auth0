import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchSSO } from "../function-invocations/fetchSSO";
import { CumulioWrapper } from "../components/CumulWrapper";
import { Navigate } from "react-router-dom";

const Protected = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [keyToken, setKeyToken] = useState(null);

  const getDashboardCredentials = async () => {
    try {
      let accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });
      let pair = await fetchSSO(accessToken);
      setKeyToken(pair);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getDashboardCredentials();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div>
      <img src={user.picture} alt={user?.name || "image of user"} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <h3>DASHBOARD</h3>
      {keyToken !== null && (
        <CumulioWrapper
          dashboardKey={keyToken.key}
          dashboardToken={keyToken.token}
        />
      )}
      {/* <h3>Update metadata</h3>
        <button onClick={handleUpdateMetadata}>update</button> */}
      <h3>App Metadata</h3>
      <p>user department claim!{user["https://cumulio/department"]}</p>

      {/* {appMetadata ? (
          <pre>{JSON.stringify(appMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )} */}
    </div>
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default Protected;
