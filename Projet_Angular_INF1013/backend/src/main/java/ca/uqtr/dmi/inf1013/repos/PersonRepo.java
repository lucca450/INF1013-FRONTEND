package ca.uqtr.dmi.inf1013.repos;

import ca.uqtr.dmi.inf1013.model.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepo extends CrudRepository<Person,Long> {
}
