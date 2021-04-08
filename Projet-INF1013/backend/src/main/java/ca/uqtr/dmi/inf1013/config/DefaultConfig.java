package ca.uqtr.dmi.inf1013.config;


import ca.uqtr.dmi.inf1013.util.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
 //@DefaultConfiguration // J'arrive pas a le mettres
public class DefaultConfig {

    @Bean
    JwtUtil getRepo(){
      return new JwtUtil();
    }
}
