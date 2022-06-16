import { get } from "./config";

// Aerobridge ID endpoints 
export const getAerobridgeId = (id) => get(`/aerobridge-id/${id}`)
