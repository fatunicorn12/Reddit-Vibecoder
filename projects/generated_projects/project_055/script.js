// Base template JavaScript
// Claude will append generated code to this file

document.addEventListener("DOMContentLoaded", () => {
  console.log("Reddit Vibecoder - App Initialized");
  
  try {
    // Initialize the generated app
    initApp();
    console.log("✅ App loaded successfully");
  } catch (error) {
    console.error("❌ App initialization failed:", error);
    // Show error to user
    const appDiv = document.getElementById("app");
    if (appDiv) {
      appDiv.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #e74c3c;">
          <h2>⚠️ App Failed to Load</h2>
          <p>Check the browser console (F12) for error details.</p>
          <p style="font-size: 14px; color: #7f8c8d;">Error: ${error.message}</p>
        </div>
      `;
    }
  }
});

// Placeholder function - Claude will inject initialization code here
function initApp() {
  // Claude will inject initialization code here
}

// Generated code
const experiencesData = [
  {
    id: 'caregiving-elderly',
    name: 'Caring for Elderly Family Member',
    description: 'Providing daily care and support for aging relatives',
    category: 'caregiving',
    skills: [
      {
        name: 'Patience',
        category: 'Personal',
        description: 'Ability to remain calm and composed in challenging situations',
        bullets: [
          'Maintained calm demeanor while managing complex care schedules and medical appointments',
          'Demonstrated patience in teaching technology and daily living skills to elderly family members',
          'Provided consistent emotional support during health challenges and transitions'
        ]
      },
      {
        name: 'Time Management',
        category: 'Organizational',
        description: 'Efficiently organizing and prioritizing tasks and responsibilities',
        bullets: [
          'Coordinated multiple medical appointments, medication schedules, and daily care routines',
          'Balanced caregiving responsibilities with personal and professional commitments',
          'Developed efficient systems for managing household tasks and care documentation'
        ]
      },
      {
        name: 'Crisis Management',
        category: 'Problem-Solving',
        description: 'Ability to handle emergencies and unexpected situations effectively',
        bullets: [
          'Responded quickly and effectively to medical emergencies and health crises',
          'Made critical decisions under pressure regarding care and safety',
          'Coordinated with healthcare professionals during emergency situations'
        ]
      },
      {
        name: 'Communication',
        category: 'Communication',
        description: 'Clear and effective verbal and written communication skills',
        bullets: [
          'Facilitated clear communication between family members and healthcare providers',
          'Advocated effectively for patient needs and preferences in medical settings',
          'Maintained detailed care logs and communicated updates to family members'
        ]
      }
    ]
  },
  {
    id: 'volunteer-food-bank',
    name: 'Food Bank Volunteer',
    description: 'Organizing and distributing food to community members in need',
    category: 'volunteer',
    skills: [
      {
        name: 'Teamwork',
        category: 'Leadership',
        description: 'Working collaboratively with others to achieve common goals',
        bullets: [
          'Collaborated with diverse volunteer teams to efficiently sort and distribute food donations',
          'Coordinated with staff members to ensure smooth operation of food distribution events',
          'Mentored new volunteers and helped integrate them into existing teams'
        ]
      },
      {
        name: 'Customer Service',
        category: 'Communication',
        description: 'Providing helpful and respectful service to clients and customers',
        bullets: [
          'Provided compassionate and respectful service to community members accessing food assistance',
          'Handled sensitive situations with dignity while maintaining program guidelines',
          'Assisted clients in selecting appropriate food items based on family size and dietary needs'
        ]
      },
      {
        name: 'Inventory Management',
        category: 'Organizational',
        description: 'Tracking and organizing supplies and materials efficiently',
        bullets: [
          'Organized and categorized food donations to maximize distribution efficiency',
          'Maintained accurate inventory records of perishable and non-perishable items',
          'Implemented systems to track expiration dates and ensure food safety standards'
        ]
      },
      {
        name: 'Cultural Sensitivity',
        category: 'Personal',
        description: 'Understanding and respecting diverse backgrounds and perspectives',
        bullets: [
          'Served diverse community members with respect and cultural awareness',
          'Adapted communication style to effectively assist clients from various backgrounds',
          'Helped organize culturally appropriate food options for different community groups'
        ]
      }
    ]
  },
  {
    id: 'freelance-writing',
    name: 'Freelance Writing',
    description: 'Creating content for various clients and publications',
    category: 'freelance',
    skills: [
      {
        name: 'Research Skills',
        category: 'Technical',
        description: 'Ability to gather, analyze, and synthesize information from multiple sources',
        bullets: [
          'Conducted thorough research on diverse topics to create accurate and engaging content',
          'Utilized multiple sources to verify information and ensure content credibility',
          'Synthesized complex information into clear, accessible writing for target audiences'
        ]
      },
      {
        name: 'Self-Motivation',
        category: 'Personal',
        description: 'Ability to work independently and maintain productivity without supervision',
        bullets: [
          'Managed multiple writing projects simultaneously while meeting strict deadlines',
          'Developed personal systems for maintaining productivity and quality standards',
          'Proactively sought new opportunities and continuously improved writing skills'
        ]
      },
      {
        name: 'Client Communication',
        category: 'Communication',
        description: 'Professional communication with clients regarding project requirements',
        bullets: [
          'Maintained professional relationships with multiple clients across various industries',
          'Clarified project requirements and expectations to ensure client satisfaction',
          'Provided regular updates on project progress and incorporated client feedback effectively'
        ]
      },
      {
        name: 'Adaptability',
        category: 'Personal',
        description: 'Flexibility to adjust to different writing styles and requirements',
        bullets: [
          'Adapted writing style to match different brand voices and target audiences',
          'Quickly learned new subject areas to produce specialized content',
          'Adjusted to changing project requirements and tight deadline modifications'
        ]
      }
    ]
  },
  {
    id: 'community-organizing',
    name: 'Community Event Organizing',
    description: 'Planning and executing local community events and initiatives',
    category: 'volunteer',
    skills: [
      {
        name: 'Project Management',
        category: 'Organizational',
        description: 'Planning, executing, and overseeing projects from start to finish',
        bullets: [
          'Planned and executed community events serving 200+ attendees from initial concept to completion',
          'Coordinated multiple vendors, volunteers, and stakeholders to ensure successful event delivery',
          'Developed detailed project timelines and managed budgets for community initiatives'
        ]
      },
      {
        name: 'Leadership',
        category: 'Leadership',
        description: 'Guiding and motivating teams to achieve objectives',
        bullets: [
          'Led volunteer teams of 15+ members in organizing and executing community events',
          'Delegated responsibilities effectively and provided guidance to team members',
          'Motivated volunteers and maintained team morale throughout challenging project phases'
        ]
      },
      {
        name: 'Budget Management',
        category: 'Technical',
        description: 'Planning and controlling financial resources effectively',
        bullets: [
          'Managed event budgets ranging from $2,000-$10,000 while maximizing community impact',
          'Negotiated with vendors and secured donations to reduce costs and increase value',
          'Tracked expenses and maintained detailed financial records for transparency'
        ]
      },
      {
        name: 'Public Speaking',
        category: 'Communication',
        description: 'Presenting information clearly and confidently to groups',
        bullets: [
          'Delivered presentations to city council and community groups to secure event support',
          'Served as event emcee and delivered opening remarks to large community gatherings',
          'Facilitated community meetings and guided group discussions on local initiatives'
        ]
      }
    ]
  },
  {
    id: 'pet-sitting',
    name: 'Pet Sitting/Dog Walking',
    description: 'Caring for pets while owners are away',
    category: 'freelance',
    skills: [
      {
        name: 'Responsibility',
        category: 'Personal',
        description: 'Reliability and accountability in fulfilling commitments',
        bullets: [
          'Maintained consistent care schedules for multiple pets, ensuring their health and wellbeing',
          'Handled emergency situations responsibly and communicated effectively with pet owners',
          'Managed house keys and maintained security of client homes during extended absences'
        ]
      },
      {
        name: 'Observation Skills',
        category: 'Technical',
        description: 'Attention to detail and ability to notice important changes or issues',
        bullets: [
          'Monitored pet behavior and health, reporting concerns promptly to owners',
          'Documented daily activities and provided detailed updates to pet owners',
          'Identified and addressed potential safety hazards in pet environments'
        ]
      },
      {
        name: 'Schedule Management',
        category: 'Organizational',
        description: 'Coordinating multiple appointments and commitments efficiently',
        bullets: [
          'Coordinated care schedules for multiple clients while maintaining consistent service quality',
          'Managed booking calendar and communicated availability clearly to clients',
          'Balanced pet care commitments with personal schedule and other responsibilities'
        ]
      },
      {
        name: 'Problem Solving',
        category: 'Problem-Solving',
        description: 'Finding creative solutions to unexpected challenges',
        bullets: [
          'Resolved behavioral issues and adapted care approaches to individual pet needs',
          'Found creative solutions to keep pets engaged and comfortable during owner absences',
          'Handled unexpected situations like weather changes or pet emergencies effectively'
        ]
      }
    ]
  },
  {
    id: 'online-tutoring',
    name: 'Online Tutoring',
    description: 'Teaching and mentoring students through virtual platforms',
    category: 'education',
    skills: [
      {
        name: 'Teaching',
        category: 'Communication',
        description: 'Ability to explain concepts clearly and help others learn',
        bullets: [
          'Developed personalized lesson plans to address individual student learning needs',
          'Explained complex concepts using multiple teaching methods to ensure comprehension',
          'Adapted teaching style to accommodate different learning preferences and abilities'
        ]
      },
      {
        name: 'Technology Proficiency',
        category: 'Technical',
        description: 'Comfortable using various software and digital tools',
        bullets: [
          'Utilized multiple online platforms and tools to deliver engaging virtual lessons',
          'Troubleshot technical issues quickly to minimize disruption to learning sessions',
          'Integrated educational technology and interactive tools to enhance student engagement'
        ]
      },
      {
        name: 'Patience',
        category: 'Personal',
        description: 'Maintaining composure and persistence when facing challenges',
        bullets: [
          'Worked patiently with struggling students to build confidence and understanding',
          'Repeated explanations using different approaches until concepts were mastered',
          'Maintained encouraging attitude even when students faced significant learning challenges'
        ]
      },
      {
        name: 'Assessment',
        category: 'Technical',
        description: 'Evaluating progress and identifying areas for improvement',
        bullets: [
          'Assessed student progress regularly and adjusted teaching strategies accordingly',
          'Created and administered practice tests to evaluate comprehension and retention',
          'Provided constructive feedback to help students identify strengths and improvement areas'
        ]
      }
    ]
  }
];

const skillCategories = ['Communication', 'Leadership', 'Technical', 'Organizational', 'Personal', 'Problem-Solving'];

function initApp() {
  let selectedExperiences = new Set();
  let searchTerm = '';
  let activeFilters = new Set(['all']);
  let activeSkillFilters = new Set(['all']);
  let customExperiences = JSON.parse(localStorage.getItem('customExperiences') || '[]');
  let allExperiences = [...experiencesData, ...customExperiences];

  // DOM elements
  const searchInput = document.getElementById('searchInput');
  const helpToggle = document.getElementById('helpToggle');
  const helpSection = document.getElementById('helpSection');
  const experienceList = document.getElementById('experienceList');
  const skillsDisplay = document.getElementById('skillsDisplay');
  const saveSnapshotBtn = document.getElementById('saveSnapshotBtn');
  const exportBtn = document.getElementById('exportBtn');
  const snapshotsList = document.getElementById('snapshotsList');
  const addCustomBtn = document.getElementById('addCustomBtn');
  const customExperienceModal = document.getElementById('customExperienceModal');
  const customExperienceForm = document.getElementById('customExperienceForm');
  const closeModal = document.getElementById('closeModal');
  const cancelCustom = document.getElementById('cancelCustom');
  const toastContainer = document.getElementById('toastContainer');
  const tooltip = document.getElementById('tooltip');

  // Initialize app
  function init() {
    renderCategoryFilters();
    renderSkillCategoryFilters();
    renderExperiences();
    renderSnapshots();
    updateSkillDisplay();
    attachEventListeners();
  }

  // Event listeners
  function attachEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    helpToggle.addEventListener('click', toggleHelp);
    saveSnapshotBtn.addEventListener('click', saveSnapshot);
    exportBtn.addEventListener('click', exportSkills);
    addCustomBtn.addEventListener('click', showCustomModal);
    closeModal.addEventListener('click', hideCustomModal);
    cancelCustom.addEventListener('click', hideCustomModal);
    customExperienceForm.addEventListener('submit', handleCustomExperience);

    // Modal backdrop click
    customExperienceModal.addEventListener('click', (e) => {
      if (e.target === customExperienceModal) {
        hideCustomModal();
      }
    });
  }

  // Search functionality
  function handleSearch(e) {
    searchTerm = e.target.value.toLowerCase();
    renderExperiences();
  }

  // Help toggle
  function toggleHelp() {
    helpSection.classList.toggle('hidden');
  }

  // Render category filters
  function renderCategoryFilters() {
    const filterContainer = document.querySelector('.category-filters');
    const categories = ['all', ...new Set(allExperiences.map(exp => exp.category))];
    
    filterContainer.innerHTML = categories.map(category => 
      `<button class="filter-btn ${activeFilters.has(category) ? 'active' : ''}" data-category="${category}">
        ${category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
      </button>`
    ).join('');

    // Attach filter listeners
    filterContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        const category = e.target.dataset.category;
        
        if (category === 'all') {
          activeFilters.clear();
          activeFilters.add('all');
        } else {
          activeFilters.delete('all');
          if (activeFilters.has(category)) {
            activeFilters.delete(category);
          } else {
            activeFilters.add(category);
          }
          if (activeFilters.size === 0) {
            activeFilters.add('all');
          }
        }
        
        renderCategoryFilters();
        renderExperiences();
      }
    });
  }

  // Render skill category filters
  function renderSkillCategoryFilters() {
    const filterContainer = document.querySelector('.skill-category-filters');
    const categories = ['all', ...skillCategories];
    
    filterContainer.innerHTML = categories.map(category => 
      `<button class="skill-filter-btn ${activeSkillFilters.has(category) ? 'active' : ''}" data-category="${category}">
        ${category === 'all' ? 'All Skills' : category}
      </button>`
    ).join('');

    // Attach filter listeners
    filterContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('skill-filter-btn')) {
        const category = e.target.dataset.category;
        
        if (category === 'all') {
          activeSkillFilters.clear();
          activeSkillFilters.add('all');
        } else {
          activeSkillFilters.delete('all');
          if (activeSkillFilters.has(category)) {
            activeSkillFilters.delete(category);
          } else {
            activeSkillFilters.add(category);
          }
          if (activeSkillFilters.size === 0) {
            activeSkillFilters.add('all');
          }
        }
        
        renderSkillCategoryFilters();
        updateSkillDisplay();
      }
    });
  }

  // Render experiences
  function renderExperiences() {
    let filteredExperiences = allExperiences;

    // Apply search filter
    if (searchTerm) {
      filteredExperiences = filteredExperiences.filter(exp =>
        exp.name.toLowerCase().includes(searchTerm) ||
        exp.description.toLowerCase().includes(searchTerm) ||
        exp.category.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (!activeFilters.has('all')) {
      filteredExperiences = filteredExperiences.filter(exp =>
        activeFilters.has(exp.category)
      );
    }

    experienceList.innerHTML = filteredExperiences.map(exp => `
      <div class="experience-card ${selectedExperiences.has(exp.id) ? 'selected' : ''}" data-id="${exp.id}">
        <input type="checkbox" ${selectedExperiences.has(exp.id) ? 'checked' : ''}>
        <div class="experience-category">${exp.category}</div>
        <div class="experience-title">${exp.name}</div>
        <div class="experience-description">${exp.description}</div>
      </div>
    `).join('');

    // Attach experience selection listeners
    experienceList.addEventListener('click', (e) => {
      const card = e.target.closest('.experience-card');
      if (card) {
        const expId = card.dataset.id;
        const checkbox = card.querySelector('input[type="checkbox"]');
        
        if (selectedExperiences.has(expId)) {
          selectedExperiences.delete(expId);
          checkbox.checked = false;
          card.classList.remove('selected');
        } else {
          selectedExperiences.add(expId);
          checkbox.checked = true;
          card.classList.add('selected');
        }
        
        updateSkillDisplay();
      }
    });
  }

  // Update skill display
  function updateSkillDisplay() {
    if (selectedExperiences.size === 0) {
      skillsDisplay.innerHTML = `
        <div class="empty-state">
          <p>Select experiences to discover your transferable skills</p>
        </div>
      `;
      return;
    }

    // Aggregate skills from selected experiences
    const skillsMap = new Map();
    
    selectedExperiences.forEach(expId => {
      const experience = allExperiences.find(exp => exp.id === expId);
      if (experience) {
        experience.skills.forEach(skill => {
          if (!skillsMap.has(skill.name)) {
            skillsMap.set(skill.name, {
              ...skill,
              bullets: [...skill.bullets]
            });
          } else {
            // Merge bullets, avoiding duplicates
            const existingSkill = skillsMap.get(skill.name);
            skill.bullets.forEach(bullet => {
              if (!existingSkill.bullets.includes(bullet)) {
                existingSkill.bullets.push(bullet);
              }
            });
          }
        });
      }
    });

    // Filter skills by category
    let filteredSkills = Array.from(skillsMap.values());
    if (!activeSkillFilters.has('all')) {
      filteredSkills = filteredSkills.filter(skill =>
        activeSkillFilters.has(skill.category)
      );
    }

    // Group skills by category
    const skillsByCategory = {};
    filteredSkills.forEach(skill => {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category].push(skill);
    });

    // Render skills
    let html = '';
    Object.keys(skillsByCategory).sort().forEach(category => {
      html += `
        <div class="skill-category">
          <h3>${category} Skills</h3>
          ${skillsByCategory[category].map((skill, index) => `
            <div class="skill-item" style="animation-delay: ${index * 0.1}s" data-skill-name="${skill.name}" data-skill-description="${skill.description}">
              <div class="skill-name">${skill.name}</div>
              <ul class="skill-bullets">
                ${skill.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      `;
    });

    skillsDisplay.innerHTML = html || `
      <div class="empty-state">
        <p>No skills match the current filters</p>
      </div>
    `;

    // Attach tooltip listeners
    skillsDisplay.addEventListener('mouseenter', handleTooltipShow, true);
    skillsDisplay.addEventListener('mouseleave', handleTooltipHide, true);
  }

  // Tooltip handlers
  function handleTooltipShow(e) {
    const skillItem = e.target.closest('.skill-item');
    if (skillItem) {
      const description = skillItem.dataset.skillDescription;
      const rect = skillItem.getBoundingClientRect();
      
      tooltip.textContent = description;
      tooltip.style.left = rect.left + (rect.width / 2) + 'px';
      tooltip.style.top = rect.top - 10 + 'px';
      tooltip.classList.remove('hidden');
    }
  }

  function handleTooltipHide(e) {
    const skillItem = e.target.closest('.skill-item');
    if (skillItem) {
      tooltip.classList.add('hidden');
    }
  }

  // Save snapshot
  function saveSnapshot() {
    if (selectedExperiences.size === 0) {
      showToast('Please select at least one experience first!', 'error');
      return;
    }

    const timestamp = new Date().toISOString();
    const snapshot = {
      id: timestamp,
      name: `Snapshot ${new Date().toLocaleDateString()}`,
      selectedExperiences: Array.from(selectedExperiences),
      searchTerm,
      activeFilters: Array.from(activeFilters),
      activeSkillFilters: Array.from(activeSkillFilters),
      timestamp
    };

    const snapshots = JSON.parse(localStorage.getItem('skillSnapshots') || '[]');
    snapshots.push(snapshot);
    localStorage.setItem('skillSnapshots', JSON.stringify(snapshots));

    showToast('Saved to My Skill Snapshot!');
    renderSnapshots();
  }

  // Render snapshots
  function renderSnapshots() {
    const snapshots = JSON.parse(localStorage.getItem('skillSnapshots') || '[]');
    
    snapshotsList.innerHTML = snapshots.map(snapshot => `
      <div class="snapshot-item" data-id="${snapshot.id}">
        <div class="snapshot-name">${snapshot.name}</div>
        <div class="snapshot-date">${new Date(snapshot.timestamp).toLocaleDateString()}</div>
        <button class="delete-snapshot" data-id="${snapshot.id}">×</button>
      </div>
    `).join('');

    // Attach snapshot listeners
    snapshotsList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-snapshot')) {
        const id = e.target.dataset.id;
        const snapshots = JSON.parse(localStorage.getItem('skillSnapshots') || '[]');
        const filtered = snapshots.filter(s => s.id !== id);
        localStorage.setItem('skillSnapshots', JSON.stringify(filtered));
        renderSnapshots();
        showToast('Snapshot deleted');
      } else {
        const item = e.target.closest('.snapshot-item');
        if (item) {
          const id = item.dataset.id;
          const snapshot = snapshots.find(s => s.id === id);
          if (snapshot) {
            loadSnapshot(snapshot);
          }
        }
      }
    });
  }

  // Load snapshot
  function loadSnapshot(snapshot) {
    selectedExperiences = new Set(snapshot.selectedExperiences);
    searchTerm = snapshot.searchTerm || '';
    activeFilters = new Set(snapshot.activeFilters || ['all']);
    activeSkillFilters = new Set(snapshot.activeSkillFilters || ['all']);

    searchInput.value = searchTerm;
    renderCategoryFilters();
    renderSkillCategoryFilters();
    renderExperiences();
    updateSkillDisplay();

    showToast('Snapshot loaded!');
  }

  // Export skills
  function exportSkills() {
    if (selectedExperiences.size === 0) {
      showToast('Please select at least one experience first!', 'error');
      return;
    }

    // Generate export content
    let content = 'MY TRANSFERABLE SKILLS\n';
    content += '======================\n\n';
    content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

    // Get current skills
    const skillsMap = new Map();
    selectedExperiences.forEach(expId => {
      const experience = allExperiences.find(exp => exp.id === expId);
      if (experience) {
        experience.skills.forEach(skill => {
          if (!skillsMap.has(skill.name)) {
            skillsMap.set(skill.name, {
              ...skill,
              bullets: [...skill.bullets]
            });
          } else {
            const existingSkill = skillsMap.get(skill.name);
            skill.bullets.forEach(bullet => {
              if (!existingSkill.bullets.includes(bullet)) {
                existingSkill.bullets.push(bullet);
              }
            });
          }
        });
      }
    });

    // Group by category
    const skillsByCategory = {};
    Array.from(skillsMap.values()).forEach(skill => {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category].push(skill);
    });

    // Generate content
    Object.keys(skillsByCategory).sort().forEach(category => {
      content += `${category.toUpperCase()} SKILLS\n`;
      content += '-'.repeat(category.length + 7) + '\n\n';
      
      skillsByCategory[category].forEach(skill => {
        content += `${skill.name}:\n`;
        skill.bullets.forEach(bullet => {
          content += `• ${bullet}\n`;
        });
        content += '\n';
      });
      content += '\n';
    });

    // Download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-transferable-skills.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Skills exported successfully!');
  }

  // Custom experience modal
  function showCustomModal() {
    customExperienceModal.classList.remove('hidden');
  }

  function hideCustomModal() {
    customExperienceModal.classList.add('hidden');
    customExperienceForm.reset();
  }

  // Handle custom experience
  function handleCustomExperience(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('experienceName').trim();
    const category = formData.get('experienceCategory');
    const skillsText = formData.get('experienceSkills').trim();
    const bulletsText = formData.get('experienceBullets').trim();

    if (!name || !category || !skillsText || !bulletsText) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    // Parse skills and bullets
    const skillNames = skillsText.split(',').map(s => s.trim()).filter(s => s);
    const bullets = bulletsText.split('\n').map(b => b.trim().replace(/^[•\-\*]\s*/, '')).filter(b => b);

    if (skillNames.length === 0 || bullets.length === 0) {
      showToast('Please provide at least one skill and one bullet point', 'error');
      return;
    }

    // Create skills objects
    const skills = skillNames.map(skillName => {
      // Try to categorize the skill
      const category = categorizeSkill(skillName);
      return {
        name: skillName,
        category: category,
        description: `Skill developed through ${name.toLowerCase()}`,
        bullets: [...bullets] // All bullets apply to all skills for custom experiences
      };
    });

    // Create experience object
    const customExperience = {
      id: `custom-${Date.now()}`,
      name: name,
      description: `Custom experience: ${name}`,
      category: category,
      skills: skills
    };

    // Save to localStorage
    customExperiences.push(customExperience);
    localStorage.setItem('customExperiences', JSON.stringify(customExperiences));
    
    // Update all experiences
    allExperiences = [...experiencesData, ...customExperiences];
    
    // Re-render
    renderCategoryFilters();
    renderExperiences();
    hideCustomModal();
    
    showToast('Experience Added!');
  }

  // Categorize skill helper
  function categorizeSkill(skillName) {
    const skillLower = skillName.toLowerCase();
    
    if (skillLower.includes('communication') || skillLower.includes('speaking') || skillLower.includes('writing') || skillLower.includes('presentation')) {
      return 'Communication';
    } else if (skillLower.includes('leadership') || skillLower.includes('management') || skillLower.includes('team') || skillLower.includes('supervise')) {
      return 'Leadership';
    } else if (skillLower.includes('technical') || skillLower.includes('computer') || skillLower.includes('software') || skillLower.includes('technology')) {
      return 'Technical';
    } else if (skillLower.includes('organization') || skillLower.includes('planning') || skillLower.includes('schedule') || skillLower.includes('time')) {
      return 'Organizational';
    } else if (skillLower.includes('problem') || skillLower.includes('solve') || skillLower.includes('critical') || skillLower.includes('analysis')) {
      return 'Problem-Solving';
    } else {
      return 'Personal';
    }
  }

  // Toast notifications
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Initialize the app
  init();
}