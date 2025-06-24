package com.securenotes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.secuenotes.repository.NoteRepository;

import securenotes.model.Note;

import java.util.List;

@CrossOrigin(origins = "*")  // Allow frontend access
@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteRepository repo;

    @GetMapping
    public List<Note> getAllNotes() {
        return repo.findAll();
    }

    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return repo.save(note);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @PutMapping("/{id}/bookmark")
    public Note toggleBookmark(@PathVariable Long id) {
        Note note = repo.findById(id).orElseThrow();
        note.setBookmarked(!note.isBookmarked());
        return repo.save(note);
    }

    @PutMapping("/{id}/archive")
    public Note toggleArchive(@PathVariable Long id) {
        Note note = repo.findById(id).orElseThrow();
        note.setArchived(!note.isArchived());
        return repo.save(note);
    }
}
