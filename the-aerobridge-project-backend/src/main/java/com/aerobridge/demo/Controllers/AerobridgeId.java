package com.aerobridge.demo.Controllers;

import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aerobridge.demo.Services.AircraftService;
import com.aerobridge.demo.Services.ComponentService;

@RestController
@CrossOrigin
@RequestMapping(path = "/aerobridge-id")
public class AerobridgeId {

    @Autowired
    private ComponentService componentService;

    @Autowired
    private AircraftService aircraftService;

    // Returns a rondom ID that starts with a Type 
    public static String generateId(String type) {
        String returnString = type + "-" + randomChars();
        return returnString;
    }

    // Returns 6 random charactors
    private static String randomChars() {
        Random r = new Random();
        String returnString = "";
        String alphabet = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (int i = 0; i < 6; i++) {
            returnString = returnString + alphabet.charAt(r.nextInt(alphabet.length()));
        }
        return returnString;
    }

    // API mapping to find component or aircraft by AerobridgeID
    @GetMapping("/{aerobridgeId}")
    public ResponseEntity<?> findOnAerobridgeId(@PathVariable Map<String, Object> pathVarsMap) {
        try {
            String aerobridgeId = pathVarsMap.get("aerobridgeId").toString();
            if (aerobridgeId.startsWith("C")) {
                return componentService.findByAID(aerobridgeId);
            } else if (aerobridgeId.startsWith("A")) {
                return aircraftService.findByAID(aerobridgeId);
            }
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
