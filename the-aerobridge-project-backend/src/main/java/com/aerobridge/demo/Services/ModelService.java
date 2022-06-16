package com.aerobridge.demo.Services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.NoSuchElementException;

import com.aerobridge.demo.Contructors.Model;
import com.aerobridge.demo.Repositorys.ModelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ModelService {

    @Autowired
    private ModelRepository repo;

    public Iterable<Model> findAll() {
        return repo.findAll();
    }

    public void save(Model model) {
        repo.save(model);
    }

    public ResponseEntity<Model> findById(Integer id) {
        try {
            Model Model = repo.findById(Integer.valueOf(id)).get();
            return new ResponseEntity<Model>(Model, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Model>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> newModel(Model model) {
        try {
            model.setCreatedAt(Date.valueOf(LocalDate.now()));
            model.setUpdatedAt(Date.valueOf(LocalDate.now()));
            save(model);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Model>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<?> editModel(Model model, Integer id) {
        try {
            Model existModel = repo.findById(id).get();
            Boolean changed = false;
            if (model.getName() != null && !model.getName().equals("")) {
                existModel.setName(model.getName());
                changed = true;
            }
            if (model.getPopularName() != null && !model.getPopularName().equals("")) {
                existModel.setPopularName(model.getPopularName());
                changed = true;
            }
            if (model.getCategory() != null && !model.getCategory().equals("")) {
                existModel.setCategory(model.getCategory());
                changed = true;
            }
            if (changed) {
                existModel.setUpdatedAt(Date.valueOf(LocalDate.now()));
            }
            save(existModel);
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