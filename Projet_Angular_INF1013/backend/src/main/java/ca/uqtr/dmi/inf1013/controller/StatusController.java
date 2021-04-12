package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.Status;
import ca.uqtr.dmi.inf1013.services.StatusService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/status")

public class StatusController {
    private StatusService statusService;

    public StatusController(StatusService statusService){
        this.statusService = statusService;
    }

    @GetMapping(path = "/get")
    public Iterable<Status> getStatus(){
        return this.statusService.getStatus();
    }

    @GetMapping(path = "/getName/{ID}")
    public String getStatutFromId(@PathVariable("ID")  Long id){
        Optional<String> s =this.statusService.getStatutFromId(id);
        return s.orElseThrow(()-> new RuntimeException("Le nom du statut n'a pas été trouvé."));
    }
}
