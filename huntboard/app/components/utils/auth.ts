import logout from "./logout";

export async function getAccessToken(): Promise<string | null> {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) return null;

  const res = await fetch("http://127.0.0.1:8000/api/protected/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) {
    const refreshRes = await fetch("http://127.0.0.1:8000/api/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await refreshRes.json();

    if (refreshRes.ok) {
      localStorage.setItem("accessToken", data.access);
      return data.access;
    } else {
      logout();
      return null;
    }
  }

  return accessToken;
}
