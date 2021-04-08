package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.User;
import ca.uqtr.dmi.inf1013.services.UserService;
import io.swagger.annotations.Api;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "/api/users") // Pour appeler ce controlleur, il va falloir utiliser ce path
@Api(value="ActControllerAPI")// Permet de rajouter la documentation supplémentaire au controleur.
public class UserController {
     private UserService userService;

     private static final List<User> Users = Arrays.asList(
       new User(1L,"User","PÔ","DN","pierro_kool@hotmail.com","8195839231","355 rue test","Aucun", "polo","1234",'A',true)
     );


    public UserController(UserService userService){ // Qualifer, il va chercher le @Service dans notre service
        this.userService = userService;
    }

    @GetMapping(path = "/get/{ID}")
    public User getUser(@PathVariable("ID")  Long id){ // PathVariable c'est pour dire que la variable est dans le path.

        Optional<User> s =userService.getUser(id);
        return s.orElseThrow(()-> new RuntimeException("Étudiant non trouvé"));

    }

  @GetMapping(path = "/getstatic/{ID}")
  public User getStaticUser(@PathVariable("ID")  Long id){ // PathVariable c'est pour dire que la variable est dans le path.

    return Users.stream()
      .filter(user -> id.equals(user.getID()))
      .findFirst()
      .orElseThrow(()-> new IllegalStateException("L'utilisateur avec l'ID "+id + "n'existe pas"));

  }
    @PostMapping(path = "/add")
    public void addUser(@RequestBody User user){
        System.out.println(user.getFname()+' '+user.getLname());

    }

  @DeleteMapping(path = "/delete/{ID}")
  @PreAuthorize("hasAnyRole('A,I')")
  public void deleteUser(@PathVariable("ID")  Long id){
    System.out.println(id);

  }

  @PutMapping(path = "put/{ID}")
  public void updateUser(@PathVariable("ID")  Long id, @RequestBody User user){
    System.out.println(id);

  }

}
