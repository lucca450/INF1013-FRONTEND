package ca.uqtr.dmi.inf1013.services;
import ca.uqtr.dmi.inf1013.model.Person;
import ca.uqtr.dmi.inf1013.model.User;

import java.util.List;
import java.util.Optional;

public interface PersonService {
    Person addPerson(Person person);
    Person editPerson(Person person);
    Optional<Person> getPerson(Long id);
    Optional<List<Person>> getActivePersons();
    Iterable<Person> findAllPersonsOrderByActive();
    int activeDesactiveUser(Long id, Boolean activeDesactive);
}
