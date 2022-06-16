package com.aerobridge.demo.Contructors;

import java.sql.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Serie {

    @Id
    @GeneratedValue
    private Integer serieId;

    private String serie;
    private Integer dimensionLength;
    private Integer dimensionWidth;
    private Integer dimensionHeight;
    private Double maxRange;
    private Double maxSpeed;
    private Double maxEndurance;
    private Date createdAt;
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "model_id")
    @JsonIgnoreProperties({ "series" })
    private Model model;

    @OneToMany(mappedBy = "serie")
    @JsonIgnoreProperties({ "serie" })
    private List<SerieMasterComponent> masterComponents;

    @OneToMany(mappedBy = "serie")
    @JsonIgnoreProperties({ "components", "serie" })
    private List<Aircraft> aircrafts;

    public Serie() {
    }

    public Serie(Integer serieId, String serie, Integer dimensionLength, Integer dimensionWidth,
            Integer dimensionHeight, Double maxRange, Double maxSpeed, Double maxEndurance, Date createdAt,
            Date updatedAt) {
        this.serieId = serieId;
        this.serie = serie;
        this.dimensionLength = dimensionLength;
        this.dimensionWidth = dimensionWidth;
        this.dimensionHeight = dimensionHeight;
        this.maxRange = maxRange;
        this.maxSpeed = maxSpeed;
        this.maxEndurance = maxEndurance;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public List<SerieMasterComponent> getMasterComponents() {
        return this.masterComponents;
    }

    public void setMasterComponents(List<SerieMasterComponent> masterComponents) {
        this.masterComponents = masterComponents;
    }

    public List<Aircraft> getAircrafts() {
        return this.aircrafts;
    }

    public void setAircrafts(List<Aircraft> aircrafts) {
        this.aircrafts = aircrafts;
    }

    public Integer getSerieId() {
        return this.serieId;
    }

    public void setSerieId(Integer serieId) {
        this.serieId = serieId;
    }

    public String getSerie() {
        return this.serie;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public Integer getDimensionLength() {
        return this.dimensionLength;
    }

    public void setDimensionLength(Integer dimensionLength) {
        this.dimensionLength = dimensionLength;
    }

    public Integer getDimensionWidth() {
        return this.dimensionWidth;
    }

    public void setDimensionWidth(Integer dimensionWidth) {
        this.dimensionWidth = dimensionWidth;
    }

    public Integer getDimensionHeight() {
        return this.dimensionHeight;
    }

    public void setDimensionHeight(Integer dimensionHeight) {
        this.dimensionHeight = dimensionHeight;
    }

    public Double getMaxRange() {
        return this.maxRange;
    }

    public void setMaxRange(Double maxRange) {
        this.maxRange = maxRange;
    }

    public Double getMaxSpeed() {
        return this.maxSpeed;
    }

    public void setMaxSpeed(Double maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public Double getMaxEndurance() {
        return this.maxEndurance;
    }

    public void setMaxEndurance(Double maxEndurance) {
        this.maxEndurance = maxEndurance;
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

    public Model getModel() {
        return this.model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    // public List<Aircraft> getAircrafts() {
    // return this.aircrafts;
    // }

    // public void setAircrafts(List<Aircraft> aircrafts) {
    // this.aircrafts = aircrafts;
    // }

}
