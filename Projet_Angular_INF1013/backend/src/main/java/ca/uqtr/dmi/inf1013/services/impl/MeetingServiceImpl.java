package ca.uqtr.dmi.inf1013.services.impl;


import ca.uqtr.dmi.inf1013.model.Meeting;
import ca.uqtr.dmi.inf1013.model.User;
import ca.uqtr.dmi.inf1013.repos.MeetingRepo;
import ca.uqtr.dmi.inf1013.services.MeetingService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MeetingServiceImpl implements MeetingService {

    private MeetingRepo meetingRepo;

    public MeetingServiceImpl(MeetingRepo meetingRepo){
        this.meetingRepo = meetingRepo;
    }

    @Override
    public Meeting addMeeting(Meeting meeting) {
        return this.meetingRepo.save(meeting);
    }

    @Override
    public Meeting editMeeting(Meeting meeting) {
        return this.meetingRepo.save(meeting);
    }

    @Override
    public Iterable<Meeting> getAllMeetings() {
        return this.meetingRepo.findAll();
    }

    @Override
    public Optional<Meeting> getMeetingById(Long id) {
        return this.meetingRepo.findById(id);
    }
}
