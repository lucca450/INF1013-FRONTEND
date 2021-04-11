package ca.uqtr.dmi.inf1013.services.impl;

import ca.uqtr.dmi.inf1013.model.EmergencyContact;
import ca.uqtr.dmi.inf1013.repos.EmergencyContactRepo;
import ca.uqtr.dmi.inf1013.services.EmergencyContactService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmergencyContactServiceImpl implements EmergencyContactService {

    private EmergencyContactRepo emergencyContactRepo;

    public EmergencyContactServiceImpl(EmergencyContactRepo emergencyContactRepo){
        this.emergencyContactRepo = emergencyContactRepo;
    }

    @Override
    public EmergencyContact editEmergencyContact(EmergencyContact emergencyContact) {
        return this.emergencyContactRepo.save(emergencyContact);
    }
    @Override
    public EmergencyContact addEmergencyContact(EmergencyContact emergencyContact) {
        return this.emergencyContactRepo.save(emergencyContact);
    }

    @Override
    public Optional<EmergencyContact> getEmergencyContactById(Long id) {
        return this.emergencyContactRepo.findById(id);
    }
}
