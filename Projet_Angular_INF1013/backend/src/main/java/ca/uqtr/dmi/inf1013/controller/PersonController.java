package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.Person;
import ca.uqtr.dmi.inf1013.services.PersonService;
import ca.uqtr.dmi.inf1013.services.impl.PersonServiceImpl;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/persons")
public class PersonController {

    private PersonService personService;
    private PersonServiceImpl personServiceImpl;

    public PersonController(PersonService personService, PersonServiceImpl personServiceImpl){
        this.personService = personService;
        this.personServiceImpl = personServiceImpl;
    }

    @PostMapping(path = "/add")
    public Person addPerson(@RequestBody Person person){
        return personService.addPerson(person);
    }

}
