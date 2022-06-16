package com.aerobridge.demo.Contructors;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class ComponentEvent {

    @Id
    @GeneratedValue
    private Integer componentEventId;

    private String description;
    private Date eventDate;
    private String status;
    private String aerobridgeId;
    private String aircraftAID;

    @ManyToOne
    @JoinColumn(name = "component_id")
    @JsonIgnoreProperties({ "aircraft", "masterComponent", "componentHistory" })
    private Component component;

    public ComponentEvent() {
    }

    public ComponentEvent(Integer componentEventId, String description, Date eventDate, String status,
            String aerobridgeId, String aircraftAID) {
        this.componentEventId = componentEventId;
        this.description = description;
        this.eventDate = eventDate;
        this.status = status;
        this.aerobridgeId = aerobridgeId;
        this.aircraftAID = aircraftAID;
    }

    public String getAircraftAID() {
        return this.aircraftAID;
    }

    public void setAircraftAID(String aircraftAID) {
        this.aircraftAID = aircraftAID;
    }

    public String getAerobridgeId() {
        return this.aerobridgeId;
    }

    public void setAerobridgeId(String aerobridgeId) {
        this.aerobridgeId = aerobridgeId;
    }

    public Component getComponent() {
        return this.component;
    }

    public Integer getComponentHistoryId() {
        return this.componentEventId;
    }

    public void setComponentHistoryId(Integer componentHistoryId) {
        this.componentEventId = componentHistoryId;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getEventDate() {
        return this.eventDate;
    }

    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setComponent(Component component) {
        this.component = component;
    }
}