package ca.uqtr.dmi.inf1013.services;
import ca.uqtr.dmi.inf1013.model.ResidenceType;
import java.util.Optional;
public interface ResidenceTypeService {
    Iterable<ResidenceType> getResidencesType();
    Optional<String> getResidenceTypeFromId(Long id);
}
