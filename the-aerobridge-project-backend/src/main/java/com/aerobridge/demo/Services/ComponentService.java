package com.aerobridge.demo.Services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;

import com.aerobridge.demo.Controllers.AerobridgeId;
import com.aerobridge.demo.Contructors.Component;
import com.aerobridge.demo.Contructors.ComponentEvent;
import com.aerobridge.demo.Contructors.MasterComponent;
import com.aerobridge.demo.Repositorys.ComponentEventRepository;
import com.aerobridge.demo.Repositorys.ComponentRespository;
import com.aerobridge.demo.Repositorys.MasterComponentRepository;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ComponentService {

    @Autowired
    private ComponentRespository repo;

    @Autowired
    private MasterComponentRepository masterComponentRepo;

    @Autowired
    private ComponentEventRepository componentEventRepo;

    @Autowired
    private ComponentEventService componentEventService;

    public Iterable<Component> findAll() {
        return repo.findAll();
    }

    public void save(Component component) {
        repo.save(component);
    }

    public ResponseEntity<List<Component>> findByMasterComponent(Integer masterComponentId) {
        try {
            MasterComponent masterComponent = masterComponentRepo.findById(masterComponentId).get();
            List<Component> components = masterComponent.getComponents();
            return new ResponseEntity<>(components, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<ComponentEvent>> findByAID(String aerobridgeId) {
        HttpHeaders responseHeaders = new HttpHeaders();
        try {
            List<ComponentEvent> componentHistory = (List<ComponentEvent>) componentEventRepo
                    .getComponentByAID(aerobridgeId);
            componentHistory.sort(Comparator.comparing(ComponentEvent::getEventDate));
            Collections.reverse(componentHistory);
            responseHeaders.add("Type", "Component");
            return new ResponseEntity<>(componentHistory, responseHeaders, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<List<ComponentEvent>>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Component> findById(Integer id) {
        try {
            Component Component = repo.findById(Integer.valueOf(id)).get();
            return new ResponseEntity<Component>(Component, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Component>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> newComponent(JSONObject object, Integer masterComponentId) {
        try {
            Integer amount = Integer.valueOf(object.get("amount").toString());
            String status = object.get("status").toString();
            String location = object.get("location").toString();
            MasterComponent masterComponent = masterComponentRepo.findById(masterComponentId).get();
            for (int i = 0; i < amount; i++) {
                Component component = new Component();
                component.setAerobridgeId(AerobridgeId.generateId("C"));
                component.setMasterComponent(masterComponent);
                component.setStatus(status);
                component.setLocation(location);
                component.setName(masterComponent.getName());
                component.setCreatedAt(Date.valueOf(LocalDate.now()));
                component.setUpdatedAt(Date.valueOf(LocalDate.now()));
                repo.save(component);
                componentEventService.updateStatus(component, "Component was created");

            }
            return new ResponseEntity<Component>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Component>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    public ResponseEntity<?> editComponent(Component component, Integer id) {
        try {
            Component existComponent = repo.findById(id).get();
            Boolean changed = false;
            String eventManager = "";
            if (component.getStatus() != null && !component.getStatus().equals("")) {
                existComponent.setStatus(component.getStatus());
                eventManager = eventManager + "1";
                changed = true;
            }
            if (component.getLocation() != null && !component.getLocation().equals("")) {
                existComponent.setLocation(component.getLocation());
                eventManager = eventManager + "2";
                changed = true;
            }
            if (changed) {
                existComponent.setUpdatedAt(Date.valueOf(LocalDate.now()));
                String event = "";
                if (eventManager.equals("12")) {
                    event = "Status and Location changed";
                } else if (eventManager.equals("1")) {
                    event = "Status changed";
                } else if (eventManager.equals("2")) {
                    event = "Location changed";
                }
                componentEventService.updateStatus(existComponent, event);
            }
            save(existComponent);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteById(Integer id) {
        try {
            repo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
