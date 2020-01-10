import axios from "axios";

export default function axiosWithAuth(methodType, urlPath, requiredData) {
  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    method: methodType,
    baseURL: "https://split-the-bill-api.herokuapp.com/api",
    url: urlPath,
    headers: {
      Authorization: token
    },
    data: requiredData
  });

  return axiosInstance;
}
