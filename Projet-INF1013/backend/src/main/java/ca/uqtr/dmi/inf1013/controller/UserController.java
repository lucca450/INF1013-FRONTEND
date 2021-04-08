package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.User;
import ca.uqtr.dmi.inf1013.services.UserService;
// import ca.uqtr.dmi.inf1013.services.impl.UserDetailsServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@RestController
@RequestMapping("api/users")
public class UserController {

//  private UserService userService;
 // private final UserDetailsServiceImpl userDetailsService;
/*
  public UserController(UserService userService){ // Qualifer, il va chercher le @Service dans notre service
    this.userService = userService;
  }

 */

 // public UserController(UserDetailsServiceImpl userDetailsService){
 //   this.userDetailsService = userDetailsService;
 // }
/*
  @GetMapping(path = "/get/{ID}")
  public User getUser(@PathVariable("ID")  Long id){ // PathVariable c'est pour dire que la variable est dans le path.

    Optional<User> s =userService.getUser(id);
    return s.orElseThrow(()-> new RuntimeException("Étudiant non trouvé"));

  }

 */

  @PostMapping(path = "/signin/")
  public void creat(@RequestBody User user){
    System.out.println("Try to sign in");
    // userDetailsService.save(user);
  }
}
