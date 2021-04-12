package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.DepartureReason;
import ca.uqtr.dmi.inf1013.services.DepartureReasonService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/departureReasons")

public class DepartureReasonController {

    private DepartureReasonService departureReasonService;

    public DepartureReasonController(DepartureReasonService departureReasonService){ // Qualifer, il va chercher le @Service dans notre service
        this.departureReasonService = departureReasonService;
    }

    @GetMapping(path = "/get")
    public Iterable<DepartureReason> getDepartureReasons(){
        return this.departureReasonService.getDeparturesReason();
    }

    @GetMapping(path = "/getName/{ID}")
    public String getDepartureNameFromId(@PathVariable("ID")  Long id){
        Optional<String> s =this.departureReasonService.getDepartureReasonFromId(id);
        return s.orElseThrow(()-> new RuntimeException("Le nom du département n'a pas été trouvé."));
    }
}
