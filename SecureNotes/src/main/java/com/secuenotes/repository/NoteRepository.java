package com.secuenotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import securenotes.model.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {}
