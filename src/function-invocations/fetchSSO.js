export const fetchSSO = async (accessToken) => {
  let res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/.netlify/functions/fetch-sso`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return res.json();
};
