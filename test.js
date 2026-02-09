// test.js - Final Strict Version (New URL & Payload Key)
// [DATA] 60 Questions (Final)
const QUESTIONS = [
    // 1. 주도적 능력 (Proactivity)
    { id: 1, text: "나는 새로운 업무나 과제를 맡는 것을 좋아한다.", type: "Likert" },
    { id: 2, text: "나는 주도적으로 목표를 설정하고 이를 달성하기 위해 노력한다.", type: "Likert" },
    { id: 3, text: "나는 문제가 발생했을 때, 해결책을 찾기 위해 적극적으로 나선다.", type: "Likert" },
    { id: 4, text: "나는 시키지 않아도 찾아서 일하는 편이다.", type: "Likert" },
    { id: 5, text: "나는 변화를 두려워하기보다 기회로 여기고 받아들인다.", type: "Likert" },
    { id: 6, text: "나는 내 업무가 아니더라도 동료가 어려움을 겪으면 기꺼이 돕는다.", type: "Likert" },
    { id: 7, text: "나는 실패를 하더라도 포기하지 않고 다시 도전한다.", type: "Likert" },
    { id: 8, text: "나는 더 나은 결과를 만들기 위해 끊임없이 아이디어를 제안한다.", type: "Likert" },
    { id: 9, text: "나는 내 자신의 성장을 위해 꾸준히 자기계발을 한다.", type: "Likert" },
    { id: 10, text: "나는 어려운 상황에서도 긍정적인 태도를 유지하려고 노력한다.", type: "Likert" },

    // 2. 문제 해결 능력 (Problem Solving)
    { id: 11, text: "나는 복잡한 문제를 만나면 원인을 분석하고 체계적으로 접근한다.", type: "Likert" },
    { id: 12, text: "나는 기존의 방식에 얽매이지 않고 창의적인 해결책을 모색한다.", type: "Likert" },
    { id: 13, text: "나는 다양한 정보를 수집하고 이를 바탕으로 합리적인 판단을 내린다.", type: "Likert" },
    { id: 14, text: "나는 예상치 못한 문제가 발생해도 침착하게 대응한다.", type: "Likert" },
    { id: 15, text: "나는 문제 해결 과정에서 발생할 수 있는 리스크를 미리 예측하고 대비한다.", type: "Likert" },
    { id: 16, text: "나는 동료들의 다양한 의견을 수렴하여 최적의 대안을 찾는다.", type: "Likert" },
    { id: 17, text: "나는 문제의 본질을 파악하기 위해 깊이 있게 고민한다.", type: "Likert" },
    { id: 18, text: "나는 해결하기 어려운 문제일수록 도전 의식을 느낀다.", type: "Likert" },
    { id: 19, text: "나는 과거의 경험을 바탕으로 새로운 문제에 유연하게 대처한다.", type: "Likert" },
    { id: 20, text: "나는 결과뿐만 아니라 문제 해결 과정도 중요하게 생각한다.", type: "Likert" },

    // 3. 소속 내 영향력 (Influence)
    { id: 21, text: "나는 팀 내에서 긍정적인 분위기를 조성하는 데 기여한다.", type: "Likert" },
    { id: 22, text: "나는 동료들에게 신뢰받는 사람이라고 생각한다.", type: "Likert" },
    { id: 23, text: "나는 나의 의견을 논리적으로 설명하고 타인을 설득할 수 있다.", type: "Likert" },
    { id: 24, text: "나는 갈등 상황에서 중재자 역할을 수행하며 원만한 합의를 이끌어낸다.", type: "Likert" },
    { id: 25, text: "나는 동료들의 강점을 발견하고 이를 발휘하도록 돕는다.", type: "Likert" },
    { id: 26, text: "나는 팀의 목표 달성을 위해 구성원들을 독려하고 이끈다.", type: "Likert" },
    { id: 27, text: "나는 내가 가진 지식과 정보를 동료들과 적극적으로 공유한다.", type: "Likert" },
    { id: 28, text: "나는 타인의 감정을 잘 이해하고 공감하는 편이다.", type: "Likert" },
    { id: 29, text: "나는 피드백을 주고받는 것을 성장의 기회로 여긴다.", type: "Likert" },
    { id: 30, text: "나는 리더십을 발휘하여 팀의 성과를 높이는 데 기여한다.", type: "Likert" },

    // 4. 목표 달성 능력 (Achievement)
    { id: 31, text: "나는 명확한 목표를 세우고 이를 달성하기 위해 계획적으로 행동한다.", type: "Likert" },
    { id: 32, text: "나는 맡은 일은 끝까지 책임지고 완수한다.", type: "Likert" },
    { id: 33, text: "나는 시간 관리를 철저히 하여 기한 내에 업무를 마친다.", type: "Likert" },
    { id: 34, text: "나는 높은 수준의 성과를 달성하기 위해 스스로를 채찍질한다.", type: "Likert" },
    { id: 35, text: "나는 업무 수행 중 발생하는 장애물을 극복하려는 의지가 강하다.", type: "Likert" },
    { id: 36, text: "나는 성과를 내기 위해 효율적인 업무 방식을 끊임없이 고민한다.", type: "Likert" },
    { id: 37, text: "나는 목표 달성 과정에서 겪는 스트레스를 잘 관리한다.", type: "Likert" },
    { id: 38, text: "나는 한 번 시작한 일은 만족할 만한 결과가 나올 때까지 매달린다.", type: "Likert" },
    { id: 39, text: "나는 구체적인 수치나 지표로 성과를 측정하고 관리하는 것을 선호한다.", type: "Likert" },
    { id: 40, text: "나는 개인의 목표와 조직의 목표를 일치시키려고 노력한다.", type: "Likert" },

    // 5. 조직문화 형성 능력 (Organizational Culture)
    { id: 41, text: "나는 우리 조직의 비전과 가치를 중요하게 생각하고 실천한다.", type: "Likert" },
    { id: 42, text: "나는 조직의 규정과 원칙을 준수하는 것을 기본으로 생각한다.", type: "Likert" },
    { id: 43, text: "나는 동료들과의 협력을 통해 시너지를 내는 것을 중요시한다.", type: "Likert" },
    { id: 44, text: "나는 조직 내 다양성을 존중하고 포용적인 태도를 가진다.", type: "Likert" },
    { id: 45, text: "나는 우리 조직의 발전을 위해 건설적인 비판을 아끼지 않는다.", type: "Likert" },
    { id: 46, text: "나는 조직의 목표를 우선순위에 두고 개인적인 이익을 양보할 수 있다.", type: "Likert" },
    { id: 47, text: "나는 신입 사원이나 적응이 필요한 동료를 적극적으로 도와준다.", type: "Likert" },
    { id: 48, text: "나는 조직 내에서 발생하는 윤리적인 문제에 대해 민감하게 반응한다.", type: "Likert" },
    { id: 49, text: "나는 우리 조직이 사회적으로 긍정적인 영향을 미치기를 바란다.", type: "Likert" },
    { id: 50, text: "나는 조직의 일원으로서 자부심을 가지고 행동한다.", type: "Likert" },

    // 6. 의사소통 능력 (Communication)
    { id: 51, text: "나는 나의 주장을 명확하고 간결하게 전달하려고 노력한다.", type: "Likert" },
    { id: 52, text: "나는 상대방의 이야기를 경청하고 그 의도를 파악하려고 한다.", type: "Likert" },
    { id: 53, text: "나는 상황에 맞는 적절한 의사소통 방식을 선택하여 사용한다.", type: "Likert" },
    { id: 54, text: "나는 비언어적인 표현(표정, 제스처 등)도 중요한 소통 수단이라고 생각한다.", type: "Likert" },
    { id: 55, text: "나는 나의 의도가 상대방에게 정확히 전달되었는지 확인한다.", type: "Likert" },
    { id: 56, text: "나는 상대방의 입장을 고려하여 예의 바르게 대화한다.", type: "Likert" },
    { id: 57, text: "나는 어려운 내용도 상대방이 이해하기 쉽게 설명하는 능력이 있다.", type: "Likert" },
    { id: 58, text: "나는 대화 도중 오해가 발생하면 즉시 풀려고 노력한다.", type: "Likert" },
    { id: 59, text: "나는 여러 사람 앞에서도 자신 있게 발표할 수 있다.", type: "Likert" },
    { id: 60, text: "나는 보고서나 이메일 등 글로 하는 의사소통에도 능숙하다.", type: "Likert" }
];

// [NEW API URL]
const scriptURL = "https://script.google.com/macros/s/AKfycbxfByKA4Cch3bbWJ3MwHPwjvuORpVVnPgYmuPR3wzXSi5ZPa2gO4AY3Hg0RMTVI1Ik/exec";

// Flow Control: 6 Sections of 10 Questions
const SECTIONS = [
    { start: 0, end: 10 },
    { start: 10, end: 20 },
    { start: 20, end: 30 },
    { start: 30, end: 40 },
    { start: 40, end: 50 },
    { start: 50, end: 60 }
];

let currentSectionIdx = 0;
let userAnswers = JSON.parse(localStorage.getItem('gnFit_answers') || '{}');
let timerInterval;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check Login
    const name = localStorage.getItem('applicantName');
    if (!name) {
        alert("로그인 정보가 없습니다. 처음부터 다시 시작해주세요.");
        window.location.href = 'index.html';
        return;
    }

    // Load State
    const savedSection = parseInt(localStorage.getItem('gnFit_section') || '0');
    currentSectionIdx = savedSection;

    initTimer();
    renderSection(currentSectionIdx);
    updateProgressBar();
    injectCheatButtons();
});

// Timer
function initTimer() {
    const startTime = parseInt(localStorage.getItem('gnFit_startTime') || Date.now());
    localStorage.setItem('gnFit_startTime', startTime);

    const timerDisplay = document.getElementById('timer-display');
    timerInterval = setInterval(() => {
        const now = Date.now();
        const diff = Math.floor((now - startTime) / 1000);
        const m = Math.floor(diff / 60).toString().padStart(2, '0');
        const s = (diff % 60).toString().padStart(2, '0');
        if (timerDisplay) timerDisplay.innerText = `소요 시간 ${m}:${s}`;
    }, 1000);
}

// Render Section (10 Questions)
function renderSection(idx) {
    const section = SECTIONS[idx];
    const container = document.getElementById('question-list');
    container.innerHTML = '';

    for (let i = section.start; i < section.end; i++) {
        const q = QUESTIONS[i];
        const item = document.createElement('div');
        item.className = 'question-item';
        item.style.marginBottom = '20px';
        item.innerHTML = `
            <div class="q-text">
                <span class="q-num">${q.id}.</span> ${q.text}
            </div>
            <div class="options">
                ${[1, 2, 3, 4, 5].map(val => `
                    <label class="option-label">
                        <input type="radio" name="q${q.id}" value="${val}" 
                            ${userAnswers[q.id] == val ? 'checked' : ''} 
                            onclick="handleAnswer(${q.id}, ${val})">
                        <span class="bubble">${val == 1 ? '매우 아니다' : val == 5 ? '매우 그렇다' : val}</span>
                    </label>
                `).join('')}
            </div>
        `;
        container.appendChild(item);
    }
    window.scrollTo(0, 0);
    updateNavButtons();
    updateProgressBar();
    localStorage.setItem('gnFit_section', idx);
}

function handleAnswer(qId, val) {
    userAnswers[qId] = val;
    localStorage.setItem('gnFit_answers', JSON.stringify(userAnswers));
    updateNavButtons();
}

function updateProgressBar() {
    const total = 60;
    const answered = Object.keys(userAnswers).filter(k => k <= 60).length;
    const pct = Math.round((answered / total) * 100);

    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = `${pct}%`;
    const txt = document.getElementById('progress-text');
    if (txt) txt.innerText = `${answered} / ${total}`;
}

function validateSectionSilently(idx) {
    const section = SECTIONS[idx];
    for (let i = section.start + 1; i <= section.end; i++) {
        if (!userAnswers[i]) return false;
    }
    return true;
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Prev
    if (currentSectionIdx === 0) {
        prevBtn.style.display = 'none';
        prevBtn.parentElement.style.justifyContent = 'flex-end';
    } else {
        prevBtn.style.display = 'block';
        prevBtn.parentElement.style.justifyContent = 'space-between';
        prevBtn.onclick = goPrevSection;
    }

    // Next / Submit
    if (currentSectionIdx === SECTIONS.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        submitBtn.onclick = (e) => { e.preventDefault(); submitTest(); };
        submitBtn.classList.add('nav-btn', 'submit');
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
        nextBtn.onclick = goNextSection;
    }

    const isComplete = validateSectionSilently(currentSectionIdx);
    if (nextBtn) {
        nextBtn.disabled = !isComplete;
        nextBtn.style.opacity = isComplete ? '1' : '0.5';
        nextBtn.style.cursor = isComplete ? 'pointer' : 'not-allowed';
    }
    if (submitBtn) {
        submitBtn.disabled = !isComplete;
        submitBtn.style.opacity = isComplete ? '1' : '0.5';
        submitBtn.style.cursor = isComplete ? 'pointer' : 'not-allowed';
    }
}

function goPrevSection() {
    if (currentSectionIdx > 0) {
        currentSectionIdx--;
        renderSection(currentSectionIdx);
    }
}

function goNextSection() {
    if (validateSectionSilently(currentSectionIdx)) {
        if (currentSectionIdx < SECTIONS.length - 1) {
            currentSectionIdx++;
            renderSection(currentSectionIdx);
        }
    } else {
        alert("모든 문항에 답변해주세요.");
    }
}

// [SUBMIT FUNCTION] - UPDATED FOR USER REQUEST (KOREAN KEYS + LOCALSTORAGE)
async function submitTest() {
    if (!validateSectionSilently(currentSectionIdx)) {
        alert("모든 문항에 답변해주세요.");
        return;
    }
    if (!confirm("모든 검사를 마쳤습니다. 제출하시겠습니까?")) return;

    // Loading UI
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.textContent = "전송 중...";
        submitBtn.disabled = true;
    }

    clearInterval(timerInterval);

    // 1. Prepare Data
    const name = localStorage.getItem('applicantName') || "";
    const phone = localStorage.getItem('applicantPhone') || "";
    const birth = localStorage.getItem('applicantBirthdate') || "";
    const timestamp = new Date().toLocaleString();

    const allAnswers = userAnswers;

    // [STRICT KEY] '성명'
    const payload = {
        "성명": name,
        "휴대폰번호": phone,
        "생년월일": birth,
        "응시일시": timestamp,
        ...allAnswers
    };

    // Ensure Q1..Q60 keys
    for (let i = 1; i <= 60; i++) {
        payload[`Q${i}`] = allAnswers[i] || "";
    }

    console.log("전송 데이터:", payload);

    try {
        // [STRICT] redirect: 'follow'
        await fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(payload),
            redirect: 'follow', // Requested
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
        });

        // Backup
        try {
            const db = JSON.parse(localStorage.getItem('gnFit_db') || '[]');
            db.push(payload);
            localStorage.setItem('gnFit_db', JSON.stringify(db));
        } catch (e) { console.error('Backup failed', e); }

        // Cleanup
        localStorage.setItem('survey_completed', 'true');
        localStorage.removeItem('applicantName');
        localStorage.removeItem('applicantBirthdate');
        localStorage.removeItem('applicantPhone');
        localStorage.removeItem('applicantAgree');
        localStorage.removeItem('gnFit_startTime');

        alert("제출이 완료되었습니다.");
        // [STRICT] Redirect
        window.location.href = "result.html";

    } catch (err) {
        console.error("전송 에러:", err);
        alert("데이터 전송 중 오류가 발생했습니다. ('" + err.message + "')\n네트워크 상태를 확인해주시거나 관리자에게 문의하세요.");
        if (submitBtn) {
            submitBtn.textContent = "다시 제출";
            submitBtn.disabled = false;
        }
    }
}

function injectCheatButtons() {
    // Hidden debug
}

function cheatFill(val) {
    for (let i = 1; i <= 60; i++) {
        userAnswers[i] = val;
    }
    localStorage.setItem('gnFit_answers', JSON.stringify(userAnswers));
    renderSection(currentSectionIdx);
}