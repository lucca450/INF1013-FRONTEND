package ca.uqtr.dmi.inf1013.repos;

import ca.uqtr.dmi.inf1013.model.Reference;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ReferenceRepo extends CrudRepository<Reference,Long> {

    @Query(value = "select name from reference where id = ?1", nativeQuery = true)
    Optional<String> getNameById(Long id);
}
