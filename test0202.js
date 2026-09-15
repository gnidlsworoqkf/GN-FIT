// 1. 소연 님의 새 구글 배포 주소
const scriptURL = "https://script.google.com/macros/s/AKfycbypKjklizSvJ7GoeI_mdt_CiEVuHUvEFCTnZzcncqzB2WWISg7QFzdCya7ngAYsY4Ig/exec";

// 2. 60개 문항 데이터 (순서 고정)
const allQuestions = [
    { id: 1, category: "주도적 능력", optionA: "주어진 가이드라인을 철저히 준수한다.", optionB: "더 나은 결과물을 위해 새로운 방식을 제안한다." },
    { id: 2, category: "주도적 능력", optionA: "문제가 생기면 즉시 보고하고 지침을 기다린다.", optionB: "문제 해결을 위해 내가 할 수 있는 대안을 먼저 찾는다." },
    { id: 3, category: "주도적 능력", optionA: "익숙한 업무를 실수 없이 처리하는 편이다.", optionB: "생소한 업무라도 먼저 손들어 맡아보는 편이다." },
    { id: 4, category: "주도적 능력", optionA: "팀의 목표에 맞춰 내 보조를 맞춘다.", optionB: "우리 팀에 필요한 일이 무엇인지 먼저 찾아 제안한다." },
    { id: 5, category: "주도적 능력", optionA: "결정된 사항에 대해 효율적으로 실행한다.", optionB: "결정되기 전 단계에서 의견을 적극적으로 개진한다." },
    { id: 6, category: "주도적 능력", optionA: "안정적인 업무 환경에서 성과가 잘 나온다.", optionB: "변화가 많고 주도권이 있는 환경에서 활력이 생긴다." },
    { id: 7, category: "주도적 능력", optionA: "타인의 피드백을 수용하여 개선한다.", optionB: "스스로 개선점을 찾아 꾸준히 자기계발을 한다." },
    { id: 8, category: "주도적 능력", optionA: "업무 마감 기한을 엄수하는 것에 집중한다.", optionB: "마감 전이라도 미리 업무를 시작해 여유를 확보한다." },
    { id: 9, category: "주도적 능력", optionA: "시키는 일을 완벽하게 해내는 것이 실력이다.", optionB: "스스로 할 일을 찾아 성과를 내는 것이 실력이다." },
    { id: 10, category: "주도적 능력", optionA: "조직의 전통과 관행을 존중한다.", optionB: "불합리한 관행이 있다면 개선하려고 시도한다." },
    { id: 11, category: "문제 해결", optionA: "과거의 데이터와 사례를 꼼꼼히 분석한다.", optionB: "직관과 창의적인 아이디어로 돌파구를 찾는다." },
    { id: 12, category: "문제 해결", optionA: "실행하면서 발생하는 오류를 수정해 나간다.", optionB: "실행 전 발생 가능한 모든 리스크를 미리 점검한다." },
    { id: 13, category: "문제 해결", optionA: "다수의 의견을 따라 안전하게 해결한다.", optionB: "비판적 시각으로 문제의 근본 원인을 파악한다." },
    { id: 14, category: "문제 해결", optionA: "내가 잘 아는 분야의 문제를 푸는 게 편하다.", optionB: "복잡하고 얽혀있는 새로운 난제를 푸는 게 즐겁다." },
    { id: 15, category: "문제 해결", optionA: "단기적인 해결책으로 빠르게 대응한다.", optionB: "시간이 걸리더라도 장기적 관점의 대안을 만든다." },
    { id: 16, category: "문제 해결", optionA: "정해진 논리 체계에 따라 사고한다.", optionB: "고정관념에서 벗어나 다각도로 사안을 바라본다." },
    { id: 17, category: "문제 해결", optionA: "결과에 책임을 지는 자세가 중요하다.", optionB: "결과가 나오기까지의 논리적 과정이 중요하다." },
    { id: 18, category: "문제 해결", optionA: "세부적인 수치와 디테일에 강점이 있다.", optionB: "전체적인 흐름과 맥락을 파악하는 데 강점이 있다." },
    { id: 19, category: "문제 해결", optionA: "기존의 툴(Tool)을 활용해 효율을 높인다.", optionB: "새로운 기술이나 도구를 도입해 문제를 해결한다." },
    { id: 20, category: "문제 해결", optionA: "혼자 깊이 고민하여 해답을 얻는 편이다.", optionB: "동료들과 브레인스토밍하며 해답을 얻는 편이다." },
    { id: 21, category: "목표 달성", optionA: "현실적으로 실현 가능한 목표를 선호한다.", optionB: "다소 무리해 보이지만 도전적인 목표를 선호한다." },
    { id: 22, category: "목표 달성", optionA: "계획이 변경되면 유연하게 대처한다.", optionB: "한번 세운 계획은 끝까지 밀어붙여 완수한다." },
    { id: 23, category: "목표 달성", optionA: "업무 과정에서 느끼는 보람이 크다.", optionB: "최종적으로 약속된 결과물을 냈을 때 보람이 크다." },
    { id: 24, category: "목표 달성", optionA: "적절한 워라밸 속에서 꾸준히 일한다.", optionB: "목표 달성을 위해서라면 몰입하여 에너지를 쏟는다." },
    { id: 25, category: "목표 달성", optionA: "실패하더라도 시도했다는 점에 의미를 둔다.", optionB: "실패는 용납할 수 없으며 어떻게든 완수해야 한다." },
    { id: 26, category: "목표 달성", optionA: "꼼꼼하게 검토하여 실수를 줄인다.", optionB: "속도감 있게 업무를 추진하여 목표에 다가간다." },
    { id: 27, category: "목표 달성", optionA: "상급자의 기대를 충족시키는 수준을 목표한다.", optionB: "내 스스로가 만족할 수 있는 높은 기준을 목표한다." },
    { id: 28, category: "목표 달성", optionA: "어려운 과제는 전문가에게 도움을 요청한다.", optionB: "어려운 과제라도 끝까지 내 힘으로 해결하려 한다." },
    { id: 29, category: "목표 달성", optionA: "주변의 인정과 칭찬이 동기부여가 된다.", optionB: "목표 달성 그 자체에서 오는 성취감이 동기부여가 된다." },
    { id: 30, category: "목표 달성", optionA: "업무의 양보다 질적인 완성을 중시한다.", optionB: "정해진 기한 내에 양적인 목표를 채우는 것을 중시한다." },
    { id: 31, category: "소속 영향력", optionA: "내 업무에서 최고의 성과를 내는 것에 집중한다.", optionB: "팀원들의 업무 진척 상황을 살피고 도움을 준다." },
    { id: 32, category: "소속 영향력", optionA: "독립적으로 일할 때 최대 역량이 발휘된다.", optionB: "협력하고 의견을 나눌 때 최대 역량이 발휘된다." },
    { id: 33, category: "소속 영향력", optionA: "팀의 결정이 내 생각과 달라도 묵묵히 따른다.", optionB: "팀의 발전을 위해 반대 의견도 솔직하게 표현한다." },
    { id: 34, category: "소속 영향력", optionA: "개인적인 성취가 조직의 성취보다 중요하다.", optionB: "조직의 목표 달성이 나의 개인적 성취보다 우선이다." },
    { id: 35, category: "소속 영향력", optionA: "조용히 내 역할을 수행하며 팀을 지원한다.", optionB: "활발하게 의견을 제안하며 팀의 분위기를 이끈다." },
    { id: 36, category: "소속 영향력", optionA: "갈등이 생기면 제3자의 중재를 기다린다.", optionB: "갈등의 당사자와 직접 대화하여 문제를 매듭짓는다." },
    { id: 37, category: "소속 영향력", optionA: "전문 지식을 공유하여 동료의 성장을 돕는다.", optionB: "실무적인 지원을 통해 동료의 업무 부하를 줄여준다." },
    { id: 38, category: "소속 영향력", optionA: "결과에 대해 개인별로 보상받는 것이 공정하다.", optionB: "팀 전체의 성과로 공동 보상을 받는 것이 바람직하다." },
    { id: 39, category: "소속 영향력", optionA: "회의 시 주로 경청하며 정보를 수집한다.", optionB: "회의 시 주도적으로 논의의 방향을 설정한다." },
    { id: 40, category: "소속 영향력", optionA: "내가 가진 노하우는 나만의 경쟁력이다.", optionB: "내가 가진 노하우는 팀의 공동 자산이다." },
    { id: 41, category: "의사소통", optionA: "명확하고 간결하게 핵심만 전달한다.", optionB: "상대방의 감정을 배려하며 부드럽게 전달한다." },
    { id: 42, category: "의사소통", optionA: "내 주장의 논리적 타당성을 입증하는 게 중요하다.", optionB: "상대방의 의견에서 공통분모를 찾아내는 게 중요하다." },
    { id: 43, category: "의사소통", optionA: "글로 써서 문서로 소통하는 것이 편하다.", optionB: "직접 만나서 대화로 소통하는 것이 편하다." },
    { id: 44, category: "의사소통", optionA: "상대방이 틀렸을 때는 즉시 바로잡아준다.", optionB: "상대방의 말이 끝날 때까지 충분히 경청한다." },
    { id: 45, category: "의사소통", optionA: "격식과 예의를 갖춘 비즈니스 매너를 중시한다.", optionB: "격의 없고 솔직한 소통 방식을 중시한다." },
    { id: 46, category: "의사소통", optionA: "부정적인 피드백도 가감 없이 전달한다.", optionB: "상대방이 상처받지 않게 완곡하게 표현한다." },
    { id: 47, category: "의사소통", optionA: "복잡한 개념을 쉬운 용어로 설명하는 데 능숙하다.", optionB: "전문 용어를 사용하여 정확하게 정보를 전달한다." },
    { id: 48, category: "의사소통", optionA: "회의 중 침묵이 흐르면 먼저 말을 꺼낸다.", optionB: "충분히 생각할 시간이 필요하므로 기다리는 편이다." },
    { id: 49, category: "의사소통", optionA: "유머와 위트로 분위기를 화기애애하게 만든다.", optionB: "진지하고 진솔한 태도로 신뢰감을 형성한다." },
    { id: 50, category: "의사소통", optionA: "메신저나 이메일을 수시로 확인하고 답장한다.", optionB: "업무 몰입을 위해 특정 시간에 몰아서 답장한다." },
    { id: 51, category: "조직문화", optionA: "개인의 자율성이 극대화된 문화를 선호한다.", optionB: "체계와 질서가 명확히 잡힌 문화를 선호한다." },
    { id: 52, category: "조직문화", optionA: "성과에 따라 차등 대우받는 것이 당연하다.", optionB: "구성원 모두가 화합하고 함께 가는 것이 중요하다." },
    { id: 53, category: "조직문화", optionA: "변화와 혁신이 일상이 되는 역동성을 즐긴다.", optionB: "안정과 전통이 유지되는 예측 가능성을 즐긴다." },
    { id: 54, category: "조직문화", optionA: "회사의 비전보다 나의 성장이 우선이다.", optionB: "회사의 성장이 곧 나의 성장이라고 믿는다." },
    { id: 55, category: "조직문화", optionA: "수평적인 호칭과 문화를 지지한다.", optionB: "역할과 책임에 따른 위계 문화를 존중한다." },
    { id: 56, category: "조직문화", optionA: "공과 사를 명확히 구분하여 행동한다.", optionB: "동료와 인간적인 유대감을 형성하려 노력한다." },
    { id: 57, category: "조직문화", optionA: "결과가 좋다면 과정상의 작은 실수는 이해된다.", optionB: "과정이 윤리적이고 투명해야 결과도 의미가 있다." },
    { id: 58, category: "조직문화", optionA: "업무 외적인 사교 활동(회식 등)은 피하고 싶다.", optionB: "사교 활동도 조직 생활의 중요한 일부라고 생각한다." },
    { id: 59, category: "조직문화", optionA: "규정은 상황에 따라 유연하게 적용할 수 있다.", optionB: "규정은 예외 없이 엄격하게 준수해야 한다." },
    { id: 60, category: "조직문화", optionA: "경쟁을 통해 서로 자극받는 문화가 좋다.", optionB: "서로 지지하고 응원하는 따뜻한 문화가 좋다." }
];

let currentIdx = 0;
let userAnswers = {};

// 3. 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    renderQuestion();
    updateProgressBar();
});

// 4. 문항 그리기
function renderQuestion() {
    const q = allQuestions[currentIdx];
    const container = document.getElementById('question-container');

    // 이전에 선택한 답이 있는지 확인
    const saved = userAnswers[q.id];

    container.innerHTML = `
        <div class="question-card">
            <div class="q-header">문항 ${currentIdx + 1} / 60</div>
            <div class="options">
                <button class="option-btn ${saved === 'A' ? 'selected' : ''}" onclick="selectOption('A')">${q.optionA}</button>
                <button class="option-btn ${saved === 'B' ? 'selected' : ''}" onclick="selectOption('B')">${q.optionB}</button>
            </div>
            <div class="nav-btns">
                ${currentIdx > 0 ? `<button class="prev-btn" onclick="goPrev()">이전으로</button>` : ''}
            </div>
        </div>
    `;
}

// 5. 답변 선택 시
window.selectOption = function (val) {
    const q = allQuestions[currentIdx];
    userAnswers[q.id] = val; // 답변 저장

    if (currentIdx < allQuestions.length - 1) {
        currentIdx++;
        renderQuestion();
        updateProgressBar();
    } else {
        if (confirm("모든 문항에 답변하셨습니다. 제출하시겠습니까?")) {
            submitFinal();
        }
    }
}

// 6. 이전으로
window.goPrev = function () {
    if (currentIdx > 0) {
        currentIdx--;
        renderQuestion();
        updateProgressBar();
    }
}

// 7. 진행바 업데이트
function updateProgressBar() {
    const progress = ((currentIdx + 1) / 60) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
}

// 8. 최종 제출 (타이머 포함)
async function submitFinal() {
    const user = JSON.parse(localStorage.getItem('gnFit_user'));
    const startTime = parseInt(localStorage.getItem('gnFit_startTime'));
    const totalTime = Math.floor((Date.now() - startTime) / 1000);

    const payload = { ...user, ...userAnswers, totalTime };

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            localStorage.setItem('survey_completed', 'true');
            alert('제출 완료되었습니다.');
            window.location.href = 'index.html';
        }
    } catch (e) {
        alert('전송 오류가 발생했습니다.');
    }
}