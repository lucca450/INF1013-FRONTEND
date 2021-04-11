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
  private Long ID;
  private String interfaceName;
  private String lname;
  private String fname;
  private Date birthday;
  private String sexe;
  private String address;
  private String phone;
  private Number nas;
  private String healthIssues;
  private Number workCityId;
  private Date startDate;
  private Date endDate;
  private Number referenceId;
  private Number residenceTypeId;
  private Number educationalLevelId;
  private Date programStartDate;
  private Date programEndDate;
  private Number departureReasonId;
  private Number hoursPerDay;
  private Number statusId;
  private Boolean roamingTracking;
  private Date roamingStartDate;
  private Date roamingEndDate;
  private Boolean communityWork;
  private Date communityStartDate;
  private Date communityEndDate;
  private Number hourlyRate;
  private Number transportFees;
  private Number responsibleIntervenantId;
  private Number emergencyContactId;
  private Number followedById;
  private Boolean active;
}
