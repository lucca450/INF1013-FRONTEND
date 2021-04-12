package ca.uqtr.dmi.inf1013.repos;

import ca.uqtr.dmi.inf1013.model.DepartureReason;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface DepartureReasonRepo extends CrudRepository<DepartureReason,Long> {

    @Query(value = "select name from departure_reason where id = ?1", nativeQuery = true)
    Optional<String> getNameById(Long id);
}
