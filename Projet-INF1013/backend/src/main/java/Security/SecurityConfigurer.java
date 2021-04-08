package Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {

  private PasswordEncoder passwordEncoder;

 // @Autowired
  public void ApplicationSecurityConfig(PasswordEncoder passwordEncoder){
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception{
    http.csrf().disable()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      //.authorizeRequests().antMatchers("/","/api/users/getstatic/").permitAll()
      //.authorizeRequests().antMatchers("/","index","/css/*","js/*","/api/**").permitAll()
      .authorizeRequests().antMatchers("/","/api/hello/authenticate").permitAll()
      .anyRequest()
    //  .antMatchers("/api/**").hasRole(ApplicationUserRole.I.name())
      .authenticated();
     // .and()
     // .httpBasic();
      /*.loginPage("/login").permitAll()
      .defaultSuccessUrl("/courses", true)
      .and()
      .logout()
        .logoutUrl("/logout")
        .logoutRequestMatcher(new AntPathRequestMatcher("/logout","GET"))
        .clearAuthentication(true)
        .invalidateHttpSession(true)
        .deleteCookies("JSESSIONID","remember-me")
        .logoutSuccessUrl("/login")
     // .rememberMe(); // Par défaut 2 semaines.

       */
  }


  @Override
  @Bean
  protected UserDetailsService userDetailsService(){
     UserDetails annaSmithUser = User.builder()
            .username("annasmith")
            .password(passwordEncoder.encode("password"))
            //.roles(ApplicationUserRole.I.name()) // ROLE INTERVENANT
            .authorities(ApplicationUserRole.I.getGrantedAuthorities())
            .build();

    UserDetails lindaUser = User.builder()
      .username("linda")
      .password(passwordEncoder.encode("password"))
      //.roles(ApplicationUserRole.A.name()) // ROLE ADMIN
      .authorities(ApplicationUserRole.A.getGrantedAuthorities())
      .build();

    UserDetails tomUser = User.builder()
      .username("tom")
      .password(passwordEncoder.encode("password123"))
     // .roles(ApplicationUserRole.A.name()) // ROLE ADMIN
      .authorities(ApplicationUserRole.A.getGrantedAuthorities())
      .build();

     return new InMemoryUserDetailsManager(annaSmithUser);
  }



  @Override
  @Bean
  public AuthenticationManager authenticationManagerBean() throws Exception{
    return super.authenticationManagerBean();
  }



//On la maintenant dans PasswordConfig
  @Bean
  public PasswordEncoder passwordEncoder(){
    return NoOpPasswordEncoder.getInstance();
  }


}
