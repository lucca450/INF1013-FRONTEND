package ca.uqtr.dmi.inf1013.services.impl;

import ca.uqtr.dmi.inf1013.model.Sector;
import ca.uqtr.dmi.inf1013.repos.SectorRepo;
import ca.uqtr.dmi.inf1013.services.SectorService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SectorServiceImpl implements SectorService {
    private SectorRepo sectorRepo;

    public SectorServiceImpl(SectorRepo sectorRepo){
        this.sectorRepo = sectorRepo;
    }

    @Override
    public Iterable<Sector> getSectors() {
        return this.sectorRepo.findAll();
    }

    @Override
    public Optional<String> getSectorFromId(Long id) {
        return this.sectorRepo.getNameById(id);
    }
}
