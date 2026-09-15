"""
로컬 미리보기 서버.

파이참에서 ▶(실행) 버튼만 누르면 이 파일이 돌아가고,
브라우저에서 http://localhost:8123 으로 검사 화면을 볼 수 있다.

HTML 파일을 그냥 더블클릭해서 여는 것(file:///...)과 다른 점:
  - localStorage가 페이지 간에 제대로 공유된다 (로그인 정보 전달이 정상 동작)
  - 구글 Apps Script로 보내는 fetch 요청이 차단되지 않는다

캐시 끄기:
  기본 서버는 브라우저에게 "이 파일 저장해뒀다 써도 돼"라고 알려준다.
  그러면 test.js를 고쳐도 화면에 반영이 안 돼서 헷갈린다.
  아래 no-cache 헤더로 매번 새로 읽어오게 만든다.
"""

import http.server
import socketserver
import webbrowser

PORT = 8123


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    """매 요청마다 파일을 새로 내려주는 핸들러."""

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


def main():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print(f"로컬 서버 시작: {url}")
        print("끄려면 이 창에서 Ctrl + C 를 누르세요.")
        webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n서버를 종료했습니다.")


if __name__ == "__main__":
    main()
