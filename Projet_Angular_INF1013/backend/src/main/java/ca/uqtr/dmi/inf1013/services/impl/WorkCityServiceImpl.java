package ca.uqtr.dmi.inf1013.services.impl;

import ca.uqtr.dmi.inf1013.model.WorkCity;
import ca.uqtr.dmi.inf1013.repos.WorkCityRepo;
import ca.uqtr.dmi.inf1013.services.WorkCityService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WorkCityServiceImpl implements WorkCityService {

    private WorkCityRepo workCityRepo;

    public WorkCityServiceImpl(WorkCityRepo workCityRepo){
        this.workCityRepo = workCityRepo;
    }

    @Override
    public Iterable<WorkCity> getWorkCities() {
        return this.workCityRepo.findAll();
    }

    @Override
    public Optional<String> getWorkCityFromId(Long id) {
        return this.workCityRepo.getNameById(id);
    }
}
