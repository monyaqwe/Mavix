package it.monko.spring.activity.service;

import it.monko.spring.activity.model.ActivityLog;
import it.monko.spring.activity.repository.ActivityRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ActivityService {
    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public void logActivity(String action, String userEmail, String status) {
        activityRepository.save(new ActivityLog(action, userEmail, status));
    }

    public List<ActivityLog> getRecentLogs() {
        return activityRepository.findTop10ByOrderByTimestampDesc();
    }
}
