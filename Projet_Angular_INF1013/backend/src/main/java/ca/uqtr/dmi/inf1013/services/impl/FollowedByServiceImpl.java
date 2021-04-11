package ca.uqtr.dmi.inf1013.services.impl;

import ca.uqtr.dmi.inf1013.model.FollowedBy;
import ca.uqtr.dmi.inf1013.repos.FollowedByRepo;
import ca.uqtr.dmi.inf1013.services.FollowedByService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FollowedByServiceImpl implements FollowedByService {

    private FollowedByRepo followedByRepo;

    public FollowedByServiceImpl(FollowedByRepo followedByRepo){
        this.followedByRepo = followedByRepo;
    }

    @Override
    public FollowedBy editFollowedBy(FollowedBy followedBy) {
        return this.followedByRepo.save(followedBy);
    }

    @Override
    public FollowedBy addFollowedBy(FollowedBy followedBy) {
        return this.followedByRepo.save(followedBy);
    }

    @Override
    public Optional<FollowedBy> getFollowedById(Long id) {
        return this.followedByRepo.findById(id);
    }
}
