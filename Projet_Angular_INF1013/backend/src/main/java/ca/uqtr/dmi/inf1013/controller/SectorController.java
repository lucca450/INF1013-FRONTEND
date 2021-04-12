package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.Sector;
import ca.uqtr.dmi.inf1013.services.SectorService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/sectors")
public class SectorController {
    private SectorService sectorService;

    public SectorController(SectorService sectorService){
        this.sectorService = sectorService;
    }

    @GetMapping(path = "/get")
    public Iterable<Sector> getSectors(){
        return this.sectorService.getSectors();
    }

    @GetMapping(path = "/getName/{ID}")
    public String getSectorFromId(@PathVariable("ID")  Long id){
        Optional<String> s =this.sectorService.getSectorFromId(id);
        return s.orElseThrow(()-> new RuntimeException("Le nom du secteur n'a pas été trouvé."));
    }
}
