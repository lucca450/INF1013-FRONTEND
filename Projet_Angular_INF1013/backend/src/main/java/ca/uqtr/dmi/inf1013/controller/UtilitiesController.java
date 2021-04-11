package ca.uqtr.dmi.inf1013.controller;

import ca.uqtr.dmi.inf1013.services.MailService;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/mail")
public class UtilitiesController {

    private MailService notificationService;

    public UtilitiesController(MailService notificationService){
        this.notificationService = notificationService;
    }

    // Envoie de courriel

    @RequestMapping("/send-mail/{email}/{username}/{password}")
    public String send(@PathVariable("email")  String email, @PathVariable("email")  String username, @PathVariable("email")  String password) {

        try {
            notificationService.sendEmail(email, username, password);
        } catch (MailException mailException) {
            System.out.println(mailException);
        }
        return "Congratulations! Your mail has been send to the user.";
    }
}

