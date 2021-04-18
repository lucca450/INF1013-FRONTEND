package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.EmergencyContact;
import ca.uqtr.dmi.inf1013.model.FollowedBy;
import ca.uqtr.dmi.inf1013.model.Meeting;
import ca.uqtr.dmi.inf1013.services.EmergencyContactService;
import ca.uqtr.dmi.inf1013.services.FollowedByService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/followedBy")
public class FollowedByController {

    private FollowedByService followedByService;
    public FollowedByController(FollowedByService followedByService){
        this.followedByService = followedByService;
    }

    @PostMapping(path = "/add")
    public FollowedBy addFollowedBy(@RequestBody FollowedBy followedBy){
        return followedByService.addFollowedBy(followedBy);
    }

    @PutMapping(path = "/edit")
    public FollowedBy editFollowedBy(@RequestBody FollowedBy followedBy){
        return followedByService.editFollowedBy(followedBy);
    }

    @GetMapping(path = "/get/{ID}")
    public FollowedBy getFollowedById(@PathVariable("ID")  Long id){
        Optional<FollowedBy> s = followedByService.getFollowedById(id);
        return s.orElseThrow(()-> new RuntimeException("Suivi non trouvé"));
    }

}