package ca.uqtr.dmi.inf1013.repos;


import ca.uqtr.dmi.inf1013.model.EmergencyContact;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmergencyContactRepo extends CrudRepository<EmergencyContact,Long> {
}
