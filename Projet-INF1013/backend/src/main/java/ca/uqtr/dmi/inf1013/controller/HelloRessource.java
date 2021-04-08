package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.AuthenticationRequest;
import ca.uqtr.dmi.inf1013.model.AuthenticationResponse;
import ca.uqtr.dmi.inf1013.services.MyUserDetailsService;
import ca.uqtr.dmi.inf1013.util.JwtUtil;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/hello") // Pour appeler ce controlleur, il va falloir utiliser ce path
public class HelloRessource {


  private AuthenticationManager authenticationManage;
  @Autowired
  private MyUserDetailsService userDetailService;
  @Autowired
  private JwtUtil jwtTokenUtil;

  @PostMapping(path = "/authenticate")
  public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
    try{
    authenticationManage.authenticate(
      new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
      );
    }
    catch (BadCredentialsException e){
      throw new Exception("Nom d'utilisateur ou mot de passe incorrecte",e);
    }
    final UserDetails userDetails = userDetailService.loadUserByUsername(authenticationRequest.getUsername());
    final String jwt = jwtTokenUtil.generateToken(userDetails);
    return ResponseEntity.ok(new AuthenticationResponse(jwt));

  }



}
