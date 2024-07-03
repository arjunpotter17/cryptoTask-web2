import axios from "axios";
import Cookies from "js-cookie";

export const fetchWithToken = async (url: string): Promise<any> => {
  const githubToken = Cookies.get("github_token");

  if (!githubToken) return [];

  return await axios(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("auth_token"),
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
