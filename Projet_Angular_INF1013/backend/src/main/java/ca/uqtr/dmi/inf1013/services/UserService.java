package ca.uqtr.dmi.inf1013.services;

import ca.uqtr.dmi.inf1013.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {

  Optional<User> getUser(Long id);
  Optional <List<User>> getActiveUsers();
  User addUser(User user);
  int editUser(User user);
  int activeDesactiveUser(Long id, Boolean activeDesactive);
  Optional<User> getSigninUser(String username, String password);
  long verifyUserExist(String username);
  Optional<String> getUserFullNameFromId(Long id);
  int editPassword(Long id, String password);
  Iterable<User> findAllUsersOrderByActive();
  int resetPasswordUSer(Long id, String password);
  int editUserWithoutPassword(User user);
  int skipFirstConnexionStep(Long id);
}
