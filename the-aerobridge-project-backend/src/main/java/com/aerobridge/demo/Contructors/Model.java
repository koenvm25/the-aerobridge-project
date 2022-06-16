package com.aerobridge.demo.Contructors;

import java.sql.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Model {

    @Id
    @GeneratedValue
    private Integer modelId;

    private String name;
    private String popularName;
    private String category;
    private Date createdAt;
    private Date updatedAt;

    @OneToMany(mappedBy = "model")
    @JsonIgnoreProperties({ "masterComponents", "model" })
    private List<Serie> series;

    public Model() {
    }

    public Model(Integer modelId, String name, String popularName, String category, Date createdAt, Date updatedAt) {
        this.modelId = modelId;
        this.name = name;
        this.popularName = popularName;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public List<Serie> getSeries() {
        return this.series;
    }

    public void setSeries(List<Serie> series) {
        this.series = series;
    }

    public Integer getModelId() {
        return this.modelId;
    }

    public void setModelId(Integer modelId) {
        this.modelId = modelId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPopularName() {
        return this.popularName;
    }

    public void setPopularName(String popularName) {
        this.popularName = popularName;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
