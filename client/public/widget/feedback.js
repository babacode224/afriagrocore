(function() {
  'use strict';

  // Configuration
  const API_URL = window.location.origin + '/api/trpc/feedback.submit';
  
  // Create widget HTML
  function createWidget() {
    const widgetHTML = `
      <div id="afriagro-feedback-widget" style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 380px;
        max-width: calc(100vw - 40px);
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        z-index: 999999;
        display: none;
      ">
        <div style="
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          padding: 16px 20px;
          border-radius: 12px 12px 0 0;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <h3 style="margin: 0; font-size: 18px; font-weight: 600;">Share Your Feedback</h3>
          <button id="afriagro-close-btn" style="
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">&times;</button>
        </div>
        
        <form id="afriagro-feedback-form" style="padding: 20px;">
          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 6px; font-size: 14px; font-weight: 500; color: #374151;">
              Name *
            </label>
            <input 
              type="text" 
              name="name" 
              required
              style="
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 14px;
                box-sizing: border-box;
              "
              placeholder="Your name"
            />
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 6px; font-size: 14px; font-weight: 500; color: #374151;">
              Email *
            </label>
            <input 
              type="email" 
              name="email" 
              required
              style="
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 14px;
                box-sizing: border-box;
              "
              placeholder="your@email.com"
            />
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 6px; font-size: 14px; font-weight: 500; color: #374151;">
              Phone Number *
            </label>
            <input 
              type="tel" 
              name="phone" 
              required
              style="
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 14px;
                box-sizing: border-box;
              "
              placeholder="+234 XXX XXX XXXX"
            />
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #374151;">
              Rating *
            </label>
            <div id="afriagro-rating" style="display: flex; gap: 8px;">
              ${[1,2,3,4,5].map(i => `
                <span 
                  class="afriagro-star" 
                  data-rating="${i}"
                  style="
                    font-size: 32px;
                    cursor: pointer;
                    color: #d1d5db;
                    transition: color 0.2s;
                  "
                >★</span>
              `).join('')}
            </div>
            <input type="hidden" name="rating" id="afriagro-rating-value" required />
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 6px; font-size: 14px; font-weight: 500; color: #374151;">
              Comment *
            </label>
            <textarea 
              name="comment" 
              required
              rows="4"
              style="
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 14px;
                box-sizing: border-box;
                resize: vertical;
                font-family: inherit;
              "
              placeholder="Tell us about your experience..."
            ></textarea>
          </div>

          <button 
            type="submit"
            id="afriagro-submit-btn"
            style="
              width: 100%;
              padding: 12px;
              background: #059669;
              color: white;
              border: none;
              border-radius: 6px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: background 0.2s;
            "
          >
            Submit Feedback
          </button>

          <div id="afriagro-message" style="
            margin-top: 12px;
            padding: 12px;
            border-radius: 6px;
            font-size: 14px;
            display: none;
          "></div>
        </form>

        <div id="afriagro-success" style="
          padding: 40px 20px;
          text-align: center;
          display: none;
        ">
          <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
          <h3 style="margin: 0 0 12px 0; color: #059669; font-size: 20px;">Thank You!</h3>
          <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
            Your feedback has been received. We've sent a confirmation email and added you to our newsletter.
          </p>
        </div>
      </div>

      <button id="afriagro-feedback-trigger" style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
        color: white;
        border: none;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(5,150,105,0.4);
        z-index: 999998;
        transition: transform 0.2s;
      ">
        💬
      </button>
    `;

    // Insert widget into page
    const container = document.createElement('div');
    container.innerHTML = widgetHTML;
    document.body.appendChild(container);

    // Add event listeners
    setupEventListeners();
  }

  function setupEventListeners() {
    const trigger = document.getElementById('afriagro-feedback-trigger');
    const widget = document.getElementById('afriagro-feedback-widget');
    const closeBtn = document.getElementById('afriagro-close-btn');
    const form = document.getElementById('afriagro-feedback-form');
    const stars = document.querySelectorAll('.afriagro-star');
    const ratingInput = document.getElementById('afriagro-rating-value');

    // Open widget
    trigger.addEventListener('click', function() {
      widget.style.display = 'block';
      trigger.style.display = 'none';
    });

    // Close widget
    closeBtn.addEventListener('click', function() {
      widget.style.display = 'none';
      trigger.style.display = 'block';
    });

    // Star rating
    let selectedRating = 0;
    stars.forEach(star => {
      star.addEventListener('click', function() {
        selectedRating = parseInt(this.getAttribute('data-rating'));
        ratingInput.value = selectedRating;
        updateStars(selectedRating);
      });

      star.addEventListener('mouseenter', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
        updateStars(rating);
      });
    });

    document.getElementById('afriagro-rating').addEventListener('mouseleave', function() {
      updateStars(selectedRating);
    });

    function updateStars(rating) {
      stars.forEach((star, index) => {
        if (index < rating) {
          star.style.color = '#fbbf24';
        } else {
          star.style.color = '#d1d5db';
        }
      });
    }

    // Form submission
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const submitBtn = document.getElementById('afriagro-submit-btn');
      const message = document.getElementById('afriagro-message');
      
      // Validate rating
      if (!ratingInput.value) {
        showMessage('Please select a rating', 'error');
        return;
      }

      // Disable submit button
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
      submitBtn.style.background = '#6b7280';

      // Get form data
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phoneNumber: formData.get('phone'),
        rating: parseInt(ratingInput.value),
        comment: formData.get('comment'),
        sourceUrl: window.location.href,
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          // Show success message
          document.getElementById('afriagro-feedback-form').style.display = 'none';
          document.getElementById('afriagro-success').style.display = 'block';

          // Close widget after 3 seconds
          setTimeout(function() {
            widget.style.display = 'none';
            trigger.style.display = 'block';
            
            // Reset form
            form.reset();
            ratingInput.value = '';
            selectedRating = 0;
            updateStars(0);
            document.getElementById('afriagro-feedback-form').style.display = 'block';
            document.getElementById('afriagro-success').style.display = 'none';
          }, 3000);
        } else {
          showMessage(result.message || 'Failed to submit feedback. Please try again.', 'error');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Feedback';
          submitBtn.style.background = '#059669';
        }
      } catch (error) {
        console.error('Feedback submission error:', error);
        showMessage('Network error. Please check your connection and try again.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Feedback';
        submitBtn.style.background = '#059669';
      }
    });

    function showMessage(text, type) {
      const message = document.getElementById('afriagro-message');
      message.textContent = text;
      message.style.display = 'block';
      message.style.background = type === 'error' ? '#fee2e2' : '#d1fae5';
      message.style.color = type === 'error' ? '#991b1b' : '#065f46';
      message.style.border = type === 'error' ? '1px solid #fca5a5' : '1px solid #6ee7b7';
    }
  }

  // Initialize widget when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
