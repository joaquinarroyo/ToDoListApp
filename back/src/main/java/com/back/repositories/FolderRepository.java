package com.back.repositorios;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.back.entidades.*;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {
	
}