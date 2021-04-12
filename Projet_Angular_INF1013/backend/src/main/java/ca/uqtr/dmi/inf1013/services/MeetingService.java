package ca.uqtr.dmi.inf1013.services;
import ca.uqtr.dmi.inf1013.model.Meeting;
import java.util.Optional;

public interface MeetingService {
    Meeting addMeeting(Meeting meeting);
    Meeting editMeeting(Meeting meeting);
    Iterable<Meeting> getAllMeetings();
    Optional<Meeting> getMeetingById(Long id);
    Iterable<Meeting> getMeetingByPersonId(Long id);
    Iterable<Meeting> getMeetingByIntervenantId(Long id);
    Iterable<Meeting> getMeetingsByIdPersonAndAndIdIntervenant(Long idPerson, Long idIntervenant);
}
