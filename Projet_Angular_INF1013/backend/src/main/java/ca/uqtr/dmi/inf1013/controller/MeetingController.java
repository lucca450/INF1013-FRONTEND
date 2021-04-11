package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.Meeting;
import ca.uqtr.dmi.inf1013.model.User;
import ca.uqtr.dmi.inf1013.services.MeetingService;
import ca.uqtr.dmi.inf1013.services.impl.MeetingServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/meetings")
public class MeetingController {

    private MeetingService meetingService;

    public MeetingController(MeetingService meetingService){
        this.meetingService = meetingService;
    }

    @PostMapping(path = "/add")
    public Meeting addMeeting(@RequestBody Meeting meeting){
        return meetingService.addMeeting(meeting);
    }

    @GetMapping(path = "/getAll")
    public Iterable<Meeting> getAllMeetings(){ // maybe List et non iterable
        return meetingService.getAllMeetings();
    }

    @GetMapping(path = "/get/{ID}")
    public Meeting getMeetingById(@PathVariable("ID")  Long id){
        System.out.println(id);
        Optional<Meeting> s = meetingService.getMeetingById(id);
        return s.orElseThrow(()-> new RuntimeException("Rencontre non trouvé"));
    }

    @GetMapping(path = "/getByPersonId/{PersonID}")
    public Iterable<Meeting> getMeetingByPersonId(@PathVariable("PersonID")  Long id){
      return meetingService.getMeetingByPersonId(id);
    }

    @GetMapping(path = "/getByIntervenantId/{IntervenantID}")
    public Iterable<Meeting> getMeetingByIntervenantId(@PathVariable("IntervenantID")  Long id){
        return meetingService.getMeetingByIntervenantId(id);
    }

    @GetMapping(path = "/getByPersonIdAndIntervenantId/{PersonID}/{IntervenantID}")
    public Iterable<Meeting> getMeetingsByIdPersonAndAndIdIntervenant(@PathVariable("PersonID")  Long idPerson, @PathVariable("IntervenantID")  Long idIntervenant){
        return meetingService.getMeetingsByIdPersonAndAndIdIntervenant(idPerson, idIntervenant);
    }

    @PutMapping(path = "/edit")
    public Meeting editMeeting(@RequestBody Meeting meeting){
        return meetingService.editMeeting(meeting);
    }

}
