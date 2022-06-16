package com.aerobridge.demo.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class PingController {

    // Return 'pong' if server is active
    @RequestMapping(method = RequestMethod.GET, path = "/api/ping")
    public ResponseEntity<String> getPing() {
        return ResponseEntity.ok("pong");
    }
}
