package ca.uqtr.dmi.inf1013.services;

import ca.uqtr.dmi.inf1013.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class MailService {
    private JavaMailSender javaMailSender;

    @Autowired
    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String email, String username, String password, String firstName, String lastName) throws MailException {

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(email);
        mail.setSubject("Votre inscription");
        mail.setText("Bonjour "+firstName+' '+lastName+ "\n\n Votre compte à bien été crée !"+ "\n\n Nom d'utilisateur : "+username+"\n\n Mot de passe : "+password);
        javaMailSender.send(mail);
    }

    public void sendResetPasswordMail(String email, String username, String password, String firstName, String lastName) throws MailException {

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(email);
        mail.setSubject("Rénitialisation du mot de passe");
        mail.setText("Bonjour "+firstName+' '+lastName+ "\n\n La rénitialisation de votre mot de passe à bien été éffectué avec succès !"+ "\n\n" +
                " Nom d'utilisateur : "+username+"\n\n Nouveau mot de passe : "+password);
        javaMailSender.send(mail);
    }

    // Si jamais on veut envoyer des pièces jointes (Non fonctionnel) -> Feature
    public void sendEmailWithAttachment(User user) throws MailException, MessagingException {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(user.getEmail());
        helper.setSubject("Testing Mail API with Attachment");
        helper.setText("Please find the attached document below.");

        ClassPathResource classPathResource = new ClassPathResource("Attachment.pdf");
        helper.addAttachment(classPathResource.getFilename(), classPathResource);

        javaMailSender.send(mimeMessage);
    }
}
