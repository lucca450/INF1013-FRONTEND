package ca.uqtr.dmi.inf1013.services.impl;


import ca.uqtr.dmi.inf1013.model.Reference;
import ca.uqtr.dmi.inf1013.repos.ReferenceRepo;
import ca.uqtr.dmi.inf1013.services.ReferenceService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReferenceServiceImpl implements ReferenceService {
    private ReferenceRepo referenceRepo;

    public ReferenceServiceImpl(ReferenceRepo referenceRepo){
        this.referenceRepo = referenceRepo;
    }

    @Override
    public Iterable<Reference> getReferences() {
        return this.referenceRepo.findAll();
    }

    @Override
    public Optional<String> getReferenceFromId(Long id) {
        return this.referenceRepo.getNameById(id);
    }
}
