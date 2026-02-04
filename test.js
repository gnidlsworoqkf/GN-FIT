// test.js - Updated with 80 Questions & 8-Page Pagination

// [CONFIG] Google Apps Script URL (Updated)
const scriptURL = "https://script.google.com/macros/s/AKfycbymGazKH5ak6SG6-vE42MzzAwI6J-pvz78Q0bBgCbq6xPpqCTPptQPS439_r1KMOOij/exec";

// [THEME CONFIG] Section Themes (8 Pages)
const SECTIONS = [
    { start: 0, end: 9, themeVar: '--section-1-color', name: 'PART 1' },
    { start: 10, end: 19, themeVar: '--section-2-color', name: 'PART 2' },
    { start: 20, end: 29, themeVar: '--section-3-color', name: 'PART 3' },
    { start: 30, end: 39, themeVar: '--section-1-color', name: 'PART 4' },
    { start: 40, end: 49, themeVar: '--section-2-color', name: 'PART 5' },
    { start: 50, end: 59, themeVar: '--section-3-color', name: 'PART 6' },
    { start: 60, end: 69, themeVar: '--section-1-color', name: 'PART 7' },
    { start: 70, end: 79, themeVar: '--section-2-color', name: 'PART 8' }
];

// [DATA] 80 Questions
const allQuestions = [
    { id: 1, category: "주도적 능력", optionA: "가이드라인을 완벽히 숙달하는 것이 우선이다.", optionB: "효율을 높일 새로운 방법을 찾는 것이 우선이다." },
    { id: 2, category: "주도적 능력", optionA: "업무의 정확한 범위를 확인한 뒤 실행한다.", optionB: "필요한 일을 스스로 판단하여 먼저 시작한다." },
    { id: 3, category: "주도적 능력", optionA: "검증된 안전한 업무 방식을 더 선호한다.", optionB: "새로운 시도를 통해 배울 점을 찾는 것을 즐긴다." },
    { id: 4, category: "주도적 능력", optionA: "정해진 역할 범위를 충실히 지키는 것을 중시한다.", optionB: "필요하다면 역할 밖의 일이라도 팀을 위해 나선다." },
    { id: 5, category: "주도적 능력", optionA: "결정된 사항을 경청하고 기록하는 역할을 선호한다.", optionB: "논의 과정에서 내 아이디어를 적극적으로 제안한다." },
    { id: 6, category: "주도적 능력", optionA: "체계가 잘 잡힌 안정적인 환경에서 능률이 높다.", optionB: "직접 체계를 만들어가야 하는 환경에서 활력이 생긴다." },
    { id: 7, category: "주도적 능력", optionA: "질문을 통해 명확한 답을 확인하고 일을 시작한다.", optionB: "스스로 자료를 찾아보고 대안을 먼저 만든다." },
    { id: 8, category: "주도적 능력", optionA: "주어진 과업을 오차 없이 수행할 때 보람을 느낀다.", optionB: "스스로 설정한 목표를 달성했을 때 성취감이 크다." },
    { id: 9, category: "주도적 능력", optionA: "조직의 전통적인 방식을 존중하며 따르는 편이다.", optionB: "비효율적인 관행은 개선을 제안하려 노력한다." },
    { id: 10, category: "주도적 능력", optionA: "근무 시간 내에 몰입하여 주어진 일을 끝낸다.", optionB: "업무 외 시간에도 개인의 성장을 위해 고민한다." },

    { id: 11, category: "문제 해결", optionA: "과거 사례를 참고하여 실수를 줄이는 데 집중한다.", optionB: "기존 방식에 의문을 갖고 원인을 다시 분석한다." },
    { id: 12, category: "문제 해결", optionA: "실무적인 경험과 직관을 더 신뢰한다.", optionB: "객관적인 수치와 데이터를 더 신뢰한다." },
    { id: 13, category: "문제 해결", optionA: "실행하며 발생하는 문제를 유연하게 해결한다.", optionB: "실행 전 발생 가능한 모든 변수를 사전에 점검한다." },
    { id: 14, category: "문제 해결", optionA: "한 가지 확실한 해결책을 빠르게 정하는 편이다.", optionB: "여러 대안의 장단점을 면밀히 비교하여 결정한다." },
    { id: 15, category: "문제 해결", optionA: "복잡한 문제는 상사에게 조언을 구하는 것이 낫다.", optionB: "복잡한 문제는 스스로 쪼개어 논리적 구조를 만든다." },
    { id: 16, category: "문제 해결", optionA: "세부적인 디테일과 오류를 잡아내는 데 강하다.", optionB: "전체적인 흐름과 본질을 짚어내는 데 강하다." },
    { id: 17, category: "문제 해결", optionA: "익숙한 도구를 활용해 효율적으로 결과를 낸다.", optionB: "문제에 맞는 새로운 기술이나 도구 도입을 시도한다." },
    { id: 18, category: "문제 해결", optionA: "갈등 발생 시 원만한 합의점을 찾는 데 집중한다.", optionB: "재발 방지를 위해 갈등 원인을 분석하는 데 집중한다." },
    { id: 19, category: "문제 해결", optionA: "누구나 이해할 수 있는 보편적인 방식으로 해결한다.", optionB: "고정관념을 깨는 독특하고 창의적인 방식으로 접근한다." },
    { id: 20, category: "문제 해결", optionA: "눈앞의 문제를 빠르게 처리하는 것을 우선시한다.", optionB: "시간이 걸려도 근본적인 시스템 개선을 우선시한다." },

    { id: 21, category: "목표 달성", optionA: "달성 가능성이 높은 안정적인 목표를 세운다.", optionB: "실패 위험이 있더라도 도전적인 목표를 세운다." },
    { id: 22, category: "목표 달성", optionA: "주변과 조화를 이루는 적정한 성과를 유지한다.", optionB: "남들보다 앞서는 압도적인 성과를 위해 몰입한다." },
    { id: 23, category: "목표 달성", optionA: "과정에서의 배움이 좋았다면 만족하는 편이다.", optionB: "약속된 결과를 내지 못하면 큰 아쉬움을 느낀다." },
    { id: 24, category: "목표 달성", optionA: "부여된 업무 지표를 충실히 달성하는 데 집중한다.", optionB: "스스로 정한 높은 기준에 도달하려 노력한다." },
    { id: 25, category: "목표 달성", optionA: "상황 변화에 따라 목표 수치를 유연하게 조정한다.", optionB: "상황이 변해도 처음 세운 목표를 끝까지 지켜낸다." },
    { id: 26, category: "목표 달성", optionA: "여러 업무를 동시에 무난하게 처리하는 것을 선호한다.", optionB: "한 가지 목표가 정해지면 끝을 볼 때까지 파고든다." },
    { id: 27, category: "목표 달성", optionA: "마감 직전까지 꼼꼼하게 검토하여 완성도를 높인다.", optionB: "마감보다 일찍 업무를 끝내어 처리 속도를 증명한다." },
    { id: 28, category: "목표 달성", optionA: "외부의 인정과 보상이 있을 때 더 힘이 난다.", optionB: "목표 달성 그 자체의 성취감에서 더 큰 힘을 얻는다." },
    { id: 29, category: "목표 달성", optionA: "어려운 과제는 팀원들과 나누어 부담을 덜고 싶다.", optionB: "어려운 과제일수록 내 역량을 시험할 기회로 여긴다." },
    { id: 30, category: "목표 달성", optionA: "에너지를 적절히 안배하여 지치지 않게 일한다.", optionB: "목표 달성을 위해 개인적인 에너지를 기꺼이 쓴다." },

    { id: 31, category: "소속 영향력", optionA: "내 업무를 완벽히 해내어 팀에 기여하는 편이다.", optionB: "내 일이 바쁘더라도 동료를 돕는 일을 우선한다." },
    { id: 32, category: "소속 영향력", optionA: "전문성이 뛰어난 동료로 인정받고 싶다.", optionB: "팀 내 유대감이 강하고 소통이 잘 되는 동료가 되고 싶다." },
    { id: 33, category: "소속 영향력", optionA: "팀의 화합을 위해 내 주장을 굽히는 경우가 많다.", optionB: "팀의 성장을 위해 불편한 반대 의견도 솔직히 낸다." },
    { id: 34, category: "소속 영향력", optionA: "구성원이 화합하며 함께 성장하는 것이 공정하다.", optionB: "개별 성과에 따라 명확히 차등 보상받는 게 공정하다." },
    { id: 35, category: "소속 영향력", optionA: "주로 뒤에서 묵묵하게 팀을 지원하는 편이다.", optionB: "대체로 앞장서서 팀원들에게 활력을 주는 편이다." },
    { id: 36, category: "소속 영향력", optionA: "업무 노하우를 나만의 경쟁력으로 관리한다.", optionB: "업무 노하우를 팀 전체와 적극적으로 공유한다." },
    { id: 37, category: "소속 영향력", optionA: "공동 목표를 위해 협업할 때 더 큰 의욕이 생긴다.", optionB: "개인 기여도가 명확히 드러날 때 의욕이 생긴다." },
    { id: 38, category: "소속 영향력", optionA: "갈등 시 감정이 상하지 않게 거리를 두는 편이다.", optionB: "갈등 당사자와 대면하여 오해를 풀려 노력한다." },
    { id: 39, category: "소속 영향력", optionA: "결정된 방향에 힘을 실어주는 역할을 선호한다.", optionB: "다양한 관점을 제시하여 논의를 확장하는 역할을 선호한다." },
    { id: 40, category: "소속 영향력", optionA: "실력이 뛰어난 동료와 일하고 싶다.", optionB: "인간미가 있고 배려심 깊은 동료와 일하고 싶다." },

    { id: 41, category: "의사소통", optionA: "보고 시 결론부터 명확하고 짧게 말한다.", optionB: "상대가 이해할 수 있게 상세한 배경부터 설명한다." },
    { id: 42, category: "의사소통", optionA: "상대방 주장의 논리적 오류를 잘 찾아내는 편이다.", optionB: "상대방의 말에 공감하며 의도를 먼저 파악하려 한다." },
    { id: 43, category: "의사소통", optionA: "메시지나 메일 등 기록이 남는 소통을 선호한다.", optionB: "직접 만나서 대화하며 분위기를 파악하는 게 편하다." },
    { id: 44, category: "의사소통", optionA: "잘못된 점은 오해 없게 그 자리에서 바로 말한다.", optionB: "상대의 기분을 고려해 나중에 따로 조심스레 말한다." },
    { id: 45, category: "의사소통", optionA: "내 생각을 논리적으로 설득하는 데 주력한다.", optionB: "각자의 의견을 경청하고 하나로 정리하는 데 주력한다." },
    { id: 46, category: "의사소통", optionA: "격식을 갖춘 정중한 언어를 사용하는 게 중요하다.", optionB: "솔직하고 편안한 언어를 사용하는 게 중요하다." },
    { id: 47, category: "의사소통", optionA: "정확한 정보 전달을 위해 전문 용어를 사용한다.", optionB: "상대가 이해하기 쉽게 쉬운 용어로 풀어서 말한다." },
    { id: 48, category: "의사소통", optionA: "조용한 회의에서 먼저 대화를 이끌며 분위기를 푼다.", optionB: "다른 사람들의 의견이 나올 때까지 차분히 기다린다." },
    { id: 49, category: "의사소통", optionA: "비판적인 피드백도 성장을 위한 자극으로 여긴다.", optionB: "피드백 내용이 합리적인지 스스로 면밀히 판단한다." },
    { id: 50, category: "의사소통", optionA: "진중한 말투로 업무적 신뢰를 주는 것을 중시한다.", optionB: "밝은 에너지와 웃음으로 호감을 얻는 것을 중시한다." },

    { id: 51, category: "조직문화", optionA: "규정과 원칙을 엄격하게 준수하는 문화가 편하다.", optionB: "상황에 따라 유연하게 원칙을 적용하는 문화가 편하다." },
    { id: 52, category: "조직문화", optionA: "근무 시간과 개인의 삶을 명확히 구분하고 싶다.", optionB: "업무와 일상이 자연스럽게 연결되는 것을 선호한다." },
    { id: 53, category: "조직문화", optionA: "회사의 전통과 가치를 소중히 지키는 게 중요하다.", optionB: "시대 변화에 맞춰 조직의 정체성을 계속 혁신해야 한다." },
    { id: 54, category: "조직문화", optionA: "사생활을 존중하며 적절한 거리를 유지하고 싶다.", optionB: "동료와 인간적인 유대감을 끈끈하게 쌓고 싶다." },
    { id: 55, category: "조직문화", optionA: "직급이 명확하여 역할 분담이 확실한 곳이 좋다.", optionB: "직급에 상관없이 수평적으로 소통하는 곳이 좋다." },
    { id: 56, category: "조직문화", optionA: "결과가 좋다면 과정상의 작은 실수는 이해될 수 있다.", optionB: "과정이 투명하고 정직하지 않다면 결과도 가치가 없다." },
    { id: 57, category: "조직문화", optionA: "경쟁을 통해 서로 자극받는 분위기에서 성장한다.", optionB: "서로 돕고 응원하며 안정을 느끼는 분위기에서 성장한다." },
    { id: 58, category: "조직문화", optionA: "체계와 규율이 있는 안정적인 조직이 신뢰가 간다.", optionB: "자율성을 존중하는 수평적인 조직이 신뢰가 간다." },
    { id: 59, category: "조직문화", optionA: "공식적인 회의와 보고를 통해 일하는 게 좋다.", optionB: "수시로 자유롭게 대화하며 가볍게 의견을 나누는 게 좋다." },
    { id: 60, category: "조직문화", optionA: "선배들의 노하우를 먼저 배우는 데 집중한다.", optionB: "신입의 새로운 시각으로 조직에 변화를 준다." },

    // 이하는 거울/함정 문항
    { id: 61, category: "주도적 능력", optionA: "매뉴얼대로 정확하게 일할 때 안심이 된다.", optionB: "나만의 새로운 방식을 시도할 때 활력이 생긴다." },
    { id: 62, category: "주도적 능력", optionA: "확실히 검증된 길을 가는 것이 효율적이다.", optionB: "다소 위험하더라도 가보지 않은 길에 도전하고 싶다." },
    { id: 63, category: "문제 해결", optionA: "나의 풍부한 경험과 감을 믿고 판단하는 편이다.", optionB: "명확한 근거 자료와 통계 수치를 믿고 판단한다." },
    { id: 64, category: "문제 해결", optionA: "당사자들이 합의할 수 있는 지점을 찾는 게 급선무다.", optionB: "갈등 원인을 파악하여 재발을 막는 게 급선무다." },
    { id: 65, category: "목표 달성", optionA: "결과가 조금 미흡해도 과정이 좋았다면 만족한다.", optionB: "어떤 과정이었든 간에 최종 결과로 가치를 증명한다." },
    { id: 66, category: "목표 달성", optionA: "상황에 따라 목표치는 현실적으로 조정될 수 있다.", optionB: "한 번 정한 목표치는 어떤 경우에도 달성해야 한다." },
    { id: 67, category: "소속 영향력", optionA: "내게 맡겨진 임무를 완벽히 끝내는 데 몰입한다.", optionB: "동료의 업무가 막혀 있다면 내 일을 미루고라도 돕는다." },
    { id: 68, category: "소속 영향력", optionA: "팀원들에게 업무적으로 신뢰받는 전문가가 되고 싶다.", optionB: "팀원들이 언제든 편하게 다가올 수 있는 동료가 되고 싶다." },
    { id: 69, category: "의사소통", optionA: "상대방의 논리가 타당한지 분석하며 듣는 편이다.", optionB: "상대방의 기분과 말하는 의도를 파악하며 듣는 편이다." },
    { id: 70, category: "의사소통", optionA: "효율을 위해 결론부터 짧고 명확하게 말하는 게 좋다.", optionB: "오해를 방지하기 위해 전후 상황을 상세히 설명하는 게 좋다." },

    { id: 71, category: "조직문화", optionA: "가이드라인이 정교하게 짜인 조직이 효율적이다.", optionB: "상황에 맞게 유연하게 대처할 수 있는 조직이 효율적이다." },
    { id: 72, category: "조직문화", optionA: "직급에 따른 위계와 질서가 명확한 곳이 편하다.", optionB: "직급에 상관없이 누구나 자유롭게 의견을 내는 곳이 편하다." },
    { id: 73, category: "조직문화", optionA: "기존의 업무 방식과 조직의 문법을 먼저 익힌다.", optionB: "기존 방식에 얽매이지 않고 새로운 관점을 제시한다." },
    { id: 74, category: "주도적 능력", optionA: "주어진 과업의 범위 내에서 최선을 다한다.", optionB: "스스로 과업을 정의하고 업무 범위를 확장한다." },
    { id: 75, category: "문제 해결", optionA: "실행 속도보다 발생 가능한 리스크를 줄이는 게 더 중요하다.", optionB: "리스크를 감수하더라도 빠른 실행으로 답을 찾는 게 더 중요하다." },
    { id: 76, category: "목표 달성", optionA: "주변과 보조를 맞추며 무난한 성과를 유지한다.", optionB: "남들이 포기할 때도 끝까지 몰입하여 압도적인 결과를 낸다." },
    { id: 77, category: "소속 영향력", optionA: "팀의 원만한 인간관계를 유지하는 것을 우선한다.", optionB: "팀의 목표 달성과 객관적인 업무 피드백을 우선한다." },
    { id: 78, category: "의사소통", optionA: "상대방이 거부감을 느끼지 않도록 부드럽게 설득한다.", optionB: "정확한 사실과 논리를 바탕으로 단도직입적으로 설득한다." },
    { id: 79, category: "조직문화", optionA: "사전에 약속된 체계와 일관성이 있는 조직이 편하다.", optionB: "변화에 기민하고 자율성이 보장되는 조직이 편하다." },
    { id: 80, category: "공통 신뢰도", optionA: "나는 업무를 할 때 가끔 실수를 하기도 한다.", optionB: "나는 어떤 상황에서도 절대 실수를 하지 않는다." }
];

// State Variables
let currentSection = 0;
let userAnswers = {};
let timerInterval = null;

// [INIT] Page Load
document.addEventListener('DOMContentLoaded', () => {
    // 1. 타이머 시작
    startTimer();

    // 2. 버튼 이벤트 연결
    document.getElementById('prev-btn').addEventListener('click', goPrevSection);
    document.getElementById('next-btn').addEventListener('click', goNextSection);
    document.getElementById('submit-btn').addEventListener('click', submitFinal);

    // 3. 첫 섹션 렌더링
    renderSection(0);
});

// [UI] Timer Logic
function startTimer() {
    const timerDisplay = document.getElementById('timer-display');
    const startTimeStr = localStorage.getItem('gnFit_startTime');

    // 만약 시작 시간이 없다면 현재 시간으로 설정 (예외 처리)
    let startTime = startTimeStr ? parseInt(startTimeStr) : Date.now();
    if (!startTimeStr) localStorage.setItem('gnFit_startTime', startTime.toString());

    timerInterval = setInterval(() => {
        const now = Date.now();
        const elapsedSec = Math.floor((now - startTime) / 1000);

        const min = Math.floor(elapsedSec / 60).toString().padStart(2, '0');
        const sec = (elapsedSec % 60).toString().padStart(2, '0');

        if (timerDisplay) {
            timerDisplay.textContent = `소요 시간 ${min}:${sec}`;
        }
    }, 1000);
}

// [RENDER] Render Section (10 per page)
function renderSection(sectionIdx) {
    const container = document.getElementById('question-list');
    const section = SECTIONS[sectionIdx];

    // 1. Update Theme
    document.documentElement.style.setProperty('--theme-color', `var(${section.themeVar})`);

    // 2. Update Progress Bar Info
    // Total 8 sections, so (sectionIdx + 1) / 8
    document.getElementById('progress-text').textContent = `PART ${sectionIdx + 1} / 8`;
    const progressPercent = ((sectionIdx + 1) / 8) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;

    // 3. Render Questions
    let html = '';

    for (let i = section.start; i <= section.end; i++) {
        const q = allQuestions[i];
        const saved = userAnswers[q.id]; // 'A' or 'B'

        html += `
        <div class="question-item">
            <div class="question-header">
                <span class="q-number">Q${q.id}</span>
            </div>
            <div class="options-grid">
                <div class="option-card ${saved === 'A' ? 'selected' : ''}" 
                     onclick="selectOption(${q.id}, 'A')">
                    <input type="radio" name="q${q.id}" value="A" class="option-input" ${saved === 'A' ? 'checked' : ''}>
                    <span class="option-text">${q.optionA}</span>
                </div>
                <div class="option-card ${saved === 'B' ? 'selected' : ''}" 
                     onclick="selectOption(${q.id}, 'B')">
                    <input type="radio" name="q${q.id}" value="B" class="option-input" ${saved === 'B' ? 'checked' : ''}>
                    <span class="option-text">${q.optionB}</span>
                </div>
            </div>
        </div>
        `;
    }

    container.innerHTML = html;

    // 4. Update Buttons
    updateNavButtons(sectionIdx);

    // 5. Scroll to Top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// [ACTION] Handle Option Selection
window.selectOption = function (qId, val) {
    userAnswers[qId] = val;

    // UI Update (find the clicked card and update class)
    const inputs = document.getElementsByName(`q${qId}`);
    inputs.forEach(input => {
        const card = input.closest('.option-card');
        if (input.value === val) {
            card.classList.add('selected');
            input.checked = true;
        } else {
            card.classList.remove('selected');
        }
    });

    // Check if current section is complete
    checkSectionComplete();
}

function checkSectionComplete() {
    // Optional: Enable Next button if all done?
}

function updateNavButtons(sectionIdx) {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Prev Button
    if (sectionIdx === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }

    // Next / Submit Buttons
    if (sectionIdx === SECTIONS.length - 1) {
        // Last Page (Page 8)
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }

    // Reset disabled state
    nextBtn.disabled = false;
    submitBtn.disabled = false;
}

// [NAV] Check Completion
function validateSection(sectionIdx) {
    const section = SECTIONS[sectionIdx];
    const missing = [];

    for (let i = section.start; i <= section.end; i++) {
        const qId = allQuestions[i].id;
        if (!userAnswers[qId]) {
            missing.push(qId);
        }
    }

    if (missing.length > 0) {
        alert(`아직 답변하지 않은 문항이 있습니다.\n(Q${missing[0]}번 등)`);
        return false;
    }
    return true;
}

function goPrevSection() {
    if (currentSection > 0) {
        currentSection--;
        renderSection(currentSection);
    }
}

function goNextSection() {
    if (validateSection(currentSection)) {
        if (currentSection < SECTIONS.length - 1) {
            currentSection++;
            renderSection(currentSection);
        }
    }
}

// [SUBMIT] Final Submission
async function submitFinal() {
    if (!validateSection(currentSection)) return;

    if (!confirm("모든 검사를 마쳤습니다. 제출하시겠습니까?")) return;

    // Stop Timer
    clearInterval(timerInterval);

    // UI Loading
    document.getElementById('submit-btn').textContent = "전송 중...";
    document.getElementById('submit-btn').disabled = true;

    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'flex';

    // Prepare Data
    const name = localStorage.getItem('applicantName');
    const birth = localStorage.getItem('applicantBirthdate');
    const phone = localStorage.getItem('applicantPhone');
    const agree = localStorage.getItem('applicantAgree');

    // Timer Calc
    const startTimeStr = localStorage.getItem('gnFit_startTime');
    let totalTime = 0;
    if (startTimeStr) {
        totalTime = Math.floor((Date.now() - parseInt(startTimeStr)) / 1000);
    }

    const record = {
        name,
        birth,
        phone,
        agree,
        answers: userAnswers, // 1~80 keys should be here
        totalTime,
        timestamp: new Date().toLocaleString()
    };

    // 1. Local Backup
    try {
        const db = JSON.parse(localStorage.getItem('gnFit_db') || '[]');
        db.push(record);
        localStorage.setItem('gnFit_db', JSON.stringify(db));
    } catch (e) { console.error('Backup failed', e); }

    // 2. G-Sheet Submit
    try {
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        });

        // 3. Cleanup & Redirect
        finalizeAndRedirect();

    } catch (error) {
        console.error("Submission Error:", error);
        alert('전송 중 오류가 발생했으나, 데이터는 안전하게 저장되었습니다.');
        finalizeAndRedirect();
    }
}

function finalizeAndRedirect() {
    localStorage.setItem('survey_completed', 'true');
    // Clear Session
    localStorage.removeItem('applicantName');
    localStorage.removeItem('applicantBirthdate');
    localStorage.removeItem('applicantPhone');
    localStorage.removeItem('applicantAgree');
    localStorage.removeItem('gnFit_startTime');

    alert('제출 완료되었습니다. 수고하셨습니다!');
    window.location.href = 'result.html';
}