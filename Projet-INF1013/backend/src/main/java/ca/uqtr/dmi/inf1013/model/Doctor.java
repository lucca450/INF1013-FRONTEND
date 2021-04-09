package ca.uqtr.dmi.inf1013.model;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity()
@Table(name = "Doctor")
@Data // Permet d'avoir les get set

public class Doctor {
  @Id() // Permet de dire que le champs qui suit est l'id
  private Long ID;
  private String interfaceName;
  private String lname;
  private String fname;
  private String phone;
  private String fax;
  private String email;
}
