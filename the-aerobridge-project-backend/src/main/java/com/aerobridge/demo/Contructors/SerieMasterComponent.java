package com.aerobridge.demo.Contructors;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class SerieMasterComponent {

    @Id
    @GeneratedValue
    private Integer serieMasterComponentId;

    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "serie_id")
    @JsonIgnoreProperties({ "model", "aircrafts", "masterComponents", "serieMasterComponentId" })
    private Serie serie;

    @ManyToOne
    @JoinColumn(name = "master_component_id")
    @JsonIgnoreProperties({ "series", "components", "serie", "serieMasterComponentId" })
    private MasterComponent masterComponent;

    public SerieMasterComponent() {
    }

    public SerieMasterComponent(Integer serieMasterComponentId, Integer quantity) {
        this.serieMasterComponentId = serieMasterComponentId;
        this.quantity = quantity;
    }

    public Integer getSerieMasterComponentId() {
        return this.serieMasterComponentId;
    }

    public void setSerieMasterComponentId(Integer serieMasterComponentId) {
        this.serieMasterComponentId = serieMasterComponentId;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Serie getSerie() {
        return this.serie;
    }

    public void setSerie(Serie serie) {
        this.serie = serie;
    }

    public MasterComponent getMasterComponent() {
        return this.masterComponent;
    }

    public void setMasterComponent(MasterComponent masterComponent) {
        this.masterComponent = masterComponent;
    }
}
