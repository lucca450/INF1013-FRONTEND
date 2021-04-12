package ca.uqtr.dmi.inf1013.services.impl;

import ca.uqtr.dmi.inf1013.model.DepartureReason;
import ca.uqtr.dmi.inf1013.repos.DepartureReasonRepo;
import ca.uqtr.dmi.inf1013.services.DepartureReasonService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DepartureReasonServiceImpl implements DepartureReasonService {
    private DepartureReasonRepo departureReasonRepo;

    public DepartureReasonServiceImpl(DepartureReasonRepo departureReasonRepo){
        this.departureReasonRepo = departureReasonRepo;
    }

    @Override
    public Iterable<DepartureReason> getDeparturesReason() {
        return this.departureReasonRepo.findAll();
    }

    @Override
    public Optional<String> getDepartureReasonFromId(Long id) {
        return this.departureReasonRepo.getNameById(id);
    }
}
