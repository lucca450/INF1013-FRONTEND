package ca.uqtr.dmi.inf1013.repos;


import ca.uqtr.dmi.inf1013.model.Meeting;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRepo extends CrudRepository<Meeting,Long> {
    Iterable<Meeting> findMeetingsByIdPerson(Long idPerson);
    Iterable<Meeting> findMeetingsByIdIntervenant(Long idIntervenant);
    Iterable<Meeting> findMeetingsByIdPersonAndAndIdIntervenant(Long idPerson, Long idIntervenant);
}
