package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.ResidenceType;
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
    public Optional<String> getResidenceTypeFromId(@PathVariable("ID")  Long id){
        return residenceTypeService.getResidenceTypeFromId(id);
    }
}
