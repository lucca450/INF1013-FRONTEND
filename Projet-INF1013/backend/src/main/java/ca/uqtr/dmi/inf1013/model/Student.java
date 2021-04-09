package ca.uqtr.dmi.inf1013.model;

public class Student {

  private final Integer studentID;
  private final String studentName;

  public Student(Integer studentID, String studentName){
    this.studentID = studentID;
    this.studentName = studentName;
  }

  public Integer getStudentID(){
    return studentID;
  }

  public String getStudentName(){
    return studentName;
  }
}
