package ca.uqtr.dmi.inf1013.services;
import ca.uqtr.dmi.inf1013.model.FollowedBy;
import java.util.Optional;

public interface FollowedByService {
    FollowedBy editFollowedBy(FollowedBy followedBy);
    FollowedBy addFollowedBy(FollowedBy followedBy);
    Optional<FollowedBy> getFollowedById(Long id);
}
