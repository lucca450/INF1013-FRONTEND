package Security;

import com.google.common.collect.Sets;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public enum ApplicationUserRole {
  I(Sets.newHashSet()),
  A(Sets.newHashSet(ApplicationUserPermission.A_READ,ApplicationUserPermission.A_WRITE,ApplicationUserPermission.I_READ,ApplicationUserPermission.I_WRITE));

  private final Set<ApplicationUserPermission> permissions;

  ApplicationUserRole(Set<ApplicationUserPermission> permissions){
    this.permissions = permissions;
  }

  public Set<ApplicationUserPermission> getPermissions(){
    return permissions;
  };

  public Set<SimpleGrantedAuthority> getGrantedAuthorities(){
   Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
      .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
      .collect(Collectors.toSet());

   permissions.add(new SimpleGrantedAuthority(this.name()));
   return permissions;
  }

}
