package com.aerobridge.demo.Controllers;

import java.util.ArrayList;
import java.util.Map;

import com.aerobridge.demo.Contructors.Serie;
import com.aerobridge.demo.Services.SerieService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/serie")
public class SerieController {

    @Autowired
    private SerieService serieService;

    // Returns all Series
    @GetMapping("")
    public @ResponseBody Iterable<Serie> getAllSeries() {
        return serieService.findAll();
    }

    // Returns all Series of a Model
    @GetMapping("/model/{modelId}")
    public ResponseEntity<Iterable<Serie>> getSeriesByModelId(@PathVariable Map<String, String> pathVarsMap) {
        try {
            Integer modelId = Integer.valueOf(pathVarsMap.get("modelId").toString());
            return serieService.findByModelId(modelId);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Get a single Serie
    @GetMapping("/{serieId}")
    public ResponseEntity<Serie> get(@PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer serieId = Integer.valueOf(pathVarsMap.get("serieId").toString());
            return serieService.findById(serieId);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Returns all MasterComponents of a Serie
    @GetMapping("/{serieId}/master-components")
    public ResponseEntity<?> getMasterComponents(@PathVariable Map<String, String> pathVarsMap) {
        try {
            Integer serieId = Integer.valueOf(pathVarsMap.get("serieId").toString());
            return serieService.getMasterComponents(serieId);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Add new Serie to a Model
    @PostMapping("/{modelId}")
    public ResponseEntity<?> add(@RequestBody Serie serie, @PathVariable Map<String, String> pathVarsMap) {
        try {
            Integer modelId = Integer.valueOf(pathVarsMap.get("modelId").toString());
            return serieService.addSerie(serie, modelId);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Add MasterComponents to a Serie
    @PostMapping("/{serieId}/master-components")
    public ResponseEntity<?> addMasterComponents(@RequestBody JSONObject masterComponentIdsObject,
            @PathVariable Map<String, String> pathVarsMap) {
        try {
            Integer serieId = Integer.valueOf(pathVarsMap.get("serieId").toString());
            ArrayList<?> masterComponentIds = (ArrayList<?>) masterComponentIdsObject.get("addedMasterComponents");
            return serieService.addMasterComponents(masterComponentIds, serieId);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Edit MasterComponents of a Serie
    @PutMapping("/{serieId}/master-components")
    public ResponseEntity<?> editMasterComponents(@RequestBody JSONObject masterComponentIdsObject,
            @PathVariable Map<String, String> pathVarsMap) {
        try {
            Integer serieId = Integer.valueOf(pathVarsMap.get("serieId").toString());
            ArrayList<?> masterComponentIds = (ArrayList<?>) masterComponentIdsObject.get("masterComponents");
            return serieService.editMasterComponents(masterComponentIds, serieId);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // Edit a Serie
    @PutMapping("/{serieId}")
    public ResponseEntity<?> update(@RequestBody Serie serie,
            @PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer serieId = Integer.valueOf(pathVarsMap.get("serieId").toString());
            return serieService.update(serie, serieId);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Delete a Serie
    @DeleteMapping("/{serieId}")
    public ResponseEntity<?> delete(@PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer serieId = Integer.valueOf(pathVarsMap.get("serieId").toString());
            return serieService.deleteById(serieId);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
