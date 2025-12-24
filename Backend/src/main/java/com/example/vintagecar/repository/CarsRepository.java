package com.example.vintagecar.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.vintagecar.entity.Cars;
import java.util.List;
public interface CarsRepository extends JpaRepository<Cars, Long> {
    List<Cars> findByYearRange(String yearRange);


}
