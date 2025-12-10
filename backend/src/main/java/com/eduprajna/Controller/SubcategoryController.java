package com.eduprajna.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eduprajna.entity.Subcategory;
import com.eduprajna.repository.SubcategoryRepository;

@RestController
@RequestMapping("/api/subcategories")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"}, allowCredentials = "true")
public class SubcategoryController {
    private final SubcategoryRepository subcategoryRepository;

    public SubcategoryController(SubcategoryRepository subcategoryRepository) {
        this.subcategoryRepository = subcategoryRepository;
    }

    @GetMapping("")
    public List<Subcategory> getSubcategories(@RequestParam(required = false) Long categoryId) {
        if (categoryId != null) {
            return subcategoryRepository.findByCategoryId(categoryId);
        }
        return subcategoryRepository.findAll();
    }
}
