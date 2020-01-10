import axios from "axios";

export default function axiosRequest(methodType, urlPath, requiredData) {
  const axiosInstance = axios.create({
    method: methodType,
    baseURL: "https://split-the-bill-api.herokuapp.com/api",
    url: urlPath,
    data: requiredData
  });

  return axiosInstance;
}
