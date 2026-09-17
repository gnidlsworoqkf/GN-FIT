# -*- coding: utf-8 -*-
"""
GN-Fit 문항 관리 도구
=====================
엑셀 문항표(GN_역량검사_최신문항_전체정리.xlsx)와 서버 코드(google_apps_script.js)의
문항 100개를 서로 옮겨주는 도구다. 손으로 코드를 고치다 따옴표 하나를 빠뜨려
검사 전체가 멈추는 사고를 막기 위해 만들었다.

사용법 (파이참 터미널 또는 명령 프롬프트에서)
--------------------------------------------------
    python question_tool.py              비교만 한다. 파일을 절대 건드리지 않는다.
    python question_tool.py 적용          엑셀 내용으로 코드의 문항을 교체한다 (백업 먼저 뜬다).
    python question_tool.py 내보내기       지금 코드에 들어있는 문항을 엑셀 파일로 저장한다.

왜 엑셀을 직접 못 읽고 엑셀 프로그램을 거치는가
--------------------------------------------------
문항 엑셀 파일이 회사 보안 정책(Azure Information Protection)으로 암호화되어 있다.
파일 속이 통째로 잠겨 있어서 파이썬이 직접 열 수 없고, 회사 계정으로 로그인된
엑셀 프로그램만 풀 수 있다. 그래서 엑셀을 잠깐 백그라운드로 띄워 값만 받아온다.
(덕분에 구형 xls든 신형 xlsx든 형식을 가리지 않는 장점도 생겼다)

설치가 필요한 것: 없음. 파이썬 기본 기능 + 이 PC에 이미 깔린 엑셀만 쓴다.
"""

import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime

# 윈도우 명령 프롬프트는 기본 글자표(cp949)로 출력하는데, 여기서 표현 못 하는 기호가
# 하나라도 있으면 프로그램이 통째로 죽는다. 출력만큼은 UTF-8로 고정하고,
# 그래도 안 되는 글자는 물음표로 대체해 최소한 죽지는 않게 한다.
for _흐름 in (sys.stdout, sys.stderr):
    try:
        _흐름.reconfigure(encoding="utf-8", errors="replace")
    except (AttributeError, ValueError):
        pass

# ─────────────────────────────────────────────────────────────
# 설정 : 파일 위치와 시트 이름
# ─────────────────────────────────────────────────────────────
여기 = os.path.dirname(os.path.abspath(__file__))
엑셀파일 = os.path.join(여기, "GN_역량검사_최신문항_전체정리.xlsx")
코드파일 = os.path.join(여기, "google_apps_script.js")
백업폴더 = os.path.join(여기, "_문항백업")

PART1_시트_키워드 = "PART1"   # 시트 이름에 이 글자가 들어있으면 PART1 시트로 본다
PART2_시트_키워드 = "PART2"

PART1_문항수 = 80
PART2_문항수 = 20

# 거울(역방향) 문항 구간. 이 구간에서 A/B 순서가 바뀌면 일관성 채점이 뒤집히므로 특별히 경고한다.
거울구간 = range(61, 81)


class 중단(Exception):
    """작업을 멈춰야 하는 문제가 생겼을 때 던진다."""
    pass


def 알림(글자=""):
    print(글자, flush=True)


def 제목(글자):
    알림()
    알림("─" * 62)
    알림(글자)
    알림("─" * 62)


# ─────────────────────────────────────────────────────────────
# 1) 엑셀 읽기 : 엑셀 프로그램을 잠깐 띄워 값만 받아온다
# ─────────────────────────────────────────────────────────────
_읽기_스크립트 = r'''
param([string]$Src, [string]$Out)
$ErrorActionPreference = "Stop"
# 이 스크립트가 "새로 띄운" 엑셀만 나중에 정리하려고, 시작 전 프로세스 목록을 기억해 둔다.
# 사용자가 직접 열어둔 엑셀 창은 목록에 이미 있으므로 절대 건드리지 않는다.
$before = @(Get-Process EXCEL -ErrorAction SilentlyContinue | ForEach-Object { $_.Id })
$x = New-Object -ComObject Excel.Application
$x.Visible = $false
$x.DisplayAlerts = $false
$wb = $null
try {
    $wb = $x.Workbooks.Open($Src, 0, $true)
    $result = @{}
    foreach ($sh in $wb.Worksheets) {
        $ur = $sh.UsedRange
        $nr = $ur.Rows.Count
        $nc = $ur.Columns.Count
        $vals = $ur.Value2
        $rows = New-Object System.Collections.ArrayList
        for ($r = 1; $r -le $nr; $r++) {
            $row = New-Object System.Collections.ArrayList
            $any = $false
            for ($c = 1; $c -le $nc; $c++) {
                $v = $vals.GetValue($r, $c)
                if ($null -eq $v) { $s = "" } else { $s = [string]$v }
                $s = $s.Trim()
                if ($s -ne "") { $any = $true }
                [void]$row.Add($s)
            }
            if ($any) { [void]$rows.Add($row.ToArray()) }
        }
        $result[$sh.Name] = $rows.ToArray()
    }
    $result | ConvertTo-Json -Depth 5 | Out-File -FilePath $Out -Encoding utf8
} catch {
    Write-Output ("ERROR " + $_.InvocationInfo.ScriptLineNumber + "행: " + $_.Exception.Message)
} finally {
    if ($wb -ne $null) { try { $wb.Close($false) } catch {} }
    try { $x.Quit() } catch {}
    try { [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($x) } catch {}
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
    Start-Sleep -Milliseconds 300
    # Quit() 만으로는 엑셀이 백그라운드에 유령처럼 남는 일이 잦다. 남아 있으면 확실히 끝낸다.
    # 조건 둘을 모두 만족할 때만 종료 : (1) 시작 전에 없던 프로세스 (2) 화면에 창이 없는 것
    foreach ($p in @(Get-Process EXCEL -ErrorAction SilentlyContinue)) {
        if (($before -notcontains $p.Id) -and [string]::IsNullOrEmpty($p.MainWindowTitle)) {
            try { Stop-Process -Id $p.Id -Force } catch {}
        }
    }
}
'''


def 엑셀읽기(경로):
    if not os.path.exists(경로):
        raise 중단("엑셀 파일을 찾을 수 없습니다:\n    %s" % 경로)

    임시 = tempfile.mkdtemp(prefix="gnfit_")
    ps파일 = os.path.join(임시, "read.ps1")
    결과파일 = os.path.join(임시, "dump.json")
    try:
        with open(ps파일, "w", encoding="utf-8-sig") as f:
            f.write(_읽기_스크립트)

        알림("엑셀을 열어 문항을 읽는 중입니다... (몇 초 걸립니다)")
        완료 = subprocess.run(
            ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass",
             "-File", ps파일, "-Src", 경로, "-Out", 결과파일],
            capture_output=True, text=True, encoding="utf-8", errors="replace",
        )
        if not os.path.exists(결과파일):
            raise 중단(
                "엑셀에서 값을 읽어오지 못했습니다.\n"
                "  · 엑셀 창이 열려 있다면 닫고 다시 실행해 보세요.\n"
                "  · 회사 계정으로 엑셀에 로그인되어 있어야 잠긴 파일이 열립니다.\n"
                "  · 자세한 오류: %s" % ((완료.stderr or 완료.stdout or "").strip()[:500])
            )
        with open(결과파일, encoding="utf-8-sig") as f:
            return json.load(f)
    finally:
        shutil.rmtree(임시, ignore_errors=True)


# ─────────────────────────────────────────────────────────────
# 2) 엑셀 표 → 문항 목록으로 정리 + 검사
# ─────────────────────────────────────────────────────────────
def _열찾기(머리글, 후보들, 시트이름, 설명):
    """머리글 행에서 원하는 열이 몇 번째인지 찾는다. 열 순서가 바뀌어도 동작하도록."""
    for i, 칸 in enumerate(머리글):
        납작 = re.sub(r"\s+", "", 칸 or "")
        for 후보 in 후보들:
            if re.sub(r"\s+", "", 후보) in 납작:
                return i
    raise 중단("'%s' 시트에서 %s 열을 찾지 못했습니다.\n"
               "    머리글(첫 줄)에 %s 중 하나가 들어있어야 합니다.\n"
               "    지금 머리글: %s" % (시트이름, 설명, " / ".join(후보들), " | ".join(머리글)))


def _번호(값, 시트이름, 줄):
    try:
        return int(float(str(값).strip()))
    except (TypeError, ValueError):
        raise 중단("'%s' 시트 %d번째 줄의 문항 번호(%r)를 숫자로 읽을 수 없습니다." % (시트이름, 줄, 값))


def 엑셀표_정리(표들):
    p1이름 = p2이름 = None
    for 이름 in 표들:
        if PART1_시트_키워드 in 이름.upper():
            p1이름 = 이름
        elif PART2_시트_키워드 in 이름.upper():
            p2이름 = 이름
    if not p1이름 or not p2이름:
        raise 중단("엑셀에서 PART1 / PART2 시트를 찾지 못했습니다.\n"
                   "    시트 이름에 'PART1', 'PART2'가 들어있어야 합니다.\n"
                   "    지금 있는 시트: %s" % ", ".join(표들))

    문항들 = {}

    # ── PART 1 ──
    줄들 = 표들[p1이름]
    머리 = 줄들[0]
    c번호 = _열찾기(머리, ["번호"], p1이름, "문항 번호")
    c역량 = _열찾기(머리, ["역량", "카테고리"], p1이름, "역량(카테고리)")
    cA = _열찾기(머리, ["선택지A", "선택지 A"], p1이름, "선택지 A")
    cB = _열찾기(머리, ["선택지B", "선택지 B"], p1이름, "선택지 B")

    for 순번, 줄 in enumerate(줄들[1:], start=2):
        def 칸(i, 줄=줄):
            return (줄[i].strip() if i < len(줄) else "")
        번호 = _번호(칸(c번호), p1이름, 순번)
        if 번호 in 문항들:
            raise 중단("문항 번호 %d번이 엑셀에 두 번 나옵니다. ('%s' 시트)" % (번호, p1이름))
        if not 칸(cA) or not 칸(cB):
            raise 중단("Q%d번의 선택지 A 또는 B가 비어 있습니다. ('%s' 시트 %d번째 줄)" % (번호, p1이름, 순번))
        문항들[번호] = {
            "id": 번호, "type": "AB", "category": 칸(c역량),
            "optionA": 칸(cA), "optionB": 칸(cB),
        }

    # ── PART 2 ──
    줄들 = 표들[p2이름]
    머리 = 줄들[0]
    c번호 = _열찾기(머리, ["번호"], p2이름, "문항 번호")
    c역량 = _열찾기(머리, ["역량", "카테고리"], p2이름, "역량(카테고리)")
    c상황 = _열찾기(머리, ["상황", "시나리오", "Scenario"], p2이름, "상황(시나리오)")
    보기열 = [
        _열찾기(머리, ["선택지①", "선택지 ①", "선택지1"], p2이름, "선택지 ①"),
        _열찾기(머리, ["선택지②", "선택지 ②", "선택지2"], p2이름, "선택지 ②"),
        _열찾기(머리, ["선택지③", "선택지 ③", "선택지3"], p2이름, "선택지 ③"),
        _열찾기(머리, ["선택지④", "선택지 ④", "선택지4"], p2이름, "선택지 ④"),
    ]

    for 순번, 줄 in enumerate(줄들[1:], start=2):
        def 칸(i, 줄=줄):
            return (줄[i].strip() if i < len(줄) else "")
        번호 = _번호(칸(c번호), p2이름, 순번)
        if 번호 in 문항들:
            raise 중단("문항 번호 %d번이 엑셀에 두 번 나옵니다. ('%s' 시트)" % (번호, p2이름))
        if not 칸(c상황):
            raise 중단("Q%d번의 상황(시나리오)이 비어 있습니다. ('%s' 시트 %d번째 줄)" % (번호, p2이름, 순번))
        보기 = []
        for 자리, 열 in enumerate(보기열, start=1):
            글 = 칸(열)
            if not 글:
                raise 중단("Q%d번의 선택지 %d번이 비어 있습니다. ('%s' 시트 %d번째 줄)" % (번호, 자리, p2이름, 순번))
            글 = re.sub(r"^[①②③④\d]+[.)]?\s*", "", 글)   # 앞에 붙은 번호는 떼고
            보기.append("%d. %s" % (자리, 글))             # 코드 형식에 맞춰 다시 붙인다
        문항들[번호] = {
            "id": 번호, "type": "BW", "category": 칸(c역량),
            "scenario": 칸(c상황), "options": 보기,
        }

    # ── 전체 검사 ──
    총수 = PART1_문항수 + PART2_문항수
    빠진것 = [n for n in range(1, 총수 + 1) if n not in 문항들]
    남는것 = [n for n in 문항들 if n < 1 or n > 총수]
    if 빠진것:
        raise 중단("문항 번호 %s 번이 엑셀에 없습니다. (전체 %d문항이어야 합니다)"
                   % (", ".join(str(n) for n in 빠진것[:15]), 총수))
    if 남는것:
        raise 중단("문항 번호 %s 번은 1~%d 범위를 벗어납니다."
                   % (", ".join(str(n) for n in sorted(남는것)[:15]), 총수))
    for n in range(1, PART1_문항수 + 1):
        if 문항들[n]["type"] != "AB":
            raise 중단("Q%d번은 PART1(A/B 선택) 이어야 합니다." % n)
    for n in range(PART1_문항수 + 1, 총수 + 1):
        if 문항들[n]["type"] != "BW":
            raise 중단("Q%d번은 PART2(상황판단) 이어야 합니다." % n)

    return [문항들[n] for n in range(1, 총수 + 1)]


# ─────────────────────────────────────────────────────────────
# 3) google_apps_script.js 읽기 : QUESTIONS 배열을 뽑아낸다
# ─────────────────────────────────────────────────────────────
def _자바스크립트_토막을_json으로(토막):
    """`{ id: 1, type: 'AB', ... }` 형태의 자바스크립트 배열을 JSON으로 바꾼다.
    문자열 안의 쉼표·따옴표에 속지 않도록 한 글자씩 훑는다."""
    결과 = []
    i = 0
    끝 = len(토막)
    while i < 끝:
        글자 = 토막[i]
        if 글자 == '"':                       # 큰따옴표 문자열은 통째로 옮긴다
            j = i + 1
            while j < 끝:
                if 토막[j] == "\\":
                    j += 2
                    continue
                if 토막[j] == '"':
                    break
                j += 1
            결과.append(토막[i:j + 1])
            i = j + 1
        elif 글자 == "'":                     # 작은따옴표 문자열은 큰따옴표로 바꿔 옮긴다
            j = i + 1
            모음 = []
            while j < 끝:
                if 토막[j] == "\\":
                    모음.append(토막[j + 1:j + 2])
                    j += 2
                    continue
                if 토막[j] == "'":
                    break
                모음.append(토막[j])
                j += 1
            결과.append(json.dumps("".join(모음), ensure_ascii=False))
            i = j + 1
        elif 글자 == "/" and i + 1 < 끝 and 토막[i + 1] == "/":   # 줄 주석은 버린다
            j = 토막.find("\n", i)
            i = 끝 if j == -1 else j
        elif re.match(r"[A-Za-z_$]", 글자):   # 열쇠말(id, type ...)은 따옴표로 감싼다
            m = re.match(r"[A-Za-z_$][A-Za-z0-9_$]*", 토막[i:])
            낱말 = m.group(0)
            뒤 = 토막[i + len(낱말):]
            if re.match(r"\s*:", 뒤):
                결과.append('"%s"' % 낱말)
            else:
                결과.append(낱말)
            i += len(낱말)
        else:
            결과.append(글자)
            i += 1
    글 = "".join(결과)
    글 = re.sub(r",(\s*[}\]])", r"\1", 글)     # 마지막에 남은 쉼표 제거
    return json.loads(글)


def _배열_찾기(원문, 변수이름):
    시작표시 = "const %s = [" % 변수이름
    시작 = 원문.find(시작표시)
    if 시작 == -1:
        raise 중단("google_apps_script.js 에서 '%s' 를 찾지 못했습니다." % 시작표시)
    끝 = 원문.find("\n];", 시작)
    if 끝 == -1:
        raise 중단("'%s' 배열이 어디서 끝나는지 찾지 못했습니다. (줄 맨앞의 '];' 를 찾습니다)" % 변수이름)
    return 시작, 끝 + len("\n];")


def 코드에서_문항읽기(원문):
    시작, 끝 = _배열_찾기(원문, "QUESTIONS")
    토막 = 원문[시작:끝]
    토막 = 토막[토막.find("["):토막.rfind("]") + 1]
    문항들 = _자바스크립트_토막을_json으로(토막)
    if len(문항들) != PART1_문항수 + PART2_문항수:
        raise 중단("코드의 문항이 %d개입니다. %d개여야 합니다."
                   % (len(문항들), PART1_문항수 + PART2_문항수))
    return 문항들


# ─────────────────────────────────────────────────────────────
# 4) 문항 목록 → 자바스크립트 코드 글자로
# ─────────────────────────────────────────────────────────────
def _문자열(값):
    return json.dumps(값, ensure_ascii=False)


def 문항들을_코드로(문항들):
    줄들 = ["const QUESTIONS = ["]
    for q in 문항들:
        if q["type"] == "AB":
            줄 = ("    { id: %d, type: 'AB', category: %s, optionA: %s, optionB: %s },"
                  % (q["id"], _문자열(q["category"]), _문자열(q["optionA"]), _문자열(q["optionB"])))
        else:
            보기 = ", ".join(_문자열(o) for o in q["options"])
            줄 = ("    { id: %d, type: 'BW', category: %s, scenario: %s, options: [%s] },"
                  % (q["id"], _문자열(q["category"]), _문자열(q["scenario"]), 보기))
        줄들.append(줄)
    줄들[-1] = 줄들[-1].rstrip(",")   # 마지막 줄의 쉼표는 뗀다
    줄들.append("];")
    return "\n".join(줄들)


# ─────────────────────────────────────────────────────────────
# 5) 비교 : 무엇이 달라지는지 사람이 읽을 수 있게
# ─────────────────────────────────────────────────────────────
def _다듬기(글):
    return re.sub(r"\s+", " ", re.sub(r"^[①②③④\d]+[.)]?\s*", "", (글 or "").strip()))


def 비교하기(코드문항, 엑셀문항):
    """(변경목록, 경고목록) 을 돌려준다."""
    코드맵 = {q["id"]: q for q in 코드문항}
    변경, 경고 = [], []

    for 새 in 엑셀문항:
        옛 = 코드맵.get(새["id"])
        if 옛 is None:
            변경.append((새["id"], "새 문항", []))
            continue

        바뀐칸 = []
        if _다듬기(옛.get("category")) != _다듬기(새.get("category")):
            바뀐칸.append(("역량", 옛.get("category"), 새.get("category")))

        if 새["type"] == "AB":
            옛A, 옛B = _다듬기(옛.get("optionA")), _다듬기(옛.get("optionB"))
            새A, 새B = _다듬기(새.get("optionA")), _다듬기(새.get("optionB"))
            if (옛A, 옛B) == (새B, 새A) and 옛A != 옛B:
                바뀐칸.append(("선택지", "A와 B의 순서", "서로 뒤바뀜"))
                if 새["id"] in 거울구간:
                    경고.append(
                        "Q%d : A와 B의 순서가 뒤바뀝니다. 이 문항은 거울(역방향) 문항이라, "
                        "순서가 바뀌면 응답 일관성 채점이 반대로 계산됩니다. "
                        "admin.html·report_v4.html 의 MIRROR_PAIRS 에서 이 문항의 rev 값도 "
                        "함께 뒤집어야 합니다." % 새["id"]
                    )
                else:
                    경고.append("Q%d : A와 B의 순서가 뒤바뀝니다. PART1 성향(A/B 비율) 해석이 반대가 됩니다." % 새["id"])
            else:
                if 옛A != 새A:
                    바뀐칸.append(("선택지 A", 옛.get("optionA"), 새.get("optionA")))
                if 옛B != 새B:
                    바뀐칸.append(("선택지 B", 옛.get("optionB"), 새.get("optionB")))
        else:
            if _다듬기(옛.get("scenario")) != _다듬기(새.get("scenario")):
                바뀐칸.append(("상황", 옛.get("scenario"), 새.get("scenario")))
            옛보기 = [_다듬기(o) for o in 옛.get("options", [])]
            새보기 = [_다듬기(o) for o in 새.get("options", [])]
            if 옛보기 != 새보기:
                if sorted(옛보기) == sorted(새보기):
                    자리 = [str(옛보기.index(o) + 1) for o in 새보기]
                    바뀐칸.append(("선택지 순서", "1,2,3,4", ",".join(자리)))
                    경고.append(
                        "Q%d : 선택지 문장은 그대로인데 순서만 바뀝니다. 정답키(ANSWER_KEY)는 "
                        "'몇 번째 선택지'로 저장되므로 이대로 반영하면 정답이 어긋납니다. "
                        "엑셀의 선택지 순서를 원래대로 돌리거나, ANSWER_KEY를 같이 고쳐야 합니다." % 새["id"]
                    )
                else:
                    for 자리 in range(4):
                        if 옛보기[자리] != 새보기[자리]:
                            바뀐칸.append(("선택지 %d" % (자리 + 1),
                                          옛.get("options")[자리], 새.get("options")[자리]))
                    경고.append(
                        "Q%d : 선택지 내용이 바뀝니다. 이 문항의 정답키(Best/Worst)가 아직 맞는지 "
                        "GNFit_배점표_대외비.html 과 대조해 확인하세요." % 새["id"]
                    )

        if 바뀐칸:
            변경.append((새["id"], "수정", 바뀐칸))

    return 변경, 경고


def 비교_보여주기(변경, 경고):
    if not 변경:
        알림("엑셀과 코드의 문항이 완전히 같습니다. 반영할 내용이 없습니다.")
        return

    제목("달라지는 문항 %d개" % len(변경))
    for 번호, 종류, 칸들 in 변경:
        알림("Q%-3d %s" % (번호, 종류))
        for 이름, 옛값, 새값 in 칸들:
            알림("    %s" % 이름)
            알림("      지금 : %s" % str(옛값)[:88])
            알림("      엑셀 : %s" % str(새값)[:88])
        알림()

    if 경고:
        제목("[주의] 꼭 확인해야 할 것 %d건" % len(경고))
        for 글 in 경고:
            알림("  · %s" % 글)
            알림()


# ─────────────────────────────────────────────────────────────
# 6) 각 명령
# ─────────────────────────────────────────────────────────────
def 백업뜨기():
    os.makedirs(백업폴더, exist_ok=True)
    이름 = "google_apps_script_%s.js" % datetime.now().strftime("%Y%m%d_%H%M%S")
    대상 = os.path.join(백업폴더, 이름)
    shutil.copy2(코드파일, 대상)
    return 대상


def 명령_비교(적용할까=False):
    if not os.path.exists(코드파일):
        raise 중단("google_apps_script.js 를 찾을 수 없습니다:\n    %s" % 코드파일)

    표들 = 엑셀읽기(엑셀파일)
    엑셀문항 = 엑셀표_정리(표들)
    알림("엑셀에서 문항 %d개를 읽었습니다." % len(엑셀문항))

    원문 = open(코드파일, encoding="utf-8").read()
    코드문항 = 코드에서_문항읽기(원문)
    알림("코드에서 문항 %d개를 읽었습니다." % len(코드문항))

    변경, 경고 = 비교하기(코드문항, 엑셀문항)
    비교_보여주기(변경, 경고)

    if not 적용할까:
        if 변경:
            제목("파일은 아직 하나도 바뀌지 않았습니다")
            알림("위 내용이 의도한 변경이 맞으면 아래 명령으로 반영하세요.")
            알림()
            알림("    python question_tool.py 적용")
            알림()
            if 경고:
                알림("[주의] 확인할 항목이 있습니다. 반영 전에 위 내용을 꼭 읽어보세요.")
        return

    if not 변경:
        return

    if 경고:
        제목("[중단] 정답키·채점이 틀어질 수 있어 자동 반영을 멈췄습니다")
        알림("위 '주의해서 봐야 할 것'을 먼저 해결하세요. 방법은 둘 중 하나입니다.")
        알림("  1) 엑셀을 고쳐서 경고가 사라지게 한다  (권장)")
        알림("  2) 경고 내용을 모두 이해했고 관련 설정도 같이 고칠 것이라면,")
        알림("     아래처럼 뒤에 '경고무시' 를 붙여 실행한다.")
        알림()
        알림("    python question_tool.py 적용 경고무시")
        알림()
        raise 중단("자동 반영을 중단했습니다. (파일은 하나도 바뀌지 않았습니다)")

    반영하기(원문, 엑셀문항)


def 반영하기(원문, 엑셀문항):
    백업 = 백업뜨기()
    시작, 끝 = _배열_찾기(원문, "QUESTIONS")
    새원문 = 원문[:시작] + 문항들을_코드로(엑셀문항) + 원문[끝:]
    with open(코드파일, "w", encoding="utf-8", newline="\n") as f:
        f.write(새원문)

    # 제대로 써졌는지 즉시 되읽어 확인한다
    확인 = 코드에서_문항읽기(open(코드파일, encoding="utf-8").read())
    if len(확인) != len(엑셀문항):
        shutil.copy2(백업, 코드파일)
        raise 중단("반영 후 검사에 실패해서 원래 파일로 되돌렸습니다.")

    제목("반영 완료")
    알림("google_apps_script.js 의 문항 %d개를 엑셀 내용으로 교체했습니다." % len(엑셀문항))
    알림("이전 파일은 여기 보관했습니다:")
    알림("    %s" % 백업)
    알림()
    알림("남은 일 - 이걸 해야 실제 검사에 반영됩니다:")
    알림("  1. google_apps_script.js 전체를 복사해 Apps Script 편집기에 붙여넣기")
    알림("  2. [배포 관리] → [기존 배포 수정] → [새 버전] 으로 재배포")
    알림("     ※ '새 배포'를 누르면 주소가 바뀌어 사이트가 멈춥니다. 반드시 '기존 배포 수정'.")


_쓰기_스크립트 = r'''
param([string]$Json, [string]$Out)
$ErrorActionPreference = "Stop"
$data = Get-Content -Path $Json -Raw -Encoding UTF8 | ConvertFrom-Json
# 이 스크립트가 "새로 띄운" 엑셀만 나중에 정리하려고, 시작 전 프로세스 목록을 기억해 둔다.
# 사용자가 직접 열어둔 엑셀 창은 목록에 이미 있으므로 절대 건드리지 않는다.
$before = @(Get-Process EXCEL -ErrorAction SilentlyContinue | ForEach-Object { $_.Id })
$x = New-Object -ComObject Excel.Application
$x.Visible = $false
$x.DisplayAlerts = $false
$wb = $null
try {
    # 시트를 나중에 하나씩 추가(Worksheets.Add)하면 엑셀이 간헐적으로 거부한다.
    # 그래서 아예 필요한 개수만큼 시트를 가진 통합문서를 처음부터 만든다.
    # SheetsInNewWorkbook 은 엑셀의 사용자 설정이므로 원래 값으로 꼭 되돌린다.
    $prevSheets = $x.SheetsInNewWorkbook
    $x.SheetsInNewWorkbook = @($data).Count
    $wb = $x.Workbooks.Add()
    $x.SheetsInNewWorkbook = $prevSheets
    $idx = 0
    foreach ($sheet in $data) {
        $idx++
        $ws = $wb.Worksheets.Item($idx)
        $ws.Name = [string]$sheet.name
        $rows = $sheet.rows
        $nr = $rows.Count
        $nc = 0
        foreach ($r in $rows) { if ($r.Count -gt $nc) { $nc = $r.Count } }
        # 셀을 하나씩 채우면 엑셀이 "바쁘다"며 거부하는 일이 있어(0x800AC472),
        # 표 전체를 한 번에 밀어넣는다. 훨씬 빠르기도 하다.
        $grid = New-Object 'object[,]' $nr, $nc
        for ($r = 0; $r -lt $nr; $r++) {
            $row = $rows[$r]
            for ($c = 0; $c -lt $nc; $c++) {
                if ($c -lt $row.Count) { $grid[$r, $c] = [string]$row[$c] } else { $grid[$r, $c] = "" }
            }
        }
        $rng = $ws.Range($ws.Cells.Item(1, 1), $ws.Cells.Item($nr, $nc))
        $rng.NumberFormat = "@"
        $rng.Value2 = $grid
        $ws.Rows.Item(1).Font.Bold = $true
    }
    $wb.Worksheets.Item(1).Activate()
    $wb.SaveAs($Out, 51)
} catch {
    Write-Output ("ERROR " + $_.InvocationInfo.ScriptLineNumber + "행: " + $_.Exception.Message)
} finally {
    if ($wb -ne $null) { try { $wb.Close($false) } catch {} }
    try { $x.Quit() } catch {}
    try { [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($x) } catch {}
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
    Start-Sleep -Milliseconds 300
    # Quit() 만으로는 엑셀이 백그라운드에 유령처럼 남는 일이 잦다. 남아 있으면 확실히 끝낸다.
    # 조건 둘을 모두 만족할 때만 종료 : (1) 시작 전에 없던 프로세스 (2) 화면에 창이 없는 것
    foreach ($p in @(Get-Process EXCEL -ErrorAction SilentlyContinue)) {
        if (($before -notcontains $p.Id) -and [string]::IsNullOrEmpty($p.MainWindowTitle)) {
            try { Stop-Process -Id $p.Id -Force } catch {}
        }
    }
}
'''


def 명령_내보내기():
    원문 = open(코드파일, encoding="utf-8").read()
    코드문항 = 코드에서_문항읽기(원문)

    p1 = [["번호", "유형", "역량", "선택지 A", "선택지 B", "비고"]]
    p2 = [["번호", "역량", "상황 (Scenario)", "선택지 ①", "선택지 ②", "선택지 ③", "선택지 ④"]]
    for q in 코드문항:
        if q["type"] == "AB":
            p1.append([str(q["id"]), "AB", q.get("category", ""), q["optionA"], q["optionB"], ""])
        else:
            보기 = [re.sub(r"^[①②③④\d]+[.)]?\s*", "", o) for o in q["options"]]
            p2.append([str(q["id"]), q.get("category", ""), q["scenario"]] + 보기)

    묶음 = [
        {"name": "PART1_성향검사(Q1~80)", "rows": p1},
        {"name": "PART2_상황판단(Q81~100)", "rows": p2},
    ]

    저장이름 = "GN_역량검사_문항_코드기준_%s.xlsx" % datetime.now().strftime("%Y%m%d")
    저장경로 = os.path.join(여기, 저장이름)
    if os.path.exists(저장경로):
        os.remove(저장경로)

    임시 = tempfile.mkdtemp(prefix="gnfit_")
    try:
        자료파일 = os.path.join(임시, "data.json")
        ps파일 = os.path.join(임시, "write.ps1")
        with open(자료파일, "w", encoding="utf-8") as f:
            json.dump(묶음, f, ensure_ascii=False)
        with open(ps파일, "w", encoding="utf-8-sig") as f:
            f.write(_쓰기_스크립트)

        알림("엑셀 파일을 만드는 중입니다... (몇 초 걸립니다)")
        완료 = subprocess.run(
            ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass",
             "-File", ps파일, "-Json", 자료파일, "-Out", 저장경로],
            capture_output=True, text=True, encoding="utf-8", errors="replace",
        )
        if not os.path.exists(저장경로):
            raise 중단("엑셀 파일을 만들지 못했습니다.\n    오류: %s"
                       % ((완료.stderr or 완료.stdout or "").strip()[:500]))
    finally:
        shutil.rmtree(임시, ignore_errors=True)

    제목("내보내기 완료")
    알림("지금 코드에 들어있는 문항 %d개를 엑셀로 저장했습니다:" % len(코드문항))
    알림("    %s" % 저장경로)
    알림()
    알림("[주의] 이 파일에는 문항 전문이 들어있습니다. GitHub에 올리지 마세요.")
    알림("   (.gitignore 가 'GN_역량검사_문항_코드기준_*.xlsx' 를 막고 있습니다)")
    알림()
    알림("정답키(Best/Worst)는 들어있지 않습니다. 정답키는 google_apps_script.js 와")
    알림("GNFit_배점표_대외비.html 에만 있습니다.")


# ─────────────────────────────────────────────────────────────
def main():
    인자 = [a.strip() for a in sys.argv[1:]]
    명령 = 인자[0] if 인자 else "비교"
    경고무시 = "경고무시" in 인자

    알림("GN-Fit 문항 관리 도구")
    알림("엑셀 : %s" % 엑셀파일)
    알림("코드 : %s" % 코드파일)

    if 명령 in ("비교", "확인"):
        명령_비교(적용할까=False)
    elif 명령 in ("적용", "반영"):
        if 경고무시:
            표들 = 엑셀읽기(엑셀파일)
            엑셀문항 = 엑셀표_정리(표들)
            원문 = open(코드파일, encoding="utf-8").read()
            변경, 경고 = 비교하기(코드에서_문항읽기(원문), 엑셀문항)
            비교_보여주기(변경, 경고)
            if not 변경:
                return
            알림("'경고무시' 로 실행되어 경고가 있어도 반영합니다.")
            반영하기(원문, 엑셀문항)
        else:
            명령_비교(적용할까=True)
    elif 명령 in ("내보내기", "추출"):
        명령_내보내기()
    else:
        알림()
        알림("알 수 없는 명령입니다: %r" % 명령)
        알림()
        알림("쓸 수 있는 명령")
        알림("    python question_tool.py                비교만 한다 (파일 안 바뀜)")
        알림("    python question_tool.py 적용            엑셀 내용으로 코드를 고친다")
        알림("    python question_tool.py 내보내기         지금 코드의 문항을 엑셀로 저장한다")


if __name__ == "__main__":
    try:
        main()
    except 중단 as e:
        알림()
        알림("=" * 62)
        알림("작업을 멈췄습니다.")
        알림("=" * 62)
        알림(str(e))
        알림()
        sys.exit(1)
