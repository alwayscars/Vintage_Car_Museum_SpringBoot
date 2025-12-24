package com.example.vintagecar.service;

import com.example.vintagecar.entity.Cars;
import com.example.vintagecar.repository.CarsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    @Autowired
    private CarsRepository carsRepository;

    private final String PROJECT_ROOT = System.getProperty("user.dir");
    private final String IMAGE_UPLOAD_PATH = PROJECT_ROOT + "/src/main/java/com/example/vintagecar/uploads/images/";
    private final String AUDIO_UPLOAD_PATH = PROJECT_ROOT + "/src/main/java/com/example/vintagecar/uploads/audio/";


    // ---------------------------------------------------------
    // CREATE CAR
    // ---------------------------------------------------------
    public Cars create(Cars car, MultipartFile image, MultipartFile audio) throws IOException {

        File imageDir = new File(IMAGE_UPLOAD_PATH);
        File audioDir = new File(AUDIO_UPLOAD_PATH);

        if (!imageDir.exists()) imageDir.mkdirs();
        if (!audioDir.exists()) audioDir.mkdirs();

        if (image != null && !image.isEmpty()) {
            String originalFilename = StringUtils.cleanPath(image.getOriginalFilename());
            String imageFileName = System.currentTimeMillis() + "_" + originalFilename;

            File destFile = new File(IMAGE_UPLOAD_PATH + imageFileName);
            image.transferTo(destFile);

            car.setImageUrl("/uploads/images/" + imageFileName);
        }

        if (audio != null && !audio.isEmpty()) {
            String originalFilename = StringUtils.cleanPath(audio.getOriginalFilename());
            String audioFileName = System.currentTimeMillis() + "_" + originalFilename;

            File destFile = new File(AUDIO_UPLOAD_PATH + audioFileName);
            audio.transferTo(destFile);

            car.setAudioUrl("/uploads/audio/" + audioFileName);
        }

        return carsRepository.save(car);
    }


    // ---------------------------------------------------------
    // DELETE CAR
    // ---------------------------------------------------------
    public String delete(Long id) {
        Optional<Cars> carOpt = carsRepository.findById(id);
        if (carOpt.isEmpty()) return "Car not found!";

        Cars car = carOpt.get();
        carsRepository.deleteById(id);
        return "Deleted Successfully!";
    }


    // ---------------------------------------------------------
    // GET CAR BY ID
    // ---------------------------------------------------------
    public Cars getById(Long id) {
        return carsRepository.findById(id).orElse(null);
    }


    // ---------------------------------------------------------
    // GET BY YEAR RANGE
    // ---------------------------------------------------------
    public List<Cars> getByYearRange(String yearRange) {
        return carsRepository.findByYearRange(yearRange);
    }


    // ---------------------------------------------------------
    // GET ALL CARS
    // ---------------------------------------------------------
    public List<Cars> getAllCars() {
        return carsRepository.findAll();
    }
}
