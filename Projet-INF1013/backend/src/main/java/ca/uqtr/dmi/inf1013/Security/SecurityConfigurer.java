package ca.uqtr.dmi.inf1013.Security;

import ca.uqtr.dmi.inf1013.jwt.JwtConfig;
import ca.uqtr.dmi.inf1013.jwt.JwtTokenVerifier;
import ca.uqtr.dmi.inf1013.jwt.JwtUsernameAndPasswordAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.crypto.SecretKey;

@Configuration
@EnableWebSecurity
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {

  private PasswordEncoder passwordEncoder;
  // MANQUE APPLICATIONUSERSERVICE VERIFIER DANS LA VIDEO OU IL MET CA ET PK
  private final SecretKey secretKey;
  private final JwtConfig jwtConfig;

  public SecurityConfigurer(SecretKey secretKey, JwtConfig jwtConfig) {
    this.secretKey = secretKey;
    this.jwtConfig = jwtConfig;
  }

  @Autowired
  public void ApplicationSecurityConfig(PasswordEncoder passwordEncoder){
    this.passwordEncoder = passwordEncoder;
  }

  protected void configure(HttpSecurity http) throws Exception{
    http.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .addFilter(new JwtUsernameAndPasswordAuthenticationFilter(authenticationManager(), jwtConfig, secretKey))
      .addFilterAfter(new JwtTokenVerifier(secretKey, jwtConfig), JwtUsernameAndPasswordAuthenticationFilter.class)
      .authorizeRequests().antMatchers("/api/**").permitAll()
      .anyRequest()
      .authenticated();
  }
}
