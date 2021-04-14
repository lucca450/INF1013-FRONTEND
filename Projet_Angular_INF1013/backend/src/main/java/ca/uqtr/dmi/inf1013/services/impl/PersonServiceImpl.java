package ca.uqtr.dmi.inf1013.services.impl;

import ca.uqtr.dmi.inf1013.model.Person;
import ca.uqtr.dmi.inf1013.repos.PersonRepo;
import ca.uqtr.dmi.inf1013.services.PersonService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public Person editPerson(Person person) {
        return this.personRepo.save(person);
    }

    @Override
    public Optional<Person> getPerson(Long id) {
        return this.personRepo.findById(id);
    }

    @Override
    public Optional<List<Person>> getActivePersons() {
        return this.personRepo.findByActive(true);
    }

    @Override
    public Iterable<Person> findAllPersonsOrderByActive() {
        return this.personRepo.findAllUsersOrderByActive();
    }

    @Override
    public int activeDesactiveUser(Long id, Boolean activeDesactive) {
        return this.personRepo.activeDesactivePerson(id,activeDesactive);
    }

}
