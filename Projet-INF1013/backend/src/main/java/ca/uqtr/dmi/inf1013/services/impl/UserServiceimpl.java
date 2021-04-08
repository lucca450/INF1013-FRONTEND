package ca.uqtr.dmi.inf1013.services.impl;

import ca.uqtr.dmi.inf1013.model.User;
import ca.uqtr.dmi.inf1013.repos.UserRepo;
import ca.uqtr.dmi.inf1013.services.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service // Faut préciser que c'est un service
public class UserServiceimpl implements UserService {
    private UserRepo userRepo;
/*
    List<Student> students = Arrays.asList(
            new Student(1,"Fadel","TOURE"),
            new Student(2,"Alex","Carbonneau"),
            new Student(3,"Luca","Posa Silva"),
            new Student(4,"Felix","Corriveau"),
            new Student(5,"Julien","Turcotte")

    );
    */


    public UserServiceimpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }


  @Override
  public Optional<User> getUser(Long id) {
             /* return students
                .stream()
                .filter(e->e.getId() == id)
                .findAny();*/

    return userRepo.findById(id);
  }

  @Override
  public Optional<List<User>> getUsers(Long... id) {
    return Optional.empty();
  }
}
