
// Password configuration (change this to your desired password)
const CORRECT_PASSWORD = "Rwev2020!";

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('dadnas_authenticated') === 'true') {
        showDashboard();
    } else {
        showLogin();
    }
    
    // Add enter key support for password input
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
});

function checkPassword() {
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const enteredPassword = passwordInput.value;
    
    if (enteredPassword === CORRECT_PASSWORD) {
        // Password is correct
        localStorage.setItem('dadnas_authenticated', 'true');
        showDashboard();
        errorMessage.textContent = '';
    } else {
        // Password is incorrect
        errorMessage.textContent = 'Incorrect password. Please try again.';
        passwordInput.value = '';
        passwordInput.focus();
        
        // Add shake animation to the form
        const loginForm = document.querySelector('.login-form');
        loginForm.style.animation = 'shake 0.5s';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 500);
    }
}

function showLogin() {
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('dashboard-container').style.display = 'none';
    // Focus on password input
    setTimeout(() => {
        document.getElementById('password-input').focus();
    }, 100);
}

function showDashboard() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'flex';
    
    // Initialize dashboard functionality
    initializeDashboard();
}

function logout() {
    localStorage.removeItem('dadnas_authenticated');
    showLogin();
}

function initializeDashboard() {
    const appIcons = document.querySelectorAll('.app-icon');
    
    // Define your website URLs here - replace these with your actual URLs
    const websiteUrls = [
        'http://10.1.1.250:7878/',            // Radarr
        'http://10.1.1.250:8080/',            // SABnzbd
        'http://10.1.1.250:9000/#!/auth',     // Portainer
        'http://10.1.1.250:8989/',            // Sonarr
        'http://10.1.1.250:6767/',            // Bazarr
        'http://10.1.1.250:81/login',         // Nginx
        'https://jelly.bxtr.xyz/web/',        // Jellyfin
        'http://10.1.1.250:5055/login',       // Jellyseerr
        'https://10.1.1.250:10000/'           // Webmin
    ];
    
    // Add click handlers for app icons
    appIcons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            // Add a subtle animation on click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Open the corresponding website
            if (websiteUrls[index]) {
                window.open(websiteUrls[index], '_blank');
            }
        });
    });
    
    // Add status indicator animation
    function updateStatusIndicator() {
        const indicator = document.querySelector('.status-indicator');
        if (indicator) {
            indicator.style.animation = 'pulse 2s infinite';
        }
    }
    
    updateStatusIndicator();
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
