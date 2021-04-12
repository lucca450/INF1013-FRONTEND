package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.EducationLevel;
import ca.uqtr.dmi.inf1013.services.EducationLevelService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/educationLevels")
public class EducationLevelController {
    private EducationLevelService educationLevelService;

    public EducationLevelController(EducationLevelService educationLevelService){
        this.educationLevelService = educationLevelService;
    }

    @GetMapping(path = "/get")
    public Iterable<EducationLevel> getEducationLevels(){
        return this.educationLevelService.getEducationLevels();
    }

    @GetMapping(path = "/getName/{ID}")
    public String getEducationLevelFromId(@PathVariable("ID")  Long id){
        Optional<String> s =this.educationLevelService.getEducationLevelFromId(id);
        return s.orElseThrow(()-> new RuntimeException("Le nom de l'éducation n'a pas été trouvé."));
    }
}
