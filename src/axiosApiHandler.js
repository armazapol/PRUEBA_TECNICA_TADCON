import axiosClient from "./apiClient";

export function getUsers(getParams) {

  const params= {
    results : 100
  }
  if(getParams?.gender) params.gender = getParams.gender
  if(getParams?.gender) params.nat =getParams.nat
  return axiosClient.get("/", { params });
}
