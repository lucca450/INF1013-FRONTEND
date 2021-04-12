package ca.uqtr.dmi.inf1013.repos;

import ca.uqtr.dmi.inf1013.model.Status;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface StatusRepo extends CrudRepository<Status,Long> {

    @Query(value = "select name from status where id = ?1", nativeQuery = true)
    Optional<String> getNameById(Long id);
}
