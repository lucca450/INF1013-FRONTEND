package ca.uqtr.dmi.inf1013.repos;

import ca.uqtr.dmi.inf1013.model.ResidenceType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ResidenceTypeRepo extends CrudRepository<ResidenceType,Long> {

    @Query(value = "select name from residence_type where id = ?1", nativeQuery = true)
    Optional<String> getNameById(Long id);
}
