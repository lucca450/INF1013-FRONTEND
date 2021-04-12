package ca.uqtr.dmi.inf1013.repos;

import ca.uqtr.dmi.inf1013.model.Sector;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface SectorRepo extends CrudRepository<Sector,Long> {

    @Query(value = "select name from sector where id = ?1", nativeQuery = true)
    Optional<String> getNameById(Long id);
}
