package ca.uqtr.dmi.inf1013.services;

import ca.uqtr.dmi.inf1013.model.Meeting;


public interface MeetingService {
    Meeting addMeeting(Meeting meeting);
    Iterable<Meeting> getAllMeetings();
}
