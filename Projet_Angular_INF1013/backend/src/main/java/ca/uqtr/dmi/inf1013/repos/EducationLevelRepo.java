package ca.uqtr.dmi.inf1013.repos;

import ca.uqtr.dmi.inf1013.model.EducationLevel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface EducationLevelRepo extends CrudRepository<EducationLevel,Long> {

    @Query(value = "select name from education_level where id = ?1", nativeQuery = true)
    Optional<String> getNameById(Long id);
}
