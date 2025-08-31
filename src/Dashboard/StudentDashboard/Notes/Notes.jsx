import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axiosInstance from "../../../hooks/Axios";
import AddNote from "./Addnote/Addnote";
import Swal from "sweetalert2";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch notes from /notes endpoint
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axiosInstance.get("/notes");
        const validatedNotes = (response.data.data || []).map((note) => ({
          id: note._id || note.id,
          title: note.title || "Untitled",
          details: note.details || note.description || "No details provided",
          createdAt: note.createdAt || new Date().toISOString(),
        }));
        setNotes(validatedNotes);
        setLoading(false);
      } catch (err) {
        console.error("Fetch notes error:", err.response || err);
        setError(err.response?.data?.message || "Failed to fetch notes.");
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // Handle adding a new note
  const handleAddNote = async (newNote) => {
    if (!newNote) {
      setAddModalOpen(false); // Close modal on cancel
      return;
    }
    try {
      const response = await axiosInstance.post("/notes", newNote);
      console.log("Added note:", response.data.data);
      // Normalize the added note's ID
      const normalizedNote = {
        ...response.data.data,
        id: response.data.data._id || response.data.data.id
      };
      setNotes([...notes, normalizedNote]);
      setAddModalOpen(false);
    } catch (err) {
      console.error("Add note error:", err.response || err);
      setError(err.response?.data?.message || "Failed to add note.");
    }
  };

  // Handle editing a note
  const handleEdit = (note) => {
    setSelectedNote(note);
    setEditModalOpen(true);
  };

  // Handle updating a note
  const handleUpdateNote = async (updatedNote) => {
    if (!updatedNote) {
      setEditModalOpen(false); // Close modal on cancel
      return;
    }
    try {
      const response = await axiosInstance.put(`/notes/${updatedNote.id}`, updatedNote);
      console.log("Updated note:", response.data.data);
      
      // Normalize the updated note's ID to match frontend format
      const normalizedUpdatedNote = {
        ...response.data.data,
        id: response.data.data._id || response.data.data.id
      };
      
      // Update the notes state with the normalized note
      setNotes(notes.map((note) => 
        note.id === updatedNote.id ? normalizedUpdatedNote : note
      ));
      
      setEditModalOpen(false);
      setSelectedNote(null);
      setError(""); // Clear any existing errors
    } catch (err) {
      console.error("Update note error:", err.response || err);
      setError(err.response?.data?.message || "Failed to update note.");
    }
  };

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      await axiosInstance.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
      Swal.fire("Deleted!", "Your note has been deleted.", "success");
    } catch (err) {
      console.error("Delete note error:", err.response || err);
      Swal.fire("Error!", err.response?.data?.message || "Failed to delete note.", "error");
    }
  }
};

  // Strip HTML tags for preview
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Truncate details to 10 words
  const truncateDetails = (text) => {
    const plainText = stripHtml(text);
    const words = plainText.split(" ");
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : plainText;
  };

  // Open view modal with selected note
  const openViewModal = (note) => {
    if (note && note.title && note.details) {
      setSelectedNote(note);
      setViewModalOpen(true);
    } else {
      console.error("Invalid note:", note);
      setError("Cannot view note: Invalid note data.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            Notes
          </h2>
          <button
            onClick={() => setAddModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <span className="mr-2">Add Note</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Notes List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No notes available. Add a new note to get started!
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow group"
              >
                {/* Edit/Delete Buttons */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FaEdit size={24} />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <MdDeleteForever size={24} />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {note.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {truncateDetails(note.details)}
                </p>
                <button
                  onClick={() => openViewModal(note)}
                  className="text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center"
                >
                  View Full Note
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* View Note Modal */}
        {viewModalOpen && selectedNote && selectedNote.title && selectedNote.details && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedNote.title}</h3>
                <button
                  onClick={() => setViewModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div
                className="text-gray-700 mb-4"
                dangerouslySetInnerHTML={{ __html: selectedNote.details }}
              />
              <p className="text-sm text-gray-500">
                Created: {new Date(selectedNote.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* Add Note Modal */}
        {addModalOpen && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg sm:max-w-xl lg:max-w-3xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Add New Note</h3>
                <button
                  onClick={() => setAddModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <AddNote handleAddNote={handleAddNote} />
            </div>
          </div>
        )}

        {/* Edit Note Modal */}
        {editModalOpen && selectedNote && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg sm:max-w-xl lg:max-w-3xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Edit Note</h3>
                <button
                  onClick={() => {
                    setEditModalOpen(false);
                    setSelectedNote(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <AddNote
                handleAddNote={handleUpdateNote}
                initialNote={selectedNote}
                isEditing={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;