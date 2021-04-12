package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.Reference;
import ca.uqtr.dmi.inf1013.model.ResidenceType;
import ca.uqtr.dmi.inf1013.services.ReferenceService;
import ca.uqtr.dmi.inf1013.services.ResidenceTypeService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/residencesType")
public class ResidenceTypeController {
    private ResidenceTypeService residenceTypeService;

    public ResidenceTypeController(ResidenceTypeService residenceTypeService){
        this.residenceTypeService = residenceTypeService;
    }

    @GetMapping(path = "/get")
    public Iterable<ResidenceType> getResidencesType(){
        return this.residenceTypeService.getResidencesType();
    }

    @GetMapping(path = "/getName/{ID}")
    public String getResidenceTypeFromId(@PathVariable("ID")  Long id){
        Optional<String> s =residenceTypeService.getResidenceTypeFromId(id);
        return s.orElseThrow(()-> new RuntimeException("Le nom de la référence n'a pas été trouvé."));
    }
}
