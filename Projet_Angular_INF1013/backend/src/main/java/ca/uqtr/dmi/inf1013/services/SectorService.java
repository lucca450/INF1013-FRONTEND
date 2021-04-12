package ca.uqtr.dmi.inf1013.services;

import ca.uqtr.dmi.inf1013.model.Sector;
import java.util.Optional;

public interface SectorService {
    Iterable<Sector> getSectors();
    Optional<String> getSectorFromId(Long id);
}
