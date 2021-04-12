package ca.uqtr.dmi.inf1013.services;

import ca.uqtr.dmi.inf1013.model.Reference;
import java.util.Optional;

public interface ReferenceService {
    Iterable<Reference> getReferences();
    Optional<String> getReferenceFromId(Long id);
}
