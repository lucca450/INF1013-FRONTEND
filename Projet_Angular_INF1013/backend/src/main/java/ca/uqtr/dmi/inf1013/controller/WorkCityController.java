package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.WorkCity;
import ca.uqtr.dmi.inf1013.services.WorkCityService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/workCities")
public class WorkCityController {
    private WorkCityService workCityService;

    public WorkCityController(WorkCityService workCityService){
        this.workCityService = workCityService;
    }

    @GetMapping(path = "/get")
    public Iterable<WorkCity> getWorkCities(){
        return this.workCityService.getWorkCities();
    }

    @GetMapping(path = "/getName/{ID}")
    public Optional<String> getWorkCityFromId(@PathVariable("ID")  Long id){
        return this.workCityService.getWorkCityFromId(id);
    }
}
