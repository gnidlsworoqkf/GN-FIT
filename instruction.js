document.addEventListener('DOMContentLoaded', () => {
    const consentCheck = document.getElementById('consent-check');
    const startBtn = document.getElementById('start-btn');

    // 1. 로그인 정보 확인 (Console Log)
    const storedName = localStorage.getItem('applicantName');
    const storedBirthdate = localStorage.getItem('applicantBirthdate');

    if (storedName && storedBirthdate) {
        console.log(`[로그인 정보 확인] 성명: ${storedName}, 생년월일: ${storedBirthdate}`);
    } else {
        console.warn('[주의] 로그인 정보가 없습니다. 정상적인 접근이 아닐 수 있습니다.');
        // 필요 시 index.html로 리다이렉트 하는 로직을 추가할 수도 있음
        // window.location.href = 'index.html'; 
    }

    // 2. 체크박스 동의 시 버튼 활성화
    consentCheck.addEventListener('change', (e) => {
        if (e.target.checked) {
            startBtn.disabled = false;
        } else {
            startBtn.disabled = true;
        }
    });

    // 3. 버튼 클릭 시 페이지 이동
    startBtn.addEventListener('click', () => {
        // [New] 타이머 시작 (현재 시간 기록)
        localStorage.setItem('gnFit_startTime', Date.now().toString());

        // 검사 페이지로 이동
        window.location.href = 'test.html';
    });
});
