package ca.uqtr.dmi.inf1013.repos;

import ca.uqtr.dmi.inf1013.model.Person;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepo extends CrudRepository<Person,Long> {
    Optional<List<Person>> findByActive(boolean b);

    @Query(value = "select * from person order by active desc", nativeQuery = true)
    Iterable<Person> findAllUsersOrderByActive();
}
