package com.aerobridge.demo.Contructors;

import java.sql.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Aircraft {

    @Id
    @GeneratedValue
    private Integer aircraftId;

    private String aerobridgeId;
    private String manufacturer;
    private String operator;
    private String category;
    private String name;
    private String status;
    private Date createdAt;
    private Date updatedAt;

    @OneToMany(mappedBy = "aircraft")
    @JsonIgnoreProperties({ "aircraft", "masterComponent", "componentHistoty" })
    private List<Component> components;

    @ManyToOne
    @JoinColumn(name = "serie_id")
    @JsonIgnoreProperties({ "aircrafts", "masterComponents", "model" })
    private Serie serie;

    public Aircraft() {
    }

    public Aircraft(Integer aircraftId, String aerobridgeId, String manufacturer, String operator, String category,
            String name, String status, Date createdAt, Date updatedAt) {
        this.aircraftId = aircraftId;
        this.aerobridgeId = aerobridgeId;
        this.manufacturer = manufacturer;
        this.operator = operator;
        this.category = category;
        this.name = name;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getAircraftId() {
        return this.aircraftId;
    }

    public void setAircraftId(Integer aircraftID) {
        this.aircraftId = aircraftID;
    }

    public String getAerobridgeId() {
        return this.aerobridgeId;
    }

    public void setAerobridgeId(String aerobridgeId) {
        this.aerobridgeId = aerobridgeId;
    }

    public String getManufacturer() {
        return this.manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getOperator() {
        return this.operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public List<Component> getComponents() {
        return this.components;
    }

    public void setComponents(List<Component> components) {
        this.components = components;
    }

    public Serie getSerie() {
        return this.serie;
    }

    public void setSerie(Serie serie) {
        this.serie = serie;
    }
}
