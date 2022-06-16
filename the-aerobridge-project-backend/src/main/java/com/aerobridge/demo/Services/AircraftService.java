package com.aerobridge.demo.Services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import com.aerobridge.demo.Controllers.AerobridgeId;
import com.aerobridge.demo.Contructors.Aircraft;
import com.aerobridge.demo.Contructors.Component;
import com.aerobridge.demo.Contructors.Serie;
import com.aerobridge.demo.Contructors.SerieMasterComponent;
import com.aerobridge.demo.Repositorys.AircraftRepository;
import com.aerobridge.demo.Repositorys.ComponentRespository;
import com.aerobridge.demo.Repositorys.SerieRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AircraftService {

    @Autowired
    private AircraftRepository repo;

    @Autowired
    private ComponentRespository componentRepo;

    @Autowired
    private ComponentEventService componentEventService;

    @Autowired
    private MasterComponentService masterComponentService;

    @Autowired
    private SerieRepository serieRepo;

    public Iterable<Aircraft> findAll() {
        return repo.findAll();
    }

    public void save(Aircraft aircraft) {
        repo.save(aircraft);
    }

    public ResponseEntity<Aircraft> findByAID(String aerobridgeId) {
        HttpHeaders responseHeaders = new HttpHeaders();
        try {
            Aircraft aircraft = repo.getAircraftByAID(aerobridgeId).get();
            responseHeaders.set("type", "Aircraft");
            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(aircraft);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Aircraft>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Aircraft> findById(Integer id) {
        try {
            Aircraft Aircraft = repo.findById(Integer.valueOf(id)).get();
            return new ResponseEntity<Aircraft>(Aircraft, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Aircraft>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> updateComponents(Integer aircraftId, ArrayList<?> swappedComponents) {
        try {
            Aircraft aircraft = repo.findById(aircraftId).get();
            ArrayList<Component> newComponents = new ArrayList<Component>();
            List<Component> aircraftComponents = (List<Component>) componentRepo.getByAircraftId(aircraftId);
            for (Component aircraftComponent : aircraftComponents) {
                if (swappedComponents.contains(aircraftComponent.getComponentId())) {
                    List<Component> components = (List<Component>) componentRepo
                            .getAvailable(aircraftComponent.getMasterComponent().getMasterComponentId());
                    if (components.size() > 0) {
                        aircraftComponent.setAircraft(null);
                        aircraftComponent.setStatus("Broken");
                        componentEventService.updateStatus(aircraftComponent,
                                "Removed from aircraft and status updated");
                        components.get(0).setAircraft(aircraft);
                        components.get(0).setStatus("Assembled");
                        componentEventService.addToAircraft(components.get(0), aircraft);
                        newComponents.add(components.get(0));
                        componentRepo.save(aircraftComponent);
                        componentRepo.save(components.get(0));
                    }
                }
            }
            return new ResponseEntity<>(newComponents, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> addAircraft(Aircraft aircraft, Integer serieId) {
        try {
            ArrayList<Component> returnList = new ArrayList<>();
            Serie serie = serieRepo.findById(serieId).get();
            aircraft.setSerie(serie);
            aircraft.setAerobridgeId(AerobridgeId.generateId("A"));
            aircraft.setCreatedAt(Date.valueOf(LocalDate.now()));
            aircraft.setUpdatedAt(Date.valueOf(LocalDate.now()));
            repo.save(aircraft);
            List<SerieMasterComponent> serieMasterComponents = serie.getMasterComponents();
            for (SerieMasterComponent serieMasterComponent : serieMasterComponents) {
                Integer masterComponentId = serieMasterComponent.getMasterComponent().getMasterComponentId();
                List<Component> components = (List<Component>) componentRepo.getAvailable(masterComponentId);
                if (components.size() >= serieMasterComponent.getQuantity()) {
                    for (int i = 0; i < serieMasterComponent.getQuantity(); i++) {
                        Component component = components.get(i);
                        component.setAircraft(aircraft);
                        if (aircraft.getStatus().equals("Available")) {
                            component.setStatus("Assembled");
                        } else {
                            component.setStatus("In Assembly");
                        }
                        componentRepo.save(component);
                        componentEventService.addToAircraft(component, aircraft);
                        returnList.add(component);
                    }
                }
            }
            return new ResponseEntity<>(aircraft.getAircraftId(), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> editAircraft(Aircraft aircraft, Integer id) {
        try {
            Aircraft existAircraft = repo.findById(id).get();
            Boolean changed = false;
            if (aircraft.getOperator() != null) {
                existAircraft.setOperator(aircraft.getOperator());
                changed = true;
            }
            if (aircraft.getName() != null) {
                existAircraft.setName(aircraft.getName());
                changed = true;
            }
            if (aircraft.getStatus() != null && !aircraft.getStatus().equals("")) {
                if (aircraft.getStatus().equals("Available")) {
                    for (Component component : existAircraft.getComponents()) {
                        component.setStatus("Assembled");
                        componentRepo.save(component);
                        componentEventService.updateStatus(component, "Status updated");
                    }
                }
                existAircraft.setStatus(aircraft.getStatus());
                changed = true;
            }
            if (changed) {
                existAircraft.setUpdatedAt(Date.valueOf(LocalDate.now()));
            }
            save(existAircraft);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteById(Integer id) {
        try {
            Iterable<Component> components = componentRepo.getByAircraftId(id);
            for (Component component : components) {
                component.setAircraft(null);
                component.setStatus("Available");
                componentRepo.save(component);
                componentEventService.updateStatus(component, "Was removed from aircraft");
            }
            repo.deleteById(id);
            masterComponentService.updateAvailable();
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

}
