package ca.uqtr.dmi.inf1013.services;

import ca.uqtr.dmi.inf1013.model.FollowedBy;

public interface FollowedByService {
    FollowedBy editFollowedBy(FollowedBy followedBy);
    FollowedBy addFollowedBy(FollowedBy followedBy);
}
