<template>
    <div class="model-edit-container">
      <div class="model-edit-sidebar">
        <h2 class="edit-header">Edit Model Details</h2>
        <form @submit.prevent="handleSubmit" class="edit-form">
          <!-- Title Input -->
          <div class="form-group">
            <label for="title" class="form-label">Title</label>
            <input
              v-model="formData.title"
              type="text"
              id="title"
              class="form-input"
              required
            />
          </div>
  
          <!-- Description Editor -->
          <div class="form-group">
            <label class="form-label">Description</label>
            <div class="editor-wrapper">
              <div class="editor-toolbar">
                <button
                  v-for="(tool, index) in textTools"
                  :key="index"
                  @click.prevent="applyTextStyle(tool.command)"
                  class="toolbar-btn"
                  :title="tool.name"
                >
                  <span v-html="tool.icon"></span>
                </button>
              </div>
              <div
                ref="editor"
                contenteditable="true"
                class="editor-content"
                @input="updateDescription"
              ></div>
            </div>
          </div>
  
          <!-- Categories and Tags Section -->
          <div class="form-row">
            <div class="form-group half-width">
              <label for="category" class="form-label">Category</label>
              <select
                v-model="formData.category"
                id="category"
                class="form-select"
              >
                <option value="">Select category</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
            
            <div class="form-group half-width">
              <label class="form-label">Tags</label>
              <div class="tags-input">
                <div class="tags-container">
                  <span
                    v-for="tag in formData.tags"
                    :key="tag"
                    class="tag"
                  >
                    {{ tag }}
                    <button
                      @click="removeTag(tag)"
                      class="tag-remove"
                    >×</button>
                  </span>
                </div>
                <input
                  v-model="newTag"
                  @keydown.enter.prevent="addTag"
                  type="text"
                  placeholder="Add tags..."
                  class="tag-input"
                />
              </div>
            </div>
          </div>
  
          <!-- Settings Section -->
          <div class="settings-section">
            <h3 class="settings-header">Visibility & Settings</h3>
            
            <!-- Visibility Options -->
            <div class="visibility-options">
              <label class="form-label">Who can see this post?</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="formData.visibility" value="private"/>
                  <span>Only me</span>
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="formData.visibility" value="users"/>
                  <span>Logged in users</span>
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="formData.visibility" value="public"/>
                  <span>Everyone</span>
                </label>
              </div>
            </div>
  
            <!-- Toggles -->
            <div class="toggles-group">
              <div class="toggle-item">
                <span>Allow comments?</span>
                <button
                  @click.prevent="formData.allowComments = !formData.allowComments"
                  class="toggle-switch"
                  :class="{ 'active': formData.allowComments }"
                >
                  <span class="toggle-slider"></span>
                </button>
              </div>
              <div class="toggle-item">
                <span>Allow reposts?</span>
                <button
                  @click.prevent="formData.allowReposts = !formData.allowReposts"
                  class="toggle-switch"
                  :class="{ 'active': formData.allowReposts }"
                >
                  <span class="toggle-slider"></span>
                </button>
              </div>
            </div>
  
            <!-- Download Type -->
            <div class="download-type">
              <label class="form-label">Download Type</label>
              <div class="button-group">
                <button
                  v-for="type in downloadTypes"
                  :key="type"
                  @click.prevent="formData.downloadType = type"
                  class="download-btn"
                  :class="{ 'active': formData.downloadType === type }"
                >
                  {{ type }}
                </button>
              </div>
            </div>
          </div>
  
          <!-- Submit Button -->
          <button type="submit" class="submit-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      // Form data for binding
      formData: {
        title: '',
        description: '',
        category: '',
        tags: [],
        visibility: 'private',
        allowComments: false,
        allowReposts: false,
        downloadType: '',
      },
      // List of categories
      categories: ['Technology', 'Art', 'Science', 'Education', 'Gaming'],
      // Tags handling
      newTag: '',
      // Download type options
      downloadTypes: ['PDF', 'Image', 'Text'],
      // Text tools for the editor toolbar
      textTools: [
        { name: 'Bold', command: 'bold', icon: '<b>B</b>' },
        { name: 'Italic', command: 'italic', icon: '<i>I</i>' },
        { name: 'Underline', command: 'underline', icon: '<u>U</u>' },
      ],
    };
  },
  methods: {
    // Submit form handler
    handleSubmit() {
      // Logic to handle form submission
      console.log('Form submitted with data:', this.formData);
    },
    // Update description from the editor
    updateDescription(event) {
      this.formData.description = event.target.innerHTML;
    },
    // Apply text style in editor
    applyTextStyle(command) {
      document.execCommand(command, false, null);
    },
    // Add a new tag
    addTag() {
      if (this.newTag.trim() && !this.formData.tags.includes(this.newTag.trim())) {
        this.formData.tags.push(this.newTag.trim());
      }
      this.newTag = '';
    },
    // Remove an existing tag
    removeTag(tag) {
      this.formData.tags = this.formData.tags.filter((t) => t !== tag);
    },
  },
};
</script>

  
  <style scoped>
  .model-edit-container {
    display: flex;
    background-color: #1a1a1a;
    border-radius: 8px;
    width: 400px;
    margin: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .model-edit-sidebar {
    flex: 1;
    padding: 20px;
    background-color: #242424;
    border-radius: 8px;
  }
  
  .edit-header {
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #333;
  }
  
  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-row {
    display: flex;
    gap: 1rem;
  }
  
  .half-width {
    flex: 1;
  }
  
  .form-label {
    color: #a0aec0;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .form-input,
  .form-select,
  .editor-content {
    background-color: #333;
    border: 1px solid #404040;
    color: #fff;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    transition: all 0.2s;
  }
  
  .form-input:focus,
  .form-select:focus,
  .editor-content:focus {
    border-color: #6366f1;
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
  
  .editor-wrapper {
    border: 1px solid #404040;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .editor-toolbar {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: #2d2d2d;
    border-bottom: 1px solid #404040;
  }
  
  .toolbar-btn {
    padding: 0.25rem 0.5rem;
    background: none;
    border: none;
    color: #a0aec0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .toolbar-btn:hover {
    background-color: #404040;
    color: #fff;
  }
  
  .editor-content {
    min-height: 100px;
    padding: 0.75rem;
  }
  
  .tags-input {
    background-color: #333;
    border: 1px solid #404040;
    border-radius: 4px;
    padding: 0.25rem;
  }
  
  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.25rem;
  }
  
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    background-color: #6366f1;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
  }
  
  .tag-remove {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0 0.25rem;
  }
  
  .tag-input {
    background: none;
    border: none;
    color: white;
    padding: 0.25rem;
    width: 100%;
  }
  
  .tag-input:focus {
    outline: none;
  }
  
  .settings-section {
    background-color: #2d2d2d;
    padding: 1rem;
    border-radius: 4px;
    margin-top: 1rem;
  }
  
  .settings-header {
    color: #fff;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .radio-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #a0aec0;
    cursor: pointer;
  }
  
  .toggle-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.75rem 0;
  }
  
  .toggle-switch {
    position: relative;
    width: 36px;
    height: 20px;
    background-color: #404040;
    border-radius: 9999px;
    padding: 2px;
    transition: background-color 0.2s;
  }
  
  .toggle-switch.active {
    background-color: #6366f1;
  }
  
  .toggle-slider {
    display: block;
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.2s;
  }
  
  .toggle-switch.active .toggle-slider {
    transform: translateX(16px);
  }
  
  .button-group {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .download-btn {
    flex: 1;
    padding: 0.5rem;
    background-color: #333;
    border: none;
    color: #a0aec0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .download-btn.active {
    background-color: #6366f1;
    color: white;
  }
  
  .submit-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #6366f1;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 1rem;
  }
  
  .submit-btn:hover {
    background-color: #5a67d8;
  }
  </style>