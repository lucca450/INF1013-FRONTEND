package ca.uqtr.dmi.inf1013.model;

import lombok.Data;

import javax.persistence.*;

@Entity()
@Table(name = "education_level")
@Data // Permet d'avoir les get set

public class EducationLevel {
  @Id() // Permet de dire que le champs qui suit est l'id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long ID;
  private String interfaceName;
  private String name;
}
