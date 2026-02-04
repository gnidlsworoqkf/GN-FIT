// script.js - 강제 통과 버전
window.onload = function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.onsubmit = function (e) {
            e.preventDefault();
            console.log("버튼 클릭됨!");

            try {
                // 입력값 가져오기
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const birth = document.getElementById('birth').value;

                // 데이터 저장
                localStorage.clear();
                localStorage.setItem('applicantName', name);
                localStorage.setItem('applicantPhone', phone);
                localStorage.setItem('applicantBirthdate', birth);

                // 유의사항 페이지로 강제 이동
                window.location.href = 'instruction.html';
            } catch (error) {
                console.error("오류 발생:", error);
                // 오류가 나도 무조건 보냅니다.
                window.location.href = 'instruction.html';
            }
        };
    } else {
        alert("시스템 설정 중입니다. 잠시 후 다시 시도해 주세요. (loginForm 못 찾음)");
    }
};