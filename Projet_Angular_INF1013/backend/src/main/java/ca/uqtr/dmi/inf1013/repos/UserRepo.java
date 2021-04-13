package ca.uqtr.dmi.inf1013.repos;

import ca.uqtr.dmi.inf1013.model.Meeting;
import ca.uqtr.dmi.inf1013.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends CrudRepository<User,Long> {

  Optional<User>findByUsername(String username);
  Optional<List<User>> findByActive(boolean active);

  @Query(value = "update users set active = ?2 where id = ?1", nativeQuery = true) //native = true, requête avec les tables de la BD
  @Modifying // Obligatoire quand on fait un update
  @Transactional
  int activeDesactiveUser(Long idUser, Boolean activeDesactive);

  @Query(value = "update users set password = ?2 where id = ?1", nativeQuery = true) //native = true, requête avec les tables de la BD
  @Modifying // Obligatoire quand on fait un update
  @Transactional
  int resetPasswordUSer(Long idUser, String password);

  @Query(value = "select * from users order by active desc", nativeQuery = true)
  Iterable<User> findAllUsersOrderByActive();

  @Query(value = "update users set \n" +
                  "lname = ?2,\n" +
                  "fname = ?3,\n" +
                  "email = ?4,\n" +
                  "phone  = ?5,\n" +
                  "address = ?6,\n" +
                  "organism = ?7,\n" +
                  "username =  ?8,\n" +
                  "password =  ?9,\n" +
                  "role = ?10\n" +
                  "where id = ?1\n" +
          " ", nativeQuery = true) //native = true, requête avec les tables de la BD
  @Modifying // Obligatoire quand on fait un update
  @Transactional
  int saveUser(Long id, String lname, String fname, String email, String phone, String address, String organism, String username, String password, Character role);


  @Query(value = "update users set \n" +
          "lname = ?2,\n" +
          "fname = ?3,\n" +
          "email = ?4,\n" +
          "phone  = ?5,\n" +
          "address = ?6,\n" +
          "organism = ?7,\n" +
          "username =  ?8,\n" +
          "role = ?9\n" +
          "where id = ?1\n" +
          " ", nativeQuery = true) //native = true, requête avec les tables de la BD
  @Modifying // Obligatoire quand on fait un update
  @Transactional
  int saveUserWithoutPassword(Long id, String lname, String fname, String email, String phone, String address, String organism, String username, Character role);

  Boolean findByUsernameAndPassword(String username, String password);
  @Query(value = "select count(*) from users where username = ?1", nativeQuery = true)
  Long verifyUserExist(String username);

  @Query(value = "select fname ||' '||lname as fullName from users where id = ?1", nativeQuery = true)
  Optional<String> getFullNameById(Long id);

  @Query(value = "update users set password = ?2, first_connexion = true where id = ?1", nativeQuery = true) //native = true, requête avec les tables de la BD
  @Modifying // Obligatoire quand on fait un update
  @Transactional
  int updatePasswordUser(Long id, String password);

  @Query(value = "update users set first_connexion = true where id = ?1", nativeQuery = true) //native = true, requête avec les tables de la BD
  @Modifying // Obligatoire quand on fait un update
  @Transactional
  int skipFirstConnexionStep(Long id);
}
