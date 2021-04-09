package ca.uqtr.dmi.inf1013.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class TemplateController {

    @GetMapping(path = "login")
    public String getLogin(){
        return "login";
    }

    @GetMapping(path = "/courses")
    public String getCoourses(){
        return "courses";
    }
}
