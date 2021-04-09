package ca.uqtr.dmi.inf1013.jwt;

public class UsernameAndPasswordAuthenticationRequest {

    private String usernamne;
    private String password;

    public UsernameAndPasswordAuthenticationRequest(){

    }

    public String getUsernamne() {
        return usernamne;
    }

    public void setUsernamne(String usernamne) {
        this.usernamne = usernamne;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
