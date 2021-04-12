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
    public String getReferenceFromId(@PathVariable("ID")  Long id){
        Optional<String> s =this.referenceService.getReferenceFromId(id);
        return s.orElseThrow(()-> new RuntimeException("Le nom de la référence n'a pas été trouvé."));
    }
}
