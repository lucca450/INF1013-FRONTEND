package ca.uqtr.dmi.inf1013.jwt;

import com.google.common.net.HttpHeaders;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

@Service // Pas sur, c'étais pas dans la vidéo
@ConfigurationProperties(prefix = "application.jwt")
public class JwtConfig {

    private String secretKey;
    private String tokenPrefix;
    private Integer tokenExpirationAfterDays;

    public JwtConfig(){

    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public String getTokenPrefix() {
        return tokenPrefix;
    }

    public void setTokenPrefix(String tokenPrefix) {
        this.tokenPrefix = tokenPrefix;
    }

    public Integer getTokenExpirationAfterDAys() {
        return tokenExpirationAfterDays;
    }

    public void setTokenExpirationAfterDAys(Integer tokenExpirationAfterDAys) {
        this.tokenExpirationAfterDays = tokenExpirationAfterDAys;
    }

    public String getAuthorizationHeader(){
        return HttpHeaders.AUTHORIZATION;
    }
}
