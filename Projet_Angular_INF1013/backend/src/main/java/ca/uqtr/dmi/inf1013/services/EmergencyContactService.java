package ca.uqtr.dmi.inf1013.services;
import ca.uqtr.dmi.inf1013.model.EmergencyContact;
import java.util.Optional;

public interface EmergencyContactService {
    EmergencyContact editEmergencyContact(EmergencyContact emergencyContact);
    EmergencyContact addEmergencyContact(EmergencyContact emergencyContact);
    Optional<EmergencyContact> getEmergencyContactById(Long id);
}
