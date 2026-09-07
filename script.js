// script.js - 중복 응시 방지 버전
const scriptURL = "https://script.google.com/macros/s/AKfycbxi91tiy8bDjGcpYUvWLZdehfvuSMQteQEIYzH6FucJoAydGfEM23qdUpLpfT8doZyr/exec";

window.onload = function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.onsubmit = async function (e) {
            e.preventDefault();

            const name   = document.getElementById('name').value.trim();
            const phone  = document.getElementById('phone').value.trim();
            const birth  = document.getElementById('birth').value.trim();
            const agree  = document.getElementById('agree')?.checked;

            // 동의 체크 여부 확인
            if (!agree) {
                alert("개인정보 수집에 동의해 주세요.");
                return;
            }

            // 입력값 기본 검증
            if (!name || !phone || !birth) {
                alert("모든 항목을 입력해 주세요.");
                return;
            }

            // 휴대폰 번호 유효성 검사 (3단계)
            const phoneErrorEl = document.getElementById('phone-error');
            const showPhoneError = (msg) => {
                phoneErrorEl.textContent = msg;
                phoneErrorEl.style.display = 'block';
                document.getElementById('phone').focus();
            };
            phoneErrorEl.style.display = 'none'; // 이전 에러 초기화

            const digitsOnly = /^\d+$/.test(phone);
            if (!digitsOnly) {
                showPhoneError("숫자만 입력해주세요.");
                return;
            }
            if (!phone.startsWith('010')) {
                showPhoneError("휴대폰 번호는 010으로 시작해야 합니다.");
                return;
            }
            if (phone.length !== 11) {
                showPhoneError("휴대폰 번호는 11자리로 입력해주세요.");
                return;
            }


            // 버튼 로딩 상태로 전환
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "확인 중...";

            try {
                // 구글 시트에서 기존 응시 데이터 조회 (GET 요청)
                const response = await fetch(scriptURL, { method: 'GET' });
                const rows = await response.json();

                // 휴대폰번호 중복 확인 ('휴대폰번호' 컬럼 기준, 앞의 0 제거 후 비교)
                const isDuplicate = rows.some(row => {
                    const saved = parseInt(String(row['휴대폰번호'] || '').replace(/-/g, '').trim(), 10);
                    const input = parseInt(phone.replace(/-/g, '').trim(), 10);
                    return !isNaN(saved) && !isNaN(input) && saved === input;
                });

                if (isDuplicate) {
                    alert("이미 응시하신 이력이 있습니다.\n중복 응시는 허용되지 않습니다.");
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    return;
                }

                // 중복 없으면 localStorage 저장 후 이동
                localStorage.clear();
                localStorage.setItem('applicantName', name);
                localStorage.setItem('applicantPhone', phone);
                localStorage.setItem('applicantBirthdate', birth);
                localStorage.setItem('applicantAgree', agree ? 'Y' : 'N');
                window.location.href = 'instruction.html';

            } catch (error) {
                console.error("중복 확인 중 오류 발생:", error);
                // 네트워크 오류 등 예외 상황: 사용자에게 안내 후 진행 여부 확인
                const proceed = confirm("응시 이력 확인에 실패했습니다.\n그래도 계속 진행하시겠습니까?");
                if (proceed) {
                    localStorage.clear();
                    localStorage.setItem('applicantName', name);
                    localStorage.setItem('applicantPhone', phone);
                    localStorage.setItem('applicantBirthdate', birth);
                    localStorage.setItem('applicantAgree', agree ? 'Y' : 'N');
                    window.location.href = 'instruction.html';
                } else {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        };
    } else {
        alert("시스템 설정 중입니다. 잠시 후 다시 시도해 주세요. (loginForm 못 찾음)");
    }
};