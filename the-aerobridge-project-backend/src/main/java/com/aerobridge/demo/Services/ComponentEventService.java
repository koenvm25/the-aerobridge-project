package com.aerobridge.demo.Services;

import java.sql.Date;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aerobridge.demo.Contructors.Aircraft;
import com.aerobridge.demo.Contructors.Component;
import com.aerobridge.demo.Contructors.ComponentEvent;
import com.aerobridge.demo.Repositorys.ComponentEventRepository;

@Service
@Transactional
public class ComponentEventService {

    @Autowired
    ComponentEventRepository repo;

    public void addToAircraft(Component component, Aircraft aircraft) {
        ComponentEvent componentEvent = new ComponentEvent();
        componentEvent.setComponent(component);
        componentEvent.setDescription("Was added to aircraft");
        componentEvent.setStatus(component.getStatus());
        componentEvent.setEventDate(Date.valueOf(LocalDate.now()));
        componentEvent.setAerobridgeId(component.getAerobridgeId());
        componentEvent.setAircraftAID(aircraft.getAerobridgeId());
        repo.save(componentEvent);
    }

    public void updateStatus(Component component, String event) {
        ComponentEvent componentEvent = new ComponentEvent();
        componentEvent.setComponent(component);
        componentEvent.setDescription(event);
        componentEvent.setStatus(component.getStatus());
        componentEvent.setEventDate(Date.valueOf(LocalDate.now()));
        componentEvent.setAerobridgeId(component.getAerobridgeId());
        repo.save(componentEvent);
    }
}
