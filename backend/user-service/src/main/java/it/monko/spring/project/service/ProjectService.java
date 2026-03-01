package it.monko.spring.project.service;

import it.monko.spring.activity.service.ActivityService;
import it.monko.spring.project.dto.ProjectRequest;
import it.monko.spring.project.model.Project;
import it.monko.spring.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ActivityService activityService;

    public ProjectService(ProjectRepository projectRepository, ActivityService activityService) {
        this.projectRepository = projectRepository;
        this.activityService = activityService;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project saveProject(ProjectRequest request) {
        Project project = new Project();
        project.setName(request.name());
        project.setDescription(request.description());
        Project savedProject = projectRepository.save(project);
        activityService.logActivity("Project Created", savedProject.getName(), "Success");
        return savedProject;
    }
}
