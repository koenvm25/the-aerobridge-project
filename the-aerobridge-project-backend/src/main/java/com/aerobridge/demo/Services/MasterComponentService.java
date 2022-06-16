package com.aerobridge.demo.Services;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import com.aerobridge.demo.Contructors.Component;
import com.aerobridge.demo.Contructors.MasterComponent;
import com.aerobridge.demo.Contructors.Webscraper;
import com.aerobridge.demo.Repositorys.ComponentRespository;
import com.aerobridge.demo.Repositorys.MasterComponentRepository;
import com.aerobridge.demo.Services.MasterComponentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MasterComponentService {
    @Autowired
    MasterComponentRepository masterComponentRepo;

    @Autowired
    ComponentRespository componentRepo;

    public void save(MasterComponent masterComponent) {
        masterComponentRepo.save(masterComponent);
    }

    public Iterable<MasterComponent> findAll() {
        return masterComponentRepo.findAll();
    }

    public ResponseEntity<ArrayList<MasterComponent>> getLowStock() {
        try {
            updateAvailable();
            Iterable<MasterComponent> masterComponents = findAll();
            ArrayList<MasterComponent> returnList = new ArrayList<MasterComponent>();
            for (MasterComponent masterComponent : masterComponents) {
                List<Component> components = (List<Component>) componentRepo
                        .getAvailable(masterComponent.getMasterComponentId());
                if (components.size() < masterComponent.getMinimalStock() && returnList.size() < 5) {
                    returnList.add(masterComponent);
                }
            }
            return new ResponseEntity<ArrayList<MasterComponent>>(returnList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void updateAvailable() {
        Iterable<MasterComponent> masterComponents = findAll();
        for (MasterComponent masterComponent : masterComponents) {
            List<Component> components = (List<Component>) componentRepo
                    .getAvailable(masterComponent.getMasterComponentId());
            masterComponent.setAvailableStock(components.size());
        }
    }

    public MasterComponent findByIdComp(Integer masterCompId) {
        return masterComponentRepo.findById(masterCompId).get();
    }

    public ResponseEntity<MasterComponent> findById(Integer masterComponentId) {
        try {
            MasterComponent masterComponent = masterComponentRepo.findById(masterComponentId).get();
            return new ResponseEntity<MasterComponent>(masterComponent, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<MasterComponent>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> addMasterComponent(MasterComponent masterComponent) {
        masterComponent.setCreatedAt(Date.valueOf(LocalDate.now()));
        masterComponent.setUpdatedAt(Date.valueOf(LocalDate.now()));
        save(masterComponent);
        return new ResponseEntity<>(masterComponent.getMasterComponentId(), HttpStatus.OK);
    }

    public ResponseEntity<?> getAllComponents(Integer masterComponentId) {
        try {
            MasterComponent masterComponent = masterComponentRepo.findById(masterComponentId).get();
            List<Component> components = masterComponent.getComponents();
            return new ResponseEntity<>(components, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> editMasterComponent(MasterComponent masterComponent, Integer masterComponentId) {
        try {
            MasterComponent existMasterComponent = masterComponentRepo.findById(masterComponentId).get();
            Boolean changed = false;
            if (masterComponent.getName() != null && !masterComponent.getName().equals("")) {
                existMasterComponent.setName(masterComponent.getName());
                changed = true;
            }
            if (masterComponent.getSource() != null && !masterComponent.getSource().equals("")) {
                existMasterComponent.setSource(masterComponent.getSource());
                changed = true;
            }
            if (masterComponent.getFamily() != null && !masterComponent.getFamily().equals("")) {
                existMasterComponent.setFamily(masterComponent.getFamily());
                changed = true;
            }
            if (masterComponent.getFavouriteStore() != null && !masterComponent.getFavouriteStore().equals("")) {
                existMasterComponent.setFavouriteStore(masterComponent.getFavouriteStore());
                changed = true;
            }
            if (masterComponent.getGtinId() != null) {
                existMasterComponent.setGtinId(masterComponent.getGtinId());
                changed = true;
            }
            if (masterComponent.getMinimalStock() != null) {
                existMasterComponent.setMinimalStock(masterComponent.getMinimalStock());
                changed = true;
            }
            if (changed) {
                existMasterComponent.setUpdatedAt(Date.valueOf(LocalDate.now()));
            }
            masterComponentRepo.save(existMasterComponent);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteById(Integer masterComponentId) {
        try {
            masterComponentRepo.deleteById(masterComponentId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void scrapeMastercomponents() {
        Iterable<MasterComponent> masterComponents = masterComponentRepo.findAll();
        for (MasterComponent masterComponent : masterComponents) {
            LocalDateTime localDateTime = LocalDateTime.now();
            Timestamp timestamp = Timestamp.valueOf(localDateTime);
            Webscraper webscraper = new Webscraper(masterComponent.getFavouriteStore());
            masterComponent.setLatestPrice(webscraper.scrapeItem());
            masterComponent.setPriceUpdatedAt(timestamp);
            masterComponentRepo.save(masterComponent);
        }
    }
}
