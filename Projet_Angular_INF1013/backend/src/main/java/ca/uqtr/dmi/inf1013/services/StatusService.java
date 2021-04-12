package ca.uqtr.dmi.inf1013.services;
import ca.uqtr.dmi.inf1013.model.Status;
import java.util.Optional;

public interface StatusService {
    Iterable<Status> getStatus();
    Optional<String> getStatutFromId(Long id);
}
