package com.aerobridge.demo.Contructors;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Entity
public class MasterComponent {
    @Id
    @GeneratedValue
    private Integer masterComponentId;
    private Integer availableStock;
    private Timestamp priceUpdatedAt;
    private Double latestPrice;
    private Integer minimalStock;
    private String name;
    private String source;
    private String family;
    private String favouriteStore;
    private Long gtinId;
    private Date createdAt;
    private Date updatedAt;

    @OneToMany(mappedBy = "masterComponent")
    @JsonIgnoreProperties({ "aircraft", "masterComponent" })
    private List<Component> components;

    @OneToMany(mappedBy = "masterComponent")
    @JsonIgnoreProperties({ "masterComponent" })
    private List<SerieMasterComponent> series;

    public MasterComponent() {
    };

    public MasterComponent(Integer masterComponentId, Integer availableStock, Timestamp priceUpdatedAt,
            Double latestPrice, Integer minimalStock, String name, String source, String family, String favouriteStore,
            Long gtinId, Date createdAt, Date updatedAt) {
        this.masterComponentId = masterComponentId;
        this.availableStock = availableStock;
        this.priceUpdatedAt = priceUpdatedAt;
        this.latestPrice = latestPrice;
        this.minimalStock = minimalStock;
        this.name = name;
        this.source = source;
        this.family = family;
        this.favouriteStore = favouriteStore;
        this.gtinId = gtinId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public List<Component> getComponents() {
        return this.components;
    }

    public void setComponents(List<Component> components) {
        this.components = components;
    }

    public Integer getMasterComponentId() {
        return masterComponentId;
    }

    public void setMasterComponentId(Integer masterComponentId) {
        this.masterComponentId = masterComponentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSource() {
        return source;
    }

    public Integer getMinimalStock() {
        return this.minimalStock;
    }

    public void setMinimalStock(Integer minimalStock) {
        this.minimalStock = minimalStock;
    }

    public List<SerieMasterComponent> getSeries() {
        return this.series;
    }

    public void setSeries(List<SerieMasterComponent> series) {
        this.series = series;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getFamily() {
        return family;
    }

    public void setFamily(String family) {
        this.family = family;
    }

    public String getFavouriteStore() {
        return favouriteStore;
    }

    public void setFavouriteStore(String favouriteStore) {
        this.favouriteStore = favouriteStore;
    }

    public Long getGtinId() {
        return gtinId;
    }

    public void setGtinId(Long gtinId) {
        this.gtinId = gtinId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Double getLatestPrice() {
        return this.latestPrice;
    }

    public void setLatestPrice(Double latestPrice) {
        this.latestPrice = latestPrice;
    }

    public Timestamp getPriceUpdatedAt() {
        return this.priceUpdatedAt;
    }

    public void setPriceUpdatedAt(Timestamp priceUpdatedAt) {
        this.priceUpdatedAt = priceUpdatedAt;
    }

    public Integer getAvailableStock() {
        return this.availableStock;
    }

    public void setAvailableStock(Integer availableStock) {
        this.availableStock = availableStock;
    }

}
