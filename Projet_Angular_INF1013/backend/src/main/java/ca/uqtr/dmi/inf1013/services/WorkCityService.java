package ca.uqtr.dmi.inf1013.services;
import ca.uqtr.dmi.inf1013.model.WorkCity;

import java.util.Optional;

public interface WorkCityService {
    Iterable<WorkCity> getWorkCities();
    Optional<String> getWorkCityFromId(Long id);
}
