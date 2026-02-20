package it.monko.spring.logicforregestration.project;

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

    // GET all projects
    @GetMapping
    public ResponseEntity<List<ProjectDB>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    // GET project by id
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDB> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    // POST create new project
    @PostMapping
    public ResponseEntity<ProjectDB> createProject(@RequestBody ProjectRequest request) {
        ProjectDB created = projectService.createProject(request);
        return ResponseEntity.ok(created);
    }

    // DELETE project
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project deleted");
    }

    // PUT update progress
    @PutMapping("/{id}/progress")
    public ResponseEntity<ProjectDB> updateProgress(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        int progress = body.getOrDefault("progress", 0);
        ProjectDB updated = projectService.updateProgress(id, progress);
        return ResponseEntity.ok(updated);
    }
}
