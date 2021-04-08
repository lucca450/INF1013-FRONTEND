package Security;

public enum ApplicationUserPermission {
  A_READ("A:read"),
  A_WRITE("A:write"),
  I_READ("I:read"),
  I_WRITE("I:write");

  private final String permission;

  ApplicationUserPermission(String permission){
    this.permission = permission;
  }

  public String getPermission(){
    return permission;
  }
}
