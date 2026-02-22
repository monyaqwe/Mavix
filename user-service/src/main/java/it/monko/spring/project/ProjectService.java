package it.monko.spring.project;

import it.monko.spring.project.dto.ProjectRequest;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project saveProject(ProjectRequest request) {
        Project project = new Project();
        project.setName(request.name());
        project.setDescription(request.description());
        // Frontend expects random colors for new projects
        String[] colors = {"#4f8bff", "#7c5cfc", "#a855f7", "#ec4899", "#10b981", "#06b6d4", "#f59e0b", "#ef4444"};
        project.setColor(colors[(int) (Math.random() * colors.length)]);
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public Project updateProgress(Long id, int progress) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setProgress(progress);
        if (progress >= 100) {
            project.setStatus("COMPLETED");
        }
        return projectRepository.save(project);
    }
}
