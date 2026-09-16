// test.js - Final Full Version (No Omissions)
// 수정사항: 화면 튕김 방지, 제출 버튼 디자인 통일, 100문항 전체 포함
const scriptURL = "https://script.google.com/macros/s/AKfycbxWYy_ROJSSNd6wWrOYuKMTuW1NrpVLP1tZQN5ohq0xuAEfTbbyPE4wmSc-zkLy6rY/exec";

// [THEME CONFIG]
const SECTIONS = [
    { type: 'bridge', title: 'PART 1: 성향 및 역량 검사 안내', subtitle: 'PART 1 / 2', content: `귀하의 평소 생각과 행동 스타일을 파악하는 문항입니다.<br>정답이 없으니 가장 본인다운 답변을 솔직하게 골라주세요.<br>(총 80문항)`, buttonText: '검사 시작하기', themeVar: '--section-1-color' },
    { type: 'questions', start: 0, end: 9, themeVar: '--section-1-color', name: 'PART 1' },
    { type: 'questions', start: 10, end: 19, themeVar: '--section-2-color', name: 'PART 1' },
    { type: 'questions', start: 20, end: 29, themeVar: '--section-3-color', name: 'PART 1' },
    { type: 'questions', start: 30, end: 39, themeVar: '--section-1-color', name: 'PART 1' },
    { type: 'questions', start: 40, end: 49, themeVar: '--section-2-color', name: 'PART 1' },
    { type: 'questions', start: 50, end: 59, themeVar: '--section-3-color', name: 'PART 1' },
    { type: 'questions', start: 60, end: 69, themeVar: '--section-1-color', name: 'PART 1' },
    { type: 'questions', start: 70, end: 79, themeVar: '--section-2-color', name: 'PART 1' },
    { type: 'bridge', title: 'PART 2: 상황 판단 검사 안내', subtitle: 'PART 2 / 2', content: `실무 시나리오를 읽고 본인이 생각하기에<br><strong style="color:var(--color-best)">'가장 할 법한 행동(Best)'</strong>과 <strong style="color:var(--color-worst)">'가장 안 할 법한 행동(Worst)'</strong>을<br>하나씩 필수 선택해 주세요.<br>(총 20문항)`, buttonText: '이어서 시작하기', themeVar: '--section-3-color' },
    { type: 'questions', start: 80, end: 84, themeVar: '--section-3-color', name: 'PART 2' },
    { type: 'questions', start: 85, end: 89, themeVar: '--section-1-color', name: 'PART 2' },
    { type: 'questions', start: 90, end: 94, themeVar: '--section-2-color', name: 'PART 2' },
    { type: 'questions', start: 95, end: 99, themeVar: '--section-3-color', name: 'PART 2' }
];

function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// PART1 Q1~60은 응시자마다 순서를 무작위로 섞어서 페이지에 배치한다.
// 같은 카테고리 10문항이 연달아 나오면 패턴을 눈치채고 편향/일관되게 답하기 쉬워지는 것을 방지.
// (Q61~80은 거울 문항 배치 설계상 원본 문항과 멀리 떨어뜨려야 하므로 순서를 그대로 둔다)
const part1Shuffled = shuffleArray(Array.from({ length: 60 }, (_, i) => i + 1));
for (let p = 0; p < 6; p++) {
    SECTIONS[1 + p].ids = part1Shuffled.slice(p * 10, p * 10 + 10);
}

// PART2 선택지도 응시자마다 화면 표시 순서를 무작위로 섞는다.
// 정답(Best/Worst)이 특정 번호에 몰리는 통계적 패턴으로 찍기가 통하지 않도록 하기 위함.
// 채점은 원본 선택지 인덱스(ANSWER_KEY 기준) 그대로 이루어지며, 화면 번호(1~4)는 매번 새로 매겨 표시만 됨.
// 화면에 보이는 문항 번호는 원본 번호(q.id)가 아니라 "몇 번째로 푸는 문항인가"로 매긴다.
// PART1 Q1~60을 섞으면 원본 번호가 Q2 다음에 Q19 처럼 튀어서 응시자가 불안해하기 때문.
// 저장·채점·거울문항 판정은 전부 q.id 기준이므로 이 번호는 표시용일 뿐 결과에 영향이 없다.
const displayNumber = {};
(function assignDisplayNumbers() {
    let n = 0;
    for (const cfg of SECTIONS) {
        if (cfg.type !== 'questions') continue;
        const ids = cfg.ids || Array.from({ length: cfg.end - cfg.start + 1 }, (_, i) => cfg.start + 1 + i);
        for (const id of ids) displayNumber[id] = ++n;
    }
})();

const part2OptionOrder = {};
for (let id = 81; id <= 100; id++) {
    part2OptionOrder[id] = shuffleArray([1, 2, 3, 4]);
}

// [DATA] (Full 100 Questions)
// [DATA] 문항 100개는 이 파일에 없다.
// 이 파일은 공개 저장소(GitHub Pages)로 그대로 배포되므로, 문항을 여기 두면
// 지원자가 시험 전에 100문항을 전부 읽어볼 수 있다. 그래서 문항 본문은
// google_apps_script.js(비공개)로 옮겼고, 검사 시작 시 서버에서 내려받는다.
// 문항을 수정하려면 test.js가 아니라 google_apps_script.js의 QUESTIONS 배열을 고칠 것.
let allQuestions = [];

let currentSectionIdx = 0;
let userAnswers = {};
let sectionTimerInterval = null;
const PART1_TIME_LIMIT = 60;  // PART1 문항 페이지당 제한 시간(초)
const PART2_TIME_LIMIT = 120; // PART2 문항 페이지당 제한 시간(초)

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('test-form')?.addEventListener('submit', (e) => e.preventDefault());
    document.getElementById('next-btn').addEventListener('click', goNextSection);
    const sBtn = document.getElementById('submit-btn');
    if (sBtn) { sBtn.addEventListener('click', submitTest); sBtn.classList.add('nav-btn', 'submit'); }
    loadQuestions();
});

// 서버(Apps Script)에서 문항 100개를 받아온 뒤에야 첫 화면을 그린다.
// 받아오기 전에는 화면을 그릴 수 없으므로(문항이 없으므로) 안내 문구만 보여준다.
async function loadQuestions() {
    const box = document.getElementById('question-list');
    box.innerHTML = `<div class="loading-placeholder">문항을 불러오는 중입니다...</div>`;
    document.getElementById('next-btn').style.display = 'none';
    try {
        const url = `${scriptURL}?action=questions&_cb=${Date.now()}`;
        const res = await fetch(url, { method: 'GET', cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        // 문항이 100개 전부 오지 않았다면 검사를 시작하면 안 된다(중간에 빈 문항이 생김).
        if (!Array.isArray(data) || data.length !== 100) throw new Error('문항 개수 이상: ' + (data && data.length));
        allQuestions = data.slice().sort((a, b) => a.id - b.id);
        renderSection(0);
    } catch (err) {
        console.error('문항 불러오기 실패', err);
        box.innerHTML = `<div class="loading-placeholder">
            문항을 불러오지 못했습니다.<br>인터넷 연결을 확인한 뒤 다시 시도해 주세요.<br>
            <button type="button" class="btn-bridge" style="margin-top:16px" onclick="loadQuestions()">다시 시도</button>
        </div>`;
    }
}

function renderSection(idx) {
    const c = document.getElementById('question-list');
    const cfg = SECTIONS[idx];
    if (cfg.themeVar) document.documentElement.style.setProperty('--theme-color', `var(${cfg.themeVar})`);
    manageSectionTimer(idx);
    if (cfg.type === 'bridge') {
        renderBridge(cfg, c); updateNavButtons(idx, true); return;
    }
    renderQuestions(cfg, c); updateNavButtons(idx, false); checkSectionComplete();
}

// PART1/PART2 문항 페이지 전용 카운트다운. 0초가 되면 완료 여부와 무관하게 강제로 다음 페이지로 이동.
function isTimedSection(idx) {
    const cfg = SECTIONS[idx];
    return cfg.type === 'questions' && (cfg.name === 'PART 1' || cfg.name === 'PART 2');
}

function getSectionTimeLimit(idx) {
    return SECTIONS[idx].name === 'PART 2' ? PART2_TIME_LIMIT : PART1_TIME_LIMIT;
}

function manageSectionTimer(idx) {
    clearInterval(sectionTimerInterval);
    const el = document.getElementById('section-timer');
    if (!isTimedSection(idx)) {
        if (el) el.style.display = 'none';
        return;
    }
    let remaining = getSectionTimeLimit(idx);
    const render = () => {
        if (!el) return;
        const m = Math.floor(remaining / 60).toString().padStart(2, '0');
        const sc = (remaining % 60).toString().padStart(2, '0');
        el.style.display = 'inline';
        el.textContent = `남은 시간 ${m}:${sc}`;
        el.classList.toggle('warn', remaining <= 10);
    };
    render();
    sectionTimerInterval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
            clearInterval(sectionTimerInterval);
            remaining = 0;
            render();
            forceNextSection();
            return;
        }
        render();
    }, 1000);
}

function forceNextSection() {
    if (currentSectionIdx < SECTIONS.length - 1) {
        currentSectionIdx++;
        renderSection(currentSectionIdx);
    }
}

function renderBridge(cfg, c) {
    document.getElementById('progress-text').textContent = cfg.subtitle || '';
    c.innerHTML = `<div class="bridge-container"><h2 class="bridge-title">${cfg.title}</h2><div class="bridge-content bridge-desc">${cfg.content}</div><button type="button" class="btn-bridge" onclick="goNextSection()">${cfg.buttonText}</button></div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestions(cfg, c) {
    let p = (currentSectionIdx >= 1 && currentSectionIdx <= 8) ? currentSectionIdx : (currentSectionIdx >= 10 ? currentSectionIdx - 1 : 0);
    if (p > 0) {
        document.getElementById('progress-text').textContent = `PAGE ${p} / 12`;
        document.getElementById('progress-bar').style.width = `${(p / 12) * 100}%`;
    }
    let h = '';
    const ids = cfg.ids || Array.from({ length: cfg.end - cfg.start + 1 }, (_, i) => cfg.start + 1 + i);
    for (const id of ids) {
        const q = allQuestions[id - 1];
        if (q.type === 'AB') h += renderTypeAB(q);
        else if (q.type === 'BW') h += renderTypeBW(q);
    }
    c.innerHTML = h;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderTypeAB(q) {
    const s = userAnswers[q.id];
    return `<div class="question-item"><div class="question-header"><span class="q-number">Q${displayNumber[q.id] || q.id}</span></div><div class="options-grid"><div class="option-card ${s === 'A' ? 'selected' : ''}" onclick="selectOption(${q.id}, 'A')"><input type="radio" name="q${q.id}" value="A" class="option-input" ${s === 'A' ? 'checked' : ''}><span class="option-text">${q.optionA}</span></div><div class="option-card ${s === 'B' ? 'selected' : ''}" onclick="selectOption(${q.id}, 'B')"><input type="radio" name="q${q.id}" value="B" class="option-input" ${s === 'B' ? 'checked' : ''}><span class="option-text">${q.optionB}</span></div></div></div>`;
}

function renderTypeBW(q) {
    const s = userAnswers[q.id] || {};
    const order = part2OptionOrder[q.id] || [1, 2, 3, 4];
    let h = '';
    order.forEach((i, slot) => {
        const rawTxt = q.options[i - 1].replace(/^\d+\.\s*/, '');
        const txt = `${slot + 1}. ${rawTxt}`;
        const isB = s.best === i; const isW = s.worst === i;
        h += `<div class="scenario-card ${isB ? 'has-best' : ''} ${isW ? 'has-worst' : ''}" id="q${q.id}_opt${i}"><div class="scenario-content">${txt}</div><div class="selection-label label-best">Best</div><div class="selection-label label-worst">Worst</div><div class="scenario-actions"><button type="button" class="btn-select best ${isB ? 'active' : ''}" onclick="selectScenarioOption(event, ${q.id}, ${i}, 'best')">Best</button><button type="button" class="btn-select worst ${isW ? 'active' : ''}" onclick="selectScenarioOption(event, ${q.id}, ${i}, 'worst')">Worst</button></div></div>`;
    });
    return `<div class="question-item"><div class="question-header"><span class="q-number">Q${displayNumber[q.id] || q.id}</span></div><div class="scenario-box"><div class="scenario-text">${q.scenario}</div></div><div class="scenario-options-grid">${h}</div></div>`;
}

window.selectOption = function (qId, val) {
    userAnswers[qId] = val;
    const qDiv = document.querySelector(`[onclick="selectOption(${qId}, 'A')"]`)?.closest('.question-item');
    if (qDiv) {
        const cs = qDiv.querySelectorAll('.option-card');
        cs.forEach(c => {
            const isS = c.getAttribute('onclick').includes(`'${val}'`);
            c.classList.toggle('selected', isS);
            const input = c.querySelector('input');
            if (input) input.checked = isS;
        });
    }
    checkSectionComplete();
};

window.selectScenarioOption = function (e, qId, i, type) {
    if (e) e.preventDefault();
    if (!userAnswers[qId]) userAnswers[qId] = { best: null, worst: null };
    if (type === 'best') {
        userAnswers[qId].best = (userAnswers[qId].best === i) ? null : i;
        if (userAnswers[qId].best === userAnswers[qId].worst) userAnswers[qId].worst = null;
    } else {
        userAnswers[qId].worst = (userAnswers[qId].worst === i) ? null : i;
        if (userAnswers[qId].worst === userAnswers[qId].best) userAnswers[qId].best = null;
    }
    updateScenarioDOM(qId); checkSectionComplete();
};

function updateScenarioDOM(qId) {
    const a = userAnswers[qId];
    for (let i = 1; i <= 4; i++) {
        const c = document.getElementById(`q${qId}_opt${i}`); if (!c) continue;
        const b = c.querySelector('.btn-select.best'), w = c.querySelector('.btn-select.worst');
        c.classList.remove('has-best', 'has-worst'); b.classList.remove('active'); w.classList.remove('active');
        if (a.best === i) { c.classList.add('has-best'); b.classList.add('active'); }
        if (a.worst === i) { c.classList.add('has-worst'); w.classList.add('active'); }
    }
}

function checkSectionComplete() {
    const n = document.getElementById('next-btn'), s = document.getElementById('submit-btn');
    if (SECTIONS[currentSectionIdx].type === 'bridge') return;
    const ok = validateSectionSilently(currentSectionIdx);
    if (n) n.disabled = !ok; if (s) s.disabled = !ok;
}

function validateSectionSilently(idx) {
    const s = SECTIONS[idx];
    const ids = s.ids || Array.from({ length: s.end - s.start + 1 }, (_, i) => s.start + 1 + i);
    for (const id of ids) {
        const q = allQuestions[id - 1], a = userAnswers[q.id];
        if (q.type === 'AB' && !a) return false;
        if (q.type === 'BW' && (!a || !a.best || !a.worst)) return false;
    }
    return true;
}

// [FIXED] '제출하기' 버튼 디자인을 '이전/다음' 버튼과 100% 동일하게 수정
function updateNavButtons(idx, isB) {
    const n = document.getElementById('next-btn'), s = document.getElementById('submit-btn');
    n.style.display = 'none'; s.style.display = 'none';
    if (isB) return;
    if (idx === 13) {
        s.style.display = 'block';
        // 이전/다음 버튼과 동일한 크기, 색상, 폰트 적용
        s.style.cssText = `
            display: block; 
            background-color: #89a230 !important; 
            color: #fff !important; 
            font-weight: 700;
            font-size: 18px;
            padding: 12px 24px;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            width: 120px;
            height: 48px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
    }
    else n.style.display = 'block';
}

function goNextSection() {
    if (SECTIONS[currentSectionIdx].type !== 'bridge' && !validateSectionSilently(currentSectionIdx)) { alert("모든 문항에 답변해주세요."); return; }
    if (currentSectionIdx < SECTIONS.length - 1) { currentSectionIdx++; renderSection(currentSectionIdx); }
}

function submitTest() {
    if (!validateSectionSilently(currentSectionIdx)) return;
    if (!confirm("제출하시겠습니까?")) return;
    const b = document.getElementById('submit-btn'); b.textContent = "전송 중..."; b.disabled = true;
    clearInterval(sectionTimerInterval);
    const formData = {
        "성명": localStorage.getItem('applicantName'),
        "휴대폰번호": localStorage.getItem('applicantPhone'),
        "생년월일": localStorage.getItem('applicantBirthdate'),
        "정보동의여부": localStorage.getItem('applicantAgree'),
        "응시일시": new Date().toISOString()
    };
    for (let i = 1; i <= 80; i++) formData[`Q${i}`] = userAnswers[i] || "";
    for (let i = 81; i <= 100; i++) {
        const r = userAnswers[i] || {};
        formData[`Q${i}_Best`] = r.best || "";
        formData[`Q${i}_Worst`] = r.worst || "";
    }
    fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(formData) })
        .then(() => { alert("제출 완료!"); window.location.href = "result.html"; })
        .catch(e => { console.error(e); alert("전송 에러!"); });
}