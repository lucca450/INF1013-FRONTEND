package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.User;
import ca.uqtr.dmi.inf1013.services.MailService;
import ca.uqtr.dmi.inf1013.services.UserService;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/users")
public class UserController {

  private UserService userService;
  private MailService notificationService;
  public UserController(UserService userService, MailService notificationService){ // Qualifer, il va chercher le @Service dans notre service
    this.userService = userService;
    this.notificationService = notificationService;
  }

  @GetMapping(path = "/get/{ID}")
  public User getUser(@PathVariable("ID")  Long id){
    Optional<User> s =userService.getUser(id);
    return s.orElseThrow(()-> new RuntimeException("Utilisateur non trouvé"));
  }

  @GetMapping(path = "/getFullName/{ID}")
  public Optional<String> getUserFullNameFromId(@PathVariable("ID")  Long id){
   return userService.getUserFullNameFromId(id);
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

  @GetMapping(path = "/getAll")
  public Iterable<User> getAllUsers(){
    return this.userService.findAllUsersOrderByActive();
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
  }


  @PutMapping(path = "/edit")
  public int editUser(@RequestBody User user){ // PathVariable c'est pour dire que la variable est dans le path.
    if(user.getPassword() != "" && user.getPassword() != null){
      return userService.editUser(user);
    }
    else{
      return userService.editUserWithoutPassword(user);
    }

  }

  @PostMapping(path = "/add")
  public User addUser(@RequestBody User user){
    return userService.addUser(user);
  }

  @PostMapping(path = "/editPassword/{ID}/{password}")
  public int editPassword(@PathVariable("ID")  Long id, @PathVariable("password")  String password, @RequestBody User user){
    return userService.editPassword(id,password);
  }
  @PostMapping(path = "/skipFirstStepConnexion/{ID}")
  public int skipFirstConnexionStep(@PathVariable("ID")  Long id, @RequestBody User user){
    return userService.skipFirstConnexionStep(id);
  }

  @PatchMapping(path = "/activeDesactive/{ID}/{activeDesactive}")
  public int activeDesactiveUser(@PathVariable("ID")  Long id, @PathVariable("activeDesactive")  Boolean activeDesactive, @RequestBody User user){
    return userService.activeDesactiveUser(id,activeDesactive);
  }

  @PostMapping(path = "/resetPassword")
  public int resetPassword(@RequestBody User user){
    var passwordBeforeHash = user.getPassword();
    var resetPassword =  userService.resetPasswordUSer(user.getId(),user.getPassword());
    if(resetPassword == 1){
      try {
        notificationService.sendResetPasswordMail(user.getEmail(), user.getUsername(), passwordBeforeHash, user.getFname(), user.getLname());
      } catch (MailException mailException) {
        System.out.println(mailException);
      }
    }
    return 0;
  }

  // Envoie de courriel
  @PostMapping("/send-mail/{email}/{username}/{password}/{fname}/{lname}")
  public int send(@PathVariable("email")  String email, @PathVariable("username") String username, @PathVariable("password")  String password,
                     @PathVariable("fname")  String fname, @PathVariable("lname") String lname, @RequestBody User user) {

    try {
      notificationService.sendEmail(email, username, password, fname, lname);
      return 1;
    } catch (MailException mailException) {
      System.out.println(mailException);
      return 0;
    }
  }


}
