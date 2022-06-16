package com.aerobridge.demo.Controllers;

import java.util.Map;

import com.aerobridge.demo.Contructors.Model;
import com.aerobridge.demo.Services.ModelService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/model")
public class ModelController {

    @Autowired
    private ModelService modelService;

    // Returns all Models
    @GetMapping("")
    public @ResponseBody Iterable<Model> getAllModels() {
        return modelService.findAll();
    }

    // Returns a single Model
    @GetMapping("/{id}")
    public ResponseEntity<Model> get(@PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer id = Integer.valueOf(pathVarsMap.get("id").toString());
            return modelService.findById(id);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Add a new Model
    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody Model model) {
        return modelService.newModel(model);
    }

    // Edit a Model
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Model model,
            @PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer id = Integer.valueOf(pathVarsMap.get("id").toString());
            return modelService.editModel(model, id);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Delete a Model
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer id = Integer.valueOf(pathVarsMap.get("id").toString());
            return modelService.deleteById(id);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
