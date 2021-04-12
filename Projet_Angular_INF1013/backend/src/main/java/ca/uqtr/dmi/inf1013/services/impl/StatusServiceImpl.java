package ca.uqtr.dmi.inf1013.services.impl;

import ca.uqtr.dmi.inf1013.model.Status;
import ca.uqtr.dmi.inf1013.repos.StatusRepo;
import ca.uqtr.dmi.inf1013.services.StatusService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StatusServiceImpl implements StatusService {
    private StatusRepo statusRepo;

    public StatusServiceImpl(StatusRepo statusRepo){
        this.statusRepo = statusRepo;
    }

    @Override
    public Iterable<Status> getStatus() {
        return this.statusRepo.findAll();
    }

    @Override
    public Optional<String> getStatutFromId(Long id) {
        return this.statusRepo.getNameById(id);
    }
}
