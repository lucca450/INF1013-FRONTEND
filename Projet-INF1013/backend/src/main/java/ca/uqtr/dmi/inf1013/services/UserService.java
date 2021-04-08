package ca.uqtr.dmi.inf1013.services;

import ca.uqtr.dmi.inf1013.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Optional<User> getUser(Long id);
    Optional <List<User>> getUsers(Long ... id);
}
