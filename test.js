// script.js - Final Full Version (No Omissions)
// 1. Data Key Mapping: 성명, 휴대폰번호, 생년월일, 정보동의여부 (Sheet Header Match)
// 2. Submit Button UI: Page 12 Only
// 3. Question Data: Q1~Q100 (Full 100 Questions included)

const scriptURL = "https://script.google.com/macros/s/AKfycbxfByKA4Cch3bbWJ3MwHPwjvuORpVVnPgYmuPR3wzXSi5ZPa2gO4AY3Hg0RMTVI1Ik/exec";

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

// [DATA] (Full 100 Questions)
const allQuestions = [
    { id: 1, type: 'AB', category: "주도적 능력", optionA: "가이드라인을 완벽히 숙달하는 것이 우선이다.", optionB: "효율을 높일 새로운 방법을 찾는 것이 우선이다." },
    { id: 2, type: 'AB', category: "주도적 능력", optionA: "업무의 정확한 범위를 확인한 뒤 실행한다.", optionB: "필요한 일을 스스로 판단하여 먼저 시작한다." },
    { id: 3, type: 'AB', category: "주도적 능력", optionA: "검증된 안전한 업무 방식을 더 선호한다.", optionB: "새로운 시도를 통해 배울 점을 찾는 것을 즐긴다." },
    { id: 4, type: 'AB', category: "주도적 능력", optionA: "정해진 역할 범위를 충실히 지키는 것을 중시한다.", optionB: "필요하다면 역할 밖의 일이라도 팀을 위해 나선다." },
    { id: 5, type: 'AB', category: "주도적 능력", optionA: "결정된 사항을 경청하고 기록하는 역할을 선호한다.", optionB: "논의 과정에서 내 아이디어를 적극적으로 제안한다." },
    { id: 6, type: 'AB', category: "주도적 능력", optionA: "체계가 잘 잡힌 안정적인 환경에서 능률이 높다.", optionB: "직접 체계를 만들어가야 하는 환경에서 활력이 생긴다." },
    { id: 7, type: 'AB', category: "주도적 능력", optionA: "질문을 통해 명확한 답을 확인하고 일을 시작한다.", optionB: "스스로 자료를 찾아보고 대안을 먼저 만든다." },
    { id: 8, type: 'AB', category: "주도적 능력", optionA: "주어진 과업을 오차 없이 수행할 때 보람을 느낀다.", optionB: "스스로 설정한 목표를 달성했을 때 성취감이 크다." },
    { id: 9, type: 'AB', category: "주도적 능력", optionA: "조직의 전통적인 방식을 존중하며 따르는 편이다.", optionB: "비효율적인 관행은 개선을 제안하려 노력한다." },
    { id: 10, type: 'AB', category: "주도적 능력", optionA: "근무 시간 내에 몰입하여 주어진 일을 끝낸다.", optionB: "업무 외 시간에도 개인의 성장을 위해 고민한다." },
    { id: 11, type: 'AB', category: "문제 해결", optionA: "과거 사례를 참고하여 실수를 줄이는 데 집중한다.", optionB: "기존 방식에 의문을 갖고 원인을 다시 분석한다." },
    { id: 12, type: 'AB', category: "문제 해결", optionA: "실무적인 경험과 직관을 더 신뢰한다.", optionB: "객관적인 수치와 데이터를 더 신뢰한다." },
    { id: 13, type: 'AB', category: "문제 해결", optionA: "실행하며 발생하는 문제를 유연하게 해결한다.", optionB: "실행 전 발생 가능한 모든 변수를 사전에 점검한다." },
    { id: 14, type: 'AB', category: "문제 해결", optionA: "한 가지 확실한 해결책을 빠르게 정하는 편이다.", optionB: "여러 대안의 장단점을 면밀히 비교하여 결정한다." },
    { id: 15, type: 'AB', category: "문제 해결", optionA: "복잡한 문제는 상사에게 조언을 구하는 것이 낫다.", optionB: "복잡한 문제는 스스로 쪼개어 논리적 구조를 만든다." },
    { id: 16, type: 'AB', category: "문제 해결", optionA: "세부적인 디테일과 오류를 잡아내는 데 강하다.", optionB: "전체적인 흐름과 본질을 짚어내는 데 강하다." },
    { id: 17, type: 'AB', category: "문제 해결", optionA: "익숙한 도구를 활용해 효율적으로 결과를 낸다.", optionB: "문제에 맞는 새로운 기술이나 도구 도입을 시도한다." },
    { id: 18, type: 'AB', category: "문제 해결", optionA: "갈등 발생 시 원만한 합의점을 찾는 데 집중한다.", optionB: "재발 방지를 위해 갈등 원인을 분석하는 데 집중한다." },
    { id: 19, type: 'AB', category: "문제 해결", optionA: "누구나 이해할 수 있는 보편적인 방식으로 해결한다.", optionB: "고정관념을 깨는 독특하고 창의적인 방식으로 접근한다." },
    { id: 20, type: 'AB', category: "문제 해결", optionA: "눈앞의 문제를 빠르게 처리하는 것을 우선시한다.", optionB: "시간이 걸려도 근본적인 시스템 개선을 우선시한다." },
    { id: 21, type: 'AB', category: "목표 달성", optionA: "달성 가능성이 높은 안정적인 목표를 세운다.", optionB: "실패 위험이 있더라도 도전적인 목표를 세운다." },
    { id: 22, type: 'AB', category: "목표 달성", optionA: "주변과 조화를 이루는 적정한 성과를 유지한다.", optionB: "남들보다 앞서는 압도적인 성과를 위해 몰입한다." },
    { id: 23, type: 'AB', category: "목표 달성", optionA: "과정에서의 배움이 좋았다면 만족하는 편이다.", optionB: "약속된 결과를 내지 못하면 큰 아쉬움을 느낀다." },
    { id: 24, type: 'AB', category: "목표 달성", optionA: "부여된 업무 지표를 충실히 달성하는 데 집중한다.", optionB: "스스로 정한 높은 기준에 도달하려 노력한다." },
    { id: 25, type: 'AB', category: "목표 달성", optionA: "상황 변화에 따라 목표 수치를 유연하게 조정한다.", optionB: "상황이 변해도 처음 세운 목표를 끝까지 지켜낸다." },
    { id: 26, type: 'AB', category: "목표 달성", optionA: "여러 업무를 동시에 무난하게 처리하는 것을 선호한다.", optionB: "한 가지 목표가 정해지면 끝을 볼 때까지 파고든다." },
    { id: 27, type: 'AB', category: "목표 달성", optionA: "마감 직전까지 꼼꼼하게 검토하여 완성도를 높인다.", optionB: "마감보다 일찍 업무를 끝내어 처리 속도를 증명한다." },
    { id: 28, type: 'AB', category: "목표 달성", optionA: "외부의 인정과 보상이 있을 때 더 힘이 난다.", optionB: "목표 달성 그 자체의 성취감에서 더 큰 힘을 얻는다." },
    { id: 29, type: 'AB', category: "목표 달성", optionA: "어려운 과제는 팀원들과 나누어 부담을 덜고 싶다.", optionB: "어려운 과제일수록 내 역량을 시험할 기회로 여긴다." },
    { id: 30, type: 'AB', category: "목표 달성", optionA: "에너지를 적절히 안배하여 지치지 않게 일한다.", optionB: "목표 달성을 위해 개인적인 에너지를 기꺼이 쓴다." },
    { id: 31, type: 'AB', category: "소속 영향력", optionA: "내 업무를 완벽히 해내어 팀에 기여하는 편이다.", optionB: "내 일이 바쁘더라도 동료를 돕는 일을 우선한다." },
    { id: 32, type: 'AB', category: "소속 영향력", optionA: "전문성이 뛰어난 동료로 인정받고 싶다.", optionB: "팀 내 유대감이 강하고 소통이 잘 되는 동료가 되고 싶다." },
    { id: 33, type: 'AB', category: "소속 영향력", optionA: "팀의 화합을 위해 내 주장을 굽히는 경우가 많다.", optionB: "팀의 성장을 위해 불편한 반대 의견도 솔직히 낸다." },
    { id: 34, type: 'AB', category: "소속 영향력", optionA: "구성원이 화합하며 함께 성장하는 것이 공정하다.", optionB: "개별 성과에 따라 명확히 차등 보상받는 게 공정하다." },
    { id: 35, type: 'AB', category: "소속 영향력", optionA: "주로 뒤에서 묵묵하게 팀을 지원하는 편이다.", optionB: "대체로 앞장서서 팀원들에게 활력을 주는 편이다." },
    { id: 36, type: 'AB', category: "소속 영향력", optionA: "업무 노하우를 나만의 경쟁력으로 관리한다.", optionB: "업무 노하우를 팀 전체와 적극적으로 공유한다." },
    { id: 37, type: 'AB', category: "소속 영향력", optionA: "공동 목표를 위해 협업할 때 더 큰 의욕이 생긴다.", optionB: "개인 기여도가 명확히 드러날 때 의욕이 생긴다." },
    { id: 38, type: 'AB', category: "소속 영향력", optionA: "갈등 시 감정이 상하지 않게 거리를 두는 편이다.", optionB: "갈등 당사자와 대면하여 오해를 풀려 노력한다." },
    { id: 39, type: 'AB', category: "소속 영향력", optionA: "결정된 방향에 힘을 실어주는 역할을 선호한다.", optionB: "다양한 관점을 제시하여 논의를 확장하는 역할을 선호한다." },
    { id: 40, type: 'AB', category: "소속 영향력", optionA: "실력이 뛰어난 동료와 일하고 싶다.", optionB: "인간미가 있고 배려심 깊은 동료와 일하고 싶다." },
    { id: 41, type: 'AB', category: "의사소통", optionA: "보고 시 결론부터 명확하고 짧게 말한다.", optionB: "상대가 이해할 수 있게 상세한 배경부터 설명한다." },
    { id: 42, type: 'AB', category: "의사소통", optionA: "상대방 주장의 논리적 오류를 잘 찾아내는 편이다.", optionB: "상대방의 말에 공감하며 의도를 먼저 파악하려 한다." },
    { id: 43, type: 'AB', category: "의사소통", optionA: "메시지나 메일 등 기록이 남는 소통을 선호한다.", optionB: "직접 만나서 대화하며 분위기를 파악하는 게 편하다." },
    { id: 44, type: 'AB', category: "의사소통", optionA: "잘못된 점은 오해 없게 그 자리에서 바로 말한다.", optionB: "상대의 기분을 고려해 나중에 따로 조심스레 말한다." },
    { id: 45, type: 'AB', category: "의사소통", optionA: "내 생각을 논리적으로 설득하는 데 주력한다.", optionB: "각자의 의견을 경청하고 하나로 정리하는 데 주력한다." },
    { id: 46, type: 'AB', category: "의사소통", optionA: "격식을 갖춘 정중한 언어를 사용하는 게 중요하다.", optionB: "솔직하고 편안한 언어를 사용하는 게 중요하다." },
    { id: 47, type: 'AB', category: "의사소통", optionA: "정확한 정보 전달을 위해 전문 용어를 사용한다.", optionB: "상대가 이해하기 쉽게 쉬운 용어로 풀어서 말한다." },
    { id: 48, type: 'AB', category: "의사소통", optionA: "조용한 회의에서 먼저 대화를 이끌며 분위기를 푼다.", optionB: "다른 사람들의 의견이 나올 때까지 차분히 기다린다." },
    { id: 49, type: 'AB', category: "의사소통", optionA: "비판적인 피드백도 성장을 위한 자극으로 여긴다.", optionB: "피드백 내용이 합리적인지 스스로 면밀히 판단한다." },
    { id: 50, type: 'AB', category: "의사소통", optionA: "진중한 말투로 업무적 신뢰를 주는 것을 중시한다.", optionB: "밝은 에너지와 웃음으로 호감을 얻는 것을 중시한다." },
    { id: 51, type: 'AB', category: "조직문화", optionA: "규정과 원칙을 엄격하게 준수하는 문화가 편하다.", optionB: "상황에 따라 유연하게 원칙을 적용하는 문화가 편하다." },
    { id: 52, type: 'AB', category: "조직문화", optionA: "근무 시간과 개인의 삶을 명확히 구분하고 싶다.", optionB: "업무와 일상이 자연스럽게 연결되는 것을 선호한다." },
    { id: 53, type: 'AB', category: "조직문화", optionA: "회사의 전통과 가치를 소중히 지키는 게 중요하다.", optionB: "시대 변화에 맞춰 조직의 정체성을 계속 혁신해야 한다." },
    { id: 54, type: 'AB', category: "조직문화", optionA: "사생활을 존중하며 적절한 거리를 유지하고 싶다.", optionB: "동료와 인간적인 유대감을 끈끈하게 쌓고 싶다." },
    { id: 55, type: 'AB', category: "조직문화", optionA: "직급이 명확하여 역할 분담이 확실한 곳이 좋다.", optionB: "직급에 상관없이 수평적으로 소통하는 곳이 좋다." },
    { id: 56, type: 'AB', category: "조직문화", optionA: "결과가 좋다면 과정상의 작은 실수는 이해될 수 있다.", optionB: "과정이 투명하고 정직하지 않다면 결과도 가치가 없다." },
    { id: 57, type: 'AB', category: "조직문화", optionA: "경쟁을 통해 서로 자극받는 분위기에서 성장한다.", optionB: "서로 돕고 응원하며 안정을 느끼는 분위기에서 성장한다." },
    { id: 58, type: 'AB', category: "조직문화", optionA: "체계와 규율이 있는 안정적인 조직이 신뢰가 간다.", optionB: "자율성을 존중하는 수평적인 조직이 신뢰가 간다." },
    { id: 59, type: 'AB', category: "조직문화", optionA: "공식적인 회의와 보고를 통해 일하는 게 좋다.", optionB: "수시로 자유롭게 대화하며 가볍게 의견을 나누는 게 좋다." },
    { id: 60, type: 'AB', category: "조직문화", optionA: "선배들의 노하우를 먼저 배우는 데 집중한다.", optionB: "신입의 새로운 시각으로 조직에 변화를 준다." },
    { id: 61, type: 'AB', category: "주도적 능력", optionA: "매뉴얼대로 정확하게 일할 때 안심이 된다.", optionB: "나만의 새로운 방식을 시도할 때 활력이 생긴다." },
    { id: 62, type: 'AB', category: "주도적 능력", optionA: "확실히 검증된 길을 가는 것이 효율적이다.", optionB: "다소 위험하더라도 가보지 않은 길에 도전하고 싶다." },
    { id: 63, type: 'AB', category: "문제 해결", optionA: "나의 풍부한 경험과 감을 믿고 판단하는 편이다.", optionB: "명확한 근거 자료와 통계 수치를 믿고 판단한다." },
    { id: 64, type: 'AB', category: "문제 해결", optionA: "당사자들이 합의할 수 있는 지점을 찾는 게 급선무다.", optionB: "갈등 원인을 파악하여 재발을 막는 게 급선무다." },
    { id: 65, type: 'AB', category: "목표 달성", optionA: "결과가 조금 미흡해도 과정이 좋았다면 만족한다.", optionB: "어떤 과정이었든 간에 최종 결과로 가치를 증명한다." },
    { id: 66, type: 'AB', category: "목표 달성", optionA: "상황에 따라 목표치는 현실적으로 조정될 수 있다.", optionB: "한 번 정한 목표치는 어떤 경우에도 달성해야 한다." },
    { id: 67, type: 'AB', category: "소속 영향력", optionA: "내게 맡겨진 임무를 완벽히 끝내는 데 몰입한다.", optionB: "동료의 업무가 막혀 있다면 내 일을 미루고라도 돕는다." },
    { id: 68, type: 'AB', category: "소속 영향력", optionA: "팀원들에게 업무적으로 신뢰받는 전문가가 되고 싶다.", optionB: "팀원들이 언제든 편하게 다가올 수 있는 동료가 되고 싶다." },
    { id: 69, type: 'AB', category: "의사소통", optionA: "상대방의 논리가 타당한지 분석하며 듣는 편이다.", optionB: "상대방의 기분과 말하는 의도를 파악하며 듣는 편이다." },
    { id: 70, type: 'AB', category: "의사소통", optionA: "효율을 위해 결론부터 짧고 명확하게 말하는 게 좋다.", optionB: "오해를 방지하기 위해 전후 상황을 상세히 설명하는 게 좋다." },
    { id: 71, type: 'AB', category: "조직문화", optionA: "가이드라인이 정교하게 짜인 조직이 효율적이다.", optionB: "상황에 맞게 유연하게 대처할 수 있는 조직이 효율적이다." },
    { id: 72, type: 'AB', category: "조직문화", optionA: "직급에 따른 위계와 질서가 명확한 곳이 편하다.", optionB: "직급에 상관없이 누구나 자유롭게 의견을 내는 곳이 편하다." },
    { id: 73, type: 'AB', category: "조직문화", optionA: "기존의 업무 방식과 조직의 문법을 먼저 익힌다.", optionB: "기존 방식에 얽매이지 않고 새로운 관점을 제시한다." },
    { id: 74, type: 'AB', category: "주도적 능력", optionA: "주어진 과업의 범위 내에서 최선을 다한다.", optionB: "스스로 과업을 정의하고 업무 범위를 확장한다." },
    { id: 75, type: 'AB', category: "문제 해결", optionA: "실행 속도보다 발생 가능한 리스크를 줄이는 게 더 중요하다.", optionB: "리스크를 감수하더라도 빠른 실행으로 답을 찾는 게 더 중요하다." },
    { id: 76, type: 'AB', category: "목표 달성", optionA: "주변과 보조를 맞추며 무난한 성과를 유지한다.", optionB: "남들이 포기할 때도 끝까지 몰입하여 압도적인 결과를 낸다." },
    { id: 77, type: 'AB', category: "소속 영향력", optionA: "팀의 원만한 인간관계를 유지하는 것을 우선한다.", optionB: "팀의 목표 달성과 객관적인 업무 피드백을 우선한다." },
    { id: 78, type: 'AB', category: "의사소통", optionA: "상대방이 거부감을 느끼지 않도록 부드럽게 설득한다.", optionB: "정확한 사실과 논리를 바탕으로 단도직입적으로 설득한다." },
    { id: 79, type: 'AB', category: "조직문화", optionA: "사전에 약속된 체계와 일관성이 있는 조직이 편하다.", optionB: "변화에 기민하고 자율성이 보장되는 조직이 편하다." },
    { id: 80, type: 'AB', category: "공통 신뢰도", optionA: "나는 업무를 할 때 가끔 실수를 하기도 한다.", optionB: "나는 어떤 상황에서도 절대 실수를 하지 않는다." },
    { id: 81, type: 'BW', category: "주도적 능력", scenario: "희망편지쓰기대회 협조를 위해 학교를 방문했습니다. 선생님은 \"작년에 보니 아이들이 편지 쓰는 걸 숙제로 느끼고 힘들어하더라. 올해는 진도도 밀려 있어서 참여가 어렵다\"며 난처해합니다.", options: ["1. 학교의 교육 일정을 존중하여 참여는 무리하게 추진하지 않고, 내년도 학기 초에 우선순위로 방문한다.", "2. 숙제 방식 대신, 학교 조회 시간 등을 활용해 5분 영상 시청만으로 참여하는 '초단기 방식'을 제안한다.", "3. 이 대회가 아이들에게 '세계 시민 의식'을 심어주는 필수 교육 과정임을 강조하며, 교육 자료의 가치를 설득한다.", "4. 인근의 다른 학교들이 대부분 참여하기로 했다는 점을 공유하며, 우리 학교만 빠질 경우의 소외감을 자극한다."] },
    { id: 82, type: 'BW', category: "문제 해결", scenario: "선물금 전달 사진 속 아동의 표정이 너무 굳어 있습니다. 후원자가 \"아동이 선물을 기뻐하지 않는 것 같다\"고 오해할까 봐 걱정되는데, 현지 지부에서는 \"아동이 낯을 많이 가리는 성격이라 최선을 다해 찍은 것\"이라고 합니다.", options: ["1. 후원자의 만족도가 중요하므로, 현지 지부에 아동이 조금이라도 웃는 모습이 나올 때까지 재촬영을 정중히 요청한다.", "2. 사진은 그대로 두되, 아동의 내성적인 성격과 선물에 대해 감사해했던 현지 직원의 코멘트를 보고서에 상세히 담는다.", "3. 사진보다는 선물금으로 구매한 물품의 영수증과 시장에서 물건을 고르는 과정 등 '투명한 집행 과정'을 보여준다.", "4. 후원자가 실망하지 않도록, 이번 사진은 작게 넣고 아동이 예전에 보냈던 밝은 표정의 사진들을 모아 보완한다."] },
    { id: 83, type: 'BW', category: "목표 달성", scenario: "연말 캠페인 종료가 일주일 남았는데 목표액의 20%가 부족합니다. 팀원들은 거리 홍보로 체력이 바닥났고, \"올해는 경기가 안 좋으니 이 정도면 최선을 다했다\"는 분위기가 지배적입니다.", options: ["1. 팀원들의 건강과 사기가 우선이므로, 현재 성과를 격려하며 남은 기간은 무리한 활동보다 안정적인 마무리에 집중한다.", "2. 지친 팀원들을 독려하여 유동 인구가 가장 많은 시간대에 홍보 화력을 집중하는 단기 총력전을 제안해 끝까지 도전한다.", "3. 현재 모금 수치를 데이터로 분석하여, 반응이 가장 좋았던 타겟군이나 후원 채널에 남은 광고 예산을 전면 재배치한다.", "4. 목표 미달 시 우리 지부의 내년도 사업비가 줄어들 수 있다는 현실적인 위기감을 공유하며 팀원들을 강하게 압박한다."] },
    { id: 84, type: 'BW', category: "소속 영향력", scenario: "사수 간사가 후원자 개인정보 파기 절차가 너무 번거롭다며 \"일단 이 상자에 모아뒀다가 나중에 한꺼번에 처리하자\"고 합니다. 동료들도 바쁜 일정을 이유로 동조하는 분위기이며, 당신에게도 서류 정리를 도와달라고 합니다.", options: ["1. 팀의 협력적인 분위기와 사수와의 관계를 고려하여, 이번 건만 선배의 방식대로 돕고 나중에 원칙 준수를 건의한다.", "2. \"개인정보 사고는 단체의 신뢰를 무너뜨린다\"는 점을 상기시키며, 정해진 절차대로 즉시 파쇄기에 넣자고 설득한다.", "3. 팀 내 갈등을 피하기 위해 내 분량의 서류만 정석대로 파쇄하고, 선배나 동료들이 하는 방식에는 가급적 관여하지 않는다.", "4. 팀원 모두가 절차를 지키기 힘든 상황임을 이해하므로, 팀 회의 시 '개인정보 관리 프로세스 자동화' 등 개선안을 제안한다."] },
    { id: 85, type: 'BW', category: "의사소통", scenario: "지역 협력 기관장이 공개적인 자리에서 \"굿네이버스는 행정이 너무 까다로워서 같이 일하기 지친다\"며 불만을 표합니다. 주변 파트너 기관 관계자들이 고개를 끄덕이며 당신의 반응을 살피고 있는 곤란한 상황입니다.", options: ["1. 단체의 투명성 지표와 행정 원칙을 설명하며, 왜 이 절차가 파트너 기관의 안전을 위해서도 필수적인지 논리적으로 설득한다.", "2. 현장에서는 일단 사과하며 기관장의 체면을 세워주고, 회의 후 따로 찾아가 행정 부담을 줄여줄 지원책을 의논한다.", "3. 행정적 불편함을 상쇄할 수 있는 굿네이버스만의 독보적인 교육 콘텐츠나 홍보 지원책을 역제안해 실질적 이득을 강조한다.", "4. 기관장의 발언이 단체의 대외 이미지에 타격을 줄 수 있으므로, 상급자에게 보고하고 공식적인 유감 표명을 검토한다."] },
    { id: 86, type: 'BW', category: "조직문화", scenario: "지부의 오랜 전통인 '월요 모닝 회의'가 최근 업무량 증가로 시간 낭비라는 의견이 많습니다. 하지만 지부장님은 이 회의가 지부의 정체성과 결속을 다지는 가장 소중한 시간이라고 생각하며 자부심을 느끼십니다.", options: ["1. 지부장님의 철학을 존중하여 회의에 적극 참여하고, 현장의 감동 사례들을 공유해 회의가 '에너지 충전'의 시간이 되게 한다.", "2. 대면 보고 시간은 최소화하고 협업 도구로 사전 공유를 마친 뒤, 회의 때는 '핵심 결정'에만 집중하는 방식을 건의한다.", "3. 동료들과 함께 현재 업무량과 회의 소요 시간 데이터를 정리하여, 지부장님께 회의 주기를 변경해달라고 솔직히 건의한다.", "4. 회의 형식은 유지하되, 한 달에 한 번은 '현장 방문'이나 '티타임'으로 대체하여 전통을 지키면서도 활력을 주는 안을 제안한다."] },
    { id: 87, type: 'BW', category: "문제 해결", scenario: "해외 아동 성장 보고서 작성 중, 특정 지역 아동들의 수치가 작년과 너무 동일한 것을 발견했습니다. 동료들은 \"현지가 워낙 열악하니 이해하자\"며 넘어가려 하지만, 당신은 이것이 후원자에게 허위 정보를 주는 것이 될까 봐 불안합니다.", options: ["1. 현지 지부의 물리적 한계를 인정하고, 이번 보고서는 작년 데이터를 바탕으로 보내되 향후 관리 강화를 요청한다.", "2. \"데이터는 후원자와의 약속\"임을 강조하며, 시간이 걸리더라도 현지에 정확한 최신 수치를 다시 확인해 달라고 요청한다.", "3. 왜 반복된 데이터가 발생하는지 현지 시스템의 문제를 파악하고, 사진이나 편지 등 대체 수단으로 아동의 변화를 증명한다.", "4. 후원자가 중복을 눈치채지 못하도록 보고서 양식을 화려하게 바꾸고, 수치보다는 감성적인 스토리텔링 위주로 재구성한다."] },
    { id: 88, type: 'BW', category: "주도적 능력", scenario: "지부의 중요한 고액 후원자 행사 날, 갑작스러운 폭설로 초청 명사가 불참을 통보했습니다. 후원자들은 이미 도착하고 있는데, 프로그램에 큰 구멍이 생겨 행사가 엉망이 될 위기입니다.", options: ["1. 안전 사고 예방을 위해 행사를 즉시 취소하고, 후원자들에게 사과한 뒤 준비한 기념품을 챙겨드려 안전한 귀가를 돕는다.", "2. 명사 강연 대신, 지부 간사들이 직접 겪은 현장의 생생한 감동 사례 발표로 프로그램을 긴급 교체해 진정성을 보여준다.", "3. 참석한 후원자들을 소그룹으로 나누어 지부장 및 선임 간사들과 깊이 있는 대화를 나눌 수 있는 '간담회'로 형식을 바꾼다.", "4. 명사의 과거 강연 영상을 틀어 시간을 벌고, 대신 후원 아동들의 감사 영상 상영이나 경품 이벤트를 늘려 분위기를 띄운다."] },
    { id: 89, type: 'BW', category: "의사소통", scenario: "중요한 고액 후원자가 규정상 금지된 '아동과의 개별 연락'을 끈질기게 요구합니다. 거절할 경우 후원 중단은 물론 지역사회 내 평판에도 타격이 클 것으로 예상되어 매우 난처한 상황입니다.", options: ["1. 후원자의 기여도를 고려하여, 이번 한 번만 예외를 인정하고 지부의 참관하에 서신을 직접 주고받게 돕는다.", "2. 원칙상 불가능함을 안내하되, 후원자의 열정을 존중해 아동의 영상 메시지나 직접 만든 선물을 추가로 전달해 만족감을 높인다.", "3. \"아동 권리 보호\"라는 핵심 가치가 왜 후원자의 후원을 더 가치 있게 만드는지 설명하며, 원칙 준수가 곧 아동 보호임을 설득한다.", "4. 직접적인 거절은 관계를 망칠 수 있으므로 답변을 최대한 늦추며 상급자에게 판단을 요청하고, 다른 사업으로 관심을 돌린다."] },
    { id: 90, type: 'BW', category: "목표 달성", scenario: "홍보 문구를 작성했는데, 사수가 \"너무 자극적인 표현이다. 우리 단체는 아동의 존엄성을 우선해야 한다\"며 수정을 요구합니다. 하지만 당신은 그렇게 써야만 모금 클릭률이 높아질 것을 확신합니다.", options: ["1. 지부의 모금 실적이 시급하므로, 일단 자극적인 표현을 유지하여 성과를 낸 뒤 그 데이터로 나중에 사수를 설득한다.", "2. 사수의 조언에 따라 자극적인 표현을 모두 삭제하고, 아동의 밝고 주체적인 변화 가능성에만 초점을 맞춘 카피로 수정한다.", "3. 자극적인 묘사 대신 '문제의 심각성'을 데이터로 보여주고, '변화의 희망'을 감성적으로 터치하는 절충안을 만들어 제안한다.", "4. 사수의 의견을 따르되, 모금액 감소가 예상되므로 이를 보완하기 위해 오프라인 홍보 등 다른 활동에 더 많은 에너지를 쏟는다."] },
    { id: 91, type: 'BW', category: "문제 해결", scenario: "가정 방문 사례 관리 중, 지원 기준에는 미세하게 미달하지만 실제 생활고가 매우 심각한 위기 가정을 발견했습니다. 동료는 \"원칙을 어기면 형평성 문제가 생긴다\"며 지원이 어렵다고 말합니다.", options: ["1. 형평성 원칙이 중요하므로 규정대로 지원 불가 결정을 내리고, 대신 지역 내 다른 복지 자원을 연결해 주는 데 집중한다.", "2. 해당 가정의 특수성을 상세히 기록하여 지부 사례 회의에 상정하고, 예외적 지원이나 민간 자원 연계가 가능한지 적극 건의한다.", "3. 이번 건은 예외로 처리하여 긴급 지원을 실시하고, 사후에 팀장님께 보고하여 상황의 시급성을 인정받으려 노력한다.", "4. 지원 기준을 조금 완만하게 해석하여 보고서를 작성함으로써, 실질적인 도움을 줄 수 있는 행정적 근거를 스스로 마련한다."] },
    { id: 92, type: 'BW', category: "주도적 능력", scenario: "캠페인 정산 과정에서 50원의 회계 오차가 발견되었습니다. 담당 사수는 \"금액이 너무 소액이라 원인 찾기에 시간이 더 걸리니 내 개인 돈으로 메우고 넘어가자\"고 제안합니다.", options: ["1. 팀의 업무 시간을 아끼기 위한 사수의 제안을 수용하고, 대신 다음 정산부터는 오차가 없도록 더 꼼꼼히 검토한다.", "2. \"단 1원의 오차도 후원자와의 신뢰 문제\"임을 강조하며, 퇴근이 늦어지더라도 끝까지 영수증을 대조해 원인을 밝혀낸다.", "3. 사수의 제안은 거절하되, 일단 해당 금액을 '잡손실' 처리하고 다음 회의 때 정산 프로세스 개선안을 안건으로 올린다.", "4. 사수와 갈등을 빚기보다는 일단 제안을 따르고, 나중에 회계 감사 시 문제가 될 수 있음을 조심스럽게 언급하며 주의를 환기한다."] },
    { id: 93, type: 'BW', category: "소속 영향력", scenario: "큰 규모의 지역사회 행사를 앞두고 동료 간사가 업무 과부하로 사소한 실수를 반복합니다. 나에게도 그 영향이 오고 있지만, 동료는 자존심 때문에 도움을 요청하지 않고 혼자 끙끙대고 있습니다.", options: ["1. 동료가 무능해 보일 수 있으므로 말없이 동료의 일을 가져와 대신 처리해주고 동료에게는 비밀로 한다.", "2. 팀장님께 현재 상황을 보고하여 업무 분장을 공식적으로 조정함으로써 팀 전체의 리스크를 방지한다.", "3. 동료에게 업무 우선순위를 정해주는 '체크리스트'를 만들어주고, 내가 도울 부분과 동료가 끝낼 부분을 명확히 나눈다.", "4. 내 업무 마감이 더 급하므로 동료의 실수로 내 일에 차질이 생기지 않도록 내 업무 경계선만 철저히 관리한다."] },
    { id: 94, type: 'BW', category: " 의사소통", scenario: "거리 모금 중 한 시민이 \"왜 우리 나라 아이들은 안 돕고 해외 아동만 돕느냐\"며 날카로운 질문을 던집니다. 주변에 다른 시민들도 이 대화를 유심히 듣고 있습니다.", options: ["1. 굿네이버스는 국내 아동 권리 보호와 복지 사업도 큰 비중으로 수행하고 있음을 구체적인 사업 수치를 들어 차분히 설명한다.", "2. 국내외 아동을 구분 짓기보다 모든 아동이 누려야 할 보편적 권리의 가치를 강조하며 시민의 공감을 유도한다.", "3. 논쟁이 길어지면 다른 후원자 유치가 어려우므로 가볍게 미소로 넘기고, 후원 의사가 있는 다른 시민에게 집중한다.", "4. 국내 사업 보고서 책자를 건네며 \"여기에 모든 답이 있다\"고 말하고, 상세한 내용은 홈페이지를 참고해 달라고 정중히 안내한다."] },
    { id: 95, type: 'BW', category: "목표 달성", scenario: "후원회 밤 행사 당일, 약속했던 후원 기업이 갑작스러운 경영 악화로 후원 취소를 통보했습니다. 대관료와 식비 결제가 급한 상황이며, 이대로라면 지부 목표 실적에 큰 타격이 생깁니다.", options: ["1. 재정 리스크를 줄이기 위해 행사 규모를 즉시 대폭 축소하고, 이미 주문한 물품들을 취소하여 비용을 아낀다.", "2. 지부 내 인적 네트워크를 총동원하여 해당 기업을 대체할 수 있는 긴급 후원처를 발굴하기 위해 남은 시간 총력을 다한다.", "3. 해당 기업을 방문해 사정을 청취하고, 액수를 조정하거나 할부 납부 등 파트너십을 유지하며 실적을 방어할 대안을 찾는다.", "4. 실적 달성은 어렵더라도 이번 행사는 기존 후원자 감사 관리에만 집중하는 것으로 성격을 바꿔 부담을 덜어낸다."] },
    { id: 96, type: 'BW', category: "조직문화", scenario: "본부 지침으로 도입된 새 전산 시스템이 너무 복잡하여 선배들이 \"현장 다니기도 바쁜데 언제 다 입력하냐\"며 당신에게 입력 업무를 몰아주려 합니다.", options: ["1. 선배들의 고충에 공감하며, 업무에 방해되지 않도록 퇴근 전후 시간을 내어 선배들의 서류까지 대신 입력해 준다.", "2. 새 시스템의 장점(자동화 기능 등)을 먼저 익혀 선배들이 쉽게 쓸 수 있는 '요약 가이드'를 만들어 공유하고 협조를 구한다.", "3. 본부 지침임을 강조하며 각자 맡은 분량은 스스로 입력하도록 팀 회의에서 정식으로 건의하고 역할 분담을 명확히 한다.", "4. 전산 작업을 내가 전담하겠다고 나서되, 그 대가로 다른 현장 방문이나 행정 업무에서 제외해 달라고 역제안한다."] },
    { id: 97, type: 'BW', category: "목표 달성", scenario: "아동 옹호 캠페인 촬영 중 아이가 너무 쑥스러워하며 거부합니다. 하지만 이 사진이 없으면 오늘 SNS 홍보 일정을 맞출 수 없고 홍보 효과도 기대하기 어렵습니다.", options: ["1. 아동의 기분을 달래기 위해 간식이나 놀이를 제안하며 아동이 스스로 웃을 때까지 끈기 있게 기다린다.", "2. 아동의 거부 의사를 존중하여 촬영을 중단하고, 대신 아동의 소지품이나 그린 그림 등 대체 이미지를 활용해 홍보한다.", "3. \"금방 끝난다\"며 아동을 설득하고, 보호자의 도움을 받아 빠르게 촬영을 마친 뒤 편집 작업으로 표정을 보정한다.", "4. 홍보의 중요성을 아동에게 설명하고, 이 캠페인이 잘 되어야 다른 친구들도 도움을 받을 수 있다는 점을 강조해 동참을 구한다."] },
    { id: 98, type: 'BW', category: "문제 해결", scenario: "연말 정산 기간에 작년 사업비 중 아주 적은 금액이 남은 것을 발견했습니다. 반납하기엔 서류가 너무 복잡하고, 동료는 \"어차피 소액이니 팀 소모품비로 쓰자\"고 합니다.", options: ["1. 복잡한 행정 낭비를 줄이기 위해 동료의 제안대로 소액 소모품을 구매해 비치하고 정산 보고서를 마감한다.", "2. 아무리 소액이라도 후원금의 목적 외 사용은 불가하므로, 정해진 절차에 따라 반납 처리를 진행하고 투명성을 지킨다.", "3. 해당 금액을 아동들을 위한 작은 간식비로 전용하여 실제 수혜자에게 혜택이 돌아가게 하고 보고서를 갈무리한다.", "4. 회계 담당자로서 책임을 피하기 위해 해당 사안을 상급자에게 정식 보고하고 어떤 방식으로 처리할지 결정을 기다린다."] },
    { id: 99, type: 'BW', category: "의사소통", scenario: "기획한 SNS 챌린지에 대해 선배 간사가 \"NGO답지 않게 너무 가볍고 장난스러워 보인다. 품위를 지켜야 한다\"며 전면 재검토를 요구합니다.", options: ["1. 선배의 조언대로 무게감 있는 기획으로 전면 수정하여, 굿네이버스의 전문적이고 진중한 이미지를 지킨다.", "2. 젊은 층의 참여를 이끌어내기 위한 트렌드임을 설명하고, 전문성을 해치지 않는 선에서 톤앤매너를 조절한 절충안을 제시한다.", "3. 선배의 우려를 반영하되, 일단 소규모로 먼저 실행해 본 뒤 유입 지표와 반응 데이터를 근거로 선배를 설득한다.", "4. 내 기획의 참신함을 믿고, 선배의 피드백보다는 팀장님께 직접 기획안을 승인받아 추진력을 확보한다."] },
    { id: 100, type: 'BW', category: "조직문화", scenario: "갑작스러운 인사 이동으로 업무 인수인계가 며칠 만에 마무리되어야 합니다. 전임자가 자료를 다 정리하지 못했는데, 당신은 당장 내일 큰 행사를 주관해야 합니다.", options: ["1. 전임자를 원망하기보다 밤을 새워서라도 기존 파일을 직접 다 뒤져 행사에 차질이 없도록 완벽히 준비한다.", "2. 행사 준비에 꼭 필요한 핵심 정보만 리스트업하여 전임자에게 짧고 굵게 질문하고, 나머지는 내 스타일대로 새롭게 준비한다.", "3. 상황의 긴박함을 팀장님께 공유하고, 이번 행사만큼은 팀원들의 협조를 얻어 함께 준비할 수 있도록 지원을 요청한다.", "4. 준비 부족으로 행사가 미흡할 수 있음을 미리 공지하고, 행사 후 이번 인수인계 과정의 문제점을 개선안으로 보고한다."] }
];

// State Variables
let currentSectionIdx = 0;
let userAnswers = {};
let timerInterval = null;

// [INIT] Page Load
document.addEventListener('DOMContentLoaded', () => {
    startTimer();
    injectCheatButtons();
    document.getElementById('test-form')?.addEventListener('submit', (e) => e.preventDefault());
    document.getElementById('prev-btn').addEventListener('click', goPrevSection);
    document.getElementById('next-btn').addEventListener('click', goNextSection);
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitTest);
        submitBtn.classList.add('nav-btn', 'submit');
    }
    renderSection(0);
});

// [CHEAT KEY]
function injectCheatButtons() {
    const div = document.createElement('div');
    div.style.position = 'fixed'; div.style.top = '10px'; div.style.left = '50%';
    div.style.transform = 'translateX(-50%)'; div.style.zIndex = '9999';
    div.style.display = 'flex'; div.style.gap = '10px'; div.style.opacity = '0.5';
    div.onmouseenter = () => div.style.opacity = '1';
    div.onmouseleave = () => div.style.opacity = '0.5';
    const btnA = document.createElement('button');
    btnA.innerText = "[TEST] Fill A";
    btnA.style.padding = '5px 10px'; btnA.style.background = '#333'; btnA.style.color = 'white';
    btnA.onclick = (e) => { e.preventDefault(); cheatFill('A'); };
    div.appendChild(btnA);
    document.body.appendChild(div);
}

function cheatFill(choice) {
    if (!confirm(`80번까지 '${choice}'로 채우고 이동할까요?`)) return;
    for (let i = 1; i <= 80; i++) userAnswers[i] = choice;
    currentSectionIdx = 10; renderSection(currentSectionIdx);
}

// [UI] Timer
function startTimer() {
    const timerDisplay = document.getElementById('timer-display');
    const startTimeStr = localStorage.getItem('gnFit_startTime');
    let startTime = startTimeStr ? parseInt(startTimeStr) : Date.now();
    if (!startTimeStr) localStorage.setItem('gnFit_startTime', startTime.toString());
    timerInterval = setInterval(() => {
        const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
        const min = Math.floor(elapsedSec / 60).toString().padStart(2, '0');
        const sec = (elapsedSec % 60).toString().padStart(2, '0');
        if (timerDisplay) timerDisplay.textContent = `소요 시간 ${min}:${sec}`;
    }, 1000);
}

// [RENDER]
function renderSection(sectionIdx) {
    const container = document.getElementById('question-list');
    const sectionConfig = SECTIONS[sectionIdx];
    if (sectionConfig.themeVar) document.documentElement.style.setProperty('--theme-color', `var(${sectionConfig.themeVar})`);
    if (sectionConfig.type === 'bridge') {
        renderBridge(sectionConfig, container); updateNavButtons(sectionIdx, true); return;
    }
    renderQuestions(sectionConfig, container); updateNavButtons(sectionIdx, false); checkSectionComplete();
}

function renderBridge(config, container) {
    document.getElementById('progress-text').textContent = config.subtitle || '';
    container.innerHTML = `<div class="bridge-container"><h2 class="bridge-title">${config.title}</h2><div class="bridge-content bridge-desc">${config.content}</div><button type="button" class="btn-bridge" onclick="goNextSection()">${config.buttonText}</button></div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestions(config, container) {
    let pageNum = (currentSectionIdx >= 1 && currentSectionIdx <= 8) ? currentSectionIdx : (currentSectionIdx >= 10 ? currentSectionIdx - 1 : 0);
    const totalPages = 12;
    if (pageNum > 0) {
        document.getElementById('progress-text').textContent = `PAGE ${pageNum} / ${totalPages}`;
        document.getElementById('progress-bar').style.width = `${(pageNum / totalPages) * 100}%`;
    }
    let html = '';
    for (let i = config.start; i <= config.end; i++) {
        const q = allQuestions[i];
        if (q.type === 'AB') html += renderTypeAB(q);
        else if (q.type === 'BW') html += renderTypeBW(q);
    }
    container.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderTypeAB(q) {
    const saved = userAnswers[q.id];
    return `<div class="question-item"><div class="question-header"><span class="q-number">Q${q.id}</span></div><div class="options-grid"><div class="option-card ${saved === 'A' ? 'selected' : ''}" onclick="selectOption(${q.id}, 'A')"><input type="radio" name="q${q.id}" value="A" class="option-input" ${saved === 'A' ? 'checked' : ''}><span class="option-text">${q.optionA}</span></div><div class="option-card ${saved === 'B' ? 'selected' : ''}" onclick="selectOption(${q.id}, 'B')"><input type="radio" name="q${q.id}" value="B" class="option-input" ${saved === 'B' ? 'checked' : ''}><span class="option-text">${q.optionB}</span></div></div></div>`;
}

function renderTypeBW(q) {
    const saved = userAnswers[q.id] || {};
    let optionsHtml = '';
    q.options.forEach((optText, idx) => {
        const optionIdx = idx + 1; const isBest = saved.best === optionIdx; const isWorst = saved.worst === optionIdx;
        let cardClass = `scenario-card ${isBest ? 'has-best' : ''} ${isWorst ? 'has-worst' : ''}`;
        optionsHtml += `<div class="${cardClass}" id="q${q.id}_opt${optionIdx}"><div class="scenario-content">${optText}</div><div class="selection-label label-best">Best</div><div class="selection-label label-worst">Worst</div><div class="scenario-actions"><button type="button" class="btn-select best ${isBest ? 'active' : ''}" onclick="selectScenarioOption(event, ${q.id}, ${optionIdx}, 'best')">Best</button><button type="button" class="btn-select worst ${isWorst ? 'active' : ''}" onclick="selectScenarioOption(event, ${q.id}, ${optionIdx}, 'worst')">Worst</button></div></div>`;
    });
    return `<div class="question-item"><div class="question-header"><span class="q-number">Q${q.id}</span></div><div class="scenario-box"><div class="scenario-text">${q.scenario}</div></div><div class="scenario-options-grid">${optionsHtml}</div></div>`;
}

window.selectOption = function (qId, val) {
    userAnswers[qId] = val; checkSectionComplete();
    renderSection(currentSectionIdx);
};

window.selectScenarioOption = function (event, qId, optionIdx, type) {
    if (event) event.preventDefault();
    if (!userAnswers[qId]) userAnswers[qId] = { best: null, worst: null };
    if (type === 'best') {
        userAnswers[qId].best = (userAnswers[qId].best === optionIdx) ? null : optionIdx;
        if (userAnswers[qId].best === userAnswers[qId].worst) userAnswers[qId].worst = null;
    } else {
        userAnswers[qId].worst = (userAnswers[qId].worst === optionIdx) ? null : optionIdx;
        if (userAnswers[qId].worst === userAnswers[qId].best) userAnswers[qId].best = null;
    }
    updateScenarioDOM(qId); checkSectionComplete();
};

function updateScenarioDOM(qId) {
    const ans = userAnswers[qId];
    for (let i = 1; i <= 4; i++) {
        const card = document.getElementById(`q${qId}_opt${i}`); if (!card) continue;
        const b = card.querySelector('.btn-select.best'), w = card.querySelector('.btn-select.worst');
        card.classList.remove('has-best', 'has-worst'); b.classList.remove('active'); w.classList.remove('active');
        if (ans.best === i) { card.classList.add('has-best'); b.classList.add('active'); }
        if (ans.worst === i) { card.classList.add('has-worst'); w.classList.add('active'); }
    }
}

function checkSectionComplete() {
    const nextBtn = document.getElementById('next-btn'), submitBtn = document.getElementById('submit-btn');
    if (SECTIONS[currentSectionIdx].type === 'bridge') return;
    const ok = validateSectionSilently(currentSectionIdx);
    if (nextBtn) nextBtn.disabled = !ok; if (submitBtn) submitBtn.disabled = !ok;
}

function validateSectionSilently(sectionIdx) {
    const s = SECTIONS[sectionIdx];
    for (let i = s.start; i <= s.end; i++) {
        const q = allQuestions[i], ans = userAnswers[q.id];
        if (q.type === 'AB' && !ans) return false;
        if (q.type === 'BW' && (!ans || !ans.best || !ans.worst)) return false;
    }
    return true;
}

function updateNavButtons(sectionIdx, isBridge) {
    const p = document.getElementById('prev-btn'), n = document.getElementById('next-btn'), s = document.getElementById('submit-btn');
    p.style.display = 'none'; n.style.display = 'none'; s.style.display = 'none';
    if (isBridge) return;
    if (sectionIdx > 1) p.style.display = 'block';
    if (sectionIdx === 13) { s.style.display = 'block'; s.style.cssText = "display:block; background-color:#89a230!important; color:#fff!important; font-weight:bold;"; }
    else n.style.display = 'block';
}

function goPrevSection() { if (currentSectionIdx > 0) { currentSectionIdx--; renderSection(currentSectionIdx); } }
function goNextSection() {
    if (SECTIONS[currentSectionIdx].type !== 'bridge' && !validateSectionSilently(currentSectionIdx)) { alert("모든 문항에 답변해주세요."); return; }
    if (currentSectionIdx < SECTIONS.length - 1) { currentSectionIdx++; renderSection(currentSectionIdx); }
}

// [SUBMIT FUNCTION] - FIXED FOR KOREAN HEADERS
function submitTest() {
    if (!validateSectionSilently(currentSectionIdx)) { alert("모든 문항에 답변해주세요."); return; }
    if (!confirm("모든 검사를 마쳤습니다. 제출하시겠습니까?")) return;
    const btn = document.getElementById('submit-btn'); btn.textContent = "전송 중..."; btn.disabled = true;
    clearInterval(timerInterval);

    // 시트 헤더와 1:1 매칭
    const formData = {
        "성명": localStorage.getItem('applicantName'),
        "휴대폰번호": localStorage.getItem('applicantPhone'),
        "생년월일": localStorage.getItem('applicantBirthdate'),
        "정보동의여부": localStorage.getItem('applicantAgree'),
        "타임스탬프": new Date().toLocaleString(),
        "소요시간(초)": Math.floor((Date.now() - (parseInt(localStorage.getItem('gnFit_startTime')) || Date.now())) / 1000)
    };
    for (let i = 1; i <= 80; i++) formData[`Q${i}`] = userAnswers[i] || "";
    for (let i = 81; i <= 100; i++) {
        const res = userAnswers[i] || {};
        formData[`Q${i}_Best`] = res.best || "";
        formData[`Q${i}_Worst`] = res.worst || "";
    }
    fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(formData) })
        .then(() => { alert("제출이 완료되었습니다."); window.location.href = "result.html"; })
        .catch(e => { console.error(e); alert("전송 에러가 발생했습니다."); });
}