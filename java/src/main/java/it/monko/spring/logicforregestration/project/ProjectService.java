package it.monko.spring.logicforregestration.project;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    private static final String[] COLORS = {
            "linear-gradient(135deg, #4f8bff, #7c5cfc)",
            "linear-gradient(135deg, #a855f7, #ec4899)",
            "linear-gradient(135deg, #10b981, #06b6d4)",
            "linear-gradient(135deg, #f59e0b, #ef4444)",
            "linear-gradient(135deg, #06b6d4, #4f8bff)",
            "linear-gradient(135deg, #8b5cf6, #6366f1)"
    };

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectDB> getAllProjects() {
        return projectRepository.findAll();
    }

    public ProjectDB getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
    }

    public ProjectDB createProject(ProjectRequest request) {
        long count = projectRepository.count();
        String color = COLORS[(int) (count % COLORS.length)];

        ProjectDB project = new ProjectDB();
        project.setName(request.name());
        project.setDescription(request.description());
        project.setStatus("ACTIVE");
        project.setProgress(0);
        project.setColor(color);

        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found");
        }
        projectRepository.deleteById(id);
    }

    public ProjectDB updateProgress(Long id, int progress) {
        ProjectDB project = getProjectById(id);
        project.setProgress(Math.max(0, Math.min(100, progress)));
        if (progress >= 100) {
            project.setStatus("COMPLETED");
        }
        return projectRepository.save(project);
    }
}
