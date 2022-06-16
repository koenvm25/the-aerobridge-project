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
public class Component {

    @Id
    @GeneratedValue
    private Integer componentId;

    private String aerobridgeId;
    private String name;
    private String status;
    private String location;
    private Date createdAt;
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "aircraft_id")
    @JsonIgnoreProperties({ "components", "serie" })
    private Aircraft aircraft;

    @ManyToOne
    @JoinColumn(name = "master_component_id")
    @JsonIgnoreProperties({ "components", "series" })
    private MasterComponent masterComponent;

    @OneToMany(mappedBy = "component")
    @JsonIgnoreProperties("component")
    private List<ComponentEvent> componentHistory;

    public Component() {
    }

    public Component(Integer componentId, String aerobridgeId, String name, String status, String location,
            Date createdAt, Date updatedAt, Aircraft aircraft, MasterComponent masterComponent) {
        this.componentId = componentId;
        this.aerobridgeId = aerobridgeId;
        this.name = name;
        this.status = status;
        this.location = location;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.aircraft = aircraft;
        this.masterComponent = masterComponent;
    }

    public List<ComponentEvent> getComponentHistory() {
        return this.componentHistory;
    }

    public void setComponentHistory(List<ComponentEvent> componentHistory) {
        this.componentHistory = componentHistory;
    }

    public String getAerobridgeId() {
        return this.aerobridgeId;
    }

    public void setAerobridgeId(String aerobridgeId) {
        this.aerobridgeId = aerobridgeId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getComponentId() {
        return this.componentId;
    }

    public void setComponentId(Integer componentId) {
        this.componentId = componentId;
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

    public Aircraft getAircraft() {
        return this.aircraft;
    }

    public void setAircraft(Aircraft aircraft) {
        this.aircraft = aircraft;
    }

    public MasterComponent getMasterComponent() {
        return this.masterComponent;
    }

    public void setMasterComponent(MasterComponent masterComponent) {
        this.masterComponent = masterComponent;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}
