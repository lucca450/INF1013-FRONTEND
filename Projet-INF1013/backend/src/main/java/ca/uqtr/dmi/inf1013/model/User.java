package ca.uqtr.dmi.inf1013.model;


import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity()
@Table(name = "users")
@Data // Permet d'avoir les get set

public class User {
    @Id() // Permet de dire que le champs qui suit est l'id
    private Long ID;
    private String interfaceName;
    private String lname;
    private String fname;
    private String email;
    private String phone;
    private String address;
    private String organism;
    private String username;
    private String password;
    private Character role;
    private Boolean active;

  public User(Long ID, String interfaceName, String lname, String fname, String email, String phone,
              String address, String organism, String username, String password, Character role, boolean active) {
    this.ID = ID;
    this.interfaceName = interfaceName;
    this.lname = lname;
    this.fname = fname;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.organism = organism;
    this.username = username;
    this.password = password;
    this.role = role;
    this.active = active;

  }
}
