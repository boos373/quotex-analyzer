const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const imagePreview = document.getElementById('imagePreview');
const previewContainer = document.getElementById('previewContainer');
const captureBtn = document.getElementById('captureBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const retakeBtn = document.getElementById('retakeBtn');
const resultBox = document.getElementById('resultBox');
const upBar = document.getElementById('upBar');
const downBar = document.getElementById('downBar');
const decisionText = document.getElementById('decisionText');

// ১. ফোনের পেছনের ক্যামেরা চালু করার ফাংশন
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }, // এটি ফোনের ব্যাক ক্যামেরা চালু করবে
            audio: false
        });
        video.srcObject = stream;
        video.style.display = "block";
        previewContainer.classList.add('hidden');
    } catch (err) {
        alert("ক্যামেরা চালু করা যায়নি! দয়া করে ক্যামেরার পারমিশন (Permission) দিন।");
        console.error(err);
    }
}

// সাইট ওপেন হলেই ক্যামেরা চালু হবে
window.addEventListener("load", startCamera);

// ২. স্ন্যাপশট/ছবি তোলার লজিক
captureBtn.addEventListener('click', function() {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // ভিডিও ফ্রেম থেকে ছবি কেটে ক্যানভাসে নেওয়া
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // ছবিটিকে ইমেজ ট্যাগে দেখানো
    const imageDataUrl = canvas.toDataURL('image/png');
    imagePreview.src = imageDataUrl;
    
    // ইন্টারফেস পরিবর্তন (ক্যামেরা লুকিয়ে ছবি দেখানো)
    video.style.display = "none";
    previewContainer.classList.remove('hidden');
    
    captureBtn.classList.add('hidden');
    analyzeBtn.classList.remove('hidden');
    retakeBtn.classList.remove('hidden');
});

// ৩. আবার ছবি তোলার লজಿಕ
retakeBtn.addEventListener('click', function() {
    video.style.display = "block";
    previewContainer.classList.add('hidden');
    resultBox.classList.add('hidden');
    
    captureBtn.classList.remove('hidden');
    analyzeBtn.classList.add('hidden');
    retakeBtn.classList.add('hidden');
});

// ৪. অ্যানালাইসিস বাটন ক্লিক (ডামি এআই প্রোসেস)
analyzeBtn.addEventListener('click', function() {
    analyzeBtn.innerText = "মার্কেট স্ক্যান করা হচ্ছে...";
    analyzeBtn.disabled = true;

    setTimeout(() => {
        // ১.৫ সেকেন্ড পর ফলাফল জেনারেট করা
        const upPercentage = Math.floor(Math.random() * (85 - 35 + 1)) + 35; 
        const downPercentage = 100 - upPercentage;

        upBar.style.width = upPercentage + '%';
        upBar.innerText = `UP: ${upPercentage}%`;
        
        downBar.style.width = downPercentage + '%';
        downBar.innerText = `DOWN: ${downPercentage}%`;

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
        analyzeBtn.innerText = "🚀 মার্কেট অ্যানালাইসিস করুন";
        analyzeBtn.disabled = false;
    }, 1500);
});