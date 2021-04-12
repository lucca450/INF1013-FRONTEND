package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.User;
import ca.uqtr.dmi.inf1013.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/users")
public class UserController {

  private UserService userService;
/*
  public UserController(UserService userService, UserServiceImpl userDetailsService, PasswordEncoder passwordEncoder){ // Qualifer, il va chercher le @Service dans notre service
    this.userService = userService;
    this.userDetailsService = userDetailsService;
    this.passwordEncoder = passwordEncoder;
  }

 */

  public UserController(UserService userService){ // Qualifer, il va chercher le @Service dans notre service
    this.userService = userService;
  }

  @GetMapping(path = "/get/{ID}")
  public User getUser(@PathVariable("ID")  Long id){
    Optional<User> s =userService.getUser(id);
    return s.orElseThrow(()-> new RuntimeException("Utilisateur non trouvé"));
  }

  @GetMapping(path = "/getFullName/{ID}")
  public String getUserFullNameFromId(@PathVariable("ID")  Long id){
    Optional<String> s =userService.getUserFullNameFromId(id);
    return s.orElseThrow(()-> new RuntimeException("Le nom de l'utilisateur n'a pas été trouvé."));
  }

  @GetMapping(path = "/active/get")
  public List<User> getActiveUsers(){
    Optional<List<User>> s =userService.getActiveUsers();
    return s.orElseThrow(()-> new RuntimeException("Aucun utilisateurs"));
  }

  @GetMapping(path = "/verifySignin/{username}/{password}")
  public User verifySignin(@PathVariable("username")  String username, @PathVariable("password")  String password){
    Optional<User> s =userService.getSigninUser(username,password);
    return s.orElseThrow(()-> new RuntimeException("Aucun utilisateurs"));
  }

  @GetMapping(path = "/verifyName/{username}")
  public boolean verifyUserExist(@PathVariable("username") String username){
    Long nbrUser =userService.verifyUserExist(username);
    if(nbrUser == 0){
      return true;
    }
    else
    {
      return false;
    }

    //.orElseThrow(()-> new RuntimeException("Ce nom d'utilisateur existe déja"));
  }


  @PutMapping(path = "/edit")
  public int editUser(@RequestBody User user){ // PathVariable c'est pour dire que la variable est dans le path.
    return userService.editUser(user);
  }

  @PostMapping(path = "/add")
  public User addUser(@RequestBody User user){
    return userService.addUser(user);
  }

  @PostMapping(path = "/editPassword/{ID}/{password}")
  public int editPassword(@PathVariable("ID")  Long id, @PathVariable("password")  String password, @RequestBody User user){
    return userService.editPassword(id,password);
  }

  @PatchMapping(path = "/activeDesactive/{ID}/{activeDesactive}")
  public int activeDesactiveUser(@PathVariable("ID")  Long id, @PathVariable("activeDesactive")  Boolean activeDesactive, @RequestBody User user){
    return userService.activeDesactiveUser(id,activeDesactive);
  }



}
