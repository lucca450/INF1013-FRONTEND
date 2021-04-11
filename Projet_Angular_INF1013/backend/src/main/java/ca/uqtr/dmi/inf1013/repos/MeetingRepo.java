package ca.uqtr.dmi.inf1013.repos;


import ca.uqtr.dmi.inf1013.model.Meeting;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MeetingRepo extends CrudRepository<Meeting,Long> {
    Iterable<Meeting> findByIdPerson(Number idPerson);
}
