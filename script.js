const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const previewContainer = document.getElementById('previewContainer');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultBox = document.getElementById('resultBox');
const upBar = document.getElementById('upBar');
const downBar = document.getElementById('downBar');
const decisionText = document.getElementById('decisionText');

// ছবি আপলোড ও প্রিভিউ
imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            previewContainer.classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    }
});

// অ্যানালাইসিস বাটন ক্লিক
analyzeBtn.addEventListener('click', function() {
    if (!imageInput.files[0]) {
        alert("দয়া করে প্রথমে একটি স্ক্রিনশট আপলোড করুন!");
        return;
    }

    analyzeBtn.innerText = "অ্যানালাইসিস করা হচ্ছে...";
    analyzeBtn.disabled = true;

    // ১.৫ সেকেন্ডের একটি নকল লোডিং টাইম (বাস্তবে এখানে AI সার্ভারে ডাটা যাবে)
    setTimeout(() => {
        // ডামি পার্সেন্টেজ জেনারেট করা (র্যান্ডম)
        const upPercentage = Math.floor(Math.random() * (85 - 35 + 1)) + 35; 
        const downPercentage = 100 - upPercentage;

        // বার আপডেট করা
        upBar.style.width = upPercentage + '%';
        upBar.innerText = `UP: ${upPercentage}%`;
        
        downBar.style.width = downPercentage + '%';
        downBar.innerText = `DOWN: ${downPercentage}%`;

        // সিদ্ধান্ত দেওয়া
        if (upPercentage > 55) {
            decisionText.innerText = "🟢 সিগন্যাল: CALL (UP) যাওয়ার সম্ভাবনা বেশি!";
            decisionText.style.color = "#22c55e";
        } else if (downPercentage > 55) {
            decisionText.innerText = "🔴 সিগন্যাল: PUT (DOWN) যাওয়ার সম্ভাবনা বেশি!";
            decisionText.style.color = "#ef4444";
        } else {
            decisionText.innerText = "🟡 সিগন্যাল: মার্কেট অস্থিতিশীল (ট্রেড না করাই ভালো)";
            decisionText.style.color = "#eab308";
        }

        resultBox.classList.remove('hidden');
        analyzeBtn.innerText = "মার্কেট অ্যানালাইসিস করুন";
        analyzeBtn.disabled = false;
    }, 1500);
});