package ca.uqtr.dmi.inf1013.services;

import ca.uqtr.dmi.inf1013.model.EmergencyContact;

public interface EmergencyContactService {
    EmergencyContact editEmergencyContact(EmergencyContact emergencyContact);
    EmergencyContact addEmergencyContact(EmergencyContact emergencyContact);
}
