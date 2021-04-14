package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.Person;
import ca.uqtr.dmi.inf1013.model.User;
import ca.uqtr.dmi.inf1013.services.PersonService;
import ca.uqtr.dmi.inf1013.services.impl.PersonServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping(path = "/get/{ID}")
    public Person getPerson(@PathVariable("ID")  Long id){
        Optional<Person> s =personService.getPerson(id);
        return s.orElseThrow(()-> new RuntimeException("Personne non trouvé"));
    }

    @GetMapping(path = "/active/get")
    public List<Person> getActivePersons(){
        Optional<List<Person>> s =personService.getActivePersons();
        return s.orElseThrow(()-> new RuntimeException("Aucune personnes"));
    }

    @GetMapping(path = "/getAll")
    public Iterable<Person> getAllUsers(){
        return this.personService.findAllPersonsOrderByActive();
    }

    @PostMapping(path = "/add")
    public Person addPerson(@RequestBody Person person){
        System.out.println("add");
        System.out.println(person);
        return personService.addPerson(person);
    }

    @PutMapping(path = "/edit")
    public Person editUser(@RequestBody Person person){ // PathVariable c'est pour dire que la variable est dans le path.
        return personService.editPerson(person);
    }

    @PatchMapping(path = "/activeDesactive/{ID}/{activeDesactive}")
    public int activeDesactivePerson(@PathVariable("ID")  Long id, @PathVariable("activeDesactive")  Boolean activeDesactive, @RequestBody Person person){
        return personService.activeDesactiveUser(id,activeDesactive);
    }


}
