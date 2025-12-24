package com.example.vintagecar.service;

import com.example.vintagecar.entity.Story;
import com.example.vintagecar.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoryService {

    @Autowired
    private StoryRepository storyRepository;

    // CREATE STORY
    public Story createStory(Story story) {
        return storyRepository.save(story);
    }

    // GET STORIES BY CAR ID
    public List<Story> getStoriesByCarId(Long carId) {
        return storyRepository.findByCarId(carId);
    }

    // GET ALL STORIES
    public List<Story> getAllStories() {
        return storyRepository.findAll();
    }

    // DELETE STORY
    public String deleteStory(Long id) {
        if (storyRepository.existsById(id)) {
            storyRepository.deleteById(id);
            return "Story deleted!";
        }
        return "Story not found!";
    }
}
