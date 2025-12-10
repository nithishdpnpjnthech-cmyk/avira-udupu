package com.eduprajna.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eduprajna.entity.Subcategory;

public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {
    List<Subcategory> findByCategoryId(Long categoryId);
    boolean existsByNameAndCategoryId(String name, Long categoryId);
}
