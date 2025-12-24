package com.example.vintagecar.controller;

import com.example.vintagecar.entity.Story;
import com.example.vintagecar.service.StoryService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stories")
@CrossOrigin(origins = "*")
public class StoryController {

    @Autowired
    private StoryService storyService;

    // CREATE STORY
    @PostMapping("/create")
    public Story createStory(@RequestBody Story story, HttpSession session) {

        // Get username from session
        String username = (String) session.getAttribute("username");

        if (username == null) {
            throw new RuntimeException("User not logged in");
        }

        // override username sent by frontend
        story.setUsername(username);

        return storyService.createStory(story);
    }

    // GET STORIES BY CAR ID
    @GetMapping("/car/{carId}")
    public List<Story> getStoriesByCarId(@PathVariable Long carId) {
        return storyService.getStoriesByCarId(carId);
    }

    // GET ALL STORIES
    @GetMapping("/all")
    public List<Story> getAllStories() {
        return storyService.getAllStories();
    }

    // DELETE STORY
    @DeleteMapping("/delete/{id}")
    public String deleteStory(@PathVariable Long id) {
        return storyService.deleteStory(id);
    }
}
