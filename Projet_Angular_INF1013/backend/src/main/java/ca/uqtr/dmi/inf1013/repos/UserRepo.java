package ca.uqtr.dmi.inf1013.repos;

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

  @Query(value = "update users set active = ?2 where id = ?1", nativeQuery = true) //native = true, requête avec les tables de la BD
  @Modifying // Obligatoire quand on fait un update
  @Transactional
  int activeDesactiveUser(Long idUser, Boolean activeDesactive);

  Optional<List<User>> findByActive(boolean active);

  @Query(value = "update users set \n" +
                  "lname = ?2,\n" +
                  "fname = ?3,\n" +
                  "email = ?4,\n" +
                  "phone  = ?5,\n" +
                  "address = ?6,\n" +
                  "organism = ?7,\n" +
                  "username=  ?8,\n" +
                  "role = ?9\n" +
                  "where id = ?1\n" +
          " ", nativeQuery = true) //native = true, requête avec les tables de la BD
  @Modifying // Obligatoire quand on fait un update
  @Transactional
  int saveUser(Long id, String lname, String fname, String email, String phone, String address, String organism, String username, Character role);

  Optional<User> findByUsernameAndPassword(String username, String password);


}
