package com.back.repositories;
import org.springframework.stereotype.Repository;

import com.back.entities.*;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {
}
