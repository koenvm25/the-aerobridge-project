import { get, post, put, destroy } from "./config";

// Model endpoints
export const getAllModels = get(`/model`)
export const getModel = (modelId) => get(`/model/${modelId}`)
export const deleteModel = (modelId) => destroy(`/model/${modelId}`)
export const updateModel = (modelId, name, category, popularName) => put(`/model/${modelId}`, { name, category, popularName })
export const postModel = (name, popularName, category) => post(`/model`, { name, popularName, category })

// Serie endpoints
export const getAllSeries = get(`/serie`)
export const getSeriesByModel = (modelId) => get(`/serie/model/${modelId}`)
export const deleteSerie = (serieId) => destroy(`/serie/${serieId}`)
export const getSerie = (serieId) => get(`/serie/${serieId}`)
export const postSerie = (modelId, serie, maxEndurance, maxRange, maxSpeed, dimensionLength, dimensionWidth, dimensionHeight) => post(`/serie/${modelId}`, {
  serie, maxEndurance, maxRange, maxSpeed, dimensionLength, dimensionWidth, dimensionHeight
})
export const updateSerie = (serieId, dimensionWidth, dimensionHeight, dimensionLength, maxEndurance, maxRange, maxSpeed, serie) => put(`/serie/${serieId}`, {
  dimensionWidth, dimensionHeight, dimensionLength, maxEndurance, maxRange, maxSpeed, serie
})
export const postSerieMasterComponents = (serieId, addedMasterComponents) => post(`/serie/${serieId}/master-components`, { addedMasterComponents })
export const getSerieMasterComponents = (serieId) => get(`/serie/${serieId}/master-components`)
export const editSerieMasterComponents = (serieId, masterComponents) => put(`/serie/${serieId}/master-components`, { masterComponents })

// MasterComponent endpoints
export const getAllMasterComponents = get(`/master-component`)
export const getMasterComponent = (id) => get(`/master-component/${id}`)
export const deleteMasterComponent = (id) => destroy(`/master-component/${id}`)
export const postMasterComponent = (name, gtinId, family, source, favouriteStore) => post(`/master-component`, { name, gtinId, family, source, favouriteStore })
export const updateMinimalStock = (id, minimalStock) => put(`/master-component/${id}`, { minimalStock })
export const updateMasterComponent = (id, name, gtinId, family, source, favouriteStore, picture) => put(`/master-component/${id}`, { name, gtinId, family, source, favouriteStore, picture })
export const getLowStock = get(`/master-component/low-stock`)

// Component endpoints
export const getComponent = (id) => get(`/component/${id}`)
export const getByMasterComponentId = (id) => get(`/component/master-component/${id}`)
export const addStock = (id, amount, status, location) => post(`/component/${id}`, { amount, status, location })
export const updateComponentStatus = (id, status, location) => put(`/component/${id}`, { status, location })

// Aircraft endpoints
export const getAircrafts = get(`/aircraft`)
export const deleteAircraft = (id) => destroy(`/aircraft/${id}`)
export const postAircraft = (name, category, operator, manufacturer, status, serieId) => post(`/aircraft/${serieId}`, { name, category, operator, manufacturer, status })
export const updateAircraft = (id, status) => put(`/aircraft/${id}`, { status })
export const getAircraft = (id) => get(`aircraft/${id}`)
export const updateAircraftComponents = (id, swappedComponents) => put(`/aircraft/edit-components/${id}`, { swappedComponents })

// Aerobridge ID endpoints 
export const getAerobridgeId = (id) => get(`/aerobridge-id/${id}`)
