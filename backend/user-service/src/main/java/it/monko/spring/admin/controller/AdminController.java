package it.monko.spring.admin.controller;

import it.monko.spring.activity.service.ActivityService;
import it.monko.spring.project.service.ProjectService;
import it.monko.spring.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final UserService userService;
    private final ProjectService projectService;
    private final ActivityService activityService;

    public AdminController(UserService userService, ProjectService projectService, ActivityService activityService) {
        this.userService = userService;
        this.projectService = projectService;
        this.activityService = activityService;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userService.getAllUsers().size());
        stats.put("totalProjects", projectService.getAllProjects().size());
        stats.put("recentLogs", activityService.getRecentLogs());
        return ResponseEntity.ok(stats);
    }
}
