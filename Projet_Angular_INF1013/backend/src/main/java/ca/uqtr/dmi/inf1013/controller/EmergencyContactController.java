package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.EmergencyContact;
import ca.uqtr.dmi.inf1013.services.EmergencyContactService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/emergencyContacts")
public class EmergencyContactController {

    private EmergencyContactService emergencyContactService;
    public EmergencyContactController(EmergencyContactService emergencyContactService){
        this.emergencyContactService = emergencyContactService;
    }

    @PostMapping(path = "/add")
    public EmergencyContact addEmergencyConntact(@RequestBody EmergencyContact emergencyContact){
        return emergencyContactService.addEmergencyContact(emergencyContact);
    }

    @PutMapping(path = "/edit")
    public EmergencyContact editEmergencyConntact(@RequestBody EmergencyContact emergencyContact){
        return emergencyContactService.editEmergencyContact(emergencyContact);
    }

    @GetMapping(path = "/get/{ID}")
    public Optional<EmergencyContact> getEmergencyContactById(@PathVariable("ID")  Long id){
        return emergencyContactService.getEmergencyContactById(id);
    }

}
