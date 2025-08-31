
import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const AddNote = ({ handleAddNote, initialNote = null, isEditing = false }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  // Initialize form with existing note data in edit mode
  useEffect(() => {
    if (isEditing && initialNote) {
      setTitle(initialNote.title || "");
      setDetails(initialNote.details || "");
    } else {
      setTitle("");
      setDetails("");
    }
  }, [isEditing, initialNote]);

  // Strip HTML tags for validation
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const plainDetails = stripHtml(details).trim();
    if (!title.trim() || !plainDetails) {
      setError("Please fill in both title and details.");
      return;
    }
    const note = {
      ...(isEditing && { id: initialNote.id }),
      title: title.trim(),
      details: details.trim(),
      createdAt: isEditing ? initialNote.createdAt : new Date().toISOString(),
    };
    handleAddNote(note);
    setTitle("");
    setDetails("");
    setError("");
  };

  const handleCancel = () => {
    setTitle("");
    setDetails("");
    setError("");
    handleAddNote(null); // Notify parent to close modal
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Title Field */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          placeholder="Enter note title"
          required
        />
      </div>

      {/* Details Field with TinyMCE */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Details
        </label>
        <Editor
          apiKey="omvpp0a8wm3rf2q7bpkhn6cbvz260ncye2yi8axr5a5daj9e"
          value={details}
          onEditorChange={(content) => setDetails(content)}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          {isEditing ? "Update Note" : "Save Note"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddNote;