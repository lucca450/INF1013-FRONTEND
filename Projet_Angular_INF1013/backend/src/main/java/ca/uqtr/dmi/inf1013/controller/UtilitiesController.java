package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.model.User;
import ca.uqtr.dmi.inf1013.services.MailService;
import org.hibernate.mapping.Any;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/mail")
public class UtilitiesController {

    private MailService notificationService;

    public UtilitiesController(MailService notificationService){
        this.notificationService = notificationService;
    }

    // Envoie de courriel

    @PostMapping("/send-mail/{email}/{username}/{password}/{fname}/{lname}")
    public String send(@PathVariable("email")  String email, @PathVariable("username") String username, @PathVariable("password")  String password,
                       @PathVariable("fname")  String fname, @PathVariable("lname") String lname, @RequestBody Any any) {

        try {
            notificationService.sendEmail(email, username, password, fname, lname);
            return "Congratulations! Your mail has been send to the user.";
        } catch (MailException mailException) {
            System.out.println(mailException);
        }
        return "Congratulations! Your mail has been send to the user.";
    }
}

