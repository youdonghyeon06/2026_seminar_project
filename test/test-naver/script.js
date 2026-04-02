// 검색 버튼 클릭 및 엔터 키 입력 처리
function handleSearch(event) {
    event.preventDefault(); // 페이지 새로고침 방지
    
    const searchInput = document.getElementById('search_input').value;
    
    if (searchInput.trim() === '') {
        alert('검색어를 입력해주세요.');
        return;
    }
    
    // 실제 네이버 통합검색 URL로 이동시키는 기능
    const searchUrl = `https://search.naver.com/search.naver?query=${encodeURIComponent(searchInput)}`;
    window.open(searchUrl, '_blank');
}

// 로그인 버튼 클릭 이벤트
function login() {
    alert('로그인 페이지로 이동합니다. (현재는 클론 페이지이므로 작동하지 않습니다.)');
}