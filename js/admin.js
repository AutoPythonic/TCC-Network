document.addEventListener('DOMContentLoaded', function() {
    // Admin credentials (in a real application, this would be handled server-side)
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'tcc2025admin';
    
    // DOM elements
    const loginContainer = document.getElementById('loginContainer');
    const adminPanel = document.getElementById('adminPanel');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const loginError = document.getElementById('loginError');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Service status elements
    const referralSystemStatus = document.getElementById('referralSystemStatus');
    const automationScriptStatus = document.getElementById('automationScriptStatus');
    const referralSystemLabel = document.getElementById('referralSystemLabel');
    const automationScriptLabel = document.getElementById('automationScriptLabel');
    const lastUpdatedTime = document.getElementById('lastUpdatedTime');
    const updateTimestampButton = document.getElementById('updateTimestampButton');
    const saveStatusButton = document.getElementById('saveStatusButton');
    const statusMessage = document.getElementById('statusMessage');
    const yearElement = document.getElementById('year');
    
    // Initialize service status
    function initializeServiceStatus() {
        // Set current year
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // Fetch current status from status.json
        fetchCurrentStatus();
    }
    
    // Fetch current status from status.json
    function fetchCurrentStatus() {
        // Add cache-busting query parameter to prevent caching
        const cacheBuster = `?_=${new Date().getTime()}`;
        
        fetch(`../data/status.json${cacheBuster}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(status => {
                updateUIWithStatus(status);
            })
            .catch(error => {
                console.error('Error fetching service status:', error);
                showStatusMessage('Error loading current status. Using default values.', 'error');
                
                // Use default values if fetch fails
                const now = new Date();
                const options = { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                };
                
                const defaultStatus = {
                    referralSystem: true,
                    automationScript: false,
                    lastUpdated: now.toLocaleDateString('en-US', options)
                };
                
                updateUIWithStatus(defaultStatus);
            });
    }
    
    // Update UI with status data
    function updateUIWithStatus(status) {
        // Update toggle switches
        if (referralSystemStatus) {
            referralSystemStatus.checked = status.referralSystem;
            referralSystemLabel.textContent = status.referralSystem ? 'Live' : 'Offline';
            referralSystemLabel.className = status.referralSystem ? 'status-label live' : 'status-label offline';
        }
        
        if (automationScriptStatus) {
            automationScriptStatus.checked = status.automationScript;
            automationScriptLabel.textContent = status.automationScript ? 'Live' : 'Offline';
            automationScriptLabel.className = status.automationScript ? 'status-label live' : 'status-label offline';
        }
        
        // Update last updated time
        if (lastUpdatedTime) {
            lastUpdatedTime.textContent = status.lastUpdated;
        }
    }
    
    // Generate status JSON content
    function generateStatusJSON() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        return {
            referralSystem: referralSystemStatus ? referralSystemStatus.checked : false,
            automationScript: automationScriptStatus ? automationScriptStatus.checked : false,
            lastUpdated: now.toLocaleDateString('en-US', options)
        };
    }
    
    // Save status to file (this would typically be a server-side operation)
    function saveStatusToFile() {
        const status = generateStatusJSON();
        const jsonContent = JSON.stringify(status, null, 2);
        
        // In a real application, this would be a server-side operation
        // For this demo, we'll just show the JSON content for the admin to copy
        
        // Create a pre element to display the JSON
        const preElement = document.createElement('pre');
        preElement.textContent = jsonContent;
        preElement.className = 'json-content';
        
        // Create a copy button
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy JSON';
        copyButton.className = 'copy-button';
        
        // Add click event to copy button
        copyButton.onclick = function() {
            // Create a temporary textarea element to copy from
            const textarea = document.createElement('textarea');
            textarea.value = jsonContent;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // Show success message
            showStatusMessage('JSON copied to clipboard! Update data/status.json in your repository.', 'success');
            
            // Change button text temporarily
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        };
        
        // Add elements to status message
        const messageContainer = document.getElementById('jsonOutput');
        if (messageContainer) {
            messageContainer.innerHTML = '';
            messageContainer.appendChild(preElement);
            messageContainer.appendChild(copyButton);
        }
        
        // Update UI with new status
        updateUIWithStatus(status);
        
        return jsonContent;
    }
    
    // Show status message
    function showStatusMessage(message, type) {
        if (statusMessage) {
            statusMessage.textContent = message;
            statusMessage.className = `status-message ${type}`;
            statusMessage.style.display = 'block';
            
            // Hide message after 5 seconds if it's a success message
            if (type === 'success') {
                setTimeout(() => {
                    statusMessage.style.display = 'none';
                }, 5000);
            }
        }
    }
    
    // Check if user is already logged in
    function checkLoginStatus() {
        const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
        
        if (isLoggedIn) {
            loginContainer.style.display = 'none';
            adminPanel.style.display = 'flex';
            initializeServiceStatus();
        } else {
            loginContainer.style.display = 'flex';
            adminPanel.style.display = 'none';
        }
    }
    
    // Handle login
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                loginContainer.style.display = 'none';
                adminPanel.style.display = 'flex';
                loginError.textContent = '';
                initializeServiceStatus();
            } else {
                loginError.textContent = 'Invalid username or password';
                passwordInput.value = '';
            }
        });
    }
    
    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            sessionStorage.removeItem('adminLoggedIn');
            loginContainer.style.display = 'flex';
            adminPanel.style.display = 'none';
            usernameInput.value = '';
            passwordInput.value = '';
        });
    }
    
    // Handle service status toggle
    if (referralSystemStatus) {
        referralSystemStatus.addEventListener('change', function() {
            referralSystemLabel.textContent = this.checked ? 'Live' : 'Offline';
            referralSystemLabel.className = this.checked ? 'status-label live' : 'status-label offline';
        });
    }
    
    if (automationScriptStatus) {
        automationScriptStatus.addEventListener('change', function() {
            automationScriptLabel.textContent = this.checked ? 'Live' : 'Offline';
            automationScriptLabel.className = this.checked ? 'status-label live' : 'status-label offline';
        });
    }
    
    // Handle save status button
    if (saveStatusButton) {
        saveStatusButton.addEventListener('click', function() {
            saveStatusToFile();
        });
    }
    
    // Handle timestamp update
    if (updateTimestampButton) {
        updateTimestampButton.addEventListener('click', function() {
            const status = generateStatusJSON();
            updateUIWithStatus(status);
            showStatusMessage('Timestamp updated!', 'success');
        });
    }
    
    // Check login status on page load
    checkLoginStatus();
    
    // Add keyboard event for login
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginButton.click();
            }
        });
    }
});
