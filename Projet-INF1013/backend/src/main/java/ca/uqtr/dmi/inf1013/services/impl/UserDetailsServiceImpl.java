
package ca.uqtr.dmi.inf1013.services.impl;

import ca.uqtr.dmi.inf1013.model.User;
import ca.uqtr.dmi.inf1013.repos.UserRepo;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private UserRepo userRepo;
  private PasswordEncoder passwordEncoder;

  public UserDetailsServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder){
    this.userRepo = userRepo;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> optionalUser = userRepo.findByUsername(username);
    User user = optionalUser
      .orElseThrow(()-> new UsernameNotFoundException(String.format("Étudiant non trouvé")));

    user.setPassword(passwordEncoder.encode(user.getPassword()));

    return new UserDetails() {
      @Override
      public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
      }

      @Override
      public String getPassword() {
        return user.getPassword();
      }

      @Override
      public String getUsername() {
        return user.getUsername();
      }

      @Override
      public boolean isAccountNonExpired() {
        return true;
      }

      @Override
      public boolean isAccountNonLocked() {
        return true;
      }

      @Override
      public boolean isCredentialsNonExpired() {
        return true;
      }

      @Override
      public boolean isEnabled() {
        return true;
      }
    };
  }

  public void save(User user){
    //   user.setPassword(passwordEncoder.encode(user.getPassword()));
    //   this.userRepo.save(user);
  }
}
