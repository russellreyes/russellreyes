// Typing Animations
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Web Developer", "UI/UX Designer", "Graphic Artist", "Video Editor"];
const typingDelay = 70;
const erasingDelay = 35;
const newTextDelay = 1500;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio JS running');

    // Mobile navigation functionality
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    let isMobileMenuOpen = false;

    // Create mobile navigation elements
    function createMobileNavigation() {
        // Create mobile nav circle
        const mobileNavCircle = document.createElement('div');
        mobileNavCircle.className = 'mobile-nav-circle';
        mobileNavCircle.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Create mobile nav menu overlay
        const mobileNavMenu = document.createElement('div');
        mobileNavMenu.className = 'mobile-nav-menu';
        
        // Create close button (only one)
        const mobileNavClose = document.createElement('div');
        mobileNavClose.className = 'mobile-nav-close';
        mobileNavClose.innerHTML = '<i class="fas fa-times"></i>';
        
        // Create mobile menu content structure
        const mobileNavContent = document.createElement('div');
        mobileNavContent.className = 'mobile-nav-content';
        
        // Create profile section
        const profileSection = document.createElement('div');
        profileSection.className = 'profile';
        profileSection.innerHTML = `
            <img src="https://res.cloudinary.com/dutlqrrdg/image/upload/v1752939468/5c568958-af68-473c-a886-17bbda943fd9_omi0hy.png" alt="Profile" class="profile-img">
            <h2 class="profile-name">Russell Reyes</h2>
            <div class="sidebar-social-links">
                <a href="https://www.facebook.com/Russellshiit" target="_blank"><i class="fab fa-facebook"></i></a>
                <a href="https://www.instagram.com/russellreyz/" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/russell-reyes-a298ba35a/" target="_blank"><i class="fab fa-linkedin"></i></a>
                <a href="https://t.me/darkiest_shiit" target="_blank"><i class="fab fa-telegram"></i></a>
            </div>
        `;
        
        // Create navigation links
        const navLinks = document.createElement('ul');
        navLinks.className = 'sidebar-nav-links';
        navLinks.innerHTML = `
            <li><a href="#home"><i class="fas fa-home"></i> <span>Home</span></a></li>
            <li><a href="#about"><i class="fas fa-user"></i> <span>About</span></a></li>
            <li><a href="#resume"><i class="fas fa-file-alt"></i> <span>Resume</span></a></li>
            <li><a href="#portfolio"><i class="fas fa-image"></i> <span>Portfolio</span></a></li>
            <li><a href="#services"><i class="fas fa-briefcase"></i> <span>Services</span></a></li>
        `;
        
        // Assemble the mobile menu (only one close button)
        mobileNavContent.appendChild(profileSection);
        mobileNavContent.appendChild(navLinks);
        mobileNavMenu.appendChild(mobileNavClose);
        mobileNavMenu.appendChild(mobileNavContent);
        
        // Only show on mobile devices
        if (window.innerWidth <= 768) {
            document.body.appendChild(mobileNavCircle);
            document.body.appendChild(mobileNavMenu);
            
            // Mobile nav circle click handler
            mobileNavCircle.addEventListener('click', () => {
                isMobileMenuOpen = !isMobileMenuOpen;
                if (isMobileMenuOpen) {
                    mobileNavMenu.style.display = 'flex';
                    setTimeout(() => {
                        mobileNavMenu.classList.add('show');
                    }, 10);
                    // Keep the hamburger icon, don't change to X
                } else {
                    mobileNavMenu.classList.remove('show');
                    setTimeout(() => {
                        mobileNavMenu.style.display = 'none';
                    }, 300);
                }
            });
            
            // Close button click handler
            mobileNavClose.addEventListener('click', () => {
                isMobileMenuOpen = false;
                mobileNavMenu.classList.remove('show');
                setTimeout(() => {
                    mobileNavMenu.style.display = 'none';
                }, 300);
            });
            
            // Close menu when clicking outside
            mobileNavMenu.addEventListener('click', (e) => {
                if (e.target === mobileNavMenu) {
                    isMobileMenuOpen = false;
                    mobileNavMenu.classList.remove('show');
                    setTimeout(() => {
                        mobileNavMenu.style.display = 'none';
                    }, 300);
                }
            });
            
            // Handle navigation links in mobile menu
            const mobileNavLinks = mobileNavMenu.querySelectorAll('a[href^="#"]');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    isMobileMenuOpen = false;
                    mobileNavMenu.classList.remove('show');
                    setTimeout(() => {
                        mobileNavMenu.style.display = 'none';
                    }, 300);
                });
            });
            
            // Handle social media links in mobile menu
            const socialLinks = mobileNavMenu.querySelectorAll('.sidebar-social-links a');
            socialLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const url = link.getAttribute('href');
                    if (url) {
                        try {
                            window.open(url, '_blank', 'noopener,noreferrer');
                        } catch (error) {
                            console.log('Could not open link:', url);
                            // Fallback: try to open in same window
                            window.location.href = url;
                        }
                    }
                });
            });
            
            // Handle mobile menu profile image click to open modal
            const mobileProfileImg = mobileNavMenu.querySelector('.profile-img');
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const modalCaption = document.querySelector('.modal-caption');
            
            if (mobileProfileImg && modal && modalImg) {
                mobileProfileImg.style.cursor = 'pointer';
                mobileProfileImg.addEventListener('click', function() {
                    modal.style.display = 'block';
                    modalImg.src = mobileProfileImg.src;
                    modalCaption.textContent = 'Russell Reyes';
                    setTimeout(function() {
                        modal.classList.add('show');
                    }, 10);
                    
                    // Close mobile menu when profile is clicked
                    isMobileMenuOpen = false;
                    mobileNavMenu.classList.remove('show');
                    setTimeout(() => {
                        mobileNavMenu.style.display = 'none';
                    }, 300);
                });
            }
        }
    }

    // Initialize mobile navigation
    createMobileNavigation();
    
    // Handle social media links in original sidebar
    const originalSocialLinks = document.querySelectorAll('.sidebar .sidebar-social-links a');
    originalSocialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('href');
            if (url) {
                try {
                    window.open(url, '_blank', 'noopener,noreferrer');
                } catch (error) {
                    console.log('Could not open link:', url);
                    // Fallback: try to open in same window
                    window.location.href = url;
                }
            }
        });
    });

    // Function to handle external links for mobile compatibility
    function handleExternalLink(url) {
        // Check if we're on a mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // For mobile, try multiple approaches
            try {
                // First attempt: window.open
                const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
                if (newWindow && !newWindow.closed) {
                    return; // Success
                }
            } catch (error) {
                console.log('window.open failed:', error);
            }
            
            try {
                // Second attempt: location.href
                window.location.href = url;
            } catch (error) {
                console.log('location.href failed:', error);
            }
        } else {
            // For desktop, use standard approach
            try {
                window.open(url, '_blank', 'noopener,noreferrer');
            } catch (error) {
                window.location.href = url;
            }
        }
    }

    // Handle "Other Sample" button for mobile compatibility
    const otherSampleBtn = document.querySelector('.other-sample-btn');
    if (otherSampleBtn) {
        otherSampleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = otherSampleBtn.getAttribute('href');
            if (url) {
                handleExternalLink(url);
            }
        });
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const mobileNavCircle = document.querySelector('.mobile-nav-circle');
        const mobileNavMenu = document.querySelector('.mobile-nav-menu');
        
        if (window.innerWidth <= 768) {
            if (!mobileNavCircle) {
                createMobileNavigation();
            }
        } else {
            if (mobileNavCircle) {
                mobileNavCircle.remove();
            }
            if (mobileNavMenu) {
                mobileNavMenu.remove();
            }
            // Reset sidebar state on desktop
            if (sidebar) {
                sidebar.style.display = '';
            }
            isMobileMenuOpen = false;
        }
    });

    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.modal-close');

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // Typing Animation
    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Enhanced Smooth Scrolling with mobile considerations
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (isMobileMenuOpen) {
                    const mobileNavCircle = document.querySelector('.mobile-nav-circle');
                    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
                    if (mobileNavCircle && mobileNavMenu) {
                        isMobileMenuOpen = false;
                        mobileNavMenu.classList.remove('show');
                        setTimeout(() => {
                            mobileNavMenu.style.display = 'none';
                        }, 300);
                    }
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Portfolio Initialization
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log('Portfolio grid element:', portfolioGrid);
    console.log('Filter buttons:', filterButtons);

    // Create portfolio items
    const portfolioData = [
        {
            title: 'Web Design',
            category: 'web',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1750162828/Sample_Web_tgd6ck.png'
        },
        {
            title: 'Make.com Sample Automation',
            category: 'web',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1752975583/Untitled_vnjtrg.png'
        },
        {
            title: 'N8N Sample Automation',
            category: 'web',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1752975583/1_cyubjs.png'
        },
        {
            title: 'Certificate: Introduction to C',
            category: 'certificate',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1750167087/Introduction_to_C_certificate_wzontv.jpg'
        },
        // Added Graphic Design samples
        {
            title: 'Graphic Design Sample 1',
            category: 'design',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1750167977/Sample2_gblaue.jpg'
        },
        {
            title: 'Graphic Design Sample 2',
            category: 'design',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1750167966/Sample1_y9kdmg.jpg'
        },
        // Added Email Template under design
        {
            title: 'Email Template',
            category: 'design',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1747938457/Black_and_Grey_Modern_Email_Newsletter_cpabmp.png'
        },
        // Added Graphic Design 3 and 4
        {
            title: 'Graphic Design 3',
            category: 'design',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1752976067/492528421_122238058250032347_235989953308545611_n_dimozb.jpg'
        },
        {
            title: 'Graphic Design 4',
            category: 'design',
            image: 'https://res.cloudinary.com/dutlqrrdg/image/upload/v1752976067/497401007_122238235664032347_5806304444681862374_n_r9fkc2.jpg'
        },
    ];

    if (portfolioGrid) {
        // Clear existing items
        portfolioGrid.innerHTML = '';

        // Add portfolio items
        portfolioData.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.classList.add('portfolio-item', item.category);
            portfolioItem.style.display = 'block';
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-info">
                    <h4>${item.title}</h4>
                    <p>${item.category}</p>
                </div>
            `;

            // Add click event to show modal
            portfolioItem.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = item.image;
                modalCaption.textContent = item.title;
                // Use setTimeout to ensure display: block is applied before adding show class
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            });

            portfolioGrid.appendChild(portfolioItem);
            console.log('Added portfolio item:', item.title);
        });

        // Filter functionality
        function filterPortfolio(filterValue) {
            console.log('Filtering for:', filterValue);
            const items = document.querySelectorAll('.portfolio-item');
            console.log('Found items:', items.length);
            items.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Add click handlers to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Filter button clicked:', button.getAttribute('data-filter'));
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterPortfolio(button.getAttribute('data-filter'));
            });
        });

        // Show all items initially
        filterPortfolio('all');
        console.log('Initial filtering complete');
    }

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-top';
    document.body.appendChild(scrollButton);
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 
