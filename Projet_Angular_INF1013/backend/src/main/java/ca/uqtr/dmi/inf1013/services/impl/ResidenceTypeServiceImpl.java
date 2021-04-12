package ca.uqtr.dmi.inf1013.services.impl;

import ca.uqtr.dmi.inf1013.model.ResidenceType;
import ca.uqtr.dmi.inf1013.repos.ResidenceTypeRepo;
import ca.uqtr.dmi.inf1013.services.ResidenceTypeService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ResidenceTypeServiceImpl implements ResidenceTypeService {
    private ResidenceTypeRepo residenceTypeRepo;

    public ResidenceTypeServiceImpl(ResidenceTypeRepo residenceTypeRepo){
        this.residenceTypeRepo = residenceTypeRepo;
    }

    @Override
    public Iterable<ResidenceType> getResidencesType() {
        return this.residenceTypeRepo.findAll();
    }

    @Override
    public Optional<String> getResidenceTypeFromId(Long id) {
        return this.residenceTypeRepo.getNameById(id);
    }
}
