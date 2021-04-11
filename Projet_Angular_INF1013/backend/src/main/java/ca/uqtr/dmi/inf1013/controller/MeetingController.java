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
    private MeetingServiceImpl meetingServiceImpl;

    public MeetingController(MeetingService meetingService, MeetingServiceImpl meetingServiceImpl){
        this.meetingService = meetingService;
        this.meetingServiceImpl = meetingServiceImpl;
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

    @PutMapping(path = "/edit")
    public Meeting editMeeting(@RequestBody Meeting meeting){
        return meetingService.editMeeting(meeting);
    }

}
