package ca.uqtr.dmi.inf1013.model;

import lombok.Data;

import javax.persistence.*;

@Entity()
@Table(name = "Meeting")
@Data // Permet d'avoir les get set
public class Meeting {

  @Id() // Permet de dire que le champs qui suit est l'id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String interfaceName;
  private String notes;
  private String followup;
  private String goals;
  private Long idPerson;
  private Long idIntervenant;
}
