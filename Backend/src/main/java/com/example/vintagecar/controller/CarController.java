package com.example.vintagecar.controller;

import com.example.vintagecar.entity.Cars;
import com.example.vintagecar.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarController {

    @Autowired
    private CarService carService;


    // ---------------------------------------------------------
    // CREATE CAR
    // ---------------------------------------------------------
    @PostMapping("/create")
    public Cars createCar(
            @RequestParam("model") String model,
            @RequestParam("brand") String brand,
            @RequestParam("yearRange") String yearRange,
            @RequestParam("description") String description,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestPart(value = "audio", required = false) MultipartFile audio
    ) throws IOException {

        Cars car = new Cars();
        car.setModel(model);
        car.setBrand(brand);
        car.setYearRange(yearRange);
        car.setDescription(description);

        return carService.create(car, image, audio);
    }


    // ---------------------------------------------------------
    // DELETE CAR
    // ---------------------------------------------------------
    @DeleteMapping("/delete/{id}")
    public String deleteCar(@PathVariable Long id) {
        return carService.delete(id);
    }


    // ---------------------------------------------------------
    // GET CAR BY ID
    // ---------------------------------------------------------
    @GetMapping("/{id}")
    public Cars getCarById(@PathVariable Long id) {
        return carService.getById(id);
    }


    // ---------------------------------------------------------
    // GET BY YEAR RANGE
    // ---------------------------------------------------------
    @GetMapping("/year/{yearRange}")
    public List<Cars> getCarsByYearRange(@PathVariable String yearRange) {
        return carService.getByYearRange(yearRange);
    }


    // ---------------------------------------------------------
    // GET ALL CARS
    // ---------------------------------------------------------
    @GetMapping("/all")
    public List<Cars> getAllCars() {
        return carService.getAllCars();
    }
}
