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

  public UserServiceimpl(UserRepo userRepo) {
    this.userRepo = userRepo;
  }
  @Override
  public Optional<User> getUser(Long id) {
    return userRepo.findById(id);
  }

  @Override
  public Optional<List<User>> getUsers(Long... id) {
    return Optional.empty();
  }
}
