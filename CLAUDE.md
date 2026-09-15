# GN-Fit 역량검사 (사단법인 굿네이버스 인터내셔날)

채용 지원자용 온라인 역량검사 웹앱. **빌드 도구·프레임워크 없는 순수 정적 사이트**(HTML/CSS/바닐라 JS)이며,
백엔드는 Google Apps Script + Google 스프레드시트 하나가 전부다.
`npm install` 이나 파이썬 패키지 설치가 필요한 부분은 없다.

## 소통 규칙
- 모든 설명과 주석은 **한국어**로. 사용자는 코딩 기초지식이 없는 초보이므로 전문용어는 풀어서 쉽게 설명한다.
- 파일을 고치기 전에 "무엇을, 왜" 바꾸는지 먼저 한 줄로 알려준다.

## 로컬에서 실행하기
파이참 우측 상단 실행 설정에서 **"로컬 미리보기 서버 (8123)"** 선택 후 ▶ 실행.
→ `serve.py` 가 `http://localhost:8123` 에 캐시 없는 정적 서버를 띄우고 브라우저를 연다.

HTML 파일을 더블클릭(`file:///...`)해서 열면 **안 된다.** localStorage 공유와 fetch가 정상 동작하지 않는다.

## 응시자 화면 흐름
```
index.html  로그인(성명/생년월일/휴대폰11자리) + 개인정보 동의
   │        script.js 가 Apps Script에 GET → 휴대폰번호로 중복 응시 차단
   │        통과 시 localStorage에 applicantName/Phone/Birthdate/Agree 저장
   ▼
instruction.html  검사 안내 + 동의 체크 (instruction.js)
   ▼
test.html   본 검사 100문항 (test.js + test.css) ← 로직 대부분이 여기 있음
   │        제출 시 Apps Script에 POST (mode: 'no-cors')
   ▼
result.html 완료 안내
```

## 문항 구조 (test.js `allQuestions`)
- **PART 1 · Q1~Q80** : A/B 양자택일 (`type: 'AB'`). 페이지당 10문항, 제한시간 60초.
  - Q61~Q80은 앞 문항의 **거울(역방향) 문항** — 응답 일관성 검증용. 원본과 멀리 떨어뜨려야 하므로 **순서를 섞지 않는다.**
  - Q1~Q60은 응시자마다 순서를 무작위로 섞는다(`part1Shuffled`). 같은 카테고리가 연달아 나와 패턴이 읽히는 것을 방지.
- **PART 2 · Q81~Q100** : 상황판단(SJT). 4개 선택지 중 Best 1개 + Worst 1개 필수 선택. 페이지당 5문항, 제한시간 120초.
  - 선택지 **표시 순서도 매번 섞는다**(`part2OptionOrder`). 채점은 원본 인덱스 기준이고 화면 번호(1~4)는 표시용일 뿐이다.
- 제한시간이 끝나면 `forceNextSection()`으로 자동으로 다음 페이지로 넘어간다.

## 채점이 어디서 일어나는가 (중요)
**총점과 역량별 점수는 PART 2(SJT)만으로 산출된다. PART 1은 점수에 들어가지 않고 성향(A/B 비율) 파악용이다.**

서버(`google_apps_script.js`)에서만 하는 일:
- **PART 2 정답키(`ANSWER_KEY`)는 이 파일 안에만 존재한다.** 클라이언트 코드에 절대 넣지 말 것.
- `doPost`가 저장 시점에 채점해 `PART2_채점결과_JSON` 컬럼에 `{stats, total, fakingGood}` 만 저장한다.
- `doGet`은 조회 시 `Q81~Q100`의 `_Best`/`_Worst` 원본 응답을 **삭제하고** 내려준다 (정답키 역산 차단).
- 점수 공식 — 중립 응답(원점수 0)이 65%가 되도록 보정. **이 한 곳에만 있다:**
  `pct = round((7*p2 + 13*max2) / (max2*20) * 100)`
  (⚠️ `google_apps_script.js` 37행 위의 주석은 "admin.html/report_v4.html과 동일 공식"이라고 하지만
   이는 서버 채점으로 옮기기 전의 옛 설명이다. 지금 두 파일에 공식은 없다.)
- 신뢰도 플래그 `fakingGood` : `Q80 == 'B'` 이거나 `Q100_Best == 1` 이면 true.

클라이언트(`admin.html` / `report_v4.html`)에서 하는 일 — **두 파일에 똑같이 들어있으므로 하나 고치면 둘 다 고쳐야 한다:**
- `PART2_채점결과_JSON`을 파싱해서 그대로 쓴다 (재채점하지 않음).
- `MIRROR_PAIRS` (거울 문항 19쌍) — 응답 일관성 점수. `rev:true`는 선택지가 반대로 배치되어 있어
  **반대 글자**를 골라야 일관된 것으로 인정된다. 15쌍 이상 High / 10쌍 이상 Mid / 그 미만 Low.
- `JOB_FIT_WEIGHTS` (국내사업·국제사업·마케팅·회원관리 4개 직무 가중치) — 직무 적합도.
- 유형 구분 : 총점 40 이하 보완형 / 60 이하 잠재형 / 80 이하 성장형 / 그 위 주도형.

## 관리자 화면
- `admin.html` — 응시자 목록 대시보드. Apps Script에 GET으로 시트 조회.
  진입 경로는 `index.html` 우측 하단의 거의 투명한 "Admin" 링크 + 비밀번호 프롬프트.
  ⚠️ 비밀번호가 `index.html`에 평문 하드코딩되어 있다(`'1234'`). 개발자도구로 누구나 볼 수 있는 수준의 잠금장치임을 인지할 것.
- `report_v4.html` — 개인별 A4 리포트. Chart.js로 그래프, html2pdf.js로 PDF 저장/인쇄.

## Apps Script 배포 (백엔드 수정 시)
1. `google_apps_script.js` 내용을 Apps Script 편집기에 붙여넣는다.
2. **배포 관리 → 기존 배포 수정 → 새 버전** 으로 재배포한다.
   ⚠️ **"새 배포"를 누르면 안 된다.** URL이 바뀌어서 `script.js`·`test.js`·`admin.html`·`report_v4.html`
   네 파일의 `scriptURL` 상수가 전부 깨지고, 그걸 일일이 다시 고쳐야 한다.
3. **Apps Script 재배포와 GitHub push는 반드시 같은 시점에 한다.**
   한쪽만 반영되면(예: 서버는 새 버전인데 사이트는 구버전) 클라이언트가 이제 존재하지 않는 필드를
   읽으려다 **모든 역량이 중립값 65점으로 똑같이 나오는** 오류가 생긴다. 증상이 헷갈리니 꼭 기억할 것.

프런트엔드는 **GitHub Pages**(공개 저장소 `gnidlsworoqkf/GN-FIT`, main 브랜치)로 배포된다.
즉 `.html`/`.js` 파일 내용은 전부 공개다 — 비밀로 해야 할 값은 절대 넣지 말 것.

## 파일 정리
| 파일 | 역할 |
|---|---|
| `index.html` / `script.js` / `style.css` | 로그인 + 중복응시 차단 |
| `instruction.html` / `instruction.js` | 검사 안내 |
| `test.html` / `test.js` / `test.css` | 본 검사 100문항 (핵심) |
| `result.html` | 완료 화면 |
| `admin.html` | 관리자 대시보드 |
| `report_v4.html` | 개인 리포트 (PDF) |
| `google_apps_script.js` | 백엔드 (정답키·서버채점·시트 저장/조회) — **로컬 전용, git 미포함** |
| `serve.py` | 로컬 미리보기 서버 (배포와 무관) |
| `GNFit_논리구조_최신판.html` | 전체 로직 설계 문서 |
| `test0202.js` / `test_backup_60q.js` | 구버전 백업 (사용 안 함) |

## 절대 git에 올리지 않는 파일 (`.gitignore`로 차단됨)
`google_apps_script.js`, `GNFit_배점표_대외비.html`, `GN_역량검사_최신문항_전체정리.xlsx`, `첨_부_사단법인_역량가이드북.pdf`
— 배점 기준과 정답 근거가 들어있어 유출 시 검사가 무력화된다.

`google_apps_script.js`는 Apps Script 편집기 안에서 실행되므로 저장소에 없어도 사이트는 정상 동작한다.
수정할 때는 로컬 파일을 고친 뒤 편집기에 붙여넣는다. **저장소에 다시 추가하지 말 것.**

## 작업 시 주의사항
- 이 폴더는 **OneDrive 동기화 폴더 안 + 경로에 한글 포함**이다.
  Bash 도구로 명령을 실행하면 한글 경로가 깨질 수 있으니 **PowerShell 도구를 우선 사용**한다.
- `git push`는 변경할 때마다 하지 않고 **하루 한 번으로 모아서** 한다. 로컬 커밋은 변경 단위로 그때그때 남긴다.
