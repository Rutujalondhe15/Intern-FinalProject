// script.js
const addNoteBtn = document.getElementById("addNoteBtn");
const noteModal = document.getElementById("noteModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const noteInput = document.getElementById("noteInput");
const notePassword = document.getElementById("notePassword");
const notesContainer = document.getElementById("notesContainer");
const searchBar = document.getElementById("searchBar");
const pinNoteBtn = document.getElementById("pinNoteBtn");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");

const ENCRYPTED_NOTES_KEY = "secureNotes";
let pinNote = false;

addNoteBtn.onclick = () => {
  noteModal.classList.remove("hidden");
  noteInput.value = "";
  notePassword.value = "";
  pinNote = false;
  pinNoteBtn.textContent = "📌 Pin";
};

pinNoteBtn.onclick = () => {
  pinNote = !pinNote;
  pinNoteBtn.textContent = pinNote ? "📌 Pinned" : "📌 Pin";
};

closeModalBtn.onclick = () => {
  noteModal.classList.add("hidden");
};

saveNoteBtn.onclick = () => {
  const text = noteInput.value.trim();
  const password = notePassword.value;
  if (text && password) {
    const createdAt = new Date().toISOString();
    const encrypted = btoa(unescape(encodeURIComponent(`${text}::${password}::${pinNote}::${createdAt}`)));
    const notes = JSON.parse(localStorage.getItem(ENCRYPTED_NOTES_KEY)) || [];
    notes.push(encrypted);
    localStorage.setItem(ENCRYPTED_NOTES_KEY, JSON.stringify(notes));
    noteModal.classList.add("hidden");
    renderNotes();
  } else {
    alert("Please fill in both note and password.");
  }
};

function renderNotes() {
  notesContainer.innerHTML = "";
  const notes = JSON.parse(localStorage.getItem(ENCRYPTED_NOTES_KEY)) || [];

  const parsedNotes = notes.map((enc, i) => {
    const decrypted = decodeURIComponent(escape(atob(enc))).split("::");
    return {
      index: i,
      text: decrypted[0],
      password: decrypted[1],
      pinned: decrypted[2] === "true",
      createdAt: decrypted[3]
    };
  });

  parsedNotes.sort((a, b) => b.pinned - a.pinned || new Date(b.createdAt) - new Date(a.createdAt));

  parsedNotes.forEach((note) => {
    const noteCard = document.createElement("div");
    noteCard.classList.add("note-card");
    if (note.pinned) noteCard.classList.add("pinned");
    noteCard.innerHTML = `
      <div class="note-text">🔐 Encrypted Note</div>
      <div class="note-meta">${new Date(note.createdAt).toLocaleString()}</div>
      <div class="actions">
        <button onclick="decryptNote(${note.index})">Decrypt</button>
        <button onclick="copyNote(${note.index})">Copy</button>
        <button onclick="deleteNote(${note.index})">Delete</button>
      </div>`;
    notesContainer.appendChild(noteCard);
  });
}

function decryptNote(index) {
  const password = prompt("Enter password to decrypt:");
  const notes = JSON.parse(localStorage.getItem(ENCRYPTED_NOTES_KEY)) || [];
  const decrypted = decodeURIComponent(escape(atob(notes[index])));
  const [note, storedPassword] = decrypted.split("::");
  if (password === storedPassword) {
    alert(`Decrypted Note:\n${note}`);
  } else {
    alert("Incorrect password!");
  }
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem(ENCRYPTED_NOTES_KEY)) || [];
  notes.splice(index, 1);
  localStorage.setItem(ENCRYPTED_NOTES_KEY, JSON.stringify(notes));
  renderNotes();
}

function copyNote(index) {
  const password = prompt("Enter password to copy:");
  const notes = JSON.parse(localStorage.getItem(ENCRYPTED_NOTES_KEY)) || [];
  const decrypted = decodeURIComponent(escape(atob(notes[index])));
  const [note, storedPassword] = decrypted.split("::");
  if (password === storedPassword) {
    navigator.clipboard.writeText(note).then(() => alert("Note copied to clipboard."));
  } else {
    alert("Incorrect password!");
  }
}

searchBar.oninput = () => {
  const value = searchBar.value.toLowerCase();
  document.querySelectorAll(".note-card").forEach((card) => {
    const match = card.textContent.toLowerCase().includes(value);
    card.style.display = match ? "block" : "none";
  });
};

exportBtn.onclick = () => {
  const notes = localStorage.getItem(ENCRYPTED_NOTES_KEY);
  const blob = new Blob([notes], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "secure_notes_backup.json";
  a.click();
  URL.revokeObjectURL(url);
};

importBtn.onclick = () => {
  importFile.click();
};

importFile.onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (Array.isArray(data)) {
        localStorage.setItem(ENCRYPTED_NOTES_KEY, JSON.stringify(data));
        renderNotes();
      }
    } catch {
      alert("Invalid file format.");
    }
  };
  reader.readAsText(file);
};

// Initialize
renderNotes();