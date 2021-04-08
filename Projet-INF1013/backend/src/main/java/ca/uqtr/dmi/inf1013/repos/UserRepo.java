package ca.uqtr.dmi.inf1013.repos;

import ca.uqtr.dmi.inf1013.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends CrudRepository<User,Long> { // Va récupérer le champs id dans users en lui mentionnant le type (Doit etre le first)

}
