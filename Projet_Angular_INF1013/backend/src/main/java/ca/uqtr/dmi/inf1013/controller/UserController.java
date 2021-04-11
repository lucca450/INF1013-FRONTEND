package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.User;
import ca.uqtr.dmi.inf1013.services.UserService;
import ca.uqtr.dmi.inf1013.services.impl.UserServiceImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/users")
public class UserController {

  private UserService userService;
  private final UserServiceImpl userDetailsService;
  private PasswordEncoder passwordEncoder;

  public UserController(UserService userService, UserServiceImpl userDetailsService, PasswordEncoder passwordEncoder){ // Qualifer, il va chercher le @Service dans notre service
    this.userService = userService;
    this.userDetailsService = userDetailsService;
    this.passwordEncoder = passwordEncoder;
  }



 // public UserController(UserDetailsServiceImpl userDetailsService){
 //   this.userDetailsService = userDetailsService;
 // }

  @GetMapping(path = "/get/{ID}")
  public User getUser(@PathVariable("ID")  Long id){ // PathVariable c'est pour dire que la variable est dans le path.
    System.out.println(id);
    Optional<User> s =userService.getUser(id);
    return s.orElseThrow(()-> new RuntimeException("Étudiant non trouvé"));
  }

  @GetMapping(path = "/active/get")
  public List<User> getUser(){ // PathVariable c'est pour dire que la variable est dans le path.
    Optional<List<User>> s =userService.getActiveUsers();
    return s.orElseThrow(()-> new RuntimeException("Aucun utilisateurs"));
  }


  @PutMapping(path = "/edit")
  public User editUser(@RequestBody User user){ // PathVariable c'est pour dire que la variable est dans le path.
    return userService.editUser(user);
  }

  @PostMapping(path = "/add")
  public User addUser(@RequestBody User user){

    return userService.addUser(user);
  }


  @PatchMapping(path = "/activeDesactive/{ID}/{activeDesactive}")
  public int activeDesactiveUser(@PathVariable("ID")  Long id, @PathVariable("activeDesactive")  Boolean activeDesactive, @RequestBody User user){ // PathVariable c'est pour dire que la variable est dans le path.
    return userService.activeDesactiveUser(id,activeDesactive);
  }

}
