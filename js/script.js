// Modern JavaScript with animations and functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
    
    // Service status elements
    const referralSystemIndicator = document.getElementById('referralSystemIndicator');
    const referralSystemText = document.getElementById('referralSystemText');
    const referralSystemAction = document.getElementById('referralSystemAction');
    
    const automationScriptIndicator = document.getElementById('automationScriptIndicator');
    const automationScriptText = document.getElementById('automationScriptText');
    const automationScriptAction = document.getElementById('automationScriptAction');
    
    const lastUpdatedElement = document.getElementById('lastUpdated');
    
    // Function to fetch status from JSON file
    function fetchServiceStatus() {
        // Add cache-busting query parameter to prevent caching
        const cacheBuster = `?_=${new Date().getTime()}`;
        
        fetch(`data/status.json${cacheBuster}`)
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
                // If fetch fails, show error state or fallback to default values
                const defaultStatus = {
                    referralSystem: false,
                    automationScript: false,
                    lastUpdated: "Status unavailable"
                };
                updateUIWithStatus(defaultStatus);
            });
    }
    
    // Function to update UI with status data
    function updateUIWithStatus(status) {
        // Update last updated timestamp
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = status.lastUpdated;
        }
        
        // Update Referral System status
        if (referralSystemIndicator && referralSystemText && referralSystemAction) {
            // Update indicator
            if (status.referralSystem) {
                referralSystemIndicator.className = 'status-indicator live';
                referralSystemText.textContent = 'Live';
                
                // Create contact button
                referralSystemAction.innerHTML = `
                    <button class="service-button contact" onclick="window.location.href='https://telegram.me/OfficialTCCAuto'">
                        <i class="fab fa-telegram"></i> Contact Admin for Access
                    </button>
                `;
                
                // Add pulse animation to status dot
                const statusDot = referralSystemIndicator.querySelector('.status-dot');
                if (statusDot) {
                    statusDot.classList.add('pulse');
                }
            } else {
                referralSystemIndicator.className = 'status-indicator offline';
                referralSystemText.textContent = 'Offline';
                
                // Create disabled button
                referralSystemAction.innerHTML = `
                    <button class="service-button disabled" disabled>
                        <i class="fas fa-power-off"></i> Service Unavailable
                    </button>
                `;
                
                // Remove pulse animation from status dot
                const statusDot = referralSystemIndicator.querySelector('.status-dot');
                if (statusDot) {
                    statusDot.classList.remove('pulse');
                }
            }
        }
        
        // Update Automation Script status
        if (automationScriptIndicator && automationScriptText && automationScriptAction) {
            // Update indicator
            if (status.automationScript) {
                automationScriptIndicator.className = 'status-indicator live';
                automationScriptText.textContent = 'Live';
                
                // Create access button
                automationScriptAction.innerHTML = `
                    <button class="service-button primary" onclick="window.open('https://srzdl648-5000.inc1.devtunnels.ms/', '_blank')">
                        <i class="fas fa-external-link-alt"></i> Access Automation Script
                    </button>
                `;
                
                // Add pulse animation to status dot
                const statusDot = automationScriptIndicator.querySelector('.status-dot');
                if (statusDot) {
                    statusDot.classList.add('pulse');
                }
            } else {
                automationScriptIndicator.className = 'status-indicator offline';
                automationScriptText.textContent = 'Offline';
                
                // Create disabled button
                automationScriptAction.innerHTML = `
                    <button class="service-button disabled" disabled>
                        <i class="fas fa-power-off"></i> Service Unavailable
                    </button>
                `;
                
                // Remove pulse animation from status dot
                const statusDot = automationScriptIndicator.querySelector('.status-dot');
                if (statusDot) {
                    statusDot.classList.remove('pulse');
                }
            }
        }
    }
    
    // Initial fetch of service status
    fetchServiceStatus();
    
    // Set up a timer to check for status changes every 5 minutes (300000 ms)
    // This ensures users get updated status without manual refresh
    setInterval(fetchServiceStatus, 300000);
    
    // Add animations to status cards
    const statusCards = document.querySelectorAll('.status-card');
    animateElements(statusCards, 'fadeInUp');
    
    // Add animations to plan cards
    const planCards = document.querySelectorAll('.plan-card');
    animateElements(planCards, 'fadeInUp', 100);
    
    // Add animations to payment options
    const paymentOptions = document.querySelectorAll('.payment-option');
    animateElements(paymentOptions, 'fadeInUp', 150);
    
    // Add animations to confirmation process
    const confirmationProcess = document.querySelector('.confirmation-process');
    if (confirmationProcess) {
        animateElements([confirmationProcess], 'fadeInUp', 200);
    }
    
    // Add animations to contact options
    const contactOptions = document.querySelectorAll('.contact-option');
    animateElements(contactOptions, 'fadeInRight', 50);
    
    // Handle orientation change for mobile devices
    window.addEventListener('orientationchange', function() {
        // Small delay to allow the browser to complete the orientation change
        setTimeout(function() {
            // Force redraw of status indicators
            if (referralSystemIndicator) {
                referralSystemIndicator.style.display = 'none';
                setTimeout(() => { referralSystemIndicator.style.display = ''; }, 10);
            }
            
            if (automationScriptIndicator) {
                automationScriptIndicator.style.display = 'none';
                setTimeout(() => { automationScriptIndicator.style.display = ''; }, 10);
            }
        }, 200);
    });
});

// Animation helper function
function animateElements(elements, animation, staggerDelay = 50) {
    if (!elements || elements.length === 0) return;
    
    elements.forEach((element, index) => {
        // Set initial state
        element.style.opacity = '0';
        
        if (animation === 'fadeInUp') {
            element.style.transform = 'translateY(20px)';
        } else if (animation === 'fadeInRight') {
            element.style.transform = 'translateX(20px)';
        }
        
        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add delay based on index for staggered effect
                    setTimeout(() => {
                        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0) translateX(0)';
                    }, index * staggerDelay);
                    
                    // Unobserve after animation
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });
        
        // Start observing
        observer.observe(element);
    });
}

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
.pulse {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    }
    70% {
        box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
    }
}

.status-indicator.offline .status-dot {
    animation: none;
}

.contact-option:hover i {
    animation: bounce 0.5s;
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
}

/* Fix for mobile devices */
@media (max-width: 480px) {
    .status-indicator {
        width: auto;
        min-width: 80px;
    }
    
    .service-button {
        white-space: normal;
        height: auto;
        min-height: 44px;
    }
}
</style>
`);
