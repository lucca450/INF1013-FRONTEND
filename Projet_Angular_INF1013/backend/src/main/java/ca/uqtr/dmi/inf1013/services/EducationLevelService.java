package ca.uqtr.dmi.inf1013.services;
import ca.uqtr.dmi.inf1013.model.EducationLevel;
import java.util.Optional;
public interface EducationLevelService {
    Iterable<EducationLevel> getEducationLevels();
    Optional<String> getEducationLevelFromId(Long id);
}
