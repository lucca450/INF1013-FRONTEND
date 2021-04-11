package ca.uqtr.dmi.inf1013.services.impl;

import ca.uqtr.dmi.inf1013.model.Person;
import ca.uqtr.dmi.inf1013.repos.PersonRepo;
import ca.uqtr.dmi.inf1013.services.PersonService;
import org.springframework.stereotype.Service;

@Service
public class PersonServiceImpl implements PersonService {

    private PersonRepo personRepo;

    public PersonServiceImpl(PersonRepo personRepo){
        this.personRepo = personRepo;
    }

    @Override
    public Person addPerson(Person person) {
        return this.personRepo.save(person);
    }

}
