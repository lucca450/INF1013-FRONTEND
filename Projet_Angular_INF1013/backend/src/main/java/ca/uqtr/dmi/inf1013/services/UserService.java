package ca.uqtr.dmi.inf1013.services;

import ca.uqtr.dmi.inf1013.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {

  Optional<User> getUser(Long id);
  Optional <List<User>> getActiveUsers();
  User addUser(User user);
  User editUser(User user);
  int activeDesactiveUser(Long id, Boolean activeDesactive);
}
