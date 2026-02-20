package it.monko.spring.logicforregestration.project;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectDB, Long> {
    List<ProjectDB> findByStatus(String status);
}
