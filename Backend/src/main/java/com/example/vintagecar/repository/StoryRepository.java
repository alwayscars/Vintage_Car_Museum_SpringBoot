package com.example.vintagecar.repository;

import com.example.vintagecar.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Long> {

    List<Story> findByCarId(Long carId);
}
