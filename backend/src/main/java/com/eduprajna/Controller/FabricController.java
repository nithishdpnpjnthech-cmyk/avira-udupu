package com.eduprajna.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eduprajna.entity.Fabric;
import com.eduprajna.repository.FabricRepository;

@RestController
@RequestMapping("/api/fabrics")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"}, allowCredentials = "true")
public class FabricController {
    private final FabricRepository fabricRepository;

    public FabricController(FabricRepository fabricRepository) {
        this.fabricRepository = fabricRepository;
    }

    @GetMapping("")
    public List<Fabric> getAllFabrics() {
        return fabricRepository.findAll();
    }
}
