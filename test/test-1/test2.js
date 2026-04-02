// 가상의 게시글 데이터 (실제로는 서버나 DB에서 가져옴)
const mockData = [
  { id: 1, title: "[공지] 커뮤니티 이용 규칙", type: "notice", likes: 10 },
  { id: 2, title: "이 책 진짜 재밌네요 추천합니다", type: "general", likes: 55 }, // 개념글 조건(추천 50 이상) 충족
  { id: 3, title: "주말에 읽을만한 소설 있나요?", type: "general", likes: 2 },
  { id: 4, title: "해리포터 다 읽었습니다!", type: "general", likes: 100 }, // 개념글 조건 충족
  { id: 5, title: "[공지] 이벤트 당첨자 발표", type: "notice", likes: 5 },
];

// 화면을 그릴 타겟 엘리먼트
const appDiv = document.getElementById("app");

// 1. 라우터 함수 (URL에 따라 화면을 다르게 그림)
const router = () => {
  const path = window.location.pathname; // 예: '/board'
  const searchParams = new URLSearchParams(window.location.search); // 예: '?tab=best'
  const tab = searchParams.get("tab") || "all"; // tab 값이 없으면 기본값 'all'

  if (path === "/") {
    appDiv.innerHTML = "<h1>메인 페이지입니다.</h1><p>위의 메뉴를 클릭해보세요.</p>";
  } 
  else if (path === "/board") {
    renderBoard(tab); // 게시판 렌더링 함수 호출
  }
};

// 2. 게시판 렌더링 함수 (하나의 함수에서 tab 값에 따라 다르게 처리)
const renderBoard = (currentTab) => {
  let filteredData = [];
  let boardTitle = "";

  // 탭(tab) 값에 따라 보여줄 데이터 필터링
  if (currentTab === "all") {
    boardTitle = "전체글";
    filteredData = mockData.filter(post => post.type !== "notice"); // 공지 제외 전체
  } else if (currentTab === "best") {
    boardTitle = "개념글";
    filteredData = mockData.filter(post => post.likes >= 50); // 추천수 50 이상만
  } else if (currentTab === "notice") {
    boardTitle = "공지사항";
    filteredData = mockData.filter(post => post.type === "notice"); // 공지만
  }

  // 필터링된 데이터를 HTML 리스트로 만들기
  const listHtml = filteredData.map(post => 
    `<li>${post.title} (추천: ${post.likes})</li>`
  ).join("");

  // 화면에 그리기
  appDiv.innerHTML = `
    <div class="board-container">
      <h2>${boardTitle} 게시판</h2>
      <p>현재 URL 쿼리: ?tab=${currentTab}</p>
      <hr>
      <ul>
        ${listHtml.length > 0 ? listHtml : "<li>게시글이 없습니다.</li>"}
      </ul>
    </div>
  `;
};

// 3. 페이지 이동 처리 (새로고침 방지)
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault(); // 기본 링크 이동(새로고침) 막기
    history.pushState(null, null, e.target.href); // URL만 변경
    router(); // 화면 다시 그리기
  }
});

// 4. 브라우저 뒤로가기 버튼 처리
window.addEventListener("popstate", router);

// 5. 초기 화면 로드 시 라우터 실행
document.addEventListener("DOMContentLoaded", router);