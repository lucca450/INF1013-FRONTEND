package ca.uqtr.dmi.inf1013.services.impl;

import ca.uqtr.dmi.inf1013.model.EducationLevel;
import ca.uqtr.dmi.inf1013.repos.EducationLevelRepo;
import ca.uqtr.dmi.inf1013.services.EducationLevelService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EducationLevelServiceImpl implements EducationLevelService {
    private EducationLevelRepo educationLevelRepo;

    public EducationLevelServiceImpl(EducationLevelRepo educationLevelRepo){
        this.educationLevelRepo = educationLevelRepo;
    }

    @Override
    public Iterable<EducationLevel> getEducationLevels() {
        return this.educationLevelRepo.findAll();
    }

    @Override
    public Optional<String> getEducationLevelFromId(Long id) {
        return this.educationLevelRepo.getNameById(id);
    }
}
