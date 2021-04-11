package ca.uqtr.dmi.inf1013.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity()
@Table(name = "Person")
@Data // Permet d'avoir les get set

public class Person {
  @Id() // Permet de dire que le champs qui suit est l'id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String interfaceName;
  private String lname;
  private String fname;
  private Date birthday;
  private String sexe;
  private String address;
  private String phone;
  private Number nas;
  private String healthIssues;
  private Long workCityId;
  private Date startDate;
  private Date endDate;
  private Long referenceId;
  private Long residenceTypeId;
  private Long educationalLevelId;
  private Date programStartDate;
  private Date programEndDate;
  private Long departureReasonId;
  private Number hoursPerDay;
  private Long statusId;
  private Boolean roamingTracking;
  private Date roamingStartDate;
  private Date roamingEndDate;
  private Boolean communityWork;
  private Date communityStartDate;
  private Date communityEndDate;
  private Number hourlyRate;
  private Number transportFees;
  private Long responsibleIntervenantId;
  private Long emergencyContactId;
  private Long followedById;
  private Boolean active;
}
