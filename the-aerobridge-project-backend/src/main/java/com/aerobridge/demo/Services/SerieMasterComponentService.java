package com.aerobridge.demo.Services;

import javax.transaction.Transactional;

import com.aerobridge.demo.Contructors.SerieMasterComponent;
import com.aerobridge.demo.Repositorys.SerieMasterComponentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class SerieMasterComponentService {

    @Autowired
    private SerieMasterComponentRepository repo;

    public Iterable<SerieMasterComponent> findAll() {
        return repo.findAll();
    }

    public void save(SerieMasterComponent serieMasterComponent) {
        repo.save(serieMasterComponent);
    }

    public SerieMasterComponent findById(Integer id) {
        return repo.findById(id).get();
    }

    public void deleteById(Integer id) {
        repo.deleteById(id);
    }

    public void deleteBySerieId(Integer serieId) {
        repo.deleteBySerieId(serieId);
    }

    public Iterable<SerieMasterComponent> findBySerieId(Integer serieId) {
        return repo.findBySerieId(serieId);
    }
}
