package it.monko.spring.project;

import it.monko.spring.project.dto.ProjectRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody ProjectRequest request) {
        Project created = projectService.createProject(request);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project deleted");
    }

    @PutMapping("/{id}/progress")
    public ResponseEntity<Project> updateProgress(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        int progress = body.getOrDefault("progress", 0);
        Project updated = projectService.updateProgress(id, progress);
        return ResponseEntity.ok(updated);
    }
}
