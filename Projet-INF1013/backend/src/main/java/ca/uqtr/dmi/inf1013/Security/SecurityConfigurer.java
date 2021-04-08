package ca.uqtr.dmi.inf1013.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {
/*
  private PasswordEncoder passwordEncoder;

  @Autowired
  public void ApplicationSecurityConfig(PasswordEncoder passwordEncoder){
    this.passwordEncoder = passwordEncoder;
  }

 */

  protected void configure(HttpSecurity http) throws Exception{
   // http.csrf().disable()
    //  .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
     // .and()
     http.authorizeRequests().antMatchers("/","index","/css/*","js/*").permitAll()
      .anyRequest()
      .authenticated()
      .and()
     .httpBasic();
  }
}
