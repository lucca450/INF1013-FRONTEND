package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.Reference;
import ca.uqtr.dmi.inf1013.services.ReferenceService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/references")
public class ReferenceController {

    private ReferenceService referenceService;

    public ReferenceController(ReferenceService referenceService){
        this.referenceService = referenceService;
    }

    @GetMapping(path = "/get")
    public Iterable<Reference> getReferences(){
        return this.referenceService.getReferences();
    }

    @GetMapping(path = "/getName/{ID}")
    public Optional<String> getReferenceFromId(@PathVariable("ID")  Long id){
       return this.referenceService.getReferenceFromId(id);
    }
}
