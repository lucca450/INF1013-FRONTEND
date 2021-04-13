package ca.uqtr.dmi.inf1013.services.impl;

import ca.uqtr.dmi.inf1013.model.User;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import ca.uqtr.dmi.inf1013.repos.UserRepo;
import ca.uqtr.dmi.inf1013.services.UserService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepo userRepo){
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

    @Override
    public Optional<User> getUser(Long id) {
        return this.userRepo.findById(id);
    }

    @Override
    public Optional<List<User>> getActiveUsers() {
        return this.userRepo.findByActive(true);
    }

    @Override
    public User addUser(User user) {
       user.setPassword(this.passwordEncoder.encode(user.getPassword()));

      //  user.setPassword(passwordConfig.passwordEncoder(user.getPassword()));
        return this.userRepo.save(user);
    }
    @Override
    public int editUser(User user) {
        return this.userRepo.saveUser(user.getId(), user.getLname(), user.getFname(), user.getEmail(),
                                  user.getPhone(), user.getAddress(), user.getOrganism(), user.getUsername(),
                                  user.getPassword(), user.getRole());
    }

    @Override
    public int activeDesactiveUser(Long id, Boolean activeDesactive) {
       return this.userRepo.activeDesactiveUser(id,activeDesactive);
    }

    @Override
    public Optional<User> getSigninUser(String username, String password) {
       String oldPassword = password;
      //  password = this.passwordEncoder.encode(password);
       // System.out.println(passwordEncoder.matches(oldPassword, password));
       // return this.userRepo.findByUsernameAndPassword(username, password);
         Optional<User> optionalUser =  this.userRepo.findByUsername("polo");
        System.out.println("user");
        System.out.println(optionalUser);
        User user = optionalUser
                .orElseThrow(()-> new UsernameNotFoundException(String.format("Le nom ou le mot de passe est invalide.")));

            System.out.println("password : ");
        System.out.println(password);
        System.out.println(user.getPassword());
        System.out.println(passwordEncoder.matches(password,user.getPassword()));
        if(passwordEncoder.matches(password,user.getPassword())) {
            return Optional.of(user);
        }
        else{
            new UsernameNotFoundException(String.format("Le nom ou le mot de passe est invalide."));
        }

        return null;
    }

    @Override
    public long verifyUserExist(String username) {
        Long nbrUser =  this.userRepo.verifyUserExist(username);
        return nbrUser;
    }

    @Override
    public Optional<String> getUserFullNameFromId(Long id) {
        return this.userRepo.getFullNameById(id);
    }

    @Override
    public int editPassword(Long id, String password) {
        password = (this.passwordEncoder.encode(password));
        return this.userRepo.updatePasswordUser(id,password);
    }
    @Override
    public Iterable<User> findAllUsersOrderByActive(){
       return this.userRepo.findAllUsersOrderByActive();
    }

    @Override
    public int resetPasswordUSer(Long id, String password) {
        password = (this.passwordEncoder.encode(password));
        return this.userRepo.resetPasswordUSer(id,password);
    }

    @Override
    public int editUserWithoutPassword(User user) {
        return this.userRepo.saveUserWithoutPassword(user.getId(), user.getLname(), user.getFname(), user.getEmail(),
                user.getPhone(), user.getAddress(), user.getOrganism(), user.getUsername(), user.getRole());
    }

    @Override
    public int skipFirstConnexionStep(Long id) {
       return this.userRepo.skipFirstConnexionStep(id);
    }
}
