function doPost(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        const doc = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = doc.getActiveSheet(); // 또는 doc.getSheetByName('시트1');

        // 1. 요청 데이터 파싱
        const requestBody = e.postData.contents;
        const data = JSON.parse(requestBody);

        // 2. 헤더 처리 (첫 줄이 비어있으면 헤더 생성)
        const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 1).getValues()[0];
        const newHeaders = [];

        // 데이터의 모든 키를 확인하여 헤더에 없으면 추가
        for (const key in data) {
            if (!headers.includes(key)) {
                newHeaders.push(key);
            }
        }

        if (newHeaders.length > 0) {
            const startCol = headers.length === 1 && headers[0] === "" ? 1 : headers.length + 1;
            sheet.getRange(1, startCol, 1, newHeaders.length).setValues([newHeaders]);
        }

        // 3. 최신 헤더 다시 가져오기
        const updatedHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

        // 4. 데이터 매핑 (헤더 순서에 맞게 값 정렬)
        const rowData = updatedHeaders.map(header => {
            // 데이터가 없으면 빈 문자열, 0이면 0 유지
            return data[header] !== undefined ? data[header] : "";
        });

        // 5. 시트에 행 추가
        sheet.appendRow(rowData);

        return ContentService.createTextOutput(JSON.stringify({ result: "success", row: sheet.getLastRow() }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (e) {
        return ContentService.createTextOutput(JSON.stringify({ result: "error", error: e.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

// [NEW] 관리자 대시보드용 데이터 조회 함수
function doGet(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();

    // 데이터가 없을 경우
    if (data.length === 0) {
        return ContentService.createTextOutput(JSON.stringify([]))
            .setMimeType(ContentService.MimeType.JSON);
    }

    const headers = data[0];
    const rows = data.slice(1);

    // 배열 데이터를 JSON 객체 배열로 변환
    const result = rows.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index];
        });
        return obj;
    });

    return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
}
