package com.aerobridge.demo.Services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.NoSuchElementException;

import com.aerobridge.demo.Contructors.MasterComponent;
import com.aerobridge.demo.Contructors.Model;
import com.aerobridge.demo.Contructors.Serie;
import com.aerobridge.demo.Contructors.SerieMasterComponent;
import com.aerobridge.demo.Repositorys.MasterComponentRepository;
import com.aerobridge.demo.Repositorys.ModelRepository;
import com.aerobridge.demo.Repositorys.SerieMasterComponentRepository;
import com.aerobridge.demo.Repositorys.SerieRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SerieService {

    @Autowired
    private SerieRepository serieRepo;

    @Autowired
    private ModelRepository modelRepo;

    @Autowired
    private MasterComponentRepository masterComponentRepo;

    @Autowired
    private SerieMasterComponentRepository serieMasterComponentRepo;

    public Iterable<Serie> findAll() {
        return serieRepo.findAll();
    }

    public ResponseEntity<?> addSerie(Serie serie, Integer modelId) {
        serie.setCreatedAt(Date.valueOf(LocalDate.now()));
        serie.setUpdatedAt(Date.valueOf(LocalDate.now()));
        try {
            Model model = modelRepo.findById(modelId).get();
            serie.setModel(model);
            serieRepo.save(serie);
            return new ResponseEntity<>(serie, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Iterable<Serie>> findByModelId(Integer modelId) {
        try {
            Iterable<Serie> series = serieRepo.findByModelId(modelId);
            return new ResponseEntity<>(series, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Serie> findById(Integer serieId) {
        try {
            Serie serie = serieRepo.findById(serieId).get();
            return new ResponseEntity<Serie>(serie, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> getMasterComponents(Integer serieId) {
        try {
            Serie serie = serieRepo.findById(serieId).get();
            List<SerieMasterComponent> masterComponents = serie.getMasterComponents();
            return new ResponseEntity<>(masterComponents, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> addMasterComponents(ArrayList<?> masterComponents, Integer serieId) {
        try {
            Serie serie = serieRepo.findById(serieId).get();
            for (Object mCompObj : masterComponents) {
                LinkedHashMap<?, ?> masterComponentMap = (LinkedHashMap<?, ?>) mCompObj;
                Integer quantity = Integer.valueOf(masterComponentMap.get("quantity").toString());
                Integer masterComponentId = Integer.valueOf(masterComponentMap.get("masterComponentId").toString());
                MasterComponent masterComponent = masterComponentRepo.findById(masterComponentId).get();
                SerieMasterComponent serieMasterComponent = new SerieMasterComponent();
                serieMasterComponent.setQuantity(quantity);
                serieMasterComponent.setSerie(serie);
                serieMasterComponent.setMasterComponent(masterComponent);
                serieMasterComponentRepo.save(serieMasterComponent);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> editMasterComponents(ArrayList<?> newMasterComponents, Integer serieId) {
        try {
            Iterable<SerieMasterComponent> serieMasterComponents = serieMasterComponentRepo.findBySerieId(serieId);
            ArrayList<Integer> masterComponentIds = new ArrayList<Integer>();
            for (SerieMasterComponent serieMasterComponent : serieMasterComponents) {
                masterComponentIds.add(serieMasterComponent.getMasterComponent().getMasterComponentId());
            }
            Serie serie = serieRepo.findById(serieId).get();
            for (Object newMasterComponentObj : newMasterComponents) {
                LinkedHashMap<?, ?> newMasterComponent = (LinkedHashMap<?, ?>) newMasterComponentObj;
                Integer quantity = Integer.valueOf(newMasterComponent.get("quantity").toString());
                Integer masterComponentId = Integer.valueOf(newMasterComponent.get("masterComponentId").toString());
                if (!masterComponentIds.contains(masterComponentId)) {
                    MasterComponent masterComponent = masterComponentRepo.findById(masterComponentId).get();
                    SerieMasterComponent serieMasterComponent = new SerieMasterComponent();
                    serieMasterComponent.setQuantity(quantity);
                    serieMasterComponent.setSerie(serie);
                    serieMasterComponent.setMasterComponent(masterComponent);
                    serieMasterComponentRepo.save(serieMasterComponent);
                } else if (masterComponentIds.contains(masterComponentId)) {
                    SerieMasterComponent serieMasterComponent = serieMasterComponentRepo
                            .findByMaterComponentIdAndSerieId(masterComponentId, serie.getSerieId()).get();
                    if (serieMasterComponent.getQuantity() != quantity) {
                        System.out.println("test");
                        System.out.println(quantity);
                        serieMasterComponent.setQuantity(quantity);
                        serieMasterComponentRepo.save(serieMasterComponent);
                    }
                }
            }
            for (SerieMasterComponent serieMasterComponent : serieMasterComponents) {
                Boolean found = false;
                for (Object mCompObj : newMasterComponents) {
                    LinkedHashMap<?, ?> mComp = (LinkedHashMap<?, ?>) mCompObj;
                    Integer masterComponentId = Integer.valueOf(mComp.get("masterComponentId").toString());
                    if (serieMasterComponent.getMasterComponent().getMasterComponentId().equals(masterComponentId)) {
                        found = true;
                        Integer quantity = Integer.valueOf(mComp.get("quantity").toString());
                        serieMasterComponent.setQuantity(quantity);
                        serieMasterComponentRepo.save(serieMasterComponent);
                    }
                }
                if (!found) {
                    serieMasterComponentRepo.deleteById(serieMasterComponent.getSerieMasterComponentId());
                    found = false;
                }
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    public ResponseEntity<?> update(Serie serie, Integer serieId) {
        try {
            Serie existingSerie = serieRepo.findById(serieId).get();
            Boolean changed = false;
            if (serie.getSerie() != null && !serie.getSerie().equals("")) {
                existingSerie.setSerie(serie.getSerie());
                changed = true;
            }
            if (serie.getDimensionLength() != null) {
                existingSerie.setDimensionLength(serie.getDimensionLength());
                changed = true;
            }
            if (serie.getDimensionWidth() != null) {
                existingSerie.setDimensionWidth(serie.getDimensionWidth());
                changed = true;
            }
            if (serie.getDimensionHeight() != null) {
                existingSerie.setDimensionHeight(serie.getDimensionHeight());
                changed = true;
            }
            if (serie.getMaxRange() != null) {
                existingSerie.setMaxRange(serie.getMaxRange());
                changed = true;
            }
            if (serie.getMaxSpeed() != null) {
                existingSerie.setMaxSpeed(serie.getMaxSpeed());
                changed = true;
            }
            if (serie.getMaxEndurance() != null) {
                existingSerie.setMaxEndurance(serie.getMaxEndurance());
                changed = true;
            }
            if (changed) {
                existingSerie.setUpdatedAt(Date.valueOf(LocalDate.now()));
            }
            serieRepo.save(existingSerie);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> deleteById(Integer serieId) {
        try {
            serieMasterComponentRepo.deleteBySerieId(serieId);
            serieRepo.deleteById(serieId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
