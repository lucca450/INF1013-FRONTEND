package ca.uqtr.dmi.inf1013.repos;

import ca.uqtr.dmi.inf1013.model.WorkCity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface WorkCityRepo extends CrudRepository<WorkCity,Long> {

    @Query(value = "select name from work_city where id = ?1", nativeQuery = true)
    Optional<String> getNameById(Long id);
}
