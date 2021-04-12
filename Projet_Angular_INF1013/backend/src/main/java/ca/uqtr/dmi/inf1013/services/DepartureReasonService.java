package ca.uqtr.dmi.inf1013.services;
import ca.uqtr.dmi.inf1013.model.DepartureReason;
import java.util.Optional;
public interface DepartureReasonService {
    Iterable<DepartureReason> getDeparturesReason();
    Optional<String> getDepartureReasonFromId(Long id);
}
